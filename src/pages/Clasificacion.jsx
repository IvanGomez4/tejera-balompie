import { useState } from 'react'
import { useStore } from '../hooks/useStore'
import { EQUIPO_NOMBRE } from '../lib/mockData'

const medalColors = ['#c8a800', '#909090', '#a06030']

export default function Clasificacion() {
  const { clasificacion } = useStore()

  // Extraer grupos únicos ordenados
  const grupos = [...new Set(clasificacion.map(e => e.grupo || 'A'))].sort()
  const [grupoActivo, setGrupoActivo] = useState(null)

  // El grupo activo por defecto es el que contiene a nuestro equipo
  const grupoPropio = clasificacion.find(e => e.equipo === EQUIPO_NOMBRE)?.grupo || grupos[0]
  const grupoSeleccionado = grupoActivo ?? grupoPropio ?? grupos[0]

  const equiposGrupo = clasificacion
    .filter(e => (e.grupo || 'A') === grupoSeleccionado)
    .sort((a, b) => b.pts - a.pts || (b.gf - b.gc) - (a.gf - a.gc) || b.gf - a.gf)

  if (clasificacion.length === 0) {
    return (
      <div className="page anim-fade">
        <h1 className="page-title">Clasificación</h1>
        <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
          <div style={{ fontSize: 56, marginBottom: '1rem' }}>🏆</div>
          <div style={{ fontFamily: 'Bebas Neue', fontSize: 22, color: 'var(--verde)', marginBottom: 8 }}>
            Sin equipos todavía
          </div>
          <div style={{ color: 'var(--gris-mid)', fontSize: 14 }}>
            Añade los equipos desde el panel Admin.
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="page anim-fade">
      <h1 className="page-title">Clasificación</h1>

      {/* Selector de grupos — solo si hay más de uno */}
      {grupos.length > 1 && (
        <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 8, marginBottom: '1rem', scrollbarWidth: 'none' }}>
          {grupos.map(g => (
            <button
              key={g}
              onClick={() => setGrupoActivo(g)}
              style={{
                padding: '7px 18px', borderRadius: 20, whiteSpace: 'nowrap', border: '1.5px solid',
                fontSize: 13, fontWeight: 700, cursor: 'pointer', flexShrink: 0, minHeight: 36,
                background: grupoSeleccionado === g ? 'var(--verde)' : 'white',
                color: grupoSeleccionado === g ? 'white' : 'var(--verde-mid)',
                borderColor: grupoSeleccionado === g ? 'var(--verde)' : '#c0d0c0',
              }}
            >
              Grupo {g}
            </button>
          ))}
        </div>
      )}

      {grupos.length === 1 && (
        <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--gris-mid)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.75rem' }}>
          Grupo {grupoSeleccionado}
        </div>
      )}

      {/* Cabecera tabla */}
      <div className="card" style={{ padding: '0.75rem 0' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '26px 1fr 26px 26px 26px 26px 26px 26px 26px 32px', gap: 2, padding: '0 10px 8px', borderBottom: '1.5px solid #eef2ee', alignItems: 'center' }}>
          {['#', 'Equipo', 'PJ', 'PG', 'PE', 'PP', 'GF', 'GC', 'DG', 'Pts'].map(h => (
            <div key={h} style={{ fontSize: 9, fontWeight: 700, color: 'var(--gris-mid)', textAlign: h === 'Equipo' ? 'left' : 'center', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{h}</div>
          ))}
        </div>

        {equiposGrupo.map((e, i) => {
          const esN = e.equipo === EQUIPO_NOMBRE
          const dg = e.gf - e.gc
          return (
            <div
              key={e.equipo}
              style={{
                display: 'grid',
                gridTemplateColumns: '26px 1fr 26px 26px 26px 26px 26px 26px 26px 32px',
                gap: 2,
                padding: '10px',
                background: esN ? '#f0f9f0' : 'transparent',
                borderBottom: i < equiposGrupo.length - 1 ? '1px solid #f5f5f5' : 'none',
                alignItems: 'center',
                borderLeft: esN ? '3px solid var(--verde)' : '3px solid transparent',
              }}
            >
              {/* Posición */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{
                  width: 20, height: 20, borderRadius: '50%', display: 'flex', alignItems: 'center',
                  justifyContent: 'center', fontSize: 10, fontWeight: 700,
                  background: i < 3 ? medalColors[i] : '#f0f0f0',
                  color: i < 3 ? 'white' : '#aaa',
                }}>
                  {i + 1}
                </div>
              </div>

              {/* Nombre equipo */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 5, overflow: 'hidden' }}>
                {esN && <img src="/escudo.png" alt="Escudo" style={{ width: 18, height: 18, objectFit: 'contain', flexShrink: 0 }} />}
                <span style={{
                  fontSize: 13, fontWeight: esN ? 700 : 400,
                  color: esN ? 'var(--verde)' : '#333',
                  whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                }}>
                  {e.equipo}
                </span>
              </div>

              {/* PJ PG PE PP GF GC */}
              {[e.pj, e.pg, e.pe, e.pp, e.gf, e.gc].map((v, vi) => (
                <div key={vi} style={{ textAlign: 'center', fontSize: 12, color: '#555' }}>{v}</div>
              ))}

              {/* DG */}
              <div style={{ textAlign: 'center', fontSize: 12, fontWeight: 600, color: dg > 0 ? 'var(--verde-mid)' : dg < 0 ? '#c0392b' : '#888' }}>
                {dg > 0 ? `+${dg}` : dg}
              </div>

              {/* Pts */}
              <div style={{ textAlign: 'center', fontFamily: 'Bebas Neue', fontSize: 20, color: esN ? 'var(--verde)' : 'var(--negro)' }}>
                {e.pts}
              </div>
            </div>
          )
        })}
      </div>

      {/* Leyenda */}
      <div style={{ marginTop: '0.75rem', fontSize: 10, color: 'var(--gris-mid)', display: 'flex', flexWrap: 'wrap', gap: '4px 12px' }}>
        <span>PJ=Jugados</span>
        <span>PG=Ganados</span>
        <span>PE=Empates</span>
        <span>PP=Perdidos</span>
        <span>GF=Goles favor</span>
        <span>GC=Goles contra</span>
        <span>DG=Diferencia</span>
        <span>Pts=Puntos</span>
      </div>
    </div>
  )
}
