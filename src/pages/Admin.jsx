import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useStore } from '../hooks/useStore'
import { adminAuth } from '../lib/adminAuth'
import { EQUIPO_NOMBRE } from '../lib/mockData'
import { haptics } from '../lib/haptics'
import { enviarNotificacionResultado } from '../lib/push'

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
const POSICIONES = ['Portero', 'Defensa', 'Centrocampista', 'Delantero']

// Guard: si alguien navega a /admin directamente sin estar logueado, redirige a inicio
function AdminGuard({ children }) {
  const navigate = useNavigate()
  if (!adminAuth.isLogged()) {
    return (
      <div className="page" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', textAlign: 'center' }}>
        <div style={{ fontSize: 48, marginBottom: '1rem' }}>🔒</div>
        <h2 style={{ fontFamily: 'Bebas Neue', fontSize: 26, color: 'var(--verde)', marginBottom: 8 }}>Acceso restringido</h2>
        <p style={{ color: 'var(--gris-mid)', marginBottom: '1.25rem', maxWidth: 280 }}>
          Pulsa el botón <strong>"🔒 Acceso equipo"</strong> en la barra superior para identificarte.
        </p>
        <button className="btn btn-primary" onClick={() => navigate('/')}>Volver al inicio</button>
      </div>
    )
  }
  return children
}

// ---- Modal ----
function Modal({ title, onClose, children }) {
  return (
    <>
      <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.55)', zIndex: 400 }} />
      <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 500, background: 'white', borderRadius: '20px 20px 0 0', padding: '1.5rem', paddingBottom: 'calc(5.5rem + env(safe-area-inset-bottom))', maxHeight: '85vh', overflowY: 'scroll', overflowX: 'hidden', WebkitOverflowScrolling: 'touch', overscrollBehavior: 'contain', boxShadow: '0 -4px 30px rgba(0,0,0,0.2)', animation: 'slideUpModal 0.3s cubic-bezier(0.32,0.72,0,1)' }}>        <div style={{ width: 36, height: 4, background: '#ddd', borderRadius: 2, margin: '-0.5rem auto 1rem' }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h2 style={{ fontSize: 22, color: 'var(--verde)' }}>{title}</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: 22, cursor: 'pointer', color: '#aaa' }}>✕</button>
        </div>
        {children}
      </div>
    </>
  )
}

// ---- Panel Jugadores ----
function PanelJugadores({ jugadores, store }) {
  const [modal, setModal] = useState(null)
  const empty = { nombre: '', posicion: 'Delantero', dorsal: '', foto_url: '' }
  const [form, setForm] = useState(empty)
  const [fotoArchivo, setFotoArchivo] = useState(null)
  const [fotoPreview, setFotoPreview] = useState(null)
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const openAdd = () => { setForm(empty); setFotoArchivo(null); setFotoPreview(null); setModal({ mode: 'add' }) }
  const openEdit = (j) => {
    setForm({ nombre: j.nombre, posicion: j.posicion, dorsal: j.dorsal, foto_url: j.foto_url || '' })
    setFotoArchivo(null)
    setFotoPreview(j.foto_url || null)
    setModal({ mode: 'edit', id: j.id })
  }
  const save = async () => {
    if (!form.nombre.trim()) return
    let foto_url = form.foto_url || null

    if (fotoArchivo) {
      const id = modal.mode === 'add'
        ? Math.max(0, ...store.getJugadores().map(j => j.id)) + 1
        : modal.id
      foto_url = await store.subirFotoJugador(id, fotoArchivo)
    }

    haptics.success()
    if (modal.mode === 'add') store.addJugador({ ...form, dorsal: Number(form.dorsal) || 0, foto_url })
    else store.updateJugador(modal.id, { ...form, dorsal: Number(form.dorsal) || 0, foto_url })
    setFotoArchivo(null)
    setFotoPreview(null)
    setModal(null)
  }
  const del = (id) => { if (window.confirm('¿Eliminar jugador y todas sus estadísticas?')) { haptics.error(); store.deleteJugador(id) } }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
        <span style={{ fontSize: 14, color: 'var(--gris-mid)' }}>{jugadores.length} jugadores</span>
        <button onClick={openAdd} className="btn btn-primary btn-sm">+ Añadir jugador</button>
      </div>
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        {jugadores.map((j, i) => (
          <div key={j.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', borderBottom: i < jugadores.length - 1 ? '1px solid #f5e8eb' : 'none' }}>
            <Avatar jugador={j} size="sm" />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 600 }}>{j.nombre}</div>
              <div style={{ fontSize: 11, color: 'var(--gris-mid)' }}>{j.posicion} · #{j.dorsal}</div>
            </div>
            <button onClick={() => openEdit(j)} style={{ background: 'none', border: '1px solid #c8aab2', borderRadius: 8, padding: '4px 10px', fontSize: 12, cursor: 'pointer', color: 'var(--verde)' }}>Editar</button>
            <button onClick={() => del(j.id)} style={{ background: 'none', border: '1px solid #fcc', borderRadius: 8, padding: '4px 10px', fontSize: 12, cursor: 'pointer', color: '#c0392b' }}>✕</button>
          </div>
        ))}
      </div>
      {modal && (
        <Modal title={modal.mode === 'add' ? 'Nuevo jugador' : 'Editar jugador'} onClose={() => setModal(null)}>
          <div className="form-group"><label className="label">Nombre</label><input className="input" value={form.nombre} onChange={e => set('nombre', e.target.value)} placeholder="Nombre completo" autoFocus /></div>
          <div className="form-group"><label className="label">Posición</label>
            <select className="select" value={form.posicion} onChange={e => set('posicion', e.target.value)}>
              {POSICIONES.map(p => <option key={p}>{p}</option>)}
            </select>
          </div>
          <div className="form-group"><label className="label">Dorsal</label><input className="input" type="number" value={form.dorsal} onChange={e => set('dorsal', e.target.value)} placeholder="Número de camiseta" /></div>
          <div className="form-group">
            <label className="label">Foto de perfil</label>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
              {/* Preview */}
              <div style={{ width: 64, height: 64, borderRadius: '50%', overflow: 'hidden', background: 'var(--verde)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, border: '2px solid #c8aab2' }}>
                {fotoPreview ? (
                  <img src={fotoPreview} alt="foto" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <span style={{ color: '#e8a0b0', fontWeight: 700, fontSize: 20 }}>
                    {form.nombre ? form.nombre.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase() : '?'}
                  </span>
                )}
              </div>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', background: 'white', border: '1.5px solid #c8aab2', borderRadius: 10, padding: '8px 14px', fontSize: 13, cursor: 'pointer', textAlign: 'center', color: 'var(--verde-mid)', fontWeight: 600 }}>
                  📷 {fotoPreview ? 'Cambiar foto' : 'Subir foto'}
                  <input
                    type="file"
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={e => {
                      const file = e.target.files[0]
                      if (!file) return
                      setFotoArchivo(file)
                      setFotoPreview(URL.createObjectURL(file))
                    }}
                  />
                </label>
                {fotoPreview && (
                  <button type="button" onClick={() => { setFotoArchivo(null); setFotoPreview(null); set('foto_url', '') }}
                    style={{ width: '100%', marginTop: 6, background: 'none', border: 'none', fontSize: 12, color: '#c0392b', cursor: 'pointer' }}>
                    Eliminar foto
                  </button>
                )}
              </div>
            </div>
          </div>
          <button onClick={save} className="btn btn-primary btn-block">Guardar</button>
        </Modal>
      )}
    </div>
  )
}

