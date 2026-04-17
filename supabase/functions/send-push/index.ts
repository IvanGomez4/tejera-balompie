// Supabase Edge Function: send-push
// Envía Web Push notifications a todos los suscriptores guardados en la tabla push_subscriptions
// Deno runtime — no necesita npm install

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

// Web Push usando la librería web-push portada a Deno
// Generamos la firma VAPID manualmente con la Web Crypto API de Deno

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// ── Helpers VAPID ──────────────────────────────────────────────────────────────

function base64UrlToUint8Array(base64url: string): Uint8Array {
  const base64 = base64url.replace(/-/g, '+').replace(/_/g, '/')
  const padded = base64.padEnd(base64.length + (4 - base64.length % 4) % 4, '=')
  const binary = atob(padded)
  return new Uint8Array([...binary].map(c => c.charCodeAt(0)))
}

function uint8ArrayToBase64Url(arr: Uint8Array): string {
  return btoa(String.fromCharCode(...arr))
    .replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '')
}

async function buildVapidHeaders(
  audience: string,
  subject: string,
  publicKey: string,
  privateKey: string,
): Promise<{ Authorization: string; 'Crypto-Key': string }> {
  const now = Math.floor(Date.now() / 1000)
  const payload = {
    aud: audience,
    exp: now + 12 * 3600,
    sub: subject,
  }

  const header = { typ: 'JWT', alg: 'ES256' }
  const enc = (obj: object) => uint8ArrayToBase64Url(new TextEncoder().encode(JSON.stringify(obj)))
  const signingInput = `${enc(header)}.${enc(payload)}`

  const keyData = base64UrlToUint8Array(privateKey)
  const cryptoKey = await crypto.subtle.importKey(
    'pkcs8',
    keyData,
    { name: 'ECDSA', namedCurve: 'P-256' },
    false,
    ['sign'],
  )

  const signature = await crypto.subtle.sign(
    { name: 'ECDSA', hash: 'SHA-256' },
    cryptoKey,
    new TextEncoder().encode(signingInput),
  )

  const jwt = `${signingInput}.${uint8ArrayToBase64Url(new Uint8Array(signature))}`

  return {
    Authorization: `vapid t=${jwt},k=${publicKey}`,
    'Crypto-Key': `p256ecdh=${publicKey}`,
  }
}

// ── Cifrado del payload (AES-GCM + ECDH) ──────────────────────────────────────

async function encryptPayload(
  subscription: { keys: { p256dh: string; auth: string } },
  payload: string,
): Promise<{ body: Uint8Array; headers: Record<string, string> }> {
  const clientPublicKey = base64UrlToUint8Array(subscription.keys.p256dh)
  const clientAuthSecret = base64UrlToUint8Array(subscription.keys.auth)

  // Generar par de claves efímeras
  const serverKeyPair = await crypto.subtle.generateKey(
    { name: 'ECDH', namedCurve: 'P-256' },
    true,
    ['deriveKey', 'deriveBits'],
  )

  const serverPublicKeyRaw = new Uint8Array(
    await crypto.subtle.exportKey('raw', serverKeyPair.publicKey),
  )

  const clientKey = await crypto.subtle.importKey(
    'raw',
    clientPublicKey,
    { name: 'ECDH', namedCurve: 'P-256' },
    false,
    [],
  )

  // ECDH shared secret
  const sharedSecret = new Uint8Array(
    await crypto.subtle.deriveBits(
      { name: 'ECDH', public: clientKey },
      serverKeyPair.privateKey,
      256,
    ),
  )

  // Salt aleatorio
  const salt = crypto.getRandomValues(new Uint8Array(16))

  // HKDF para generar la clave de cifrado y el nonce
  const hkdfKey = await crypto.subtle.importKey('raw', sharedSecret, 'HKDF', false, ['deriveKey', 'deriveBits'])

  // PRK via HKDF-SHA256
  const prk = await crypto.subtle.deriveBits(
    {
      name: 'HKDF',
      hash: 'SHA-256',
      salt: clientAuthSecret,
      info: new TextEncoder().encode('Content-Encoding: auth\0'),
    },
    hkdfKey,
    256,
  )
  const prkKey = await crypto.subtle.importKey('raw', prk, 'HKDF', false, ['deriveBits'])

  // keyinfo y nonceinfo
  const keyInfo = buildInfo('aesgcm', clientPublicKey, serverPublicKeyRaw)
  const nonceInfo = buildInfo('nonce', clientPublicKey, serverPublicKeyRaw)

  const contentEncryptionKey = await crypto.subtle.deriveBits(
    { name: 'HKDF', hash: 'SHA-256', salt, info: keyInfo },
    prkKey,
    128,
  )
  const nonce = new Uint8Array(await crypto.subtle.deriveBits(
    { name: 'HKDF', hash: 'SHA-256', salt, info: nonceInfo },
    prkKey,
    96,
  ))

  const aesKey = await crypto.subtle.importKey('raw', contentEncryptionKey, 'AES-GCM', false, ['encrypt'])

  const paddedPayload = padPayload(new TextEncoder().encode(payload))
  const encrypted = new Uint8Array(
    await crypto.subtle.encrypt({ name: 'AES-GCM', iv: nonce }, aesKey, paddedPayload),
  )

  return {
    body: encrypted,
    headers: {
      'Content-Encoding': 'aesgcm',
      Encryption: `salt=${uint8ArrayToBase64Url(salt)}`,
      'Crypto-Key': `dh=${uint8ArrayToBase64Url(serverPublicKeyRaw)}`,
      'Content-Type': 'application/octet-stream',
      'Content-Length': String(encrypted.byteLength),
    },
  }
}

