const ADMIN_PASSWORD_HASH = '78b9e82b4fb74f04ec4cafda5182252772dc812e3636f4b0d1b3734cf032f51b'

const KEY_AUTH = 'tj_admin_auth'
const KEY_JUGADOR = 'tj_jugador_activo'

// Función nativa del navegador para convertir lo que escribe el usuario en una "huella"
async function hashPassword(password) {
  const msgUint8 = new TextEncoder().encode(password)
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('')
}

export const adminAuth = {
  // En lugar de guardar 'true', guarda un token con timestamp
  login: async (password) => {
    const hashCalculado = await hashPassword(password)
    if (hashCalculado === ADMIN_PASSWORD_HASH) {
      const token = { hash: hashCalculado.slice(0, 16), ts: Date.now() }
      try { localStorage.setItem(KEY_AUTH, JSON.stringify(token)) } catch { }
      return true
    }
    return false
  },

  isLogged: () => {
    try {
      const raw = localStorage.getItem(KEY_AUTH)
      if (!raw) return false
      const token = JSON.parse(raw)
      // Expirar después de 8 horas
      if (!token.hash || !token.ts) return false
      if (Date.now() - token.ts > 8 * 60 * 60 * 1000) {
        localStorage.removeItem(KEY_AUTH)
        return false
      }
      // Verificar que el hash coincide con el esperado
      return token.hash === ADMIN_PASSWORD_HASH.slice(0, 16)
    } catch { return false }
  },
  logout: () => {
    try {
      localStorage.removeItem(KEY_AUTH)
      localStorage.removeItem(KEY_JUGADOR)
    } catch { }
  },
  getJugador: () => {
    try {
      const v = localStorage.getItem(KEY_JUGADOR)
      return v ? JSON.parse(v) : null
    } catch { return null }
  },
  setJugador: (jugador) => {
    try { localStorage.setItem(KEY_JUGADOR, JSON.stringify(jugador)) } catch { }
  }
}