// ---- Panel Partidos ----
function PanelPartidos({ partidos, store }) {
  const [modal, setModal] = useState(null)
  const emptyP = { jornada: '', fecha: '', hora: '', local: EQUIPO_NOMBRE, visitante: '', campo: 'Campo Municipal', jugado: false, goles_local: 0, goles_visitante: 0, amistoso: false }
  const [form, setForm] = useState(emptyP)
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const nuestros = partidos
    .filter(p => p.local === EQUIPO_NOMBRE || p.visitante === EQUIPO_NOMBRE)
    .sort((a, b) => new Date(b.fecha) - new Date(a.fecha))

  const openAdd = () => { setForm(emptyP); setModal({ mode: 'add' }) }
  const openEdit = (p) => { setForm({ jornada: p.jornada, fecha: p.fecha, hora: p.hora || '', local: p.local, visitante: p.visitante, campo: p.campo, jugado: p.jugado, goles_local: p.goles_local, goles_visitante: p.goles_visitante, amistoso: p.amistoso || false }); setModal({ mode: 'edit', id: p.id }) }
  const save = () => {
    if (!form.fecha) return
    const fechaHoraStr = form.hora ? `${form.fecha}T${form.hora}:00` : `${form.fecha}T23:59:00`
    const fechaHora = new Date(fechaHoraStr)
    const esFuturo = fechaHora > new Date()
    const autoJugado = fechaHora < new Date()
    const data = {
      ...form,
      jornada: Number(form.amistoso ? 0 : form.jornada) || 0,
      goles_local: Number(form.goles_local) || 0,
      goles_visitante: Number(form.goles_visitante) || 0,
      jugado: esFuturo ? false : (autoJugado ? true : form.jugado),
    }
    haptics.success()
    if (modal.mode === 'add') store.addPartido(data)
    else store.updatePartido(modal.id, data)

    // Enviar notificación solo si el partido PASA de pendiente a jugado en esta edición
    const eraJugadoAntes = modal.mode === 'edit' && partidos.find(p => p.id === modal.id)?.jugado
    if (data.jugado && !eraJugadoAntes) {
      const esLocal = data.local === EQUIPO_NOMBRE
      const rival = esLocal ? data.visitante : data.local
      const nuestros = esLocal ? data.goles_local : data.goles_visitante
      const rivales = esLocal ? data.goles_visitante : data.goles_local
      const resTexto = nuestros > rivales ? `Victoria ${nuestros}-${rivales}` : nuestros < rivales ? `Derrota ${nuestros}-${rivales}` : `Empate ${nuestros}-${rivales}`
      enviarNotificacionResultado({
        partido_id: modal.id || null,
        rival,
        resultado: resTexto,
      })
    }

    setModal(null)
  }
  const del = (id) => { if (window.confirm('¿Eliminar partido y sus estadísticas?')) store.deletePartido(id) }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
        <span style={{ fontSize: 14, color: 'var(--gris-mid)' }}>{nuestros.length} partidos</span>
        <button onClick={openAdd} className="btn btn-primary btn-sm">+ Añadir partido</button>
      </div>
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        {nuestros.map((p, i) => {
          const rival = p.local === EQUIPO_NOMBRE ? p.visitante : p.local
          return (
            <div key={p.id} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 14px', borderBottom: i < nuestros.length - 1 ? '1px solid #f5e8eb' : 'none' }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{p.amistoso ? 'Amistoso' : `J${p.jornada}`} vs {rival} · {p.jugado ? `${p.goles_local} – ${p.goles_visitante}` : 'Pendiente'}</div>                <div style={{ fontSize: 11, color: 'var(--gris-mid)', display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span>{p.fecha} · {p.hora}</span>
                  {p.amistoso && <span style={{ background: '#fff3cd', color: '#856a00', fontSize: 10, fontWeight: 700, padding: '1px 6px', borderRadius: 10 }}>Amistoso</span>}
                </div>              </div>
              <button onClick={() => openEdit(p)} style={{ background: 'none', border: '1px solid #c8aab2', borderRadius: 8, padding: '4px 10px', fontSize: 12, cursor: 'pointer', color: 'var(--verde)', flexShrink: 0 }}>Editar</button>
              <button onClick={() => del(p.id)} style={{ background: 'none', border: '1px solid #fcc', borderRadius: 8, padding: '4px 10px', fontSize: 12, cursor: 'pointer', color: '#c0392b', flexShrink: 0 }}>✕</button>
            </div>
          )
        })}
      </div>
      {modal && (
        <Modal title={modal.mode === 'add' ? 'Nuevo partido' : 'Editar partido'} onClose={() => setModal(null)}>
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
          <div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <label className="label">Fecha</label>
              <input className="input" type="date" value={form.fecha} onChange={e => set('fecha', e.target.value)}
                style={{ width: '100%', minWidth: 0, boxSizing: 'border-box' }} />
            </div>
            <div style={{ flex: '0 0 110px', minWidth: 0 }}>
              <label className="label">Hora</label>
              <input className="input" type="time" value={form.hora} onChange={e => set('hora', e.target.value)}
                style={{ width: '100%', minWidth: 0, boxSizing: 'border-box' }} />
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
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, justifyContent: 'center' }}>
                  <button type="button" onClick={() => set('goles_local', Math.max(0, (Number(form.goles_local) || 0) - 1))} style={{ width: 40, height: 40, borderRadius: '50%', border: '1.5px solid #c8aab2', background: 'white', fontSize: 20, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>−</button>
                  <span style={{ fontFamily: 'Bebas Neue', fontSize: 32, color: 'var(--verde)', minWidth: 28, textAlign: 'center', lineHeight: 1 }}>{Number(form.goles_local) || 0}</span>
                  <button type="button" onClick={() => set('goles_local', (Number(form.goles_local) || 0) + 1)} style={{ width: 40, height: 40, borderRadius: '50%', border: '1.5px solid #c8aab2', background: 'white', fontSize: 20, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>+</button>
                </div>
              </div>
              <div>
                <div className="label" style={{ textAlign: 'center', marginBottom: 8 }}>Goles {String(form.visitante).split(' ')[0] || 'Visitante'}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, justifyContent: 'center' }}>
                  <button type="button" onClick={() => set('goles_visitante', Math.max(0, (Number(form.goles_visitante) || 0) - 1))} style={{ width: 40, height: 40, borderRadius: '50%', border: '1.5px solid #c8aab2', background: 'white', fontSize: 20, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>−</button>
                  <span style={{ fontFamily: 'Bebas Neue', fontSize: 32, color: 'var(--verde)', minWidth: 28, textAlign: 'center', lineHeight: 1 }}>{Number(form.goles_visitante) || 0}</span>
                  <button type="button" onClick={() => set('goles_visitante', (Number(form.goles_visitante) || 0) + 1)} style={{ width: 40, height: 40, borderRadius: '50%', border: '1.5px solid #c8aab2', background: 'white', fontSize: 20, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>+</button>
                </div>
              </div>
            </div>
          )}

          <button onClick={save} className="btn btn-primary btn-block" style={{ fontSize: 16 }}>
            ⚽ Guardar partido
          </button>
        </Modal>
      )}
    </div>
  )
}

// ---- Panel Stats ----
function PanelStats({ jugadores, partidos, stats, store }) {
  const [partidoSel, setPartidoSel] = useState('')
  const [modal, setModal] = useState(null)
  const emptyS = { jugador_id: '', goles: 0, asistencias: 0, tarjetas_amarillas: 0, tarjetas_rojas: 0, paradas: 0, goles_encajados: 0 }
  const [form, setForm] = useState(emptyS)
  const [mvpSel, setMvpSel] = useState('')
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const partidoId = params.get('partido')
    if (partidoId && partidos.length > 0) {
      const p = partidos.find(x => x.id === Number(partidoId))
      if (p) setPartidoSel(p.id)
    }
  }, [partidos])

  const jugados = partidos
    .filter(p => p.jugado && (p.local === EQUIPO_NOMBRE || p.visitante === EQUIPO_NOMBRE))
    .sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
  const statsDelPartido = stats.filter(s => s.partido_id === Number(partidoSel))

  const openAdd = () => { setForm(emptyS); setModal({ mode: 'add' }) }
  const openEdit = (s) => { setForm({ jugador_id: String(s.jugador_id), goles: s.goles, asistencias: s.asistencias, tarjetas_amarillas: s.tarjetas_amarillas, tarjetas_rojas: s.tarjetas_rojas, paradas: s.paradas || 0, goles_encajados: s.goles_encajados || 0 }); setModal({ mode: 'edit', jugador_id: s.jugador_id }) }
  const save = () => {
    if (!form.jugador_id || !partidoSel) return
    haptics.success(); store.upsertStat({ jugador_id: Number(form.jugador_id), partido_id: Number(partidoSel), goles: form.goles, asistencias: form.asistencias, tarjetas_amarillas: form.tarjetas_amarillas, tarjetas_rojas: form.tarjetas_rojas, paradas: form.paradas || 0, goles_encajados: form.goles_encajados || 0 })
    store.updatePartido(Number(partidoSel), { mvp_jugador_id: mvpSel ? Number(mvpSel) : null })
    setModal(null)
  }
  const del = (jid) => { if (window.confirm('¿Eliminar estas estadísticas?')) store.deleteStat(jid, Number(partidoSel)) }

  return (
    <div>
      <div className="form-group">
        <label className="label">Selecciona un partido jugado</label>
        <select className="select" value={partidoSel} onChange={e => setPartidoSel(e.target.value)}>
          <option value="">Elige un partido...</option>
          {jugados.map(p => {
            const rival = p.local === EQUIPO_NOMBRE ? p.visitante : p.local
            return <option key={p.id} value={p.id}>{p.amistoso ? 'Amistoso' : `J${p.jornada}`} vs {rival} ({p.goles_local}–{p.goles_visitante}) · {p.fecha}</option>
          })}
        </select>
      </div>
      {partidoSel && (
        <>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
            <span style={{ fontSize: 14, color: 'var(--gris-mid)' }}>{statsDelPartido.length} jugadores registrados</span>
            <button onClick={openAdd} className="btn btn-primary btn-sm">+ Añadir jugador</button>
          </div>
          <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
            {statsDelPartido.length === 0 && <div className="empty" style={{ padding: '1.5rem' }}>Sin estadísticas — pulsa "Añadir jugador"</div>}
            {statsDelPartido.map((s, i) => {
              const j = jugadores.find(x => x.id === s.jugador_id)
              if (!j) return null
              return (
                <div key={s.id} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 14px', borderBottom: i < statsDelPartido.length - 1 ? '1px solid #f5e8eb' : 'none' }}>
                  <Avatar jugador={j} size="sm" />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 600 }}>{j.nombre}</div>
                    <div style={{ fontSize: 11, color: 'var(--gris-mid)' }}>
                      ⚽{s.goles} 🅰️{s.asistencias} 🟨{s.tarjetas_amarillas} 🟥{s.tarjetas_rojas}
                      {s.paradas > 0 || s.goles_encajados > 0 ? ` · 🧤${s.paradas} 🥅${s.goles_encajados}` : ''}
                    </div>
                  </div>
                  <button onClick={() => openEdit(s)} style={{ background: 'none', border: '1px solid #c8aab2', borderRadius: 8, padding: '4px 10px', fontSize: 12, cursor: 'pointer', color: 'var(--verde)' }}>Editar</button>
                  <button onClick={() => del(s.jugador_id)} style={{ background: 'none', border: '1px solid #fcc', borderRadius: 8, padding: '4px 10px', fontSize: 12, cursor: 'pointer', color: '#c0392b' }}>✕</button>
                </div>
              )
            })}
          </div>
        </>
      )}
      {modal && (
        <Modal title={modal.mode === 'add' ? 'Añadir estadísticas' : 'Editar estadísticas'} onClose={() => setModal(null)}>
          {modal.mode === 'add' && (
            <div className="form-group">
              <label className="label">Jugador</label>
              <select className="select" value={form.jugador_id} onChange={e => set('jugador_id', e.target.value)}>
                <option value="">Seleccionar...</option>
                {jugadores.map(j => <option key={j.id} value={j.id}>#{j.dorsal} — {j.nombre}</option>)}
              </select>
            </div>
          )}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
            {[
              ['goles', '⚽ Goles'],
              ['asistencias', '🅰️ Asistencias'],
              ['tarjetas_amarillas', '🟨 Amarillas'],
              ['tarjetas_rojas', '🟥 Rojas'],
              ...(jugadores.find(j => j.id === Number(form.jugador_id))?.posicion === 'Portero'
                ? [['paradas', '🧤 Paradas'], ['goles_encajados', '🥅 Goles encajados']]
                : []
              )
            ].map(([k, l]) => (
              <div key={k} style={{ textAlign: 'center' }}>
                <div className="label" style={{ textAlign: 'center', marginBottom: 8 }}>{l}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, justifyContent: 'center' }}>
                  <button type="button" onClick={() => set(k, Math.max(0, (Number(form[k]) || 0) - 1))} style={{ width: 40, height: 40, borderRadius: '50%', border: '1.5px solid #c8aab2', background: 'white', fontSize: 20, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>−</button>
                  <span style={{ fontFamily: 'Bebas Neue', fontSize: 32, color: 'var(--verde)', minWidth: 28, textAlign: 'center', lineHeight: 1 }}>{Number(form[k]) || 0}</span>
                  <button type="button" onClick={() => set(k, (Number(form[k]) || 0) + 1)} style={{ width: 40, height: 40, borderRadius: '50%', border: '1.5px solid #c8aab2', background: 'white', fontSize: 20, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>+</button>
                </div>
              </div>
            ))}
          </div>
          <div className="form-group">
            <label className="label">⭐ MVP del partido</label>
            <select className="select" value={mvpSel} onChange={e => setMvpSel(e.target.value)}>
              <option value="">Sin MVP</option>
              {jugadores.map(j => (
                <option key={j.id} value={j.id}>#{j.dorsal} — {j.nombre}</option>
              ))}
            </select>
          </div>
          <button onClick={save} className="btn btn-primary btn-block">Guardar</button>
        </Modal>
      )}
    </div>
  )
}

// ---- Panel Clasificación ----
function PanelClasificacion({ clasificacion, store }) {
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState({})
  const [showAdd, setShowAdd] = useState(false)
  const [newEquipo, setNewEquipo] = useState({ equipo: '', grupo: 'A' })
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const grupos = [...new Set(clasificacion.map(e => e.grupo || 'A'))].sort()
  const [grupoFiltro, setGrupoFiltro] = useState(null)
  const grupoActivo = grupoFiltro || grupos[0] || 'A'
  const equiposFiltrados = clasificacion
    .filter(e => (e.grupo || 'A') === grupoActivo)
    .sort((a, b) => b.pts - a.pts || (b.gf - b.gc) - (a.gf - a.gc))

  const openEdit = (e) => { setForm({ ...e }); setEditing(e.equipo) }
  const save = () => {
    store.updateFilaClasificacion(editing, { ...form, pj: +form.pj, pg: +form.pg, pe: +form.pe, pp: +form.pp, gf: +form.gf, gc: +form.gc, pts: +form.pts, grupo: form.grupo || 'A' })
    setEditing(null)
  }
  const handleAdd = () => {
    if (!newEquipo.equipo.trim()) return
    store.addEquipoClasificacion({ equipo: newEquipo.equipo.trim(), grupo: newEquipo.grupo || 'A' })
    setNewEquipo({ equipo: '', grupo: newEquipo.grupo })
    setShowAdd(false)
  }
  const handleDelete = (equipo) => {
    if (window.confirm(`¿Eliminar ${equipo} de la clasificación?`)) store.deleteEquipoClasificacion(equipo)
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
        <span style={{ fontSize: 14, color: 'var(--gris-mid)' }}>{clasificacion.length} equipos</span>
        <button onClick={() => setShowAdd(true)} className="btn btn-primary btn-sm">+ Añadir equipo</button>
      </div>

      {/* Filtro por grupo */}
      {grupos.length > 0 && (
        <div style={{ display: 'flex', gap: 6, overflowX: 'auto', marginBottom: 10, scrollbarWidth: 'none' }}>
          {grupos.map(g => (
            <button key={g} onClick={() => setGrupoFiltro(g)}
              style={{
                padding: '5px 14px', borderRadius: 20, border: '1.5px solid', fontSize: 12, fontWeight: 700, cursor: 'pointer', flexShrink: 0,
                background: grupoActivo === g ? 'var(--verde)' : 'white',
                color: grupoActivo === g ? 'white' : 'var(--verde-mid)',
                borderColor: grupoActivo === g ? 'var(--verde)' : '#c8aab2'
              }}>
              Grupo {g}
            </button>
          ))}
        </div>
      )}

      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        {equiposFiltrados.length === 0 && <div className="empty">Sin equipos en este grupo</div>}
        {equiposFiltrados.map((e, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 14px', borderBottom: i < equiposFiltrados.length - 1 ? '1px solid #f5e8eb' : 'none' }}>
            <div style={{ fontFamily: 'Bebas Neue', fontSize: 18, color: 'var(--gris-mid)', minWidth: 20 }}>{i + 1}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 13, fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{e.equipo}</div>
              <div style={{ fontSize: 11, color: 'var(--gris-mid)' }}>PJ:{e.pj} G:{e.pg} E:{e.pe} P:{e.pp} GF:{e.gf} GC:{e.gc} · {e.pts}pts</div>
            </div>
            <button onClick={() => openEdit(e)} style={{ background: 'none', border: '1px solid #c8aab2', borderRadius: 8, padding: '4px 10px', fontSize: 12, cursor: 'pointer', color: 'var(--verde)', flexShrink: 0 }}>Editar</button>
            <button onClick={() => handleDelete(e.equipo)} style={{ background: 'none', border: '1px solid #fcc', borderRadius: 8, padding: '4px 10px', fontSize: 12, cursor: 'pointer', color: '#c0392b', flexShrink: 0 }}>✕</button>
          </div>
        ))}
      </div>

      {/* Modal añadir equipo */}
      {showAdd && (
        <Modal title="Añadir equipo" onClose={() => setShowAdd(false)}>
          <div className="form-group">
            <label className="label">Nombre del equipo</label>
            <input className="input" value={newEquipo.equipo} onChange={e => setNewEquipo(n => ({ ...n, equipo: e.target.value }))} autoFocus />
          </div>
          <div className="form-group">
            <label className="label">Grupo</label>
            <input className="input" value={newEquipo.grupo} onChange={e => setNewEquipo(n => ({ ...n, grupo: e.target.value.toUpperCase() }))} placeholder="A, B, C..." maxLength={2} />
          </div>
          <button onClick={handleAdd} className="btn btn-primary btn-block">Añadir</button>
        </Modal>
      )}

      {/* Modal editar equipo */}
      {editing && (
        <Modal title={`Editar: ${editing}`} onClose={() => setEditing(null)}>
          <div className="form-group">
            <label className="label">Grupo</label>
            <input className="input" value={form.grupo || 'A'} onChange={e => set('grupo', e.target.value.toUpperCase())} maxLength={2} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {[['pj', 'PJ — Jugados'], ['pg', 'PG — Ganados'], ['pe', 'PE — Empates'], ['pp', 'PP — Perdidos'], ['gf', 'GF — Goles favor'], ['gc', 'GC — Goles contra'], ['pts', 'Pts — Puntos']].map(([k, l]) => (
              <div key={k} className="form-group" style={{ marginBottom: 10 }}>
                <label className="label">{l}</label>
                <input className="input" type="number" value={form[k] || 0} onChange={e => set(k, e.target.value)} style={{ padding: '8px 10px', minHeight: 44 }} />
              </div>
            ))}
          </div>
          <button onClick={save} className="btn btn-primary btn-block">Guardar</button>
        </Modal>
      )}
    </div>
  )
}

// ---- Panel Temporada ----
function PanelTemporada({ store }) {
  const [temporadaActiva, setTemporadaActiva] = useState(null)
  const [temporadas, setTemporadas] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ nombre: '', año: new Date().getFullYear() + 1 })
  const [cerrando, setCerrando] = useState(false)
  const [confirmando, setConfirmando] = useState(false)
  const [pwdSuper, setPwdSuper] = useState('')
  const [showPwdSuper, setShowPwdSuper] = useState(false)
  const [errorPwd, setErrorPwd] = useState('')

  useEffect(() => {
    if (!store.getTemporadas) return
    store.getTemporadas().then(ts => {
      setTemporadas(ts)
      setTemporadaActiva(ts.find(t => t.activa) || null)
    }).catch(() => { })
  }, [])

  const verificarYCerrar = async () => {
    const superPwd = import.meta.env.VITE_SUPERADMIN_PASSWORD
    if (!superPwd || pwdSuper !== superPwd) { setErrorPwd('Contraseña incorrecta'); return }
    if (!form.nombre.trim()) { alert('Pon nombre a la nueva temporada'); return }
    setCerrando(true)
    await store.cerrarTemporadaYCrearNueva(form.nombre.trim(), Number(form.año))
    const ts = await store.getTemporadas()
    setTemporadas(ts)
    setTemporadaActiva(ts.find(t => t.activa) || null)
    setShowForm(false); setConfirmando(false); setPwdSuper(''); setErrorPwd(''); setCerrando(false)
  }

  return (
    <div>
      <div className="card" style={{ marginBottom: '1rem', background: 'linear-gradient(135deg,#0d0a0b,#3d1020)' }}>
        <div style={{ fontSize: 11, color: '#e8a0b0', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 6 }}>Temporada activa</div>
        <div style={{ fontFamily: 'Bebas Neue', fontSize: 24, color: 'white', lineHeight: 1 }}>{temporadaActiva?.nombre || 'Cargando...'}</div>
        <div style={{ fontSize: 12, color: '#6a3a42', marginTop: 4 }}>Año {temporadaActiva?.año} · Todos los datos actuales pertenecen a esta temporada</div>
      </div>

      {!showForm ? (
        <button onClick={() => setShowForm(true)} className="btn btn-ghost btn-block" style={{ marginBottom: '1.5rem' }}>
          🔚 Cerrar temporada y empezar nueva
        </button>
      ) : (
        <div className="card" style={{ marginBottom: '1.5rem', border: '2px solid var(--verde)' }}>
          <h2 style={{ fontSize: 18, color: 'var(--verde)', marginBottom: 14 }}>Nueva temporada</h2>
          {!confirmando ? (
            <>
              <div className="form-group">
                <label className="label">Nombre de la nueva temporada</label>
                <input className="input" value={form.nombre} onChange={e => setForm(f => ({ ...f, nombre: e.target.value }))} placeholder="Ej: Liga Verano Villacañas 2027" />
              </div>
              <div className="form-group">
                <label className="label">Año</label>
                <input className="input" type="number" value={form.año} onChange={e => setForm(f => ({ ...f, año: e.target.value }))} />
              </div>
              <div style={{ display: 'flex', gap: 10 }}>
                <button onClick={() => setShowForm(false)} className="btn btn-ghost" style={{ flex: 1 }}>Cancelar</button>
                <button onClick={() => setConfirmando(true)} className="btn btn-primary" style={{ flex: 1 }}>Continuar →</button>
              </div>
            </>
          ) : (
            <>
              <div style={{ background: '#fde8e8', border: '1px solid #f5c0c0', borderRadius: 10, padding: '12px 14px', marginBottom: 14, fontSize: 13, color: '#c0392b' }}>
                ⚠️ <strong>Atención:</strong> Al cerrar <strong>"{temporadaActiva?.nombre}"</strong>, los partidos, estadísticas y clasificación quedarán archivados. Los jugadores se mantienen. Esta acción no se puede deshacer.
              </div>
              <div className="form-group">
                <label className="label">🔐 Contraseña de superadmin</label>
                <div style={{ position: 'relative' }}>
                  <input className="input" type={showPwdSuper ? 'text' : 'password'} placeholder="Solo el creador de la app puede hacer esto" value={pwdSuper} onChange={e => { setPwdSuper(e.target.value); setErrorPwd('') }} style={{ paddingRight: 48 }} />
                  <button type="button" onClick={() => setShowPwdSuper(v => !v)} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', fontSize: 20, color: 'var(--gris-mid)', padding: 4 }}>
                    {showPwdSuper ? '🙈' : '👁️'}
                  </button>
                </div>
                {errorPwd && <div style={{ color: '#c0392b', fontSize: 12, marginTop: 4 }}>⚠️ {errorPwd}</div>}
              </div>
              <div style={{ display: 'flex', gap: 10 }}>
                <button onClick={() => { setConfirmando(false); setPwdSuper(''); setErrorPwd('') }} className="btn btn-ghost" style={{ flex: 1 }}>Atrás</button>
                <button onClick={verificarYCerrar} disabled={cerrando || !pwdSuper} style={{ flex: 1, background: '#c0392b', color: 'white', border: 'none', borderRadius: 10, padding: '12px', fontWeight: 700, fontSize: 15, cursor: 'pointer', opacity: (cerrando || !pwdSuper) ? 0.5 : 1 }}>
                  {cerrando ? 'Cerrando...' : '🔚 Confirmar y cerrar'}
                </button>
              </div>
            </>
          )}
        </div>
      )}

      <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--gris-mid)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>Temporadas anteriores</div>
      {temporadas.filter(t => !t.activa).length === 0 && <div className="empty" style={{ padding: '1.5rem' }}>Esta es la primera temporada</div>}
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        {temporadas.filter(t => !t.activa).map((t, i, arr) => (
          <div key={t.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', borderBottom: i < arr.length - 1 ? '1px solid #f5e8eb' : 'none' }}>
            <div style={{ fontSize: 24 }}>🏆</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 600 }}>{t.nombre}</div>
              <div style={{ fontSize: 12, color: 'var(--gris-mid)' }}>Temporada {t.año} · Archivada</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ---- Panel Log ----
function PanelLog({ store, jugadores }) {
  const [desbloqueado, setDesbloqueado] = useState(false)
  const [pwdInput, setPwdInput] = useState('')
  const [errorPwd, setErrorPwd] = useState('')
  const [showPwd, setShowPwd] = useState(false)
  const [logs, setLogs] = useState([])
  const [cargando, setCargando] = useState(false)
  const [filtroJugador, setFiltroJugador] = useState('')
  const [filtroFecha, setFiltroFecha] = useState('')

  const verificar = () => {
    const superPwd = import.meta.env.VITE_SUPERADMIN_PASSWORD
    if (!superPwd || pwdInput !== superPwd) { setErrorPwd('Contraseña incorrecta'); return }
    setDesbloqueado(true)
    setCargando(true)
    store.getLog()
      .then(data => { setLogs(data || []); setCargando(false) })
      .catch(() => setCargando(false))
  }

  if (!desbloqueado) return (
    <div className="card" style={{ textAlign: 'center' }}>
      <div style={{ fontSize: 40, marginBottom: 12 }}>🔐</div>
      <div style={{ fontFamily: 'Bebas Neue', fontSize: 22, color: 'var(--verde)', marginBottom: 6 }}>Área restringida</div>
      <div style={{ fontSize: 13, color: 'var(--gris-mid)', marginBottom: 20 }}>Solo el superadmin puede ver el log de actividad</div>
      <div style={{ position: 'relative', marginBottom: 12 }}>
        <input className="input" type={showPwd ? 'text' : 'password'} placeholder="Contraseña de superadmin"
          value={pwdInput} onChange={e => { setPwdInput(e.target.value); setErrorPwd('') }}
          onKeyDown={e => e.key === 'Enter' && verificar()} style={{ paddingRight: 48 }} />
        <button type="button" onClick={() => setShowPwd(v => !v)}
          style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', fontSize: 20, color: 'var(--gris-mid)' }}>
          {showPwd ? '🙈' : '👁️'}
        </button>
      </div>
      {errorPwd && <div style={{ color: '#c0392b', fontSize: 13, marginBottom: 10 }}>⚠️ {errorPwd}</div>}
      <button onClick={verificar} className="btn btn-primary btn-block">Ver log de actividad</button>
    </div>
  )

  function fmtFecha(str) {
    const d = new Date(str)
    return d.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' }) + ' · ' + d.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
  }

  const jugadoresLog = [...new Set(logs.map(l => l.jugador_nombre).filter(Boolean))].sort()

  // Fechas únicas disponibles (solo día, sin hora)
  const fechasLog = [...new Set(logs.map(l => l.created_at?.substring(0, 10)).filter(Boolean))].sort().reverse()

  const filtrados = logs.filter(l => {
    const porJugador = !filtroJugador || l.jugador_nombre === filtroJugador
    const porFecha = !filtroFecha || l.created_at?.startsWith(filtroFecha)
    return porJugador && porFecha
  })

  const colorEntidad = { 'Jugador': '#185fa5', 'Partido': '#7a1e30', 'Estadísticas': '#856a00', 'Clasificación': '#1a7a3a', 'Alineación': '#6a1e7a', 'Noticia': '#c0392b' }

  if (cargando) return <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--gris-mid)' }}>Cargando log...</div>

  return (
    <div>
      {/* Filtros */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 12, flexWrap: 'wrap' }}>
        <select className="select" value={filtroJugador} onChange={e => setFiltroJugador(e.target.value)}
          style={{ flex: 1, minWidth: 130, fontSize: 13, minHeight: 36, padding: '6px 10px' }}>
          <option value="">Todos los jugadores</option>
          {jugadoresLog.map(n => <option key={n} value={n}>{n}</option>)}
        </select>
        <select className="select" value={filtroFecha} onChange={e => setFiltroFecha(e.target.value)}
          style={{ flex: 1, minWidth: 130, fontSize: 13, minHeight: 36, padding: '6px 10px' }}>
          <option value="">Todas las fechas</option>
          {fechasLog.map(f => (
            <option key={f} value={f}>
              {new Date(f + 'T12:00:00').toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' })}
            </option>
          ))}
        </select>
      </div>

      <div style={{ fontSize: 13, color: 'var(--gris-mid)', marginBottom: 10 }}>
        {filtrados.length} {filtrados.length === 1 ? 'acción' : 'acciones'}
        {(filtroJugador || filtroFecha) && (
          <button onClick={() => { setFiltroJugador(''); setFiltroFecha('') }}
            style={{ marginLeft: 8, background: 'none', border: 'none', color: 'var(--verde)', fontSize: 12, cursor: 'pointer', fontWeight: 600 }}>
            ✕ Limpiar filtros
          </button>
        )}
      </div>

      {filtrados.length === 0 && <div className="empty">Sin actividad para este filtro</div>}

      {filtrados.length > 0 && (
        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          {filtrados.map((l, i) => {
            // Buscar foto del jugador
            const jugador = jugadores.find(j => j.id === l.jugador_id)
            const initials = (l.jugador_nombre || '?').split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
            return (
              <div key={l.id} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '10px 14px', borderBottom: i < filtrados.length - 1 ? '1px solid #f5e8eb' : 'none' }}>
                {/* Avatar con foto o inicial */}
                <div style={{ width: 36, height: 36, borderRadius: '50%', flexShrink: 0, background: 'var(--negro)', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {jugador?.foto_url
                    ? <img src={jugador.foto_url} alt={jugador.nombre} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    : <span style={{ color: 'var(--dorado-light)', fontSize: 11, fontWeight: 700 }}>{initials}</span>
                  }
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
                    <span>{l.accion}</span>
                    <span style={{ background: colorEntidad[l.entidad] || '#999', color: 'white', fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 20 }}>{l.entidad}</span>
                  </div>
                  {l.detalle && <div style={{ fontSize: 12, color: 'var(--gris-mid)', marginTop: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{l.detalle}</div>}
                  <div style={{ fontSize: 11, color: 'var(--gris-light)', marginTop: 3 }}>
                    <strong style={{ color: 'var(--gris-mid)' }}>{l.jugador_nombre || 'Desconocido'}</strong>{' · '}{fmtFecha(l.created_at)}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

// ---- Main Admin ----
const adminTabs = [
  { key: 'stats', label: '📊 Stats' },
  { key: 'partidos', label: '⚽ Partidos' },
  { key: 'jugadores', label: '👕 Plantilla' },
  { key: 'tabla', label: '🏆 Tabla' },
  { key: 'temporada', label: '📅 Temporada' },
  { key: 'log', label: '📋 Actividad' },
]

export default function Admin() {
  const { jugadores, partidos, stats, clasificacion, store } = useStore()
  const [tab, setTab] = useState(() => {
    const params = new URLSearchParams(window.location.search)
    return params.get('tab') || 'stats'
  })
  const navigate = useNavigate()

  const handleLogout = () => {
    adminAuth.logout()
    navigate('/')
  }

  return (
    <AdminGuard>
      <div className="page anim-fade">
        {/* Header admin */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '1rem' }}>
          <div style={{ background: 'var(--verde)', borderRadius: 10, width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 }}>⚙️</div>
          <div style={{ flex: 1 }}>
            <h1 style={{ fontFamily: 'Bebas Neue', fontSize: 26, color: 'var(--verde)', lineHeight: 1 }}>Panel de gestión</h1>
            <div style={{ fontSize: 12, color: 'var(--gris-mid)' }}>Tejera Balompié · Liga Verano 2026</div>
          </div>
          <button
            onClick={handleLogout}
            style={{ background: 'none', border: '1px solid #c8aab2', borderRadius: 8, padding: '5px 10px', fontSize: 11, cursor: 'pointer', color: 'var(--gris-mid)' }}>
            Salir
          </button>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 6, marginBottom: '1.25rem', overflowX: 'auto', scrollbarWidth: 'none' }}>
          {adminTabs.map(t => (
            <button key={t.key} onClick={() => setTab(t.key)} style={{ padding: '8px 16px', borderRadius: 20, whiteSpace: 'nowrap', border: '1.5px solid', fontSize: 13, fontWeight: 600, cursor: 'pointer', flexShrink: 0, background: tab === t.key ? 'var(--verde)' : 'white', color: tab === t.key ? 'white' : 'var(--verde-mid)', borderColor: tab === t.key ? 'var(--verde)' : '#c8aab2' }}>
              {t.label}
            </button>
          ))}
        </div>

        {tab === 'jugadores' && <PanelJugadores jugadores={jugadores} store={store} />}
        {tab === 'partidos' && <PanelPartidos partidos={partidos} store={store} />}
        {tab === 'stats' && <PanelStats jugadores={jugadores} partidos={partidos} stats={stats} store={store} />}
        {tab === 'tabla' && <PanelClasificacion clasificacion={clasificacion} store={store} />}
        {tab === 'temporada' && <PanelTemporada store={store} />}
        {tab === 'log' && <PanelLog store={store} jugadores={jugadores} />}
      </div>
    </AdminGuard>
  )
}
