import { useNavigate } from 'react-router-dom'
import { useStore } from '../hooks/useStore'
import { EQUIPO_NOMBRE } from '../lib/mockData'
import escudo from '../assets/escudo.png'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function initials(n) { return n.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase() }
function res(p) {
  const esL = p.local === EQUIPO_NOMBRE
  const n = esL ? p.goles_local : p.goles_visitante
  const r = esL ? p.goles_visitante : p.goles_local
  return n > r ? 'victoria' : n < r ? 'derrota' : 'empate'
}
function fmt(str) { return new Date(str).toLocaleDateString('es-ES', { day: 'numeric', month: 'short' }) }

export default function Inicio() {
  const nav = useNavigate()
  const { jugadores, partidos, stats, clasificacion } = useStore()

  const nuestro = clasificacion.find(e => e.equipo === EQUIPO_NOMBRE)
  const totalGoles = stats.reduce((s, x) => s + x.goles, 0)

  // Totales por jugador
  const totales = jugadores.map(j => {
    const ss = stats.filter(s => s.jugador_id === j.id)
    return { ...j, goles: ss.reduce((a, s) => a + s.goles, 0), asistencias: ss.reduce((a, s) => a + s.asistencias, 0) }
  })
  const goleador = [...totales].sort((a, b) => b.goles - a.goles)[0]
  const asistente = [...totales].sort((a, b) => b.asistencias - a.asistencias)[0]

  const ultimos = [...partidos].filter(p => p.jugado && (p.local === EQUIPO_NOMBRE || p.visitante === EQUIPO_NOMBRE))
    .sort((a, b) => new Date(b.fecha) - new Date(a.fecha)).slice(0, 3)
  const proximos = [...partidos].filter(p => !p.jugado && (p.local === EQUIPO_NOMBRE || p.visitante === EQUIPO_NOMBRE))
    .sort((a, b) => new Date(a.fecha) - new Date(b.fecha))
  const proximo = proximos[0]
  const [ahora, setAhora] = useState(new Date())
  useEffect(() => {
    const t = setInterval(() => setAhora(new Date()), 1000)
    return () => clearInterval(t)
  }, [])

  if (!jugadores.length) return (
    <div className="page">
      <div className="empty" style={{ marginTop: '3rem' }}>Cargando datos...</div>
    </div>
  )

  return (
    <div className="page">
      {/* Hero */}
      <div style={{ background: 'linear-gradient(135deg,#0d1a0d 0%,#1e4d1e 100%)', borderRadius: 20, padding: '1.5rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <img src={escudo} alt="Escudo" style={{ width: 88, height: 88, objectFit: 'contain', flexShrink: 0 }} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontFamily: 'Bebas Neue', fontSize: 24, color: 'white', lineHeight: 1.1, letterSpacing: '0.04em' }}>Tejera Balompié</div>
          <div style={{ color: '#4a6a4a', fontSize: 10, letterSpacing: '0.09em', marginBottom: 10 }}>LIGA VERANO VILLACAÑAS 2026</div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {[[`${nuestro?.pos}º`, 'Posición', '#f0c040'], [`${nuestro?.pts}`, 'Puntos', '#7dce7d'], [`${nuestro?.pg}G`, `${nuestro?.pe}E ${nuestro?.pp}D`, 'white']].map(([v, s, c]) => (
              <div key={s} style={{ background: 'rgba(255,255,255,0.07)', borderRadius: 8, padding: '6px 10px', textAlign: 'center', minWidth: 50 }}>
                <div style={{ fontFamily: 'Bebas Neue', fontSize: 22, color: c, lineHeight: 1 }}>{v}</div>
                <div style={{ fontSize: 9, color: '#4a6a4a', textTransform: 'uppercase', letterSpacing: '0.07em', marginTop: 1 }}>{s}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Próximo partido en grande */}
      {proximo && (() => {
        const fechaP = new Date(proximo.fecha + 'T00:00:00')
        const diffMs = fechaP - ahora
        const diffDias = Math.floor(diffMs / (1000 * 60 * 60 * 24))
        const diffHoras = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const esHoy = diffDias === 0 && diffMs > 0
        const esMañana = diffDias === 1
        const pasado = diffMs < 0
        const rival = proximo.local === EQUIPO_NOMBRE ? proximo.visitante : proximo.local
        const condicion = proximo.local === EQUIPO_NOMBRE ? 'Casa' : 'Fuera'

        const etiquetaTiempo = pasado
          ? 'Hoy'
          : esHoy
            ? `Hoy · faltan ${diffHoras}h`
            : esMañana
              ? 'Mañana'
              : `En ${diffDias} días`

        return (
          <div style={{
            background: 'linear-gradient(135deg, #0d1a0d 0%, #1a3d1a 100%)',
            borderRadius: 20, padding: '1.25rem',
            marginBottom: '1rem',
            border: '1px solid #2a5a2a',
            position: 'relative', overflow: 'hidden'
          }}>
            {/* Fondo decorativo */}
            <div style={{ position: 'absolute', right: -20, top: -20, width: 120, height: 120, borderRadius: '50%', background: 'rgba(125,206,125,0.06)' }} />
            <div style={{ position: 'absolute', right: 20, bottom: -30, width: 80, height: 80, borderRadius: '50%', background: 'rgba(125,206,125,0.04)' }} />

            {/* Cabecera */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
              <div style={{ fontSize: 10, color: '#4a8a4a', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700 }}>
                Próximo partido · J{proximo.jornada}
              </div>
              <div style={{
                background: esHoy ? 'var(--rojo)' : esMañana ? '#c8a800' : 'rgba(125,206,125,0.15)',
                color: esHoy ? 'white' : esMañana ? 'var(--negro)' : '#7dce7d',
                borderRadius: 20, padding: '3px 10px', fontSize: 11, fontWeight: 700
              }}>
                {etiquetaTiempo}
              </div>
            </div>

            {/* Rival */}
            <div style={{ fontFamily: 'Bebas Neue', fontSize: 32, color: 'white', letterSpacing: '0.04em', lineHeight: 1, marginBottom: 4 }}>
              vs. {rival}
            </div>

            {/* Cuenta atrás en días grande */}
            {!pasado && diffDias > 1 && (
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 10 }}>
                <span style={{ fontFamily: 'Bebas Neue', fontSize: 52, color: 'var(--verde-light)', lineHeight: 1 }}>
                  {diffDias}
                </span>
                <span style={{ fontSize: 14, color: '#4a8a4a', fontWeight: 600 }}>días</span>
                {diffHoras > 0 && (
                  <>
                    <span style={{ fontFamily: 'Bebas Neue', fontSize: 28, color: '#2d5a2d', lineHeight: 1, marginLeft: 4 }}>{diffHoras}</span>
                    <span style={{ fontSize: 12, color: '#3a6a3a' }}>h</span>
                  </>
                )}
              </div>
            )}

            {/* Info del partido */}
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                <span style={{ fontSize: 13 }}>📅</span>
                <span style={{ fontSize: 13, color: '#7dce7d' }}>{fmt(proximo.fecha)}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                <span style={{ fontSize: 13 }}>📍</span>
                <span style={{ fontSize: 13, color: '#7dce7d' }}>{proximo.campo}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                <span style={{ fontSize: 13 }}>🏠</span>
                <span style={{ fontSize: 13, color: '#7dce7d' }}>{condicion}</span>
              </div>
            </div>
          </div>
        )
      })()}

      {/* Métricas */}
      <div className="grid-4" style={{ marginBottom: '1rem' }}>
        {[['Goles', totalGoles, `${nuestro?.pj || 0} jornadas`], ['Victorias', nuestro?.pg, `de ${nuestro?.pj} jugados`], ['Goleador', goleador?.goles || 0, goleador?.nombre.split(' ')[0] || '-'], ['Asistente', asistente?.asistencias || 0, asistente?.nombre.split(' ')[0] || '-']].map(([l, v, s]) => (
          <div key={l} className="metric-card"><div className="metric-label">{l}</div><div className="metric-value">{v}</div><div className="metric-sub">{s}</div></div>
        ))}
      </div>

      {/* Últimos resultados */}
      <div className="card" style={{ marginBottom: '1rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <h2 style={{ fontSize: 20, color: 'var(--verde)' }}>Últimos partidos</h2>
          <button onClick={() => nav('/partidos')} style={{ background: 'none', border: 'none', color: 'var(--verde-mid)', fontSize: 13, cursor: 'pointer', fontWeight: 700 }}>Ver todos →</button>
        </div>
        {ultimos.map((p, i) => {
          const r = res(p); const rival = p.local === EQUIPO_NOMBRE ? p.visitante : p.local
          return (
            <div key={p.id} onClick={() => nav(`/partido/${p.id}`)} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 0', borderBottom: i < ultimos.length - 1 ? '1px solid #f0f4f0' : 'none', cursor: 'pointer' }}>
              <div style={{ width: 4, height: 36, borderRadius: 2, flexShrink: 0, background: r === 'victoria' ? 'var(--verde-mid)' : r === 'derrota' ? '#c0392b' : '#bbb' }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 600 }}>vs. {rival}</div>
                <div style={{ fontSize: 11, color: 'var(--gris-mid)' }}>J{p.jornada} · {fmt(p.fecha)}</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span className="score-box">{p.goles_local}–{p.goles_visitante}</span>
                <span className={`tag-${r}`}>{r === 'victoria' ? 'V' : r === 'derrota' ? 'D' : 'E'}</span>
              </div>
            </div>
          )
        })}
      </div>

      {/* Top goleadores */}
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <h2 style={{ fontSize: 20, color: 'var(--verde)' }}>Top goleadores</h2>
          <button onClick={() => nav('/estadisticas')} style={{ background: 'none', border: 'none', color: 'var(--verde-mid)', fontSize: 13, cursor: 'pointer', fontWeight: 700 }}>Ver todos →</button>
        </div>
        {[...totales].sort((a, b) => b.goles - a.goles).filter(j => j.goles > 0).slice(0, 4).map((j, i) => {
          const maxG = Math.max(...totales.map(x => x.goles), 1)
          return (
            <div key={j.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderBottom: i < 3 ? '1px solid #f0f4f0' : 'none' }}>
              <div style={{ fontFamily: 'Bebas Neue', fontSize: 18, color: ['#c8a800', '#909090', '#a06030', '#ddd'][i], minWidth: 18, textAlign: 'center' }}>{i + 1}</div>
              <div className="avatar avatar-sm">{initials(j.nombre)}</div>
              <div style={{ flex: 1 }}><div style={{ fontSize: 14, fontWeight: 500 }}>{j.nombre}</div><div style={{ fontSize: 11, color: 'var(--gris-mid)' }}>{j.posicion}</div></div>
              <div className="bar-wrap" style={{ maxWidth: 60 }}><div className="bar-fill" style={{ width: `${Math.round(j.goles / maxG * 100)}%` }} /></div>
              <div style={{ fontFamily: 'Bebas Neue', fontSize: 22, color: 'var(--verde)', minWidth: 24, textAlign: 'right' }}>{j.goles}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
