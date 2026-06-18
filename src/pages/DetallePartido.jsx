import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useStore } from '../hooks/useStore'
import { adminAuth } from '../lib/adminAuth'
import { EQUIPO_NOMBRE } from '../lib/mockData'
import { haptics } from '../lib/haptics'
import Alineacion from '../components/Alineacion'
import { enviarNotificacionResultado } from '../lib/push'

function fmt(str) { return new Date(str).toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }) }
const posOrder = { Portero: 0, Defensa: 1, Centrocampista: 2, Delantero: 3 }
const byPos = (a, b) => (posOrder[a.posicion] ?? 99) - (posOrder[b.posicion] ?? 99)
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
      <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 500, background: 'white', borderRadius: '20px 20px 0 0', padding: '1.5rem', paddingBottom: 'calc(5rem + env(safe-area-inset-bottom))', maxHeight: '85vh', overflowY: 'scroll', overflowX: 'hidden', WebkitOverflowScrolling: 'touch', overscrollBehavior: 'contain', boxShadow: '0 -4px 30px rgba(0,0,0,0.2)', animation: 'slideUpModal 0.3s cubic-bezier(0.32,0.72,0,1)' }}>
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


// ── Página principal ──
export default function DetallePartido() {
  const { id } = useParams()
  const nav = useNavigate()
  const { partidos, jugadores, stats, store } = useStore()
  const [editandoAlin, setEditandoAlin] = useState(false)
  const [editandoPartido, setEditandoPartido] = useState(false)

  // Nuevo estado para la convocatoria
  const [editandoConvocatoria, setEditandoConvocatoria] = useState(false)
  const [formConvocados, setFormConvocados] = useState([])

  const [formPartido, setFormPartido] = useState(null)
  const [escudoRivalFile, setEscudoRivalFile] = useState(null)
  const [escudoRivalPreview, setEscudoRivalPreview] = useState(null)
  const [subiendoEscudo, setSubiendoEscudo] = useState(false)
  const isAdmin = adminAuth.isLogged()
  const [votos, setVotos] = useState([])
  const [miVoto, setMiVoto] = useState(null)
  const [alineacion, setAlineacion] = useState(null)
  const [alineacionCargada, setAlineacionCargada] = useState(false)

  const partido = partidos.find(p => p.id === Number(id))
  const [errorValidacion, setErrorValidacion] = useState(null)


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

  const handleEliminarVoto = async () => {
    if (!jugadorActivo) return;

    // 1. Eliminamos el voto visualmente al instante
    setMiVoto(null);

    // 2. Eliminamos el registro real de la tabla 'votos_mvp'
    if (store.eliminarVotoMvp) {
      await store.eliminarVotoMvp(partido.id, jugadorActivo.id);
    }

    // 3. Volvemos a pedir los votos a la base de datos para que el contador general baje
    const nuevos = await store.getVotosMvp(partido.id);
    setVotos(nuevos);
  };

  const handleSaveAlineacion = async (formacion, jugadoresAlin) => {
    await store.saveAlineacion(partido.id, formacion, jugadoresAlin)
    setAlineacion({ formacion, jugadores: jugadoresAlin })
  }

  // --- Lógica de Jugadores, Convocados y Suplentes ---
  const getJugador = jid => jugadores.find(j => j.id === jid)

  const convocadosIds = partido.convocados || []
  const convocados = convocadosIds.map(getJugador).filter(Boolean)

  // 1. Obtenemos el array de los huecos (slots) de la alineación
  const arrayTitulares = alineacion?.jugadores || partido.alineacion || []

  // 2. Extraemos específicamente el "jugador_id" de cada slot
  const titularesIds = arrayTitulares
    .map(slot => slot?.jugador_id) // Saca el ID del objeto { linea, posicion, jugador_id }
    .filter(id => id != null)      // Limpia las posiciones que estén vacías
    .map(String)                   // Los convierte a texto para una comparación segura

  // 3. Los suplentes son los convocados que NO están en la lista de titulares exactos
  const suplentesIds = convocadosIds.filter(id => !titularesIds.includes(String(id)))
  const suplentes = suplentesIds.map(getJugador).filter(Boolean)

  // Calcular ranking de MVP y sus votos
  let rankingVotos = [];
  let mvpId = null; // Lo mantenemos para que la camiseta del campo siga brillando

  if (votos.length > 0) {
    const conteo = {};
    votos.forEach(v => { conteo[v.votado_id] = (conteo[v.votado_id] || 0) + 1 });

    // Ordenamos de mayor a menor número de votos
    const ranking = Object.entries(conteo).sort((a, b) => b[1] - a[1]);

    mvpId = Number(ranking[0][0]); // El primero de la lista es el MVP principal

    // Creamos un array con la información de todos los jugadores votados
    rankingVotos = ranking.map(([id, numVotos]) => ({
      id: Number(id),
      votos: numVotos,
      jugador: jugadores.find(j => j.id === Number(id))
    })).filter(item => item.jugador);
  }

  const esLocal = partido.local === EQUIPO_NOMBRE
  const statsPartido = stats.filter(s => s.partido_id === partido.id)
  const idsVotables = [...new Set([...convocadosIds, ...statsPartido.map(s => s.jugador_id)])];
  const jugadoresVotables = jugadores.filter(j => idsVotables.includes(j.id)).sort(byPos);;
  const goleadores = statsPartido.filter(s => s.goles > 0).sort((a, b) => b.goles - a.goles)
  const asistentes = statsPartido.filter(s => s.asistencias > 0).sort((a, b) => b.asistencias - a.asistencias)
  const amarillas = statsPartido.filter(s => s.tarjetas_amarillas > 0)
  const rojas = statsPartido.filter(s => s.tarjetas_rojas > 0)
  const nuestros = esLocal ? partido.goles_local : partido.goles_visitante
  const rivales = esLocal ? partido.goles_visitante : partido.goles_local
  const resultado = nuestros > rivales ? 'victoria' : nuestros < rivales ? 'derrota' : 'empate'
  const rival = esLocal ? partido.visitante : partido.local

  return (
    <div className="page anim-fade">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
        <button onClick={() => nav('/partidos')} style={{ background: 'none', border: 'none', color: 'var(--verde-mid)', fontSize: 14, cursor: 'pointer', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4, padding: 0 }}>
          ← Volver
        </button>
        {isAdmin && (
          <div style={{ display: 'flex', gap: 8 }}>
            {/* El botón de Stats solo aparece si además el partido ya se jugó */}
            {partido.jugado && (
              <button
                onClick={() => nav('/admin?tab=stats&partido=' + partido.id)}
                style={{ background: 'var(--verde)', color: 'white', border: 'none', borderRadius: 10, padding: '7px 12px', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}
              >
                📊 Stats
              </button>
            )}

            {/* El botón de Editar aparece siempre que seas admin */}
            <button
              onClick={() => {
                setFormPartido({
                  jornada: partido.jornada,
                  fecha: partido.fecha,
                  hora: partido.hora || '',
                  local: partido.local,
                  visitante: partido.visitante,
                  campo: partido.campo,
                  jugado: partido.jugado,
                  goles_local: partido.goles_local,
                  goles_visitante: partido.goles_visitante,
                  amistoso: partido.amistoso || false,
                  escudo_rival_url: partido.escudo_rival_url || null,
                })
                setEscudoRivalFile(null)
                setEscudoRivalPreview(partido.escudo_rival_url || null)
                setEditandoPartido(true)
              }}
              style={{ background: 'none', border: '1.5px solid #c8aab2', borderRadius: 10, padding: '7px 12px', fontSize: 12, fontWeight: 700, cursor: 'pointer', color: 'var(--verde)' }}
            >
              ✏️ Editar
            </button>
          </div>
        )}
      </div>

      {/* Cabecera */}
      <div style={{ background: 'linear-gradient(135deg,#0d0a0b,#5a1520)', borderRadius: 20, padding: '1.5rem', marginBottom: '1rem', textAlign: 'center' }}>
        <div style={{ fontSize: 11, color: '#e8a0b0', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>
          {partido.amistoso ? 'Amistoso' : `Jornada ${partido.jornada}`} · {fmt(partido.fecha)}
        </div>
        <div style={{ fontSize: 13, color: '#e8a0b0', marginBottom: 12 }}>📍 {partido.campo}</div>
        {partido.jugado ? (
          <>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, marginBottom: 12 }}>
              <div style={{ flex: 1, textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }}>
                <img src="/escudo.png" alt="Tejera" style={{ width: 40, height: 40, objectFit: 'contain' }} />
                <div style={{ fontSize: 13, color: esLocal ? '#e8a0b0' : '#aaa', fontWeight: esLocal ? 700 : 400 }}>{partido.local}</div>
              </div>
              <div style={{ fontFamily: 'Bebas Neue', fontSize: 48, color: 'white', letterSpacing: '0.05em', background: 'rgba(0,0,0,0.3)', padding: '4px 20px', borderRadius: 12 }}>
                {partido.goles_local}–{partido.goles_visitante}
              </div>
              <div style={{ flex: 1, textAlign: 'left', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 4 }}>
                {partido.escudo_rival_url ? (
                  <img src={partido.escudo_rival_url} alt={rival} style={{ width: 52, height: 52, objectFit: 'contain' }} />
                ) : (
                  <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(255,255,255,0.08)', border: '2px solid rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontFamily: 'Bebas Neue', fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>{rival ? rival.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase() : '?'}</span>
                  </div>
                )}
                <div style={{ fontSize: 13, color: !esLocal ? '#e8a0b0' : '#aaa', fontWeight: !esLocal ? 700 : 400 }}>{partido.visitante}</div>
              </div>
            </div>
            <span className={`tag-${resultado}`} style={{ fontSize: 14, padding: '4px 16px' }}>
              {resultado === 'victoria' ? '✓ Victoria' : resultado === 'derrota' ? '✗ Derrota' : '= Empate'}
            </span>
          </>
        ) : (
          <>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14, marginBottom: 8 }}>
              <img src="/escudo.png" alt="Tejera" style={{ width: 44, height: 44, objectFit: 'contain' }} />
              <div style={{ fontFamily: 'Bebas Neue', fontSize: 28, color: 'white' }}>vs.</div>
              {partido.escudo_rival_url ? (
                <img src={partido.escudo_rival_url} alt={rival} style={{ width: 44, height: 44, objectFit: 'contain' }} />
              ) : (
                <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'rgba(255,255,255,0.08)', border: '2px solid rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontFamily: 'Bebas Neue', fontSize: 15, color: 'rgba(255,255,255,0.4)' }}>{rival ? rival.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase() : '?'}</span>
                </div>
              )}
            </div>
            <div style={{ fontFamily: 'Bebas Neue', fontSize: 22, color: 'white', marginBottom: 8 }}>{rival}</div>
            <span style={{ background: 'rgba(255,255,255,0.1)', color: '#e8a0b0', padding: '4px 14px', borderRadius: 20, fontSize: 13 }}>Pendiente</span>
          </>
        )}
      </div>

      {partido.jugado && (
        <>
          {/* Alineación */}
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

            {/* Suplentes */}
            {(suplentes.length > 0 || isAdmin) && (
              <div style={{ marginTop: 24, borderTop: '1px solid #f5e8eb', paddingTop: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                  <h3 style={{ fontSize: 15, color: 'var(--gris-dark)', margin: 0 }}>🔄 Suplentes</h3>

                  {/* Botón de editar (Solo para admins) */}
                  {isAdmin && (
                    <button
                      onClick={() => { setFormConvocados(partido.convocados || []); setEditandoConvocatoria(true) }}
                      style={{ background: 'var(--verde-pale)', border: 'none', padding: '6px 12px', borderRadius: 8, fontSize: 12, color: 'var(--verde)', fontWeight: 600, cursor: 'pointer' }}
                    >
                      ✏️ Editar
                    </button>
                  )}
                </div>

                {suplentes.length > 0 ? (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                    {[...suplentes].sort(byPos).map(j => (
                      <div key={j.id} style={{ display: 'flex', alignItems: 'center', gap: 6, background: '#fcf8f9', border: '1px solid #f5e8eb', padding: '4px 12px 4px 4px', borderRadius: 24 }}>
                        <Avatar jugador={j} size="sm" />
                        <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--gris-dark)' }}>{j.nombre}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div style={{ fontSize: 13, color: 'var(--gris-mid)' }}>
                    No hay suplentes.
                  </div>
                )}
              </div>
            )}
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
                    <div style={{ fontFamily: 'Bebas Neue', fontSize: 22, color: 'var(--verde)' }}>{s.asistencias}</div>
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
          {(() => {
            // Filtramos a los jugadores que tengan al menos una estadística > 0
            const statsDestacadas = statsPartido.filter(s =>
              s.goles > 0 ||
              s.asistencias > 0 ||
              s.tarjetas_amarillas > 0 ||
              s.tarjetas_rojas > 0
            );

            // Si hay jugadores con estadísticas, mostramos la tabla
            if (statsDestacadas.length > 0) {
              return (
                <div className="card" style={{ marginBottom: '1rem' }}>
                  <h2 style={{ fontSize: 18, color: 'var(--verde)', marginBottom: 12 }}>📋 Ficha completa</h2>
                  <div style={{ overflowX: 'auto' }}>
                    <table>
                      <thead><tr><th>Jugador</th><th style={{ textAlign: 'center' }}>⚽</th><th style={{ textAlign: 'center' }}>🅰️</th><th style={{ textAlign: 'center' }}>🟨</th><th style={{ textAlign: 'center' }}>🟥</th></tr></thead>
                      <tbody>
                        {statsDestacadas.map(s => {
                          const j = getJugador(s.jugador_id); if (!j) return null
                          return (
                            <tr key={s.id}>
                              <td><div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><Avatar jugador={j} size="sm" /><span style={{ fontSize: 13, fontWeight: 600 }}>{j.nombre}</span></div></td>
                              <td style={{ textAlign: 'center', fontWeight: 700, color: s.goles > 0 ? 'var(--verde)' : '#ccc' }}>{s.goles || '—'}</td>
                              <td style={{ textAlign: 'center', fontWeight: 700, color: s.asistencias > 0 ? 'var(--verde)' : '#ccc' }}>{s.asistencias || '—'}</td>
                              <td style={{ textAlign: 'center' }}>{s.tarjetas_amarillas > 0 ? <span style={{ display: 'inline-block', width: 10, height: 14, background: '#f0c040', borderRadius: 2 }} /> : '—'}</td>
                              <td style={{ textAlign: 'center' }}>{s.tarjetas_rojas > 0 ? <span style={{ display: 'inline-block', width: 10, height: 14, background: '#c0392b', borderRadius: 2 }} /> : '—'}</td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              );
            }
            return null; // Si nadie tiene stats, no renderiza la tabla
          })()}
        </>
      )}

      {/* Lista de Convocados (Si NO se ha jugado) */}
      {!partido.jugado && (
        <div className="card" style={{ marginBottom: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
            <h2 style={{ fontSize: 18, color: 'var(--verde)' }}>📋 Convocatoria</h2>
            {isAdmin && (
              <button
                onClick={() => { setFormConvocados(partido.convocados || []); setEditandoConvocatoria(true) }}
                style={{ background: 'var(--verde-pale)', border: 'none', padding: '6px 12px', borderRadius: 8, fontSize: 12, color: 'var(--verde)', fontWeight: 600, cursor: 'pointer' }}
              >
                ✏️ Editar
              </button>
            )}
          </div>
          {convocados.length > 0 ? (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 4 }}>
              {[...convocados].sort(byPos).map(j => (
                <div key={j.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderBottom: '1px solid #f5e8eb' }}>
                  <Avatar jugador={j} size="sm" />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 600 }}>{j.nombre}</div>
                    <div style={{ fontSize: 11, color: 'var(--gris-mid)' }}>#{j.dorsal} · {j.posicion}</div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty">Aún no hay jugadores convocados.</div>
          )}
        </div>
      )}

      {/* MVP y votación */}
      {partido.jugado && (
        <div className="card" style={{ marginBottom: '1rem' }}>
          <h2 style={{ fontSize: 18, color: 'var(--verde)', marginBottom: 14 }}>⭐ MVP del partido</h2>

          {/* Ranking de votos */}
          {rankingVotos.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 14 }}>
              {rankingVotos.map((item, index) => {
                const j = item.jugador;
                const esGanador = index === 0; // El primero es el MVP real

                return (
                  <div key={j.id} style={{
                    background: esGanador ? 'linear-gradient(135deg,#0d0a0b,#5a1520)' : 'white',
                    border: esGanador ? 'none' : '1px solid #f5e8eb',
                    borderRadius: 12,
                    padding: esGanador ? '12px 16px' : '8px 12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12
                  }}>
                    <div style={{
                      width: esGanador ? 48 : 36,
                      height: esGanador ? 48 : 36,
                      borderRadius: '50%',
                      overflow: 'hidden',
                      background: esGanador ? 'linear-gradient(135deg,#c8a800,#f0c040)' : '#f5e8eb',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: esGanador ? 18 : 14,
                      fontWeight: 700,
                      color: esGanador ? 'white' : 'var(--gris-dark)',
                      flexShrink: 0
                    }}>
                      {j.foto_url
                        ? <img src={j.foto_url} alt={j.nombre} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
                        : initials(j.nombre)
                      }
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 11, color: esGanador ? '#e8a0b0' : 'var(--gris-mid)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                        {esGanador ? 'MVP — ' : ''}{item.votos} voto{item.votos !== 1 ? 's' : ''}
                      </div>
                      <div style={{ fontFamily: 'Bebas Neue', fontSize: esGanador ? 22 : 18, color: esGanador ? 'white' : 'var(--negro)', lineHeight: 1.1 }}>
                        {j.nombre}
                      </div>
                      {esGanador && <div style={{ fontSize: 11, color: '#6a3a42' }}>{j.posicion} · #{j.dorsal}</div>}
                    </div>
                    {esGanador && <div style={{ fontSize: 28 }}>⭐</div>}
                  </div>
                );
              })}
            </div>
          ) : (
            <div style={{ color: 'var(--gris-mid)', fontSize: 13, textAlign: 'center', padding: '0.5rem 0', marginBottom: 12 }}>
              Sin votos aún — sé el primero
            </div>
          )}

          {/* Votación */}
          {jugadorActivo && !miVoto && jugadoresVotables.length > 0 && (
            <div>
              <div style={{ fontSize: 13, color: 'var(--gris-mid)', marginBottom: 10 }}>Vota al mejor del partido:</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                {jugadoresVotables.map(j => {
                  // Evitamos que el jugador se vote a sí mismo
                  if (j.id === jugadorActivo.id) return null;

                  // Buscamos sus stats reales, o inventamos unas a 0 si no tiene
                  const s = statsPartido.find(stat => stat.jugador_id === j.id) || { goles: 0, asistencias: 0 };

                  return (
                    <button key={j.id} onClick={() => { if (typeof haptics !== 'undefined' && haptics.light) haptics.light(); handleVotar(j.id) }} style={{
                      display: 'flex', alignItems: 'center', gap: 8, padding: '8px 10px',
                      background: 'white', border: '1.5px solid #c8aab2', borderRadius: 10,
                      cursor: 'pointer', textAlign: 'left', width: '100%', boxSizing: 'border-box'
                    }}>
                      <Avatar jugador={j} size="sm" />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 13, fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{j.nombre}</div>
                        <div style={{ fontSize: 11, color: 'var(--gris-mid)' }}>⚽{s.goles} 🅰️{s.asistencias}</div>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          {jugadorActivo && miVoto && (
            <div style={{
              background: 'var(--verde-pale)',
              borderRadius: 10,
              padding: '10px 14px',
              fontSize: 13,
              color: 'var(--verde)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <span>✓ Ya has votado a <strong>{jugadores.find(j => j.id === miVoto)?.nombre}</strong></span>

              <button
                onClick={handleEliminarVoto}
                style={{
                  background: 'white',
                  border: '1.5px solid var(--verde)',
                  borderRadius: 8,
                  padding: '4px 10px',
                  fontSize: 11,
                  color: 'var(--verde)',
                  cursor: 'pointer',
                  fontWeight: 600
                }}
              >
                ✏️ Editar
              </button>
            </div>
          )}

          {!jugadorActivo && (
            <div style={{ fontSize: 13, color: 'var(--gris-mid)', textAlign: 'center', padding: '0.5rem 0' }}>
              Identifícate como jugador para votar al MVP
            </div>
          )}
        </div>
      )}

      {/* Modal Editar Convocatoria */}
      {editandoConvocatoria && (
        <>
          <div onClick={() => setEditandoConvocatoria(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.55)', zIndex: 400 }} />
          <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 500, background: 'white', borderRadius: '20px 20px 0 0', padding: '1.5rem', paddingBottom: 'calc(5rem + env(safe-area-inset-bottom))', maxHeight: '85vh', overflowY: 'scroll', overflowX: 'hidden', WebkitOverflowScrolling: 'touch', overscrollBehavior: 'contain', boxShadow: '0 -4px 30px rgba(0,0,0,0.2)', animation: 'slideUpModal 0.3s cubic-bezier(0.32,0.72,0,1)' }}>
            <div style={{ width: 36, height: 4, background: '#ddd', borderRadius: 2, margin: '-0.5rem auto 1rem' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h2 style={{ fontSize: 22, color: 'var(--verde)', fontFamily: 'Bebas Neue' }}>Convocatoria</h2>
              <button onClick={() => setEditandoConvocatoria(false)} style={{ background: 'none', border: 'none', fontSize: 22, cursor: 'pointer', color: '#aaa' }}>✕</button>
            </div>

            <div style={{ fontSize: 13, color: 'var(--gris-dark)', marginBottom: 16 }}>
              Selecciona los jugadores que están disponibles para este partido.
            </div>
            <button
              type="button"
              onClick={() => {
                // Si ya están todos seleccionados, vaciamos, si no, seleccionamos todos
                if (formConvocados.length === jugadores.length) {
                  setFormConvocados([]);
                } else {
                  setFormConvocados(jugadores.map(j => j.id));
                }
              }}
              style={{
                background: 'none',
                border: '1px solid var(--verde)',
                color: 'var(--verde)',
                padding: '8px',
                borderRadius: 8,
                fontSize: 13,
                fontWeight: 600,
                cursor: 'pointer',
                marginBottom: 10
              }}
            >
              {formConvocados.length === jugadores.length ? '❌ Deseleccionar todos' : '✅ Seleccionar todos'}
            </button>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
              {[...jugadores].sort(byPos).map(j => {
                const checked = formConvocados.includes(j.id)
                return (
                  <label key={j.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '8px 12px', background: checked ? 'var(--verde-pale)' : '#f9f9f9', border: `1px solid ${checked ? 'var(--verde)' : '#eee'}`, borderRadius: 12, cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={(e) => {
                        if (e.target.checked) setFormConvocados(prev => [...prev, j.id])
                        else setFormConvocados(prev => prev.filter(id => id !== j.id))
                      }}
                      style={{ width: 18, height: 18, accentColor: 'var(--verde)' }}
                    />
                    <Avatar jugador={j} size="sm" />
                    <div style={{ flex: 1, fontSize: 14, fontWeight: 600, color: 'var(--gris-dark)' }}>{j.nombre}</div>
                    <div style={{ fontSize: 12, color: 'var(--gris-mid)' }}>#{j.dorsal}</div>
                  </label>
                )
              })}
            </div>

            <button
              onClick={async () => {
                try {
                  // 1. Guardamos la nueva lista de convocados
                  await store.updateConvocados(partido.id, formConvocados);

                  // --- 2. NUEVA LÓGICA: Limpiar alineación titular ---
                  let alineacionModificada = false;

                  // A. Revisamos la alineación principal del partido (Array de IDs: [1, 4, null, 12...])
                  let nuevaAlineacion = partido.alineacion;
                  if (Array.isArray(partido.alineacion)) {
                    nuevaAlineacion = partido.alineacion.map(jid => {
                      // Si la posición no está vacía Y el jugador NO está en los nuevos convocados
                      if (jid && !formConvocados.includes(Number(jid))) {
                        alineacionModificada = true;
                        return null; // Lo sacamos del campo, dejando el hueco vacío
                      }
                      return jid;
                    });
                  }

                  // Si se ha eliminado a alguien, guardamos la alineación limpia
                  if (alineacionModificada) {
                    await store.updatePartido(partido.id, {
                      ...partido,
                      alineacion: nuevaAlineacion
                    });

                    // B. Si usas la tabla externa extendida de alineaciones, la sincronizamos también
                    if (alineacion?.jugadores) {
                      const jugLimpios = alineacion.jugadores.map(slot => {
                        const id = typeof slot === 'object' ? slot.jugador_id : slot;
                        if (id && !formConvocados.includes(Number(id))) {
                          return typeof slot === 'object' ? { ...slot, jugador_id: null } : null;
                        }
                        return slot;
                      });
                      await store.saveAlineacion(partido.id, alineacion.formacion || '1-3-2-1', jugLimpios);
                    }
                  }
                  // ---------------------------------------------------

                  // 3. Cerramos el modal
                  setEditandoConvocatoria(false);

                  // 4. Forzamos la recarga para que la app lea los datos actualizados
                  window.location.reload();
                } catch (error) {
                  console.error('Error al guardar la convocatoria:', error);
                  alert('Hubo un error al guardar. Revisa la consola (F12).');
                }
              }}
              className="btn btn-primary btn-block"
            >
              Guardar Convocatoria ({formConvocados.length})
            </button>
          </div>
        </>
      )}

      {/* Modal editar partido */}
      {editandoPartido && formPartido && (
        <>
          <div onClick={() => setEditandoPartido(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.55)', zIndex: 400 }} />
          <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 500, background: 'white', borderRadius: '20px 20px 0 0', padding: '1.5rem', paddingBottom: 'calc(5rem + env(safe-area-inset-bottom))', maxHeight: '85vh', overflowY: 'scroll', overflowX: 'hidden', WebkitOverflowScrolling: 'touch', overscrollBehavior: 'contain', boxShadow: '0 -4px 30px rgba(0,0,0,0.2)', animation: 'slideUpModal 0.3s cubic-bezier(0.32,0.72,0,1)' }}>
            <div style={{ width: 36, height: 4, background: '#ddd', borderRadius: 2, margin: '-0.5rem auto 1rem' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h2 style={{ fontSize: 22, color: 'var(--verde)', fontFamily: 'Bebas Neue' }}>Editar partido</h2>
              <button onClick={() => setEditandoPartido(false)} style={{ background: 'none', border: 'none', fontSize: 22, cursor: 'pointer', color: '#aaa' }}>✕</button>
            </div>

            {/* Jornada */}
            <div className="form-group">
              <label className="label">Jornada</label>
              <input
                className="input"
                type="number"
                value={formPartido.amistoso ? '' : formPartido.jornada}
                onChange={e => { setFormPartido(f => ({ ...f, jornada: e.target.value })); setErrorValidacion(null); }}
                placeholder={formPartido.amistoso ? 'No aplica (amistoso)' : 'Nº jornada'}
                disabled={formPartido.amistoso}
                style={{ opacity: formPartido.amistoso ? 0.5 : 1 }}
              />
            </div>

            {/* Fecha y hora */}
            <div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <label className="label">Fecha</label>
                <input className="input" type="date" value={formPartido.fecha} onChange={e => { setFormPartido(f => ({ ...f, fecha: e.target.value })); setErrorValidacion(null); }} style={{ width: '100%', minWidth: 0, boxSizing: 'border-box' }} />
              </div>
              <div style={{ flex: '0 0 110px', minWidth: 0 }}>
                <label className="label">Hora</label>
                <input className="input" type="time" value={formPartido.hora} onChange={e => { setFormPartido(f => ({ ...f, hora: e.target.value })); setErrorValidacion(null); }} style={{ width: '100%', minWidth: 0, boxSizing: 'border-box' }} />
              </div>
            </div>

            {/* Local / Visitante / Campo */}
            <div className="form-group"><label className="label">Equipo local</label><input className="input" value={formPartido.local} disabled /></div>
            <div className="form-group"><label className="label">Equipo visitante</label><input className="input" value={formPartido.visitante} onChange={e => { setFormPartido(f => ({ ...f, visitante: e.target.value })); setErrorValidacion(null); }} /></div>

            {/* Escudo rival */}
            <div className="form-group">
              <label className="label">Escudo del rival <span style={{ fontWeight: 400, color: 'var(--gris-mid)', fontSize: 11 }}>(opcional)</span></label>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                {escudoRivalPreview ? (
                  <div style={{ position: 'relative', flexShrink: 0 }}>
                    <img src={escudoRivalPreview} alt="Escudo rival" style={{ width: 52, height: 52, borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--verde-pale)' }} />
                    <button type="button" onClick={() => { setEscudoRivalFile(null); setEscudoRivalPreview(null); setFormPartido(f => ({ ...f, escudo_rival_url: null })) }} style={{ position: 'absolute', top: -6, right: -6, width: 20, height: 20, borderRadius: '50%', background: '#c0392b', border: 'none', color: 'white', fontSize: 12, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', lineHeight: 1 }}>✕</button>
                  </div>
                ) : (
                  <div style={{ width: 52, height: 52, borderRadius: '50%', background: '#f5e8eb', border: '2px dashed #c8aab2', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>🛡️</div>
                )}
                <label style={{ flex: 1, background: 'var(--verde-pale)', border: '1.5px solid #c8aab2', borderRadius: 10, padding: '10px 14px', fontSize: 13, color: 'var(--verde)', fontWeight: 600, cursor: 'pointer', textAlign: 'center' }}>
                  {escudoRivalPreview ? '📷 Cambiar escudo' : '📷 Subir escudo'}
                  <input type="file" accept="image/*" onChange={e => { const file = e.target.files?.[0]; if (!file) return; setEscudoRivalFile(file); setEscudoRivalPreview(URL.createObjectURL(file)) }} style={{ display: 'none' }} />
                </label>
              </div>
            </div>

            <div className="form-group"><label className="label">Campo</label><input className="input" value={formPartido.campo} onChange={e => { setFormPartido(f => ({ ...f, campo: e.target.value })); setErrorValidacion(null); }} /></div>

            {/* Amistoso */}
            <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <input type="checkbox" id="amistoso-detalle" checked={formPartido.amistoso} onChange={e => setFormPartido(f => ({ ...f, amistoso: e.target.checked }))} style={{ width: 18, height: 18, accentColor: 'var(--dorado)' }} />
              <label htmlFor="amistoso-detalle" className="label" style={{ margin: 0 }}>
                Partido amistoso <span style={{ fontSize: 11, color: 'var(--gris-mid)', fontWeight: 400 }}>(stats no computan en clasificación)</span>
              </label>
            </div>

            {/* Jugado — auto-calculado */}
            {(() => {
              const fechaHoraStr = formPartido.hora ? `${formPartido.fecha}T${formPartido.hora}:00` : `${formPartido.fecha}T23:59:00`
              const esFuturo = formPartido.fecha && new Date(fechaHoraStr) > new Date()
              const autoJugado = formPartido.fecha && new Date(fechaHoraStr) < new Date()
              return (
                <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: 10, opacity: esFuturo ? 0.4 : 1 }}>
                  <input type="checkbox" id="jugado-detalle" checked={formPartido.jugado} onChange={e => !esFuturo && setFormPartido(f => ({ ...f, jugado: e.target.checked }))} disabled={esFuturo} style={{ width: 18, height: 18, accentColor: 'var(--verde)' }} />
                  <label htmlFor="jugado-detalle" className="label" style={{ margin: 0 }}>
                    Partido ya jugado
                    {esFuturo && <span style={{ fontSize: 11, color: 'var(--gris-mid)', fontWeight: 400 }}> (fecha futura)</span>}
                    {!esFuturo && !formPartido.jugado && <span style={{ fontSize: 11, color: 'var(--gris-mid)', fontWeight: 400 }}> (márcalo al terminar)</span>}
                  </label>
                </div>
              )
            })()}

            {/* Resultado si jugado */}
            {formPartido.jugado && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16, textAlign: 'center' }}>
                <div>
                  <div className="label" style={{ textAlign: 'center', marginBottom: 8 }}>Goles {String(formPartido.local).split(' ')[0]}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, justifyContent: 'center' }}>
                    <button type="button" onClick={() => setFormPartido(f => ({ ...f, goles_local: Math.max(0, f.goles_local - 1) }))} style={{ width: 40, height: 40, borderRadius: '50%', border: '1.5px solid #c8aab2', background: 'white', fontSize: 20, cursor: 'pointer' }}>−</button>
                    <span style={{ fontFamily: 'Bebas Neue', fontSize: 32, color: 'var(--verde)', minWidth: 28, textAlign: 'center' }}>{formPartido.goles_local}</span>
                    <button type="button" onClick={() => setFormPartido(f => ({ ...f, goles_local: f.goles_local + 1 }))} style={{ width: 40, height: 40, borderRadius: '50%', border: '1.5px solid #c8aab2', background: 'white', fontSize: 20, cursor: 'pointer' }}>+</button>
                  </div>
                </div>
                <div>
                  <div className="label" style={{ textAlign: 'center', marginBottom: 8 }}>Goles {String(formPartido.visitante).split(' ')[0] || 'Visitante'}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, justifyContent: 'center' }}>
                    <button type="button" onClick={() => setFormPartido(f => ({ ...f, goles_visitante: Math.max(0, f.goles_visitante - 1) }))} style={{ width: 40, height: 40, borderRadius: '50%', border: '1.5px solid #c8aab2', background: 'white', fontSize: 20, cursor: 'pointer' }}>−</button>
                    <span style={{ fontFamily: 'Bebas Neue', fontSize: 32, color: 'var(--verde)', minWidth: 28, textAlign: 'center' }}>{formPartido.goles_visitante}</span>
                    <button type="button" onClick={() => setFormPartido(f => ({ ...f, goles_visitante: f.goles_visitante + 1 }))} style={{ width: 40, height: 40, borderRadius: '50%', border: '1.5px solid #c8aab2', background: 'white', fontSize: 20, cursor: 'pointer' }}>+</button>
                  </div>
                </div>
              </div>
            )}

            {/* BLOQUE DE ERROR */}
            {errorValidacion && (
              <div style={{ color: '#c0392b', backgroundColor: '#fadbd8', border: '1px solid #f5b7b1', padding: '10px 14px', borderRadius: 8, fontSize: 13, marginBottom: 16, fontWeight: 500, textAlign: 'center' }}>
                ⚠️ {errorValidacion}
              </div>
            )}

            <button
              onClick={async () => {
                // --- 1. VALIDACIÓN DE CAMPOS OBLIGATORIOS ---
                let errorCampos = null;
                if (!formPartido.fecha) errorCampos = 'La fecha del partido es obligatoria.';
                else if (!formPartido.hora) errorCampos = 'La hora del partido es obligatoria.';
                else if (!formPartido.visitante?.trim()) errorCampos = 'El nombre del equipo visitante es obligatorio.';
                else if (!formPartido.campo?.trim()) errorCampos = 'El campo donde se jugará es obligatorio.';

                if (errorCampos) {
                  if (typeof haptics !== 'undefined' && haptics.error) haptics.error();
                  setErrorValidacion(errorCampos);
                  return;
                }

                // --- 2. VALIDACIÓN DE JORNADA ---
                if (!formPartido.amistoso) {
                  const jornadaNum = Number(formPartido.jornada);

                  if (!jornadaNum || jornadaNum <= 0) {
                    if (typeof haptics !== 'undefined' && haptics.error) haptics.error();
                    setErrorValidacion('El número de jornada debe ser 1 o mayor.');
                    return;
                  }

                  // OBTENER PARTIDOS para comprobar la repetición (Asegúrate de que 'store' tiene este método disponible aquí)
                  const todosLosPartidos = store.getPartidos ? store.getPartidos() : [];
                  const jornadaRepetida = todosLosPartidos.find(p => p.jornada === jornadaNum && p.id !== partido.id);

                  if (jornadaRepetida) {
                    if (typeof haptics !== 'undefined' && haptics.error) haptics.error();
                    setErrorValidacion(`La Jornada ${jornadaNum} ya está registrada contra ${jornadaRepetida.visitante || jornadaRepetida.local}.`);
                    return;
                  }
                }

                try {
                  setSubiendoEscudo(true)

                  // 1. Calculamos de forma estricta si el partido es futuro o pasado
                  const fechaHoraStr = formPartido.hora ? `${formPartido.fecha}T${formPartido.hora}:00` : `${formPartido.fecha}T23:59:00`
                  const esFuturo = formPartido.fecha && new Date(fechaHoraStr) > new Date()
                  const autoJugado = formPartido.fecha && new Date(fechaHoraStr) < new Date()

                  // 2. Forzamos el estado jugado correcto
                  const partidoYaJugado = esFuturo ? false : formPartido.jugado
                  let escudoUrl = formPartido.escudo_rival_url || null
                  if (escudoRivalFile) {
                    escudoUrl = await store.uploadEscudoRival(partido.id, escudoRivalFile)
                  }

                  const dataGuardar = {
                    ...formPartido,
                    jornada: Number(formPartido.jornada) || 0,
                    goles_local: Number(formPartido.goles_local) || 0,
                    goles_visitante: Number(formPartido.goles_visitante) || 0,
                    jugado: partidoYaJugado,
                    escudo_rival_url: escudoUrl,
                    convocados: partido.convocados || []
                  }
                  await store.updatePartido(partido.id, dataGuardar)

                  // 3. Inicializar stats y notificar si acaba de pasar a "jugado"
                  const eraJugadoAntes = partido.jugado
                  if (dataGuardar.jugado && !eraJugadoAntes) {
                    await store.registrarPartidoJugado(partido.id, partido.convocados || [])

                    const esLocalN = dataGuardar.local === EQUIPO_NOMBRE
                    const rivalN = esLocalN ? dataGuardar.visitante : dataGuardar.local
                    const nuestrosN = esLocalN ? dataGuardar.goles_local : dataGuardar.goles_visitante
                    const rivalesN = esLocalN ? dataGuardar.goles_visitante : dataGuardar.goles_local
                    const resTexto = nuestrosN > rivalesN ? `Victoria ${nuestrosN}-${rivalesN}` : nuestrosN < rivalesN ? `Derrota ${nuestrosN}-${rivalesN}` : `Empate ${nuestrosN}-${rivalesN}`

                    try {
                      enviarNotificacionResultado({ partido_id: partido.id, rival: rivalN, resultado: resTexto })
                    } catch (e) {
                      console.warn("Aviso PUSH (localhost):", e)
                    }
                  }

                  setSubiendoEscudo(false)
                  setEditandoPartido(false)
                  window.location.reload()
                } catch (error) {
                  console.error('Error al editar partido:', error)
                  setSubiendoEscudo(false)
                  alert('Error al guardar. Revisa la consola.')
                }
              }}
              className="btn btn-primary btn-block"
              disabled={subiendoEscudo}
            >
              {subiendoEscudo ? '⏳ Guardando...' : 'Guardar cambios'}
            </button>
          </div>
        </>
      )}
    </div>
  )
}