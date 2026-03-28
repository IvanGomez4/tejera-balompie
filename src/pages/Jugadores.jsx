import { useState } from 'react'
import { useStore } from '../hooks/useStore'

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

const posiciones = ['Todos', 'Portero', 'Defensa', 'Centrocampista', 'Delantero']
const posClass = { Portero: 'pos-portero', Defensa: 'pos-defensa', Centrocampista: 'pos-centrocampista', Delantero: 'pos-delantero' }
const posOrder = { Portero: 0, Defensa: 1, Centrocampista: 2, Delantero: 3 }

const statTabs = [
  { key: 'goles', label: '⚽ Goles', color: 'var(--verde)' },
  { key: 'asistencias', label: '🅰️ Asistencias', color: 'var(--dorado)' },
  { key: 'partidos', label: '🎮 Partidos', color: 'var(--verde-mid)' },
  { key: 'tarjetas_amarillas', label: '🟨 Amarillas', color: '#c8a800' },
  { key: 'paradas', label: '🧤 Paradas', color: '#185fa5' },
  { key: 'goles_encajados', label: '🥅 Encajados', color: '#c0392b' },
]

export default function Jugadores() {
  const { jugadores, stats } = useStore()
  const [vista, setVista] = useState('plantilla')
  const [filtro, setFiltro] = useState('Todos')
  const [selected, setSelected] = useState(null)
  const [statTab, setStatTab] = useState('goles')

  const conTotales = jugadores.map(j => {
    const ss = stats.filter(s => s.jugador_id === j.id)
    return {
      ...j,
      partidos: ss.length,
      goles: ss.reduce((a, s) => a + s.goles, 0),
      asistencias: ss.reduce((a, s) => a + s.asistencias, 0),
      tarjetas_amarillas: ss.reduce((a, s) => a + s.tarjetas_amarillas, 0),
      tarjetas_rojas: ss.reduce((a, s) => a + s.tarjetas_rojas, 0),
      paradas: ss.reduce((a, s) => a + (s.paradas || 0), 0),
      goles_encajados: ss.reduce((a, s) => a + (s.goles_encajados || 0), 0),
    }
  })

  const filtrados = (filtro === 'Todos' ? conTotales : conTotales.filter(j => j.posicion === filtro))
    .sort((a, b) => (posOrder[a.posicion] ?? 99) - (posOrder[b.posicion] ?? 99))

  const jugador = selected ? conTotales.find(j => j.id === selected) : null

  const cur = statTabs.find(t => t.key === statTab)
  const porteroTabs = ['paradas', 'goles_encajados']
  const sorted = [...conTotales]
    .filter(j => j[statTab] > 0 && (porteroTabs.includes(statTab) ? j.posicion === 'Portero' : true))
    .sort((a, b) => b[statTab] - a[statTab])
  const max = Math.max(...conTotales.map(j => j[statTab]), 1)
  const totGoles = conTotales.reduce((s, j) => s + j.goles, 0)
  const totAsist = conTotales.reduce((s, j) => s + j.asistencias, 0)
  const totAmar = conTotales.reduce((s, j) => s + j.tarjetas_amarillas, 0)
  const maxPJ = Math.max(...conTotales.map(j => j.partidos), 0)

  return (
    <div className="page">
      {/* Selector de vista */}
      <div style={{ display: 'flex', background: '#f0f4f0', borderRadius: 12, padding: 4, marginBottom: '1.25rem', gap: 4 }}>
        {[['plantilla', '👕', 'Plantilla'], ['stats', '📊', 'Estadísticas']].map(([key, icon, label]) => (
          <button
            key={key}
            onClick={() => setVista(key)}
            style={{
              flex: 1, padding: '9px 0', borderRadius: 9, border: 'none', cursor: 'pointer',
              fontFamily: 'DM Sans, sans-serif', fontSize: 14, fontWeight: 700,
              background: vista === key ? 'white' : 'transparent',
              color: vista === key ? 'var(--verde)' : 'var(--gris-mid)',
              boxShadow: vista === key ? '0 1px 6px rgba(0,0,0,0.1)' : 'none',
              transition: 'all 0.15s',
            }}
          >
            {icon} {label}
          </button>
        ))}
      </div>

      {/* VISTA PLANTILLA */}
      {vista === 'plantilla' && (
        <>
          <h1 className="page-title">Plantilla · {jugadores.length}</h1>
          <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 8, marginBottom: '1rem', scrollbarWidth: 'none' }}>
            {posiciones.map(p => (
              <button key={p} onClick={() => setFiltro(p)} style={{ padding: '7px 14px', borderRadius: 20, whiteSpace: 'nowrap', border: '1.5px solid', fontSize: 13, fontWeight: 600, cursor: 'pointer', flexShrink: 0, minHeight: 36, background: filtro === p ? 'var(--verde)' : 'white', color: filtro === p ? 'white' : 'var(--verde-mid)', borderColor: filtro === p ? 'var(--verde)' : '#c0d0c0' }}>{p}</button>
            ))}
          </div>
          <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
            {filtrados.map((j, i) => (
              <div key={j.id} onClick={() => setSelected(j.id === selected ? null : j.id)} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', borderBottom: i < filtrados.length - 1 ? '1px solid #f0f4f0' : 'none', background: selected === j.id ? '#f0f9f0' : 'white', cursor: 'pointer' }}>
                <div className="avatar avatar-md" style={{ overflow: 'hidden', padding: 0 }}>
                  {j.foto_url
                    ? <img src={j.foto_url} alt={j.nombre} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
                    : initials(j.nombre)
                  }
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 15, fontWeight: 600 }}>{j.nombre}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 2 }}>
                    <span className={`pos-pill ${posClass[j.posicion]}`}>{j.posicion}</span>
                    <span style={{ fontSize: 12, color: 'var(--gris-mid)' }}>#{j.dorsal}</span>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 12, flexShrink: 0 }}>
                  {(j.posicion === 'Portero'
                    ? [['🧤', j.paradas], ['🥅', j.goles_encajados], ['🎮', j.partidos]]
                    : [['⚽', j.goles], ['🅰️', j.asistencias], ['🎮', j.partidos]]
                  ).map(([ic, v]) => (
                    <div key={ic} style={{ textAlign: 'center' }}>
                      <div style={{ fontFamily: 'Bebas Neue', fontSize: 20, color: 'var(--verde)', lineHeight: 1 }}>{v}</div>
                      <div style={{ fontSize: 9, color: 'var(--gris-mid)' }}>{ic}</div>
                    </div>
                  ))}
                </div>
                <div style={{ color: '#c0d0c0', fontSize: 16 }}>›</div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* VISTA ESTADÍSTICAS */}
      {vista === 'stats' && (
        <>
          <h1 className="page-title">Estadísticas</h1>
          <div className="grid-4" style={{ marginBottom: '1.25rem' }}>
            {[['Goles', totGoles, 'var(--verde)'], ['Asistencias', totAsist, 'var(--verde-mid)'], ['Amarillas', totAmar, '#c8a800'], ['Jornadas', maxPJ, 'var(--verde)']].map(([l, v, c]) => (
              <div key={l} className="metric-card"><div className="metric-label">{l}</div><div className="metric-value" style={{ color: c }}>{v}</div></div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 8, marginBottom: '1rem', scrollbarWidth: 'none' }}>
            {statTabs.map(t => (
              <button key={t.key} onClick={() => setStatTab(t.key)} style={{ padding: '8px 16px', borderRadius: 20, whiteSpace: 'nowrap', border: '1.5px solid', fontSize: 13, fontWeight: 600, cursor: 'pointer', flexShrink: 0, background: statTab === t.key ? 'var(--verde)' : 'white', color: statTab === t.key ? 'white' : 'var(--verde-mid)', borderColor: statTab === t.key ? 'var(--verde)' : '#c0d0c0' }}>{t.label}</button>
            ))}
          </div>
          <div className="card" style={{ padding: 0, overflow: 'hidden', marginBottom: '1.25rem' }}>
            {sorted.length === 0 && <div className="empty">Sin datos aún</div>}
            {sorted.map((j, i) => (
              <div key={j.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', borderBottom: i < sorted.length - 1 ? '1px solid #f0f4f0' : 'none', background: i === 0 ? '#f0f9f0' : 'white' }}>
                <div style={{ fontFamily: 'Bebas Neue', fontSize: 20, minWidth: 24, textAlign: 'center', color: ['#c8a800', '#909090', '#a06030', '#c0d0c0'][Math.min(i, 3)] }}>{i + 1}</div>
                <Avatar jugador={j} size="sm" />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>{j.nombre}</div>
                  <div style={{ fontSize: 11, color: 'var(--gris-mid)' }}>{j.posicion}</div>
                </div>
                <div className="bar-wrap" style={{ maxWidth: 80 }}><div className="bar-fill" style={{ width: `${Math.round(j[statTab] / max * 100)}%`, background: cur.color }} /></div>
                <div style={{ fontFamily: 'Bebas Neue', fontSize: 26, color: cur.color, minWidth: 28, textAlign: 'right' }}>{j[statTab]}</div>
              </div>
            ))}
          </div>
          <div className="card" style={{ padding: 0, overflowX: 'auto' }}>
            <table>
              <thead>
                <tr>
                  <th>Jugador</th>
                  <th style={{ textAlign: 'center' }}>PJ</th>
                  <th style={{ textAlign: 'center' }}>⚽</th>
                  <th style={{ textAlign: 'center' }}>🅰️</th>
                  <th style={{ textAlign: 'center' }}>🟨</th>
                  <th style={{ textAlign: 'center' }}>🧤</th>
                  <th style={{ textAlign: 'center' }}>🥅</th>
                </tr>
              </thead>
              <tbody>
                {[...conTotales].sort((a, b) => (b.goles + b.asistencias) - (a.goles + a.asistencias)).map(j => (
                  <tr key={j.id}>
                    <td><div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><Avatar jugador={j} size="sm" /><div><div style={{ fontSize: 13, fontWeight: 600, lineHeight: 1.2 }}>{j.nombre}</div><div style={{ fontSize: 10, color: 'var(--gris-mid)' }}>{j.posicion}</div></div></div></td>
                    <td style={{ textAlign: 'center', fontSize: 14 }}>{j.partidos}</td>
                    <td style={{ textAlign: 'center', fontSize: 14, fontWeight: 700, color: j.goles > 0 ? 'var(--verde)' : '#ccc' }}>{j.goles || '—'}</td>
                    <td style={{ textAlign: 'center', fontSize: 14, fontWeight: 700, color: j.asistencias > 0 ? 'var(--dorado)' : '#ccc' }}>{j.asistencias || '—'}</td>
                    <td style={{ textAlign: 'center', fontSize: 14 }}>{j.tarjetas_amarillas > 0 ? <span style={{ display: 'inline-flex', alignItems: 'center', gap: 3 }}><span style={{ width: 10, height: 13, background: '#f0c040', borderRadius: 2, display: 'inline-block' }} />{j.tarjetas_amarillas}</span> : <span style={{ color: '#ddd' }}>—</span>}</td>
                    <td style={{ textAlign: 'center', fontSize: 14, color: j.paradas > 0 ? '#185fa5' : '#ccc' }}>{j.paradas || '—'}</td>
                    <td style={{ textAlign: 'center', fontSize: 14, color: j.goles_encajados > 0 ? '#c0392b' : '#ccc' }}>{j.goles_encajados || '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {/* Modal detalle jugador */}
      {jugador && (
        <>
          <div onClick={() => setSelected(null)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 200 }} />
          <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 300, background: 'white', borderRadius: '20px 20px 0 0', padding: '1.5rem', paddingBottom: 'calc(1.5rem + env(safe-area-inset-bottom))', boxShadow: '0 -4px 30px rgba(0,0,0,0.15)', maxHeight: '75vh', overflowY: 'auto' }}>
            <div style={{ width: 36, height: 4, background: '#ddd', borderRadius: 2, margin: '-0.5rem auto 1.25rem' }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: '1.25rem' }}>
              <div className="avatar avatar-lg" style={{ overflow: 'hidden', padding: 0 }}>
                {jugador.foto_url
                  ? <img src={jugador.foto_url} alt={jugador.nombre} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
                  : initials(jugador.nombre)
                }
              </div>
              <div>
                <div style={{ fontFamily: 'Bebas Neue', fontSize: 26, color: 'var(--verde)', lineHeight: 1 }}>{jugador.nombre}</div>
                <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
                  <span className={`pos-pill ${posClass[jugador.posicion]}`}>{jugador.posicion}</span>
                  <span style={{ fontFamily: 'Bebas Neue', fontSize: 20, color: '#c0d0c0' }}>#{jugador.dorsal}</span>
                </div>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 10, marginBottom: '1rem' }}>
              {[
                ['Partidos', jugador.partidos, 'var(--verde)'],
                ['Goles', jugador.goles, 'var(--verde-mid)'],
                ['Asistencias', jugador.asistencias, 'var(--dorado)'],
                ['Amarillas', jugador.tarjetas_amarillas, '#c8a800'],
                ...(jugador.posicion === 'Portero' ? [
                  ['Paradas', jugador.paradas || 0, '#185fa5'],
                  ['Goles enc.', jugador.goles_encajados || 0, '#c0392b'],
                ] : [])
              ].map(([l, v, c]) => (
                <div key={l} style={{ background: '#f4f7f4', borderRadius: 12, padding: '12px 8px', textAlign: 'center' }}>
                  <div style={{ fontFamily: 'Bebas Neue', fontSize: 28, color: c, lineHeight: 1 }}>{v}</div>
                  <div style={{ fontSize: 10, color: 'var(--gris-mid)', textTransform: 'uppercase', letterSpacing: '0.06em', marginTop: 3 }}>{l}</div>
                </div>
              ))}
            </div>
            {(jugador.goles + jugador.asistencias) > 0 && (
              <div style={{ background: '#f4f7f4', borderRadius: 12, padding: '12px 14px' }}>
                <div style={{ fontSize: 12, color: 'var(--gris-mid)', marginBottom: 6 }}>Participación ofensiva</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div className="bar-wrap"><div className="bar-fill" style={{ width: `${Math.round((jugador.goles + jugador.asistencias) / Math.max(...conTotales.map(j => j.goles + j.asistencias), 1) * 100)}%` }} /></div>
                  <span style={{ fontFamily: 'Bebas Neue', fontSize: 20, color: 'var(--verde)' }}>{jugador.goles + jugador.asistencias}</span>
                </div>
              </div>
            )}
            <button onClick={() => setSelected(null)} className="btn btn-primary btn-block" style={{ marginTop: '1.25rem' }}>Cerrar</button>
          </div>
        </>
      )}
    </div>
  )
}
