export const ADMIN_PASSWORD = 'Tej3ra@VCN26!'

const KEY_AUTH = 'tj_admin_auth'
const KEY_JUGADOR = 'tj_jugador_activo'

export const adminAuth = {
  isLogged: () => {
    try { return localStorage.getItem(KEY_AUTH) === 'true' } catch { return false }
  },
  login: (password) => {
    if (password === ADMIN_PASSWORD) {
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
