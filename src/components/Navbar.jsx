import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { adminAuth } from '../lib/adminAuth'
import escudo from '../assets/escudo.png'

const tabs = [
  { to: '/',              label: 'Inicio',    icon: '🏠' },
  { to: '/clasificacion', label: 'Tabla',     icon: '🏆' },
  { to: '/jugadores',     label: 'Plantilla', icon: '👕' },
  { to: '/partidos',      label: 'Partidos',  icon: '⚽' },
  { to: '/estadisticas',  label: 'Stats',     icon: '📊' },
]

export default function Navbar() {
  const location  = useLocation()
  const navigate  = useNavigate()
  const [logged, setLogged] = useState(adminAuth.isLogged())
  const [showModal, setShowModal] = useState(false)
  const [pwd, setPwd]   = useState('')
  const [error, setError] = useState('')

  // Sincroniza si cambia en otra pestaña
  useEffect(() => {
    const check = () => setLogged(adminAuth.isLogged())
    window.addEventListener('focus', check)
    return () => window.removeEventListener('focus', check)
  }, [])

  const handleLogin = (e) => {
    e.preventDefault()
    if (adminAuth.login(pwd)) {
      setLogged(true)
      setShowModal(false)
      setPwd('')
      setError('')
      navigate('/admin')
    } else {
      setError('Contraseña incorrecta')
    }
  }

  const handleLogout = () => {
    adminAuth.logout()
    setLogged(false)
    if (location.pathname === '/admin') navigate('/')
  }

  return (
    <>
      {/* ── Top header ── */}
      <header className="top-header">
        <div style={{
          maxWidth: 680, margin: '0 auto',
          display: 'flex', alignItems: 'center', gap: 10,
          padding: '8px 14px'
        }}>
          <img src={escudo} alt="Escudo"
            style={{ width: 42, height: 42, objectFit: 'contain', flexShrink: 0 }} />

          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: 'Bebas Neue', fontSize: 17, color: '#7dce7d', letterSpacing: '0.06em', lineHeight: 1.1 }}>
              Tejera Balompié
            </div>
            <div style={{ fontSize: 10, color: '#4a6a4a', letterSpacing: '0.07em' }}>
              LIGA VERANO VILLACAÑAS 2026
            </div>
          </div>

          {/* Botón según estado de sesión */}
          {logged ? (
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <button
                onClick={() => navigate('/admin')}
                style={{
                  background: 'var(--verde-mid)', color: 'white', border: 'none',
                  borderRadius: 8, padding: '6px 14px', fontSize: 13, fontWeight: 700,
                  cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 5
                }}>
                ⚙️ Admin
              </button>
              <button
                onClick={handleLogout}
                style={{
                  background: 'transparent', border: '1px solid #2a4a2a',
                  color: '#4a6a4a', borderRadius: 8, padding: '6px 10px',
                  fontSize: 12, cursor: 'pointer'
                }}>
                Salir
              </button>
            </div>
          ) : (
            <button
              onClick={() => { setShowModal(true); setError(''); setPwd('') }}
              style={{
                background: 'transparent', border: '1px solid #2a4a2a',
                color: '#4a6a4a', borderRadius: 8, padding: '7px 14px',
                fontSize: 13, fontWeight: 600, cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: 5
              }}>
              🔒 Acceso equipo
            </button>
          )}
        </div>
      </header>

      {/* ── Bottom tab bar ── */}
      <nav className="bottom-nav">
        {tabs.map(t => (
          <button
            key={t.to}
            className={`bottom-nav-btn ${location.pathname === t.to || location.pathname.startsWith(t.to + '/') ? 'active' : ''}`}
            onClick={() => navigate(t.to)}>
            <span className="nav-icon">{t.icon}</span>
            <span>{t.label}</span>
          </button>
        ))}
        {/* Pestaña Admin solo visible cuando estás logueado */}
        {logged && (
          <button
            className={`bottom-nav-btn ${location.pathname === '/admin' ? 'active' : ''}`}
            onClick={() => navigate('/admin')}>
            <span className="nav-icon">⚙️</span>
            <span>Admin</span>
          </button>
        )}
      </nav>

      {/* ── Modal de login ── */}
      {showModal && (
        <>
          <div
            onClick={() => setShowModal(false)}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 900 }}
          />
          <div style={{
            position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 1000,
            background: 'white', borderRadius: '20px 20px 0 0',
            padding: '1.5rem',
            paddingBottom: 'calc(1.5rem + env(safe-area-inset-bottom))',
            boxShadow: '0 -4px 30px rgba(0,0,0,0.2)',
          }}>
            {/* Handle */}
            <div style={{ width: 36, height: 4, background: '#ddd', borderRadius: 2, margin: '-0.5rem auto 1.25rem' }} />

            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: '1.25rem' }}>
              <div style={{
                background: 'linear-gradient(135deg,#0d1a0d,#1e4d1e)',
                borderRadius: '50%', width: 48, height: 48,
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
              }}>
                <img src={escudo} alt="" style={{ width: 42, height: 42, objectFit: 'contain' }} />
              </div>
              <div>
                <div style={{ fontFamily: 'Bebas Neue', fontSize: 22, color: 'var(--verde)', lineHeight: 1 }}>
                  Acceso al equipo
                </div>
                <div style={{ fontSize: 12, color: 'var(--gris-mid)', marginTop: 2 }}>
                  Introduce la contraseña del vestuario
                </div>
              </div>
            </div>

            {error && (
              <div style={{
                background: '#fde8e8', border: '1px solid #f5c0c0',
                borderRadius: 10, padding: '10px 14px',
                marginBottom: 14, fontSize: 13, color: '#c0392b'
              }}>
                {error}
              </div>
            )}

            <form onSubmit={handleLogin}>
              <div className="form-group">
                <label className="label">Contraseña del equipo</label>
                <input
                  className="input"
                  type="password"
                  placeholder="••••••••••••"
                  value={pwd}
                  onChange={e => { setPwd(e.target.value); setError('') }}
                  autoFocus
                  autoComplete="current-password"
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary btn-block" style={{ fontSize: 16 }}>
                Entrar al panel
              </button>
            </form>

            <p style={{ textAlign: 'center', fontSize: 12, color: 'var(--gris-mid)', marginTop: '1rem' }}>
              La contraseña la tiene el organizador del equipo
            </p>
          </div>
        </>
      )}
    </>
  )
}