function buildInfo(type: string, clientKey: Uint8Array, serverKey: Uint8Array): Uint8Array {
  const prefix = new TextEncoder().encode(`Content-Encoding: ${type}\0P-256\0`)
  const result = new Uint8Array(prefix.length + 2 + clientKey.length + 2 + serverKey.length)
  let offset = 0
  result.set(prefix, offset); offset += prefix.length
  new DataView(result.buffer).setUint16(offset, clientKey.length, false); offset += 2
  result.set(clientKey, offset); offset += clientKey.length
  new DataView(result.buffer).setUint16(offset, serverKey.length, false); offset += 2
  result.set(serverKey, offset)
  return result
}

function padPayload(payload: Uint8Array): Uint8Array {
  const padLen = 0
  const result = new Uint8Array(2 + padLen + payload.length)
  new DataView(result.buffer).setUint16(0, padLen, false)
  result.set(payload, 2 + padLen)
  return result
}

// ── Handler principal ──────────────────────────────────────────────────────────

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })

  try {
    const { titulo, imagen_url } = await req.json()

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    )

    const VAPID_PUBLIC = Deno.env.get('VAPID_PUBLIC_KEY')!
    const VAPID_PRIVATE = Deno.env.get('VAPID_PRIVATE_KEY')!
    const VAPID_SUBJECT = Deno.env.get('VAPID_SUBJECT') || 'mailto:admin@tejerabalompie.com'

    // Obtener todos los suscriptores
    const { data: subs, error } = await supabase.from('push_subscriptions').select('*')
    if (error) throw error
    if (!subs || subs.length === 0) {
      return new Response(JSON.stringify({ sent: 0 }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const notificationPayload = JSON.stringify({
      title: '📰 Nueva portada',
      body: titulo,
      icon: '/escudo.png',
      badge: '/escudo.png',
      image: imagen_url || undefined,
      url: '/noticias',
    })

    let sent = 0
    const toDelete: string[] = []

    await Promise.all(subs.map(async (sub) => {
      try {
        const endpoint: string = sub.endpoint
        const audience = new URL(endpoint).origin

        const vapidHeaders = await buildVapidHeaders(audience, VAPID_SUBJECT, VAPID_PUBLIC, VAPID_PRIVATE)
        const { body, headers: encHeaders } = await encryptPayload(
          { keys: { p256dh: sub.p256dh, auth: sub.auth } },
          notificationPayload,
        )

        const res = await fetch(endpoint, {
          method: 'POST',
          headers: {
            ...vapidHeaders,
            ...encHeaders,
            TTL: '86400',
          },
          body,
        })

        if (res.status === 201 || res.status === 200) {
          sent++
        } else if (res.status === 410 || res.status === 404) {
          // Suscripción expirada — marcar para borrar
          toDelete.push(sub.id)
        }
      } catch (e) {
        console.error('Error enviando a', sub.endpoint, e)
      }
    }))

    // Limpiar suscripciones caducadas
    if (toDelete.length > 0) {
      await supabase.from('push_subscriptions').delete().in('id', toDelete)
    }

    return new Response(JSON.stringify({ sent, deleted: toDelete.length }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
