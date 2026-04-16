import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useStore } from '../hooks/useStore'
import { adminAuth } from '../lib/adminAuth'
import { EQUIPO_NOMBRE } from '../lib/mockData'
import { haptics } from '../lib/haptics'
import Alineacion from '../components/Alineacion'

function fmt(str) { return new Date(str).toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }) }
function initials(n) { return n.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase() }
function Avatar({ jugador, size = 'sm' }) {
  const dim = size === 'sm' ? 32 : size === 'md' ? 42 : 64
  const fs = size === 'sm' ? 12 : size === 'md' ? 15 : 22
  return (
    <div className={`avatar avatar-${size}`} style={{ overflow: 'hidden', padding: 0, width: dim, height: dim, flexShrink: 0 }}>
      {jugador?.foto_url
        ? <img src={jugador.foto_url} alt={jugador.nombre} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
        : <span style={{ fontSize: fs }}>{initials(jugador?.nombre || '?')}</span>
      }
    </div>
  )
}
// ── Camiseta SVG verde con dorsal y nombre ──
function Camiseta({ nombre, dorsal, highlight = false }) {
  const apellido = nombre ? nombre.split(' ')[0] : '?'
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, width: 64 }}>
      <div style={{ position: 'relative', width: 56, height: 56 }}>
        <svg viewBox="0 0 100 90" width="56" height="56" xmlns="http://www.w3.org/2000/svg">
          {/* Cuerpo */}
          <path d="M25,10 L10,30 L25,35 L25,80 L75,80 L75,35 L90,30 L75,10 Q63,5 50,8 Q37,5 25,10 Z"
            fill={highlight ? '#c8a800' : '#5a1520'} stroke="#0d0a0b" strokeWidth="3" />
          {/* Cuello */}
          <path d="M40,10 Q50,18 60,10" fill="none" stroke="#0d0a0b" strokeWidth="2.5" />
          {/* Dorsal */}
          <text x="50" y="55" textAnchor="middle" fontFamily="Bebas Neue, sans-serif"
            fontSize="28" fill="white" fontWeight="bold">{dorsal || '?'}</text>
        </svg>
      </div>
      <span style={{
        fontSize: 10, fontWeight: 700, color: highlight ? '#c8a800' : 'white',
        textAlign: 'center', maxWidth: 64,
        overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
        textShadow: '0 1px 3px rgba(0,0,0,0.8)'
      }}>{apellido.toUpperCase()}</span>
    </div>
  )
}

// ── Campo de fútbol 7 ──
const FORMACIONES = {
  '1-3-2-1': { label: '1-3-2-1', filas: [1, 3, 2, 1] },
  '1-2-3-1': { label: '1-2-3-1', filas: [1, 2, 3, 1] },
  '1-2-2-2': { label: '1-2-2-2', filas: [1, 2, 2, 2] },
  '1-3-1-2': { label: '1-3-1-2', filas: [1, 3, 1, 2] },
}

