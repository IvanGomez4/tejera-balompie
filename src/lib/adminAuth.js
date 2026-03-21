// Contraseña de equipo — compártela solo con los jugadores
export const ADMIN_PASSWORD = 'Tej3ra@VCN26!'

const KEY = 'tj_admin_auth'

export const adminAuth = {
  isLogged: () => {
    try { return localStorage.getItem(KEY) === 'true' } catch { return false }
  },
  login: (password) => {
    if (password === ADMIN_PASSWORD) {
      try { localStorage.setItem(KEY, 'true') } catch {}
      return true
    }
    return false
  },
  logout: () => {
    try { localStorage.removeItem(KEY) } catch {}
  }
}
