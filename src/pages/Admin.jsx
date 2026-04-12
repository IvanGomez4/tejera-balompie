import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useStore } from '../hooks/useStore'
import { adminAuth } from '../lib/adminAuth'
import { EQUIPO_NOMBRE } from '../lib/mockData'

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
      <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 500, background: 'white', borderRadius: '20px 20px 0 0', padding: '1.5rem', paddingBottom: 'calc(1.5rem + env(safe-area-inset-bottom))', maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 -4px 30px rgba(0,0,0,0.2)' }}>
        <div style={{ width: 36, height: 4, background: '#ddd', borderRadius: 2, margin: '-0.5rem auto 1rem' }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h2 style={{ fontSize: 22, color: 'var(--verde)' }}>{title}</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: 22, cursor: 'pointer', color: '#aaa' }}>✕</button>
        </div>
        {children}
      </div>
    </>
  )
}

// ---- Counter ----
function Counter({ value, onChange }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <button type="button" onClick={() => onChange(Math.max(0, value - 1))} style={{ width: 40, height: 40, borderRadius: '50%', border: '1.5px solid #c8aab2', background: 'white', fontSize: 20, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>−</button>
      <span style={{ fontFamily: 'Bebas Neue', fontSize: 32, color: 'var(--verde)', minWidth: 28, textAlign: 'center', lineHeight: 1 }}>{value}</span>
      <button type="button" onClick={() => onChange(value + 1)} style={{ width: 40, height: 40, borderRadius: '50%', border: '1.5px solid #c8aab2', background: 'white', fontSize: 20, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>+</button>
    </div>
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

    if (modal.mode === 'add') store.addJugador({ ...form, dorsal: Number(form.dorsal) || 0, foto_url })
    else store.updateJugador(modal.id, { ...form, dorsal: Number(form.dorsal) || 0, foto_url })
    setFotoArchivo(null)
    setFotoPreview(null)
    setModal(null)
  }
  const del = (id) => { if (window.confirm('¿Eliminar jugador y todas sus estadísticas?')) store.deleteJugador(id) }

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
  const emptyP = { jornada: '', fecha: '', local: EQUIPO_NOMBRE, visitante: '', campo: 'Campo Municipal', jugado: false, goles_local: 0, goles_visitante: 0 }
  const [form, setForm] = useState(emptyP)
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const nuestros = partidos
    .filter(p => p.local === EQUIPO_NOMBRE || p.visitante === EQUIPO_NOMBRE)
    .sort((a, b) => new Date(b.fecha) - new Date(a.fecha))

  const openAdd = () => { setForm(emptyP); setModal({ mode: 'add' }) }
  const openEdit = (p) => { setForm({ jornada: p.jornada, fecha: p.fecha, local: p.local, visitante: p.visitante, campo: p.campo, jugado: p.jugado, goles_local: p.goles_local, goles_visitante: p.goles_visitante }); setModal({ mode: 'edit', id: p.id }) }
  const save = () => {
    if (!form.fecha) return
    const data = { ...form, jornada: Number(form.jornada) || 0, goles_local: Number(form.goles_local) || 0, goles_visitante: Number(form.goles_visitante) || 0 }
    if (modal.mode === 'add') store.addPartido(data)
    else store.updatePartido(modal.id, data)
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
                <div style={{ fontSize: 13, fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>J{p.jornada} · vs. {rival}</div>
                <div style={{ fontSize: 11, color: 'var(--gris-mid)' }}>{p.fecha} · {p.jugado ? `${p.goles_local}–${p.goles_visitante}` : 'Pendiente'}</div>
              </div>
              <button onClick={() => openEdit(p)} style={{ background: 'none', border: '1px solid #c8aab2', borderRadius: 8, padding: '4px 10px', fontSize: 12, cursor: 'pointer', color: 'var(--verde)', flexShrink: 0 }}>Editar</button>
              <button onClick={() => del(p.id)} style={{ background: 'none', border: '1px solid #fcc', borderRadius: 8, padding: '4px 10px', fontSize: 12, cursor: 'pointer', color: '#c0392b', flexShrink: 0 }}>✕</button>
            </div>
          )
        })}
      </div>
      {modal && (
        <Modal title={modal.mode === 'add' ? 'Nuevo partido' : 'Editar partido'} onClose={() => setModal(null)}>
          <div className="form-group"><label className="label">Jornada</label><input className="input" type="number" value={form.jornada} onChange={e => set('jornada', e.target.value)} placeholder="Nº jornada" /></div>
          <div className="form-group"><label className="label">Fecha</label><input className="input" type="date" value={form.fecha} onChange={e => set('fecha', e.target.value)} /></div>
          <div className="form-group"><label className="label">Equipo local</label><input className="input" value={form.local} onChange={e => set('local', e.target.value)} /></div>
          <div className="form-group"><label className="label">Equipo visitante</label><input className="input" value={form.visitante} onChange={e => set('visitante', e.target.value)} placeholder="Nombre del rival" /></div>
          <div className="form-group"><label className="label">Campo</label><input className="input" value={form.campo} onChange={e => set('campo', e.target.value)} /></div>
          <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <input type="checkbox" id="jugado" checked={form.jugado} onChange={e => set('jugado', e.target.checked)} style={{ width: 18, height: 18, accentColor: 'var(--verde)' }} />
            <label htmlFor="jugado" className="label" style={{ margin: 0 }}>Partido ya jugado</label>
          </div>
          {form.jugado && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16, textAlign: 'center' }}>
              <div><div className="label" style={{ textAlign: 'center', marginBottom: 8 }}>Goles {String(form.local).split(' ')[0]}</div><Counter value={Number(form.goles_local) || 0} onChange={v => set('goles_local', v)} /></div>
              <div><div className="label" style={{ textAlign: 'center', marginBottom: 8 }}>Goles {String(form.visitante).split(' ')[0] || 'Visitante'}</div><Counter value={Number(form.goles_visitante) || 0} onChange={v => set('goles_visitante', v)} /></div>
            </div>
          )}
          <button onClick={save} className="btn btn-primary btn-block">Guardar</button>
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

  const jugados = partidos
    .filter(p => p.jugado && (p.local === EQUIPO_NOMBRE || p.visitante === EQUIPO_NOMBRE))
    .sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
  const statsDelPartido = stats.filter(s => s.partido_id === Number(partidoSel))

  const openAdd = () => { setForm(emptyS); setModal({ mode: 'add' }) }
  const openEdit = (s) => { setForm({ jugador_id: String(s.jugador_id), goles: s.goles, asistencias: s.asistencias, tarjetas_amarillas: s.tarjetas_amarillas, tarjetas_rojas: s.tarjetas_rojas, paradas: s.paradas || 0, goles_encajados: s.goles_encajados || 0 }); setModal({ mode: 'edit', jugador_id: s.jugador_id }) }
  const save = () => {
    if (!form.jugador_id || !partidoSel) return
    store.upsertStat({ jugador_id: Number(form.jugador_id), partido_id: Number(partidoSel), goles: form.goles, asistencias: form.asistencias, tarjetas_amarillas: form.tarjetas_amarillas, tarjetas_rojas: form.tarjetas_rojas, paradas: form.paradas || 0, goles_encajados: form.goles_encajados || 0 })
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
            return <option key={p.id} value={p.id}>J{p.jornada} · vs {rival} ({p.goles_local}–{p.goles_visitante}) · {p.fecha}</option>
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
                <Counter value={form[k]} onChange={v => set(k, v)} />
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
            <input className="input" value={newEquipo.equipo} onChange={e => setNewEquipo(n => ({ ...n, equipo: e.target.value }))} placeholder="Ej: CD Villacañas" autoFocus />
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

// ---- Panel Log ----
function PanelLog({ store }) {
  const [logs, setLogs] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(false)
  const [filtroJugador, setFiltroJugador] = useState('')

  useEffect(() => {
    if (!store.getLog) { setCargando(false); setError(true); return }
    store.getLog()
      .then(data => { setLogs(data || []); setCargando(false) })
      .catch(() => { setCargando(false); setError(true) })
  }, [])

  function fmtFecha(str) {
    const d = new Date(str)
    return d.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' }) +
      ' · ' + d.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
  }

  const jugadoresLog = [...new Set(logs.map(l => l.jugador_nombre).filter(Boolean))].sort()
  const filtrados = filtroJugador ? logs.filter(l => l.jugador_nombre === filtroJugador) : logs

  const colorEntidad = {
    'Jugador': '#185fa5', 'Partido': '#7a1e30', 'Estadísticas': '#856a00',
    'Clasificación': '#1a7a3a', 'Alineación': '#6a1e7a', 'Noticia': '#c0392b',
  }

  if (cargando) return (
    <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--gris-mid)' }}>
      Cargando log de actividad...
    </div>
  )

  if (error) return (
    <div style={{ textAlign: 'center', padding: '3rem' }}>
      <div style={{ fontSize: 32, marginBottom: 8 }}>⚠️</div>
      <div style={{ color: 'var(--gris-mid)', fontSize: 14 }}>
        El log no está disponible aún. Asegúrate de haber ejecutado el SQL en Supabase y de haber añadido <code>getLog</code> al store.
      </div>
    </div>
  )

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
        <span style={{ fontSize: 14, color: 'var(--gris-mid)' }}>{filtrados.length} acciones</span>
        <select
          className="select"
          value={filtroJugador}
          onChange={e => setFiltroJugador(e.target.value)}
          style={{ maxWidth: 180, fontSize: 13, minHeight: 36, padding: '6px 10px' }}
        >
          <option value="">Todos los jugadores</option>
          {jugadoresLog.map(n => <option key={n} value={n}>{n}</option>)}
        </select>
      </div>

      {filtrados.length === 0 && (
        <div className="empty">Sin actividad registrada aún</div>
      )}

      {filtrados.length > 0 && (
        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          {filtrados.map((l, i) => (
            <div key={l.id} style={{
              display: 'flex', alignItems: 'flex-start', gap: 10,
              padding: '10px 14px',
              borderBottom: i < filtrados.length - 1 ? '1px solid #f5e8eb' : 'none',
            }}>
              <div style={{
                width: 34, height: 34, borderRadius: '50%', flexShrink: 0,
                background: 'var(--negro)', color: 'var(--dorado-light)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 11, fontWeight: 700,
              }}>
                {(l.jugador_nombre || '?').split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
                  <span>{l.accion}</span>
                  <span style={{
                    background: colorEntidad[l.entidad] || '#999',
                    color: 'white', fontSize: 10, fontWeight: 700,
                    padding: '2px 8px', borderRadius: 20
                  }}>{l.entidad}</span>
                </div>
                {l.detalle && (
                  <div style={{ fontSize: 12, color: 'var(--gris-mid)', marginTop: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {l.detalle}
                  </div>
                )}
                <div style={{ fontSize: 11, color: 'var(--gris-light)', marginTop: 3 }}>
                  <strong style={{ color: 'var(--gris-mid)' }}>{l.jugador_nombre || 'Desconocido'}</strong>
                  {' · '}{fmtFecha(l.created_at)}
                </div>
              </div>
            </div>
          ))}
        </div>
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
  const [errorPwd, setErrorPwd] = useState('')

  useEffect(() => {
    store.getTemporadas().then(ts => {
      setTemporadas(ts)
      setTemporadaActiva(ts.find(t => t.activa) || null)
    })
  }, [])

  const verificarYCerrar = async () => {
    const superPwd = import.meta.env.VITE_SUPERADMIN_PASSWORD
    if (!superPwd || pwdSuper !== superPwd) {
      setErrorPwd('Contraseña incorrecta')
      return
    }
    if (!form.nombre.trim()) { alert('Pon nombre a la nueva temporada'); return }
    setCerrando(true)
    await store.cerrarTemporadaYCrearNueva(form.nombre.trim(), Number(form.año))
    const ts = await store.getTemporadas()
    setTemporadas(ts)
    setTemporadaActiva(ts.find(t => t.activa) || null)
    setShowForm(false)
    setConfirmando(false)
    setPwdSuper('')
    setErrorPwd('')
    setCerrando(false)
  }

  return (
    <div>
      {/* Temporada activa */}
      <div className="card" style={{ marginBottom: '1rem', background: 'linear-gradient(135deg,#0d0a0b,#3d1020)' }}>
        <div style={{ fontSize: 11, color: '#e8a0b0', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 6 }}>
          Temporada activa
        </div>
        <div style={{ fontFamily: 'Bebas Neue', fontSize: 24, color: 'white', lineHeight: 1 }}>
          {temporadaActiva?.nombre || 'Cargando...'}
        </div>
        <div style={{ fontSize: 12, color: '#6a3a42', marginTop: 4 }}>
          Año {temporadaActiva?.año} · Todos los datos actuales pertenecen a esta temporada
        </div>
      </div>

      {/* Botón cerrar temporada */}
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
                <input className="input" value={form.nombre}
                  onChange={e => setForm(f => ({ ...f, nombre: e.target.value }))}
                  placeholder="Ej: Liga Verano Villacañas 2027" />
              </div>
              <div className="form-group">
                <label className="label">Año</label>
                <input className="input" type="number" value={form.año}
                  onChange={e => setForm(f => ({ ...f, año: e.target.value }))} />
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

              {/* Contraseña de superadmin */}
              <div className="form-group">
                <label className="label">🔐 Contraseña de superadmin</label>
                <input
                  className="input"
                  type="password"
                  placeholder="Solo el creador de la app puede hacer esto"
                  value={pwdSuper}
                  onChange={e => { setPwdSuper(e.target.value); setErrorPwd('') }}
                />
                {errorPwd && (
                  <div style={{ color: '#c0392b', fontSize: 12, marginTop: 4 }}>⚠️ {errorPwd}</div>
                )}
              </div>

              <div style={{ display: 'flex', gap: 10 }}>
                <button onClick={() => { setConfirmando(false); setPwdSuper(''); setErrorPwd('') }}
                  className="btn btn-ghost" style={{ flex: 1 }}>Atrás</button>
                <button
                  onClick={verificarYCerrar}
                  disabled={cerrando || !pwdSuper}
                  style={{ flex: 1, background: '#c0392b', color: 'white', border: 'none', borderRadius: 10, padding: '12px', fontWeight: 700, fontSize: 15, cursor: 'pointer', opacity: (cerrando || !pwdSuper) ? 0.5 : 1 }}>
                  {cerrando ? 'Cerrando...' : '🔚 Confirmar y cerrar'}
                </button>
              </div>
            </>
          )}
        </div>
      )}

      {/* Historial */}
      <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--gris-mid)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>
        Temporadas anteriores
      </div>
      {temporadas.filter(t => !t.activa).length === 0 && (
        <div className="empty" style={{ padding: '1.5rem' }}>Esta es la primera temporada</div>
      )}
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

// ---- Main Admin ----
const adminTabs = [
  { key: 'stats', label: '📊 Stats' },
  { key: 'partidos', label: '⚽ Partidos' },
  { key: 'jugadores', label: '👕 Plantilla' },
  { key: 'tabla', label: '🏆 Tabla' },
  { key: 'log', label: '📋 Actividad' },
  { key: 'temporada', label: '📅 Temporada' },
]

export default function Admin() {
  const { jugadores, partidos, stats, clasificacion, store } = useStore()
  const [tab, setTab] = useState('stats')
  const navigate = useNavigate()

  const handleLogout = () => {
    adminAuth.logout()
    navigate('/')
  }

  return (
    <AdminGuard>
      <div className="page">
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
        {tab === 'log' && <PanelLog store={store} jugadores={jugadores} />}
        {tab === 'temporada' && <PanelTemporada store={store} />}
      </div>
    </AdminGuard>
  )
}
