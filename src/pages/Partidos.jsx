import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useStore } from '../hooks/useStore'
import { adminAuth } from '../lib/adminAuth'
import { EQUIPO_NOMBRE } from '../lib/mockData'

function fmt(str) { return new Date(str).toLocaleDateString('es-ES', { weekday: 'short', day: 'numeric', month: 'short' }) }
function res(p) {
  const esL = p.local === EQUIPO_NOMBRE
  const n = esL ? p.goles_local : p.goles_visitante, r = esL ? p.goles_visitante : p.goles_local
  return n > r ? 'victoria' : n < r ? 'derrota' : 'empate'
}

function Counter({ value, onChange }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <button type="button" onClick={() => onChange(Math.max(0, value - 1))} style={{ width: 40, height: 40, borderRadius: '50%', border: '1.5px solid #c8aab2', background: 'white', fontSize: 20, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>−</button>
      <span style={{ fontFamily: 'Bebas Neue', fontSize: 32, color: 'var(--verde)', minWidth: 28, textAlign: 'center', lineHeight: 1 }}>{value}</span>
      <button type="button" onClick={() => onChange(value + 1)} style={{ width: 40, height: 40, borderRadius: '50%', border: '1.5px solid #c8aab2', background: 'white', fontSize: 20, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>+</button>
    </div>
  )
}

export default function Partidos() {
  const nav = useNavigate()
  const { partidos, store } = useStore()
  const isAdmin = adminAuth.isLogged()

  const emptyForm = { jornada: '', fecha: '', hora: '', local: EQUIPO_NOMBRE, visitante: '', campo: 'Campo Municipal', jugado: false, goles_local: 0, goles_visitante: 0, amistoso: false }
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState(emptyForm)
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const nuestros = partidos.filter(p => p.local === EQUIPO_NOMBRE || p.visitante === EQUIPO_NOMBRE)
  const jugados = [...nuestros].filter(p => p.jugado).sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
  const proximos = [...nuestros].filter(p => !p.jugado).sort((a, b) => new Date(a.fecha) - new Date(b.fecha))

  const handleSave = () => {
    if (!form.fecha) return

    // Calcular si el partido ya debería estar marcado como jugado
    // Combina fecha + hora para comparar con el momento actual
    const fechaHoraStr = form.hora
      ? `${form.fecha}T${form.hora}:00`
      : `${form.fecha}T23:59:00`
    const fechaHora = new Date(fechaHoraStr)
    const yaJugado = fechaHora < new Date()

    const data = {
      ...form,
      jornada: Number(form.amistoso ? 0 : form.jornada) || 0,
      goles_local: Number(form.goles_local) || 0,
      goles_visitante: Number(form.goles_visitante) || 0,
      jugado: yaJugado ? true : form.jugado,
    }
    store.addPartido(data)
    setForm(emptyForm)
    setShowForm(false)
  }

  const cancelForm = () => {
    setShowForm(false)
    setForm(emptyForm)
  }

  return (
    <div className="page anim-fade">
      <div className="anim-fade-up" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
        <h1 className="page-title" style={{ margin: 0 }}>Partidos</h1>
        {isAdmin && (
          <button onClick={() => setShowForm(true)} className="btn btn-primary btn-sm">
            + Partido
          </button>
        )}
      </div>

      {proximos.length > 0 && <>
        <h2 style={{ fontSize: 16, fontWeight: 700, color: 'var(--gris-mid)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>Próximos</h2>
        <div style={{ display: 'flex', gap: 10, overflowX: 'auto', paddingBottom: 8, marginBottom: '1.25rem', scrollbarWidth: 'none' }}>
          {proximos.map((p, i) => {
            const rival = p.local === EQUIPO_NOMBRE ? p.visitante : p.local
            const esSiguiente = i === 0
            const letraRival = rival ? rival.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase() : '?'
            return (
              <div key={p.id} onClick={() => nav(`/partido/${p.id}`)}
                style={{
                  background: esSiguiente ? 'var(--negro-soft)' : 'white',
                  borderRadius: 16,
                  padding: '14px 16px',
                  flexShrink: 0,
                  minWidth: 190,
                  border: `1.5px solid ${esSiguiente ? 'var(--verde)' : '#f0e8ea'}`,
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 8,
                }}>
                {/* Chip */}
                <span style={{ alignSelf: 'flex-start', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', padding: '2px 8px', borderRadius: 20, background: esSiguiente ? 'rgba(200,153,26,0.2)' : 'rgba(155,42,64,0.1)', color: esSiguiente ? 'var(--dorado-light)' : 'var(--verde-mid)' }}>
                  {p.amistoso ? 'Amistoso' : `Jornada ${p.jornada}`}
                </span>
                {/* Escudos mini */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <img src="/escudo.png" alt="Tejera" style={{ width: 28, height: 28, objectFit: 'contain' }} />
                  <span style={{ fontFamily: 'Bebas Neue', fontSize: 14, color: esSiguiente ? '#666' : '#ccc' }}>vs</span>
                  {p.escudo_rival_url ? (
                    <img src={p.escudo_rival_url} alt={rival} style={{ width: 36, height: 36, objectFit: 'contain' }} />
                  ) : (
                    <div style={{ width: 28, height: 28, borderRadius: '50%', background: esSiguiente ? '#222' : '#f5e8eb', display: 'flex', alignItems: 'center', justifyContent: 'center', border: `1.5px solid ${esSiguiente ? '#444' : '#e0d0d5'}` }}>
                      <span style={{ fontFamily: 'Bebas Neue', fontSize: 11, color: esSiguiente ? '#888' : '#aaa' }}>{letraRival}</span>
                    </div>
                  )}
                </div>
                <div style={{ fontSize: 15, fontWeight: 700, color: esSiguiente ? 'white' : 'var(--negro)', lineHeight: 1.2 }}>{rival}</div>
                <div style={{ fontSize: 11, color: esSiguiente ? '#888' : 'var(--gris-mid)' }}>{fmt(p.fecha)} · {p.hora}</div>
                <div style={{ fontSize: 11, color: esSiguiente ? '#666' : 'var(--gris-light)' }}>📍 {p.campo}</div>
              </div>
            )
          })}
        </div>
      </>}

      <h2 style={{ fontSize: 16, fontWeight: 700, color: 'var(--gris-mid)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 10 }}>Historial</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {jugados.length === 0 && (
          <div className="card" style={{ textAlign: 'center', color: 'var(--gris-mid)', fontSize: 14, padding: '2rem' }}>Sin partidos jugados</div>
        )}
        {jugados.map((p) => {
          const esL = p.local === EQUIPO_NOMBRE
          const r = res(p)
          const rival = esL ? p.visitante : p.local
          const nuestros = esL ? p.goles_local : p.goles_visitante
          const rivales = esL ? p.goles_visitante : p.goles_local

          const colorBorde = r === 'victoria' ? '#22a05a' : r === 'derrota' ? '#c0392b' : '#e0a020'
          const colorFondo = r === 'victoria' ? 'rgba(34,160,90,0.06)' : r === 'derrota' ? 'rgba(192,57,43,0.06)' : 'rgba(224,160,32,0.06)'
          const letraRival = rival ? rival.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase() : '?'

          return (
            <div
              key={p.id}
              onClick={() => nav(`/partido/${p.id}`)}
              style={{
                background: colorFondo,
                border: '1px solid',
                borderColor: `${colorBorde}33`,
                borderLeft: `4px solid ${colorBorde}`,
                borderRadius: 14,
                padding: '14px 16px',
                cursor: 'pointer',
                WebkitTapHighlightColor: 'rgba(0,0,0,0.04)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 0,
                transition: 'transform 0.12s',
              }}
              onTouchStart={e => e.currentTarget.style.transform = 'scale(0.985)'}
              onTouchEnd={e => e.currentTarget.style.transform = 'scale(1)'}
            >
              {/* Fila de escudos + marcador */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 3, width: '100%' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, justifyContent: 'flex-end', flexShrink: 0, minWidth: 160 }}>
                  <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--gris-mid)', textTransform: 'uppercase', letterSpacing: '0.03em', textAlign: 'right', lineHeight: 1.2, textOverflow: 'ellipsis', maxWidth: 80, overflowWrap: 'break-word' }}>Tejera Balompié</span>
                  <img src="/escudo.png" alt="Tejera" style={{ width: 52, height: 52, objectFit: 'contain', flexShrink: 0 }} />
                </div>

                {/* Centro: fecha + marcador + chip */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, minWidth: 90 }}>
                  <span style={{ fontSize: 10, color: 'var(--gris-mid)' }}>{fmt(p.fecha)} · {p.hora}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ fontFamily: 'Bebas Neue', fontSize: 38, lineHeight: 1, color: 'var(--negro)' }}>{esL ? p.goles_local : p.goles_visitante}</span>
                    <span style={{ fontFamily: 'Bebas Neue', fontSize: 24, color: '#bbb', lineHeight: 1 }}>-</span>
                    <span style={{ fontFamily: 'Bebas Neue', fontSize: 38, lineHeight: 1, color: 'var(--negro)' }}>{esL ? p.goles_visitante : p.goles_local}</span>
                  </div>
                  {p.amistoso ? (
                    <span style={{ background: '#e6f0fa', color: '#185fa4', fontSize: 10, fontWeight: 700, padding: '2px 9px', borderRadius: 20 }}>Amistoso</span>
                  ) : (
                    <span style={{ background: '#e6f0fa', color: '#185fa4', fontSize: 10, fontWeight: 700, padding: '2px 9px', borderRadius: 20 }}>Jornada {p.jornada}</span>
                  )}
                </div>

                {/* Escudo rival */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, justifyContent: 'flex-start', flexShrink: 0, minWidth: 160 }}>
                  {p.escudo_rival_url ? (
                    <img src={p.escudo_rival_url} alt={rival} style={{ width: 52, height: 52, objectFit: 'contain', flexShrink: 0 }} />
                  ) : (
                    <div style={{ width: 52, height: 52, borderRadius: '50%', background: 'var(--negro-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #333', flexShrink: 0 }}>
                      <span style={{ fontFamily: 'Bebas Neue', fontSize: 17, color: '#aaa' }}>{letraRival}</span>
                    </div>
                  )}
                  <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--gris-mid)', textTransform: 'uppercase', letterSpacing: '0.03em', textAlign: 'left', lineHeight: 1.2, maxWidth: 80, overflowWrap: 'break-word' }}>{rival}</span>
                </div>
              </div>

            </div>
          )
        })}
      </div>

      {/* Modal añadir partido */}
      {showForm && (
        <>
          <div onClick={cancelForm} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.55)', zIndex: 400 }} />
          <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 500, background: 'white', borderRadius: '20px 20px 0 0', padding: '1.5rem', paddingBottom: 'calc(5.5rem + env(safe-area-inset-bottom))', boxShadow: '0 -4px 30px rgba(0,0,0,0.2)', maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ width: 36, height: 4, background: '#ddd', borderRadius: 2, margin: '-0.5rem auto 1.25rem' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h2 style={{ fontFamily: 'Bebas Neue', fontSize: 22, color: 'var(--verde)' }}>Nuevo partido</h2>
              <button onClick={cancelForm} style={{ background: 'none', border: 'none', fontSize: 22, cursor: 'pointer', color: '#aaa' }}>✕</button>
            </div>

            {/* Jornada — bloqueada si amistoso */}
            <div className="form-group">
              <label className="label">Jornada</label>
              <input
                className="input" type="number"
                value={form.amistoso ? '' : form.jornada}
                onChange={e => set('jornada', e.target.value)}
                placeholder={form.amistoso ? 'No aplica (amistoso)' : 'Nº jornada'}
                disabled={form.amistoso}
                style={{ opacity: form.amistoso ? 0.5 : 1 }}
              />
            </div>

            {/* Fecha y hora */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              <div className="form-group">
                <label className="label">Fecha</label>
                <input className="input" type="date" value={form.fecha} onChange={e => set('fecha', e.target.value)} />
              </div>
              <div className="form-group">
                <label className="label">Hora</label>
                <input className="input" type="time" value={form.hora} onChange={e => set('hora', e.target.value)} />
              </div>
            </div>
            <div className="form-group">
              <label className="label">Equipo local</label>
              <input className="input" value={form.local} onChange={e => set('local', e.target.value)} />
            </div>
            <div className="form-group">
              <label className="label">Equipo visitante</label>
              <input className="input" value={form.visitante} onChange={e => set('visitante', e.target.value)} placeholder="Nombre del rival" />
            </div>
            <div className="form-group">
              <label className="label">Campo</label>
              <input className="input" value={form.campo} onChange={e => set('campo', e.target.value)} />
            </div>

            {/* Amistoso */}
            <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <input type="checkbox" id="amistoso" checked={form.amistoso} onChange={e => set('amistoso', e.target.checked)} style={{ width: 18, height: 18, accentColor: 'var(--dorado)' }} />
              <label htmlFor="amistoso" className="label" style={{ margin: 0 }}>
                Partido amistoso <span style={{ fontSize: 11, color: 'var(--gris-mid)', fontWeight: 400 }}>(stats no computan en clasificación)</span>
              </label>
            </div>

            {/* Jugado — auto-calculado, bloqueado si fecha futura */}
            {(() => {
              const fechaHoraStr = form.hora ? `${form.fecha}T${form.hora}:00` : `${form.fecha}T23:59:00`
              const esFuturo = form.fecha && new Date(fechaHoraStr) > new Date()
              const autoJugado = form.fecha && new Date(fechaHoraStr) < new Date()
              return (
                <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: 10, opacity: esFuturo ? 0.4 : 1 }}>
                  <input
                    type="checkbox" id="jugado"
                    checked={autoJugado || form.jugado}
                    onChange={e => !esFuturo && set('jugado', e.target.checked)}
                    disabled={esFuturo || autoJugado}
                    style={{ width: 18, height: 18, accentColor: 'var(--verde)' }}
                  />
                  <label htmlFor="jugado" className="label" style={{ margin: 0 }}>
                    Partido ya jugado
                    {esFuturo && <span style={{ fontSize: 11, color: 'var(--gris-mid)', fontWeight: 400 }}> (fecha futura)</span>}
                    {autoJugado && <span style={{ fontSize: 11, color: 'var(--verde)', fontWeight: 400 }}> (marcado automáticamente)</span>}
                  </label>
                </div>
              )
            })()}

            {/* Resultado si jugado */}
            {(form.jugado || (() => { const fh = form.hora ? `${form.fecha}T${form.hora}:00` : `${form.fecha}T23:59:00`; return form.fecha && new Date(fh) < new Date() })()) && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16, textAlign: 'center' }}>
                <div>
                  <div className="label" style={{ textAlign: 'center', marginBottom: 8 }}>Goles {String(form.local).split(' ')[0]}</div>
                  <Counter value={Number(form.goles_local) || 0} onChange={v => set('goles_local', v)} />
                </div>
                <div>
                  <div className="label" style={{ textAlign: 'center', marginBottom: 8 }}>Goles {String(form.visitante).split(' ')[0] || 'Visitante'}</div>
                  <Counter value={Number(form.goles_visitante) || 0} onChange={v => set('goles_visitante', v)} />
                </div>
              </div>
            )}

            <button onClick={handleSave} className="btn btn-primary btn-block" style={{ fontSize: 16 }}>
              ⚽ Guardar partido
            </button>
          </div>
        </>
      )}
    </div>
  )
}