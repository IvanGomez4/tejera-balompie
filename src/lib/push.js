// src/lib/push.js
// Gestiona suscripciones Web Push: pedir permiso, suscribirse y guardar en Supabase

import { supabase } from './supabase'

// Tu clave pública VAPID — la generas una vez con el script de setup
// y la pegas aquí y en las variables de entorno de Supabase
const VAPID_PUBLIC_KEY = import.meta.env.VITE_VAPID_PUBLIC_KEY || ''

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4)
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/')
  const rawData = atob(base64)
  return Uint8Array.from([...rawData].map(c => c.charCodeAt(0)))
}

// ¿El navegador soporta push y hay SW registrado?
export function pushSoportado() {
  return 'serviceWorker' in navigator && 'PushManager' in window
}

// Devuelve el estado actual del permiso: 'granted' | 'denied' | 'default'
export function pushPermiso() {
  return Notification.permission
}

// Suscribe al usuario y guarda la suscripción en Supabase
// Devuelve true si fue bien, false si el usuario denegó o falló algo
export async function suscribirPush() {
  if (!pushSoportado()) return false
  if (!VAPID_PUBLIC_KEY) {
    console.warn('[push] VITE_VAPID_PUBLIC_KEY no configurada')
    return false
  }

  try {
    // 🚨 CAMBIO VITAL PARA iOS: 
    // Pedir el permiso INMEDIATAMENTE al hacer clic, antes de cualquier "await" al Service Worker.
    const permiso = await Notification.requestPermission()
    if (permiso !== 'granted') return false

    // Una vez dado el permiso, YA PODEMOS esperar al Service Worker tranquilamente
    const reg = await navigator.serviceWorker.ready

    // Crear o recuperar suscripción existente
    const subscription = await reg.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY),
    })

    const json = subscription.toJSON()

    // Guardar en Supabase (upsert por endpoint para no duplicar)
    const { error } = await supabase
      .from('push_subscriptions')
      .upsert({
        endpoint: json.endpoint,
        p256dh: json.keys.p256dh,
        auth: json.keys.auth,
        updated_at: new Date().toISOString(),
      }, { onConflict: 'endpoint' })

    if (error) {
      console.error('[push] Error guardando suscripción:', error)
      return false
    }

    return true
  } catch (err) {
    console.error('[push] Error al suscribir:', err)
    return false
  }
}

// Cancela la suscripción y la borra de Supabase
export async function desuscribirPush() {
  if (!pushSoportado()) return

  try {
    const reg = await navigator.serviceWorker.ready
    const subscription = await reg.pushManager.getSubscription()
    if (!subscription) return

    const endpoint = subscription.endpoint
    await subscription.unsubscribe()
    await supabase.from('push_subscriptions').delete().eq('endpoint', endpoint)
  } catch (err) {
    console.error('[push] Error al desuscribir:', err)
  }
}

// Llama a la Edge Function para enviar notificación a todos
export async function enviarNotificacion({ titulo, imagen_url }) {
  try {
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
    const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY
    const res = await fetch(`${supabaseUrl}/functions/v1/send-push`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${anonKey}`,
      },
      body: JSON.stringify({ titulo, imagen_url }),
    })
    const data = await res.json()
    console.log('[push] Enviadas:', data)
  } catch (err) {
    console.error('[push] Error enviando notificación:', err)
  }
}
