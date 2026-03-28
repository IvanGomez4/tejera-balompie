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
  isLogged: () => {
    try { return localStorage.getItem(KEY_AUTH) === 'true' } catch { return false }
  },
  // Ahora login es "async" porque calcular el hash toma unos milisegundos
  login: async (password) => {
    const hashCalculado = await hashPassword(password)

    if (hashCalculado === ADMIN_PASSWORD_HASH) {
      try { localStorage.setItem(KEY_AUTH, 'true') } catch { }
      return true
    }
    return false
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