function Campo({ alineacion, jugadores, mvpId, formacion = '1-3-2-1' }) {
  const filas = FORMACIONES[formacion]?.filas || [1, 3, 2, 1]
  const etiquetas = ['Portero', 'Defensa', 'Medio', 'Delantero']

  // Mapear posiciones a jugadores
  let posIdx = 0
  const filasConJugadores = filas.map((n, fi) => {
    const jugadoresFila = []
    for (let i = 0; i < n; i++) {
      const jid = alineacion?.[posIdx] || null
      const j = jid ? jugadores.find(x => x.id === jid) : null
      jugadoresFila.push({ jid, jugador: j, pos: posIdx })
      posIdx++
    }
    return { jugadoresFila, etiqueta: etiquetas[fi] }
  })

  return (
    <div style={{
      background: 'linear-gradient(180deg, #481020 0%, #5a1525 30%, #481020 70%, #3a0e1a 100%)',
      borderRadius: 16, padding: '16px 8px',
      position: 'relative', overflow: 'hidden',
      border: '3px solid #2a0a12',
      minHeight: 360,
    }}>
      {/* Líneas del campo */}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.25 }} viewBox="0 0 300 400" preserveAspectRatio="none">
        <rect x="10" y="10" width="280" height="380" fill="none" stroke="white" strokeWidth="2" />
        <line x1="10" y1="200" x2="290" y2="200" stroke="white" strokeWidth="1.5" />
        <circle cx="150" cy="200" r="40" fill="none" stroke="white" strokeWidth="1.5" />
        <circle cx="150" cy="200" r="3" fill="white" />
        <rect x="90" y="340" width="120" height="50" fill="none" stroke="white" strokeWidth="1.5" />
        <rect x="115" y="360" width="70" height="30" fill="none" stroke="white" strokeWidth="1.5" />
        <rect x="90" y="10" width="120" height="50" fill="none" stroke="white" strokeWidth="1.5" />
        <rect x="115" y="10" width="70" height="30" fill="none" stroke="white" strokeWidth="1.5" />
      </svg>

      {/* Filas de jugadores — de delantero a portero (arriba a abajo) */}
      <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', gap: 12 }}>
        {[...filasConJugadores].reverse().map((fila, fi) => (
          <div key={fi} style={{ display: 'flex', justifyContent: 'center', gap: 8, flexWrap: 'wrap' }}>
            {fila.jugadoresFila.map((item, i) => (
              <Camiseta
                key={i}
                nombre={item.jugador?.nombre || '—'}
                dorsal={item.jugador?.dorsal}
                highlight={item.jid === mvpId}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Editor de alineación (solo admin) ──
function EditorAlineacion({ partido, jugadores, store, onClose }) {
  const [formacion, setFormacion] = useState(partido.formacion || '1-3-2-1')
  const filas = FORMACIONES[formacion]?.filas || [1, 3, 2, 1]
  const total = filas.reduce((a, b) => a + b, 0)
  const [slots, setSlots] = useState(() => {
    const a = partido.alineacion || []
    return Array.from({ length: 7 }, (_, i) => a[i] || null)
  })

  const setSlot = (idx, jid) => setSlots(s => s.map((v, i) => i === idx ? (jid ? Number(jid) : null) : v))
  const etiquetas = ['Portero', 'Defensa', 'Defensa', 'Defensa', 'Medio', 'Medio', 'Delantero']
  const etiquetasPorFormacion = () => {
    const f = FORMACIONES[formacion].filas
    const labels = []
    const nombres = ['Portero', 'Defensa', 'Medio', 'Delantero']
    f.forEach((n, fi) => { for (let i = 0; i < n; i++) labels.push(nombres[fi]) })
    return labels
  }
  const labels = etiquetasPorFormacion()

  const save = async () => {
    await store.updatePartido(partido.id, { ...partido, alineacion: slots, formacion })
    onClose()
  }

  return (
    <>
      <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.55)', zIndex: 400 }} />
      <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 500, background: 'white', borderRadius: '20px 20px 0 0', padding: '1.5rem', paddingBottom: 'calc(1.5rem + env(safe-area-inset-bottom))', maxHeight: '90vh', overflowY: 'auto' }}>
        <div style={{ width: 36, height: 4, background: '#ddd', borderRadius: 2, margin: '-0.5rem auto 1rem' }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
          <h2 style={{ fontSize: 20, color: 'var(--verde)' }}>✏️ Editar alineación</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: 22, cursor: 'pointer', color: '#aaa' }}>✕</button>
        </div>

        <div className="form-group">
          <label className="label">Formación</label>
          <select className="select" value={formacion} onChange={e => setFormacion(e.target.value)}>
            {Object.entries(FORMACIONES).map(([k, v]) => (
              <option key={k} value={k}>{v.label}</option>
            ))}
          </select>
        </div>

        {slots.slice(0, total).map((jid, idx) => (
          <div key={idx} className="form-group">
            <label className="label">{labels[idx]}</label>
            <select className="select" value={jid || ''} onChange={e => setSlot(idx, e.target.value || null)}>
              <option value="">— Sin asignar —</option>
              {[...jugadores].sort((a, b) => a.dorsal - b.dorsal).map(j => (
                <option key={j.id} value={j.id}>#{j.dorsal} — {j.nombre}</option>
              ))}
            </select>
          </div>
        ))}

        <button onClick={save} className="btn btn-primary btn-block">Guardar alineación</button>
      </div>
    </>
  )
}

// ── Votación MVP ──
function VotacionMVP({ partido, jugadores, store }) {
  const jugadorActivo = adminAuth.getJugador()
  const [miVoto, setMiVoto] = useState(null)
  const [votando, setVotando] = useState(false)
  const [enviado, setEnviado] = useState(false)

  useEffect(() => {
    if (jugadorActivo) {
      store.getVotoMvp(partido.id, jugadorActivo.id).then(v => setMiVoto(v))
    }
  }, [partido.id, jugadorActivo])

  if (!jugadorActivo) return (
    <div style={{ textAlign: 'center', padding: '0.5rem', fontSize: 13, color: 'var(--gris-mid)' }}>
      Identifícate para votar al MVP
    </div>
  )

  if (enviado || miVoto) {
    const votado = jugadores.find(j => j.id === (enviado || miVoto))
    return (
      <div style={{ textAlign: 'center', padding: '0.5rem', fontSize: 13, color: 'var(--verde-mid)' }}>
        ✅ Has votado a <strong>{votado?.nombre || '—'}</strong>
      </div>
    )
  }

  if (votando) return (
    <div>
      <p style={{ fontSize: 13, color: 'var(--gris-mid)', marginBottom: 10 }}>
        Vota al mejor jugador del partido:
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {[...jugadores]
          .filter(j => j.id !== jugadorActivo.id)
          .sort((a, b) => a.nombre.localeCompare(b.nombre))
          .map(j => (
            <button key={j.id} onClick={async () => {
              haptics.success(); await store.votarMvp(partido.id, jugadorActivo.id, j.id)
              setMiVoto(j.id)
              setEnviado(j.id)
              setVotando(false)
            }} style={{
              display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px',
              background: '#f7f2f3', borderRadius: 10, border: '1.5px solid #e0e8e0',
              cursor: 'pointer', textAlign: 'left', fontSize: 14, fontWeight: 500
            }}>
              <Avatar jugador={j} size="sm" />
              <span>{j.nombre}</span>
              <span style={{ marginLeft: 'auto', fontSize: 12, color: 'var(--gris-mid)' }}>#{j.dorsal}</span>
            </button>
          ))}
        <button onClick={() => setVotando(false)} style={{ background: 'none', border: 'none', color: 'var(--gris-mid)', fontSize: 13, cursor: 'pointer', marginTop: 4 }}>Cancelar</button>
      </div>
    </div>
  )

  return (
    <button onClick={() => setVotando(true)} className="btn btn-ghost btn-block" style={{ marginTop: 4 }}>
      ⭐ Votar al MVP
    </button>
  )
}

// ── Página principal ──
export default function DetallePartido() {
  const { id } = useParams()
  const nav = useNavigate()
  const { partidos, jugadores, stats, store } = useStore()  // ← una sola llamada
  const [editandoAlin, setEditandoAlin] = useState(false)
  const isAdmin = adminAuth.isLogged()
  const [votos, setVotos] = useState([])
  const [miVoto, setMiVoto] = useState(null)
  const [alineacion, setAlineacion] = useState(null)
  const [alineacionCargada, setAlineacionCargada] = useState(false)
  const partido = partidos.find(p => p.id === Number(id))

  const jugadorActivo = adminAuth.isLogged() ? (() => {
    try { return JSON.parse(localStorage.getItem('tj_jugador_activo')) } catch { return null }
  })() : null

  useEffect(() => {
    if (!partido) return
    store.getVotosMvp(partido.id).then(v => {
      setVotos(v)
      if (jugadorActivo) {
        const miV = v.find(x => x.votante_id === jugadorActivo.id)
        if (miV) setMiVoto(miV.votado_id)
      }
    })
    store.getAlineacion(partido.id).then(a => {
      setAlineacion(a)
      setAlineacionCargada(true)
    })
  }, [partido?.id])

  if (!partido) return <div className="page anim-fade"><div className="empty">Partido no encontrado</div></div>

  const handleVotar = async (votado_id) => {
    if (!jugadorActivo) return
    await store.votarMvp(partido.id, jugadorActivo.id, votado_id)
    setMiVoto(votado_id)
    const nuevos = await store.getVotosMvp(partido.id)
    setVotos(nuevos)
  }

  const handleSaveAlineacion = async (formacion, jugadoresAlin) => {
    await store.saveAlineacion(partido.id, formacion, jugadoresAlin)
    setAlineacion({ formacion, jugadores: jugadoresAlin })
  }

  // Calcular MVP (el más votado)
  const mvpId = votos.length > 0 ? (() => {
    const conteo = {}
    votos.forEach(v => { conteo[v.votado_id] = (conteo[v.votado_id] || 0) + 1 })
    return Number(Object.entries(conteo).sort((a, b) => b[1] - a[1])[0][0])
  })() : null
  const mvpJugador = mvpId ? jugadores.find(j => j.id === mvpId) : null
  const esLocal = partido.local === EQUIPO_NOMBRE
  const statsPartido = stats.filter(s => s.partido_id === partido.id)
  const goleadores = statsPartido.filter(s => s.goles > 0).sort((a, b) => b.goles - a.goles)
  const asistentes = statsPartido.filter(s => s.asistencias > 0).sort((a, b) => b.asistencias - a.asistencias)
  const amarillas = statsPartido.filter(s => s.tarjetas_amarillas > 0)
  const rojas = statsPartido.filter(s => s.tarjetas_rojas > 0)
  const getJugador = jid => jugadores.find(j => j.id === jid)
  const nuestros = esLocal ? partido.goles_local : partido.goles_visitante
  const rivales = esLocal ? partido.goles_visitante : partido.goles_local
  const resultado = nuestros > rivales ? 'victoria' : nuestros < rivales ? 'derrota' : 'empate'
  const rival = esLocal ? partido.visitante : partido.local
  const mvp = partido.mvp_jugador_id ? jugadores.find(j => j.id === partido.mvp_jugador_id) : null

  return (
    <div className="page anim-fade">
      <button onClick={() => nav('/partidos')} style={{ background: 'none', border: 'none', color: 'var(--verde-mid)', fontSize: 14, cursor: 'pointer', fontWeight: 600, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 4, padding: 0 }}>
        ← Volver
      </button>

      {/* Cabecera */}
      <div style={{ background: 'linear-gradient(135deg,#0d0a0b,#5a1520)', borderRadius: 20, padding: '1.5rem', marginBottom: '1rem', textAlign: 'center' }}>
        <div style={{ fontSize: 11, color: '#6a3a42', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>
          {partido.amistoso ? 'Amistoso' : `Jornada ${partido.jornada}`} · {fmt(partido.fecha)}
        </div>
        <div style={{ fontSize: 13, color: '#e8a0b0', marginBottom: 12 }}>📍 {partido.campo}</div>
        {partido.jugado ? (
          <>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, marginBottom: 12 }}>
              <div style={{ flex: 1, textAlign: 'right' }}>
                <div style={{ fontSize: 13, color: esLocal ? '#e8a0b0' : '#aaa', fontWeight: esLocal ? 700 : 400 }}>{partido.local}</div>
              </div>
              <div style={{ fontFamily: 'Bebas Neue', fontSize: 48, color: 'white', letterSpacing: '0.05em', background: 'rgba(0,0,0,0.3)', padding: '4px 20px', borderRadius: 12 }}>
                {partido.goles_local}–{partido.goles_visitante}
              </div>
              <div style={{ flex: 1, textAlign: 'left' }}>
                <div style={{ fontSize: 13, color: !esLocal ? '#e8a0b0' : '#aaa', fontWeight: !esLocal ? 700 : 400 }}>{partido.visitante}</div>
              </div>
            </div>
            <span className={`tag-${resultado}`} style={{ fontSize: 14, padding: '4px 16px' }}>
              {resultado === 'victoria' ? '✓ Victoria' : resultado === 'derrota' ? '✗ Derrota' : '= Empate'}
            </span>
          </>
        ) : (
          <>
            <div style={{ fontFamily: 'Bebas Neue', fontSize: 28, color: 'white', marginBottom: 8 }}>vs. {rival}</div>
            <span style={{ background: 'rgba(255,255,255,0.1)', color: '#e8a0b0', padding: '4px 14px', borderRadius: 20, fontSize: 13 }}>Pendiente</span>
          </>
        )}
      </div>

      {partido.jugado && (
        <>
          {/* Alineación */}
          {partido.jugado && (
            <div className="card" style={{ marginBottom: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                <h2 style={{ fontSize: 18, color: 'var(--verde)' }}>👕 Alineación</h2>
                <span style={{ fontSize: 12, color: 'var(--gris-mid)' }}>{alineacion?.formacion || '1-3-2-1'}</span>
              </div>
              {alineacionCargada ? (
                <Alineacion
                  partido={partido}
                  jugadores={jugadores}
                  alineacionInicial={alineacion}
                  onSave={adminAuth.isLogged() ? handleSaveAlineacion : null}
                  modoEdicion={adminAuth.isLogged()}
                />
              ) : (
                <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--gris-mid)', fontSize: 13 }}>
                  Cargando alineación...
                </div>
              )}
            </div>
          )}

          {/* MVP */}
          <div className="card" style={{ marginBottom: '1rem' }}>
            <h2 style={{ fontSize: 18, color: 'var(--verde)', marginBottom: 12 }}>⭐ MVP del partido</h2>
            {mvp ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '8px 0', marginBottom: 12 }}>
                <div style={{ width: 48, height: 48, borderRadius: '50%', overflow: 'hidden', background: 'linear-gradient(135deg,#c8a800,#f0c040)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, fontWeight: 700, color: 'white', flexShrink: 0 }}>
                  {mvp.foto_url
                    ? <img src={mvp.foto_url} alt={mvp.nombre} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
                    : initials(mvp.nombre)
                  }
                </div>
                <div>
                  <div style={{ fontFamily: 'Bebas Neue', fontSize: 22, color: 'var(--negro)', lineHeight: 1 }}>{mvp.nombre}</div>
                  <div style={{ fontSize: 12, color: 'var(--gris-mid)' }}>{mvp.posicion} · #{mvp.dorsal}</div>
                </div>
                <div style={{ marginLeft: 'auto', fontSize: 28 }}>⭐</div>
              </div>
            ) : (
              <div style={{ color: 'var(--gris-mid)', fontSize: 13, textAlign: 'center', padding: '0.5rem 0', marginBottom: 8 }}>
                Sin MVP aún — sé el primero en votar
              </div>
            )}
            <VotacionMVP partido={partido} jugadores={jugadores} store={store} />
          </div>

          {/* Goleadores */}
          {goleadores.length > 0 && (
            <div className="card" style={{ marginBottom: '1rem' }}>
              <h2 style={{ fontSize: 18, color: 'var(--verde)', marginBottom: 12 }}>⚽ Goleadores</h2>
              {goleadores.map(s => {
                const j = getJugador(s.jugador_id); if (!j) return null
                return (
                  <div key={s.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderBottom: '1px solid #f5e8eb' }}>
                    <Avatar jugador={j} size="sm" />
                    <div style={{ flex: 1 }}><div style={{ fontSize: 14, fontWeight: 600 }}>{j.nombre}</div><div style={{ fontSize: 11, color: 'var(--gris-mid)' }}>#{j.dorsal} · {j.posicion}</div></div>
                    <div style={{ display: 'flex', gap: 4 }}>
                      {Array.from({ length: s.goles }).map((_, i) => <span key={i} style={{ fontSize: 18 }}>⚽</span>)}
                    </div>
                  </div>
                )
              })}
            </div>
          )}

          {/* Asistencias */}
          {asistentes.length > 0 && (
            <div className="card" style={{ marginBottom: '1rem' }}>
              <h2 style={{ fontSize: 18, color: 'var(--verde)', marginBottom: 12 }}>🅰️ Asistencias</h2>
              {asistentes.map(s => {
                const j = getJugador(s.jugador_id); if (!j) return null
                return (
                  <div key={s.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderBottom: '1px solid #f5e8eb' }}>
                    <Avatar jugador={j} size="sm" />
                    <div style={{ flex: 1 }}><div style={{ fontSize: 14, fontWeight: 600 }}>{j.nombre}</div></div>
                    <div style={{ fontFamily: 'Bebas Neue', fontSize: 22, color: 'var(--dorado)' }}>{s.asistencias}</div>
                  </div>
                )
              })}
            </div>
          )}

          {/* Disciplina */}
          {(amarillas.length > 0 || rojas.length > 0) && (
            <div className="card" style={{ marginBottom: '1rem' }}>
              <h2 style={{ fontSize: 18, color: 'var(--verde)', marginBottom: 12 }}>🟨 Disciplina</h2>
              {[...amarillas, ...rojas].map((s, idx) => {
                const j = getJugador(s.jugador_id); if (!j) return null
                return (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderBottom: '1px solid #f5e8eb' }}>
                    <Avatar jugador={j} size="sm" />
                    <div style={{ flex: 1 }}><div style={{ fontSize: 14, fontWeight: 600 }}>{j.nombre}</div></div>
                    <div style={{ display: 'flex', gap: 3 }}>
                      {Array.from({ length: s.tarjetas_amarillas }).map((_, i) => <span key={i} style={{ width: 14, height: 18, background: '#f0c040', borderRadius: 2, display: 'inline-block' }} />)}
                      {s.tarjetas_rojas > 0 && <span style={{ width: 14, height: 18, background: '#c0392b', borderRadius: 2, display: 'inline-block' }} />}
                    </div>
                  </div>
                )
              })}
            </div>
          )}

          {/* Ficha completa */}
          {statsPartido.length > 0 && (
            <div className="card" style={{ marginBottom: '1rem' }}>
              <h2 style={{ fontSize: 18, color: 'var(--verde)', marginBottom: 12 }}>📋 Ficha completa</h2>
              <div style={{ overflowX: 'auto' }}>
                <table>
                  <thead><tr><th>Jugador</th><th style={{ textAlign: 'center' }}>⚽</th><th style={{ textAlign: 'center' }}>🅰️</th><th style={{ textAlign: 'center' }}>🟨</th><th style={{ textAlign: 'center' }}>🟥</th></tr></thead>
                  <tbody>
                    {statsPartido.map(s => {
                      const j = getJugador(s.jugador_id); if (!j) return null
                      return (
                        <tr key={s.id}>
                          <td><div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><Avatar jugador={j} size="sm" /><span style={{ fontSize: 13, fontWeight: 600 }}>{j.nombre}</span></div></td>
                          <td style={{ textAlign: 'center', fontWeight: 700, color: s.goles > 0 ? 'var(--verde)' : '#ccc' }}>{s.goles || '—'}</td>
                          <td style={{ textAlign: 'center', fontWeight: 700, color: s.asistencias > 0 ? 'var(--dorado)' : '#ccc' }}>{s.asistencias || '—'}</td>
                          <td style={{ textAlign: 'center' }}>{s.tarjetas_amarillas > 0 ? <span style={{ display: 'inline-block', width: 10, height: 14, background: '#f0c040', borderRadius: 2 }} /> : '—'}</td>
                          <td style={{ textAlign: 'center' }}>{s.tarjetas_rojas > 0 ? <span style={{ display: 'inline-block', width: 10, height: 14, background: '#c0392b', borderRadius: 2 }} /> : '—'}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      )}

      {!partido.jugado && (
        <div className="card"><div className="empty">El partido aún no se ha jugado.</div></div>
      )}

      {/* MVP y votación */}
      {partido.jugado && statsPartido.length > 0 && (
        <div className="card" style={{ marginBottom: '1rem' }}>
          <h2 style={{ fontSize: 18, color: 'var(--verde)', marginBottom: 14 }}>⭐ MVP del partido</h2>

          {/* MVP actual */}
          {mvpJugador && (
            <div style={{ background: 'linear-gradient(135deg,#0d0a0b,#5a1520)', borderRadius: 12, padding: '12px 16px', marginBottom: 14, display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ fontSize: 28 }}>⭐</div>
              <div>
                <div style={{ fontSize: 11, color: '#e8a0b0', textTransform: 'uppercase', letterSpacing: '0.08em' }}>MVP — {votos.length} voto{votos.length !== 1 ? 's' : ''}</div>
                <div style={{ fontFamily: 'Bebas Neue', fontSize: 22, color: 'white' }}>{mvpJugador.nombre}</div>
              </div>
            </div>
          )}

          {/* Votar */}
          {jugadorActivo && !miVoto && (
            <div>
              <div style={{ fontSize: 13, color: 'var(--gris-mid)', marginBottom: 10 }}>Vota al mejor del partido:</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {statsPartido.map(s => {
                  const j = jugadores.find(x => x.id === s.jugador_id)
                  if (!j || j.id === jugadorActivo.id) return null
                  return (
                    <button key={s.id} onClick={() => handleVotar(j.id)} style={{
                      display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px',
                      background: 'white', border: '1.5px solid #c8aab2', borderRadius: 10,
                      cursor: 'pointer', textAlign: 'left', width: '100%'
                    }}>
                      <Avatar jugador={j} size="sm" />
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 14, fontWeight: 600 }}>{j.nombre}</div>
                        <div style={{ fontSize: 11, color: 'var(--gris-mid)' }}>⚽{s.goles} 🅰️{s.asistencias}</div>
                      </div>
                      <span style={{ fontSize: 18 }}>›</span>
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          {jugadorActivo && miVoto && (
            <div style={{ background: 'var(--verde-pale)', borderRadius: 10, padding: '10px 14px', fontSize: 13, color: 'var(--verde)' }}>
              ✓ Ya has votado a <strong>{jugadores.find(j => j.id === miVoto)?.nombre}</strong>
            </div>
          )}

          {!jugadorActivo && (
            <div style={{ fontSize: 13, color: 'var(--gris-mid)', textAlign: 'center', padding: '0.5rem 0' }}>
              Identifícate como jugador para votar al MVP
            </div>
          )}
        </div>
      )}

      {isAdmin && (
        <button onClick={() => nav('/admin')} className="btn btn-ghost btn-block" style={{ marginTop: '0.5rem' }}>
          ✏️ Editar este partido
        </button>
      )}
    </div>
  )
}