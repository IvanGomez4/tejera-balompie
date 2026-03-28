import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { adminAuth } from '../lib/adminAuth'
import { useStore } from '../hooks/useStore'
import escudo from '../assets/escudo.png'

const tabs = [
  { to: '/', label: 'Inicio', icon: '🏠' },
  { to: '/clasificacion', label: 'Tabla', icon: '🏆' },
  { to: '/jugadores', label: 'Plantilla', icon: '👕' },
  { to: '/partidos', label: 'Partidos', icon: '⚽' },
  { to: '/estadisticas', label: 'Stats', icon: '📊' },
]

export default function Navbar() {
  const location = useLocation()
  const navigate = useNavigate()
  const { jugadores } = useStore()

  const [logged, setLogged] = useState(adminAuth.isLogged())
  const [jugadorActivo, setJugadorActivo] = useState(adminAuth.getJugador())
  const [showModal, setShowModal] = useState(false)
  const [pwd, setPwd] = useState('')
  const [jugadorSel, setJugadorSel] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    const check = () => {
      setLogged(adminAuth.isLogged())
      setJugadorActivo(adminAuth.getJugador())
    }
    window.addEventListener('focus', check)
    return () => window.removeEventListener('focus', check)
  }, [])

  const openModal = () => {
    setPwd(''); setJugadorSel(''); setError(''); setShowModal(true)
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    if (!jugadorSel) { setError('Elige tu nombre'); return }

    const isValid = await adminAuth.login(pwd)

    if (!isValid) { setError('Contraseña incorrecta'); return }

    const jugador = jugadores.find(j => j.id === Number(jugadorSel))
    if (jugador) {
      adminAuth.setJugador(jugador)
      setJugadorActivo(jugador)
    }
    setLogged(true)
    setShowModal(false)
    navigate('/admin')
  }

  const handleLogout = () => {
    adminAuth.logout()
    setLogged(false)
    setJugadorActivo(null)
    if (location.pathname === '/admin') navigate('/')
  }

  return (
    <>
      <header className="top-header">
        <div style={{ maxWidth: 680, margin: '0 auto', display: 'flex', alignItems: 'center', gap: 10, padding: '8px 14px' }}>
          <img src={escudo} alt="Escudo" onClick={() => navigate('/')} style={{ width: 42, height: 42, objectFit: 'contain', flexShrink: 0, cursor: 'pointer' }} />          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: 'Bebas Neue', fontSize: 17, color: '#7dce7d', letterSpacing: '0.06em', lineHeight: 1.1 }}>
              Tejera Balompié
            </div>
            <div style={{ fontSize: 10, color: '#4a6a4a', letterSpacing: '0.07em' }}>
              LIGA VERANO VILLACAÑAS 2026
            </div>
          </div>

          {logged ? (
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              {/* Nombre del jugador activo */}
              {jugadorActivo && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(125,206,125,0.12)', borderRadius: 20, padding: '4px 10px' }}>
                  <div style={{ width: 22, height: 22, borderRadius: '50%', background: 'var(--verde)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700, color: 'white', flexShrink: 0 }}>
                    {jugadorActivo.nombre.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()}
                  </div>
                  <span style={{ fontSize: 12, color: '#7dce7d', fontWeight: 600, maxWidth: 80, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {jugadorActivo.nombre.split(' ')[0]}
                  </span>
                </div>
              )}
              <button onClick={() => navigate('/admin')} style={{ background: 'var(--verde-mid)', color: 'white', border: 'none', borderRadius: 8, padding: '6px 14px', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>
                ⚙️ Admin
              </button>
              <button onClick={handleLogout} style={{ background: 'transparent', border: '1px solid #2a4a2a', color: '#4a6a4a', borderRadius: 8, padding: '6px 10px', fontSize: 12, cursor: 'pointer' }}>
                Salir
              </button>
            </div>
          ) : (
            <button onClick={openModal} style={{ background: 'transparent', border: '1px solid #2a4a2a', color: '#4a6a4a', borderRadius: 8, padding: '7px 14px', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
              🔒 Acceso equipo
            </button>
          )}
        </div>
      </header>

      <nav className="bottom-nav">
        {tabs.map(t => (
          <button key={t.to} className={`bottom-nav-btn ${location.pathname === t.to || location.pathname.startsWith(t.to + '/') ? 'active' : ''}`} onClick={() => navigate(t.to)}>
            <span className="nav-icon">{t.icon}</span>
            <span>{t.label}</span>
          </button>
        ))}
      </nav>

      {/* Modal login */}
      {showModal && (
        <>
          <div onClick={() => setShowModal(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 900 }} />
          <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 1000, background: 'white', borderRadius: '20px 20px 0 0', padding: '1.5rem', paddingBottom: 'calc(1.5rem + env(safe-area-inset-bottom))', boxShadow: '0 -4px 30px rgba(0,0,0,0.2)' }}>
            <div style={{ width: 36, height: 4, background: '#ddd', borderRadius: 2, margin: '-0.5rem auto 1.25rem' }} />

            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: '1.25rem' }}>
              <div style={{ background: 'linear-gradient(135deg,#0d1a0d,#1e4d1e)', borderRadius: '50%', width: 48, height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
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
              <div style={{ background: '#fde8e8', border: '1px solid #f5c0c0', borderRadius: 10, padding: '10px 14px', marginBottom: 14, fontSize: 13, color: '#c0392b' }}>
                {error}
              </div>
            )}

            <form onSubmit={handleLogin}>
              <div className="form-group">
                <label className="label">Tu nombre</label>
                <select className="select" value={jugadorSel} onChange={e => { setJugadorSel(e.target.value); setError('') }}>
                  <option value="">Selecciona tu nombre...</option>
                  {[...jugadores].sort((a, b) => a.nombre.localeCompare(b.nombre)).map(j => (
                    <option key={j.id} value={j.id}>{j.nombre} — #{j.dorsal}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label className="label">Contraseña del equipo</label>
                <input className="input" type="password" placeholder="••••••••••••" value={pwd} onChange={e => { setPwd(e.target.value); setError('') }} autoComplete="current-password" required />
              </div>
              <button type="submit" className="btn btn-primary btn-block" style={{ fontSize: 16 }}>
                Entrar al panel
              </button>
            </form>

            <p style={{ textAlign: 'center', fontSize: 12, color: 'var(--gris-mid)', marginTop: '1rem' }}>
              La contraseña la tiene el organizador
            </p>
          </div>
        </>
      )}
    </>
  )
}