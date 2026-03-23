import { useParams, useNavigate } from 'react-router-dom'
import { useStore } from '../hooks/useStore'
import { EQUIPO_NOMBRE } from '../lib/mockData'

function fmt(str) { return new Date(str).toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }) }
function initials(n) { return n.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase() }

export default function DetallePartido() {
  const { id } = useParams()
  const nav = useNavigate()
  const { partidos, jugadores, stats } = useStore()

  const partido = partidos.find(p => p.id === Number(id))
  if (!partido) return <div className="page"><div className="empty">Partido no encontrado</div></div>

  const esLocal = partido.local === EQUIPO_NOMBRE
  const statsPartido = stats.filter(s => s.partido_id === partido.id)

  const goleadores = statsPartido.filter(s => s.goles > 0).sort((a, b) => b.goles - a.goles)
  const asistentes = statsPartido.filter(s => s.asistencias > 0).sort((a, b) => b.asistencias - a.asistencias)
  const amarillas = statsPartido.filter(s => s.tarjetas_amarillas > 0)
  const rojas = statsPartido.filter(s => s.tarjetas_rojas > 0)

  const getJugador = (jid) => jugadores.find(j => j.id === jid)

  const nuestros = esLocal ? partido.goles_local : partido.goles_visitante
  const rivales = esLocal ? partido.goles_visitante : partido.goles_local
  const resultado = nuestros > rivales ? 'victoria' : nuestros < rivales ? 'derrota' : 'empate'
  const rival = esLocal ? partido.visitante : partido.local

  return (
    <div className="page">
      <button onClick={() => nav('/partidos')} style={{ background: 'none', border: 'none', color: 'var(--verde-mid)', fontSize: 14, cursor: 'pointer', fontWeight: 600, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 4, padding: 0 }}>
        ← Volver
      </button>

      {/* Cabecera del partido */}
      <div style={{ background: 'linear-gradient(135deg,#0d1a0d,#1e4d1e)', borderRadius: 20, padding: '1.5rem', marginBottom: '1rem', textAlign: 'center' }}>
        <div style={{ fontSize: 11, color: '#4a6a4a', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>
          Jornada {partido.jornada} · {fmt(partido.fecha)}
        </div>
        <div style={{ fontSize: 13, color: '#7dce7d', marginBottom: 12 }}>📍 {partido.campo}</div>

        {partido.jugado ? (
          <>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, marginBottom: 12 }}>
              <div style={{ flex: 1, textAlign: 'right' }}>
                <div style={{ fontSize: 13, color: esLocal ? '#7dce7d' : '#aaa', fontWeight: esLocal ? 700 : 400 }}>{partido.local}</div>
              </div>
              <div style={{ fontFamily: 'Bebas Neue', fontSize: 48, color: 'white', letterSpacing: '0.05em', background: 'rgba(0,0,0,0.3)', padding: '4px 20px', borderRadius: 12 }}>
                {partido.goles_local}–{partido.goles_visitante}
              </div>
              <div style={{ flex: 1, textAlign: 'left' }}>
                <div style={{ fontSize: 13, color: !esLocal ? '#7dce7d' : '#aaa', fontWeight: !esLocal ? 700 : 400 }}>{partido.visitante}</div>
              </div>
            </div>
            <span className={`tag-${resultado}`} style={{ fontSize: 14, padding: '4px 16px' }}>
              {resultado === 'victoria' ? '✓ Victoria' : resultado === 'derrota' ? '✗ Derrota' : '= Empate'}
            </span>
          </>
        ) : (
          <>
            <div style={{ fontFamily: 'Bebas Neue', fontSize: 28, color: 'white', marginBottom: 8 }}>vs. {rival}</div>
            <span style={{ background: 'rgba(255,255,255,0.1)', color: '#7dce7d', padding: '4px 14px', borderRadius: 20, fontSize: 13 }}>Pendiente</span>
          </>
        )}
      </div>

      {/* Contenido solo si está jugado */}
      {partido.jugado && statsPartido.length > 0 ? (
        <>
          {/* Goleadores */}
          {goleadores.length > 0 && (
            <div className="card" style={{ marginBottom: '1rem' }}>
              <h2 style={{ fontSize: 18, color: 'var(--verde)', marginBottom: 12 }}>⚽ Goleadores</h2>
              {goleadores.map(s => {
                const j = getJugador(s.jugador_id)
                if (!j) return null
                return (
                  <div key={s.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderBottom: '1px solid #f0f4f0' }}>
                    <div className="avatar avatar-sm">{initials(j.nombre)}</div>
                    <div style={{ flex: 1 }}><div style={{ fontSize: 14, fontWeight: 600 }}>{j.nombre}</div><div style={{ fontSize: 11, color: 'var(--gris-mid)' }}>#{j.dorsal} · {j.posicion}</div></div>
                    <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
                      {Array.from({ length: s.goles }).map((_, i) => (
                        <span key={i} style={{ fontSize: 18 }}>⚽</span>
                      ))}
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
                const j = getJugador(s.jugador_id)
                if (!j) return null
                return (
                  <div key={s.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderBottom: '1px solid #f0f4f0' }}>
                    <div className="avatar avatar-sm">{initials(j.nombre)}</div>
                    <div style={{ flex: 1 }}><div style={{ fontSize: 14, fontWeight: 600 }}>{j.nombre}</div></div>
                    <div style={{ fontFamily: 'Bebas Neue', fontSize: 22, color: 'var(--dorado)' }}>{s.asistencias}</div>
                  </div>
                )
              })}
            </div>
          )}

          {/* Tarjetas */}
          {(amarillas.length > 0 || rojas.length > 0) && (
            <div className="card" style={{ marginBottom: '1rem' }}>
              <h2 style={{ fontSize: 18, color: 'var(--verde)', marginBottom: 12 }}>🟨 Disciplina</h2>
              {amarillas.map(s => {
                const j = getJugador(s.jugador_id); if (!j) return null
                return (
                  <div key={`a${s.id}`} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderBottom: '1px solid #f0f4f0' }}>
                    <div className="avatar avatar-sm">{initials(j.nombre)}</div>
                    <div style={{ flex: 1 }}><div style={{ fontSize: 14, fontWeight: 600 }}>{j.nombre}</div></div>
                    <div style={{ display: 'flex', gap: 3 }}>
                      {Array.from({ length: s.tarjetas_amarillas }).map((_, i) => (
                        <span key={i} style={{ width: 14, height: 18, background: '#f0c040', borderRadius: 2, display: 'inline-block' }} />
                      ))}
                    </div>
                  </div>
                )
              })}
              {rojas.map(s => {
                const j = getJugador(s.jugador_id); if (!j) return null
                return (
                  <div key={`r${s.id}`} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderBottom: '1px solid #f0f4f0' }}>
                    <div className="avatar avatar-sm">{initials(j.nombre)}</div>
                    <div style={{ flex: 1 }}><div style={{ fontSize: 14, fontWeight: 600 }}>{j.nombre}</div></div>
                    <span style={{ width: 14, height: 18, background: '#c0392b', borderRadius: 2, display: 'inline-block' }} />
                  </div>
                )
              })}
            </div>
          )}

          {/* MVP */}
          <div className="card" style={{ marginBottom: '1rem' }}>
            <h2 style={{ fontSize: 18, color: 'var(--verde)', marginBottom: 12 }}>⭐ MVP del partido</h2>
            {(() => {
              const mvp = partido.mvp_jugador_id
                ? jugadores.find(j => j.id === partido.mvp_jugador_id)
                : null
              return mvp ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '8px 0' }}>
                  <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'linear-gradient(135deg,#c8a800,#f0c040)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, fontWeight: 700, color: 'white', flexShrink: 0 }}>
                    {initials(mvp.nombre)}
                  </div>
                  <div>
                    <div style={{ fontFamily: 'Bebas Neue', fontSize: 22, color: 'var(--negro)', lineHeight: 1 }}>{mvp.nombre}</div>
                    <div style={{ fontSize: 12, color: 'var(--gris-mid)' }}>{mvp.posicion} · #{mvp.dorsal}</div>
                  </div>
                  <div style={{ marginLeft: 'auto', fontSize: 28 }}>⭐</div>
                </div>
              ) : (
                <div style={{ color: 'var(--gris-mid)', fontSize: 13, textAlign: 'center', padding: '0.5rem 0' }}>
                  Sin MVP asignado aún
                </div>
              )
            })()}
          </div>

          {/* Ficha completa */}
          <div className="card" style={{ marginBottom: '1rem' }}>
            <h2 style={{ fontSize: 18, color: 'var(--verde)', marginBottom: 12 }}>📋 Ficha completa</h2>
            <div style={{ overflowX: 'auto' }}>
              <table>
                <thead><tr><th>Jugador</th><th style={{ textAlign: 'center' }}>⚽</th><th style={{ textAlign: 'center' }}>🅰️</th><th style={{ textAlign: 'center' }}>🟨</th><th style={{ textAlign: 'center' }}>🟥</th><th style={{ textAlign: 'center' }}>🧤</th><th style={{ textAlign: 'center' }}>🥅</th><th style={{ textAlign: 'center' }}>Min</th></tr></thead>                <tbody>
                  {statsPartido.map(s => {
                    const j = getJugador(s.jugador_id); if (!j) return null
                    return (
                      <tr key={s.id}>
                        <td><div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><div className="avatar avatar-sm">{initials(j.nombre)}</div><span style={{ fontSize: 13, fontWeight: 600 }}>{j.nombre}</span></div></td>
                        <td style={{ textAlign: 'center', fontWeight: 700, color: s.goles > 0 ? 'var(--verde)' : '#ccc' }}>{s.goles || '—'}</td>
                        <td style={{ textAlign: 'center', fontWeight: 700, color: s.asistencias > 0 ? 'var(--dorado)' : '#ccc' }}>{s.asistencias || '—'}</td>
                        <td style={{ textAlign: 'center' }}>{s.tarjetas_amarillas > 0 ? <span style={{ display: 'inline-block', width: 10, height: 14, background: '#f0c040', borderRadius: 2 }} /> : '—'}</td>
                        <td style={{ textAlign: 'center' }}>{s.tarjetas_rojas > 0 ? <span style={{ display: 'inline-block', width: 10, height: 14, background: '#c0392b', borderRadius: 2 }} /> : '—'}</td>
                        <td style={{ textAlign: 'center', color: 'var(--gris-mid)', fontSize: 13 }}>{s.minutos}'</td>
                        <td style={{ textAlign: 'center' }}>{s.paradas > 0 ? <span style={{ color: '#185fa5', fontWeight: 700 }}>{s.paradas}</span> : '—'}</td>
                        <td style={{ textAlign: 'center' }}>{s.goles_encajados > 0 ? <span style={{ color: '#c0392b', fontWeight: 700 }}>{s.goles_encajados}</span> : '—'}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : partido.jugado ? (
        <div className="card"><div className="empty">No hay estadísticas registradas para este partido.<br /><br /><button onClick={() => nav('/admin')} className="btn btn-primary btn-sm">Añadir estadísticas</button></div></div>
      ) : (
        <div className="card"><div className="empty">El partido aún no se ha jugado.</div></div>
      )}

      <button onClick={() => nav('/admin')} className="btn btn-ghost btn-block" style={{ marginTop: '0.5rem' }}>
        ✏️ Editar este partido
      </button>
    </div>
  )
}
