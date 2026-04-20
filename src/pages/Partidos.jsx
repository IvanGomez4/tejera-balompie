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
            const cond = p.local === EQUIPO_NOMBRE ? 'Local' : 'Visitante'
            return (
              <div key={p.id} onClick={() => nav(`/partido/${p.id}`)} style={{ background: i === 0 ? 'var(--negro-soft)' : 'white', borderRadius: 14, padding: '1rem', flexShrink: 0, minWidth: 180, border: '1px solid', borderColor: i === 0 ? 'var(--verde)' : '#f0e8ea', cursor: 'pointer' }}>
                <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4, color: i === 0 ? '#e8a0b0' : 'var(--verde-mid)' }}>{p.amistoso ? 'Amistoso' : `J${p.jornada}`} · {cond}</div>
                <div style={{ fontSize: 16, fontWeight: 700, color: i === 0 ? 'white' : 'var(--negro)', marginBottom: 4 }}>vs. {rival}</div>
                <div style={{ fontSize: 12, color: i === 0 ? '#666' : 'var(--gris-mid)' }}>{fmt(p.fecha)} · {p.hora}</div>
                <div style={{ fontSize: 11, color: i === 0 ? '#555' : 'var(--gris-light)', marginTop: 3 }}>📍 {p.campo}</div>
              </div>
            )
          })}
        </div>
      </>}

      <h2 style={{ fontSize: 16, fontWeight: 700, color: 'var(--gris-mid)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>Historial</h2>
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        {jugados.length === 0 && <div className="empty">Sin partidos jugados</div>}
        {jugados.map((p, i) => {
          const esL = p.local === EQUIPO_NOMBRE
          const r = res(p)
          const rival = esL ? p.visitante : p.local
          return (
            <div key={p.id} onClick={() => nav(`/partido/${p.id}`)} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 14px', borderBottom: i < jugados.length - 1 ? '1px solid #f5e8eb' : 'none', cursor: 'pointer', WebkitTapHighlightColor: 'rgba(0,0,0,0.04)' }}>
              <div style={{ width: 4, height: 40, borderRadius: 2, flexShrink: 0, background: r === 'victoria' ? 'var(--verde-mid)' : r === 'derrota' ? '#c0392b' : '#bbb' }} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>vs. {rival}</div>
                  {p.amistoso && <span style={{ background: '#fff3cd', color: '#856a00', fontSize: 10, fontWeight: 700, padding: '1px 6px', borderRadius: 10, flexShrink: 0 }}>Amistoso</span>}
                </div>
                <div style={{ fontSize: 11, color: 'var(--gris-mid)', marginTop: 1 }}>{p.amistoso ? 'Amistoso' : `J${p.jornada}`} · {fmt(p.fecha)} · {p.hora}</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 3 }}>
                  <span style={{ fontFamily: 'Bebas Neue', fontSize: 24, color: esL ? 'var(--verde)' : 'var(--gris-mid)' }}>{p.goles_local}</span>
                  <span style={{ color: '#ccc', fontSize: 16 }}>–</span>
                  <span style={{ fontFamily: 'Bebas Neue', fontSize: 24, color: !esL ? 'var(--verde)' : 'var(--gris-mid)' }}>{p.goles_visitante}</span>
                </div>
                <span className={`tag-${r}`}>{r === 'victoria' ? 'V' : r === 'derrota' ? 'D' : 'E'}</span>
              </div>
              <div style={{ color: '#ddd', fontSize: 16 }}>›</div>
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
