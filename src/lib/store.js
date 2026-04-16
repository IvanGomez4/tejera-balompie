/**
 * Store — conecta con Supabase si las variables de entorno están definidas,
 * o usa localStorage como fallback para desarrollo local sin Supabase.
 */
import { supabase } from './supabase'
import { jugadoresIniciales, partidosIniciales, statsIniciales, clasificacionInicial } from './mockData'

const USE_SUPABASE = !!(
  import.meta.env.VITE_SUPABASE_URL &&
  import.meta.env.VITE_SUPABASE_URL !== 'https://XXXXXXXXXXXXXXXX.supabase.co'
)

// ---- LocalStorage fallback ----
function load(key, fallback) {
  try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback }
  catch { return fallback }
}
function save(key, val) {
  try { localStorage.setItem(key, JSON.stringify(val)) } catch { }
}

let _jugadores = load('tj_jugadores', jugadoresIniciales)
let _partidos = load('tj_partidos', partidosIniciales)
let _stats = load('tj_stats', statsIniciales)
let _clasificacion = load('tj_clasificacion', clasificacionInicial)
let _temporadaActiva = null
let _temporadas = []

let listeners = []
const notify = () => listeners.forEach(fn => fn())

// ---- Supabase helpers ----
async function sbFetch(table, select = '*', filters = {}) {
  let q = supabase.from(table).select(select)
  Object.entries(filters).forEach(([k, v]) => { q = q.eq(k, v) })
  const { data, error } = await q
  if (error) console.error(error)
  return data || []
}

// ---- Log de actividad ----
function getJugadorActivo() {
  try { return JSON.parse(localStorage.getItem('tj_jugador_activo')) } catch { return null }
}

async function log(accion, entidad, detalle = '') {
  let jugador = null
  try {
    const raw = localStorage.getItem('tj_jugador_activo')
    if (raw) jugador = JSON.parse(raw)
  } catch { }

  const entrada = {
    jugador_id: jugador?.id || null,
    jugador_nombre: jugador?.nombre || 'Sistema',
    accion,
    entidad,
    detalle: detalle || '',
  }

  if (USE_SUPABASE) {
    try {
      await supabase.from('activity_log').insert(entrada)
    } catch (e) {
      console.error('Error guardando log:', e)
    }
  } else {
    try {
      const logs = load('tj_log', [])
      save('tj_log', [{
        id: Date.now(),
        ...entrada,
        created_at: new Date().toISOString()
      }, ...logs].slice(0, 200))
    } catch { }
  }
}

// ---- Store público ----
export const store = {
  subscribe(fn) {
    listeners.push(fn)
    return () => { listeners = listeners.filter(l => l !== fn) }
  },

  // =====================
  // GETTERS (síncronos — usan caché local)
  // =====================
  getJugadores() { return [..._jugadores] },
  getPartidos() { return [..._partidos] },
  getStats() { return [..._stats] },
  getClasificacion() { return [..._clasificacion] },

  getStatsPartido(partido_id) {
    return _stats.filter(s => s.partido_id === partido_id)
  },
  getStatsTotalesJugador(jugador_id) {
    const ss = _stats.filter(s => s.jugador_id === jugador_id)
    return {
      partidos: ss.length,
      goles: ss.reduce((a, s) => a + s.goles, 0),
      asistencias: ss.reduce((a, s) => a + s.asistencias, 0),
      tarjetas_amarillas: ss.reduce((a, s) => a + s.tarjetas_amarillas, 0),
      tarjetas_rojas: ss.reduce((a, s) => a + s.tarjetas_rojas, 0),
    }
  },

  // =====================
  // INIT — carga datos desde Supabase al arrancar
  // =====================
  async init() {
    if (!USE_SUPABASE) return

    // Primero cargar temporada activa
    const { data: tempActiva } = await supabase
      .from('temporadas').select('*').eq('activa', true).maybeSingle()
    _temporadaActiva = tempActiva

    const tid = tempActiva?.id
    const filtro = tid ? { temporada_id: tid } : {}

    const [jugadores, partidos, stats, clasificacion] = await Promise.all([
      sbFetch('jugadores'),  // jugadores son globales, no por temporada
      sbFetch('partidos', '*', filtro),
      sbFetch('estadisticas', '*', filtro),
      sbFetch('clasificacion', '*', filtro),
    ])

    _jugadores = jugadores.map(j => ({ id: j.id, nombre: j.nombre, posicion: j.posicion, dorsal: j.dorsal, foto_url: j.foto_url || null }))
    _partidos = partidos.map(p => ({ ...p, jugado: p.jugado || false, mvp_jugador_id: p.mvp_jugador_id || null }))
    _stats = stats.map(s => ({ id: s.id, jugador_id: s.jugador_id, partido_id: s.partido_id, goles: s.goles, asistencias: s.asistencias, tarjetas_amarillas: s.tarjetas_amarillas, tarjetas_rojas: s.tarjetas_rojas, paradas: s.paradas || 0, goles_encajados: s.goles_encajados || 0 }))
    _clasificacion = clasificacion.sort((a, b) => (a.grupo || '').localeCompare(b.grupo || '') || a.pos - b.pos)

    notify()
  },

  // =====================
  // JUGADORES
  // =====================
  async addJugador(j) {
    if (USE_SUPABASE) {
      const { data } = await supabase.from('jugadores').insert({ nombre: j.nombre, posicion: j.posicion, dorsal: j.dorsal }).select().single()
      if (data) { _jugadores = [..._jugadores, { id: data.id, nombre: data.nombre, posicion: data.posicion, dorsal: data.dorsal }] }
    } else {
      const id = Math.max(0, ..._jugadores.map(x => x.id)) + 1
      _jugadores = [..._jugadores, { ...j, id }]
      save('tj_jugadores', _jugadores)
    }
    await log('➕ Añadió', 'Jugador', j.nombre)
    notify()
  },
  async updateJugador(id, data) {
    if (USE_SUPABASE) await supabase.from('jugadores').update({ nombre: data.nombre, posicion: data.posicion, dorsal: data.dorsal, foto_url: data.foto_url || null }).eq('id', id)
    _jugadores = _jugadores.map(j => j.id === id ? { ...j, ...data } : j)
    if (!USE_SUPABASE) save('tj_jugadores', _jugadores)
    const j = _jugadores.find(x => x.id === id)
    await log('✏️ Editó', 'Jugador', j?.nombre || String(id))
    notify()
  },
  async deleteJugador(id) {
    if (USE_SUPABASE) await supabase.from('jugadores').delete().eq('id', id)
    _jugadores = _jugadores.filter(j => j.id !== id)
    _stats = _stats.filter(s => s.jugador_id !== id)
    if (!USE_SUPABASE) { save('tj_jugadores', _jugadores); save('tj_stats', _stats) }
    const j = _jugadores.find(x => x.id === id)
    await log('🗑️ Eliminó', 'Jugador', j?.nombre || String(id))
    notify()
  },

  // =====================
  // PARTIDOS
  // =====================
  async addPartido(p) {
    if (USE_SUPABASE) {
      const { data } = await supabase.from('partidos').insert({ jornada: p.jornada, fecha: p.fecha, local: p.local, visitante: p.visitante, campo: p.campo, jugado: p.jugado || false, goles_local: p.goles_local || 0, goles_visitante: p.goles_visitante || 0, temporada_id: _temporadaActiva?.id || null }).select().single()
      if (data) { _partidos = [..._partidos, data] }
    } else {
      const id = Math.max(0, ..._partidos.map(x => x.id)) + 1
      _partidos = [..._partidos, { ...p, id, jugado: false, goles_local: 0, goles_visitante: 0 }]
      save('tj_partidos', _partidos)
    }
    await log('➕ Añadió', 'Partido', `J${p.jornada} vs ${p.visitante || p.local}`)
    notify()
  },
  async updatePartido(id, data) {
    if (USE_SUPABASE) await supabase.from('partidos').update({ jornada: data.jornada, fecha: data.fecha, local: data.local, visitante: data.visitante, campo: data.campo, jugado: data.jugado, goles_local: data.goles_local, goles_visitante: data.goles_visitante, alineacion: data.alineacion || null, formacion: data.formacion || null }).eq('id', id)
    _partidos = _partidos.map(p => p.id === id ? { ...p, ...data } : p)
    if (!USE_SUPABASE) save('tj_partidos', _partidos)
    const p = _partidos.find(x => x.id === id)
    await log('✏️ Editó', 'Partido', `J${p?.jornada} vs ${p?.visitante || p?.local}`)
    notify()
  },
  async deletePartido(id) {
    if (USE_SUPABASE) await supabase.from('partidos').delete().eq('id', id)
    _partidos = _partidos.filter(p => p.id !== id)
    _stats = _stats.filter(s => s.partido_id !== id)
    if (!USE_SUPABASE) { save('tj_partidos', _partidos); save('tj_stats', _stats) }
    const p = _partidos.find(x => x.id === id)
    await log('🗑️ Eliminó', 'Partido', `J${p?.jornada} vs ${p?.visitante || p?.local}`)
    notify()
  },

  // =====================
  // ESTADÍSTICAS
  // =====================
  async upsertStat(data) {
    if (USE_SUPABASE) {
      await supabase.from('estadisticas').upsert({ jugador_id: data.jugador_id, partido_id: data.partido_id, goles: data.goles, asistencias: data.asistencias, tarjetas_amarillas: data.tarjetas_amarillas, tarjetas_rojas: data.tarjetas_rojas, paradas: data.paradas || 0, goles_encajados: data.goles_encajados || 0, temporada_id: _temporadaActiva?.id || null }, { onConflict: 'jugador_id,partido_id' })
    }
    const existing = _stats.find(s => s.jugador_id === data.jugador_id && s.partido_id === data.partido_id)
    if (existing) {
      _stats = _stats.map(s => (s.jugador_id === data.jugador_id && s.partido_id === data.partido_id) ? { ...s, ...data } : s)
    } else {
      const id = Math.max(0, ..._stats.map(x => x.id)) + 1
      _stats = [..._stats, { ...data, id }]
    }
    if (!USE_SUPABASE) save('tj_stats', _stats)
    const j = _jugadores.find(x => x.id === data.jugador_id)
    const p = _partidos.find(x => x.id === data.partido_id)
    await log('📊 Stats', 'Estadísticas', `${j?.nombre} en J${p?.jornada}`)
    notify()
  },
  async deleteStat(jugador_id, partido_id) {
    if (USE_SUPABASE) await supabase.from('estadisticas').delete().eq('jugador_id', jugador_id).eq('partido_id', partido_id)
    _stats = _stats.filter(s => !(s.jugador_id === jugador_id && s.partido_id === partido_id))
    if (!USE_SUPABASE) save('tj_stats', _stats)
    const j = _jugadores.find(x => x.id === jugador_id)
    const p = _partidos.find(x => x.id === partido_id)
    await log('🗑️ Eliminó', 'Estadísticas', `${j?.nombre} en J${p?.jornada}`)
    notify()
  },

  // =====================
  // CLASIFICACIÓN
  // =====================
  async updateFilaClasificacion(equipo, data) {
    if (USE_SUPABASE) await supabase.from('clasificacion').update({ pj: data.pj, pg: data.pg, pe: data.pe, pp: data.pp, gf: data.gf, gc: data.gc, pts: data.pts, grupo: data.grupo || null }).eq('equipo', equipo)
    _clasificacion = _clasificacion.map(e => e.equipo === equipo ? { ...e, ...data } : e)
    if (!USE_SUPABASE) save('tj_clasificacion', _clasificacion)
    await log('✏️ Editó', 'Clasificación', equipo)
    notify()
  },
  async addEquipoClasificacion(data) {
    const newEntry = { equipo: data.equipo, pos: data.pos || 1, pj: 0, pg: 0, pe: 0, pp: 0, gf: 0, gc: 0, pts: 0, grupo: data.grupo || 'A', temporada_id: _temporadaActiva?.id || null }
    if (USE_SUPABASE) {
      const { data: row, error } = await supabase.from('clasificacion').insert(newEntry).select().single()
      if (error) throw error
      _clasificacion = [..._clasificacion, row].sort((a, b) => (a.grupo || '').localeCompare(b.grupo || '') || a.pos - b.pos)
    } else {
      _clasificacion = [..._clasificacion, newEntry].sort((a, b) => (a.grupo || '').localeCompare(b.grupo || '') || a.pos - b.pos)
      save('tj_clasificacion', _clasificacion)
    }
    notify()
  },
  async deleteEquipoClasificacion(equipo) {
    if (USE_SUPABASE) await supabase.from('clasificacion').delete().eq('equipo', equipo)
    _clasificacion = _clasificacion.filter(e => e.equipo !== equipo)
    if (!USE_SUPABASE) save('tj_clasificacion', _clasificacion)
    notify()
  },

  async getVotoMvp(partido_id, votante_id) {
    if (!USE_SUPABASE) return null
    const { data } = await supabase
      .from('votos_mvp')
      .select('votado_id')
      .eq('partido_id', partido_id)
      .eq('votante_id', votante_id)
      .single()
    return data?.votado_id || null
  },
  // =====================
  // VOTOS MVP
  // =====================
  async getVotosMvp(partido_id) {
    if (USE_SUPABASE) {
      const { data } = await supabase.from('votos_mvp').select('*').eq('partido_id', partido_id)
      return data || []
    }
    return load('tj_votos_' + partido_id, [])
  },
  async votarMvp(partido_id, votante_id, votado_id) {
    if (USE_SUPABASE) {
      await supabase.from('votos_mvp').upsert(
        { partido_id, votante_id, votado_id },
        { onConflict: 'partido_id,votante_id' }
      )
    } else {
      const votos = load('tj_votos_' + partido_id, [])
      const sin = votos.filter(v => v.votante_id !== votante_id)
      save('tj_votos_' + partido_id, [...sin, { partido_id, votante_id, votado_id }])
    }
  },

  // =====================
  // ALINEACIONES
  // =====================
  async getAlineacion(partido_id) {
    if (USE_SUPABASE) {
      const { data } = await supabase
        .from('alineaciones')
        .select('*')
        .eq('partido_id', partido_id)
        .maybeSingle()
      return data || null
    }
    return load('tj_alin_' + partido_id, null)
  },
  async saveAlineacion(partido_id, formacion, jugadoresAlin) {
    if (USE_SUPABASE) {
      const { error } = await supabase.from('alineaciones').upsert(
        { partido_id, formacion, jugadores: jugadoresAlin },
        { onConflict: 'partido_id' }
      )
      if (error) console.error('Error guardando alineacion:', error)
    } else {
      save('tj_alin_' + partido_id, { partido_id, formacion, jugadores: jugadoresAlin })
    }
    const p = _partidos.find(x => x.id === partido_id)
    await log('👕 Alineación', 'Alineación', `J${p?.jornada} — ${formacion}`)
  },
  async subirFotoJugador(jugador_id, archivo) {
    if (!USE_SUPABASE) return null
    const ext = archivo.name.split('.').pop()
    const path = `jugador_${jugador_id}.${ext}`
    // Eliminar foto anterior si existe
    await supabase.storage.from('avatares').remove([path])
    // Subir nueva
    const { error } = await supabase.storage.from('avatares').upload(path, archivo, { upsert: true })
    if (error) { console.error('Error subiendo foto:', error); return null }
    const { data } = supabase.storage.from('avatares').getPublicUrl(path)
    return data.publicUrl
  },


  // =====================
  // NOTICIAS
  // =====================
  async getNoticias() {
    if (USE_SUPABASE) {
      const { data, error } = await supabase
        .from('noticias')
        .select('*')
        .order('created_at', { ascending: false })
      if (error) console.error(error)
      return data || []
    }
    return load('tj_noticias', [])
  },
  // imagen_url ya viene procesada desde el componente (base64 o URL de Supabase)
  async addNoticia({ titulo, archivo, imagen_url_local }) {
    const id = Date.now()
    const created_at = new Date().toISOString()

    if (USE_SUPABASE) {
      let imagen_url = imagen_url_local || null
      if (archivo) {
        const ext = archivo.name.split('.').pop()
        const path = `noticia_${id}.${ext}`
        const { error: uploadError } = await supabase.storage
          .from('noticias')
          .upload(path, archivo, { upsert: true })
        if (uploadError) throw uploadError
        const { data: urlData } = supabase.storage.from('noticias').getPublicUrl(path)
        imagen_url = urlData.publicUrl
      }
      const { data, error } = await supabase
        .from('noticias')
        .insert({ titulo, imagen_url, created_at })
        .select()
        .single()
      if (error) throw error
      await log('📰 Publicó', 'Noticia', titulo)
      return data
    } else {
      // En modo local, imagen_url_local ya es el base64 generado en el componente
      const nueva = { id, titulo, imagen_url: imagen_url_local || null, created_at }
      const noticias = load('tj_noticias', [])
      save('tj_noticias', [nueva, ...noticias])
      await log('📰 Publicó', 'Noticia', titulo)
      return nueva
    }

  },
  async deleteNoticia(id) {
    if (USE_SUPABASE) {
      await supabase.from('noticias').delete().eq('id', id)
    } else {
      const noticias = load('tj_noticias', [])
      save('tj_noticias', noticias.filter(n => n.id !== id))
    }
    await log('🗑️ Eliminó', 'Noticia', String(id))
  },
  async getLog() {
    if (USE_SUPABASE) {
      const { data } = await supabase
        .from('activity_log')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(100)
      return data || []
    }
    return load('tj_log', [])
  },

  // =====================
  // TEMPORADAS
  // =====================
  async getTemporadas() {
    if (USE_SUPABASE) {
      const { data } = await supabase
        .from('temporadas')
        .select('*')
        .order('año', { ascending: false })
      return data || []
    }
    return load('tj_temporadas', [{ id: 1, nombre: 'Liga Verano 2026', año: 2026, activa: true }])
  },

  getTemporadaActiva() {
    return _temporadaActiva
  },

  async initTemporada() {
    if (USE_SUPABASE) {
      const { data } = await supabase
        .from('temporadas')
        .select('*')
        .eq('activa', true)
        .single()
      _temporadaActiva = data || null
    } else {
      const temps = load('tj_temporadas', [{ id: 1, nombre: 'Liga Verano 2026', año: 2026, activa: true }])
      _temporadaActiva = temps.find(t => t.activa) || temps[0] || null
    }
    return _temporadaActiva
  },

  async cerrarTemporadaYCrearNueva(nombreNueva, añoNuevo) {
    if (USE_SUPABASE) {
      // Cerrar la activa
      await supabase.from('temporadas').update({ activa: false }).eq('activa', true)
      // Crear la nueva
      const { data } = await supabase
        .from('temporadas')
        .insert({ nombre: nombreNueva, año: añoNuevo, activa: true })
        .select().single()
      _temporadaActiva = data

      // Limpiar caché local — la nueva temporada empieza vacía
      _partidos = []
      _stats = []
      _clasificacion = []
      notify()
      return data
    } else {
      const temps = load('tj_temporadas', [])
      const nuevas = temps.map(t => ({ ...t, activa: false }))
      const nueva = { id: Date.now(), nombre: nombreNueva, año: añoNuevo, activa: true }
      save('tj_temporadas', [...nuevas, nueva])
      _temporadaActiva = nueva
      _partidos = []; _stats = []; _clasificacion = []
      save('tj_partidos', []); save('tj_stats', []); save('tj_clasificacion', [])
      notify()
      return nueva
    }
  },

  async getDatosTemporada(temporada_id) {
    if (!USE_SUPABASE) return null
    const [partidos, stats, clasificacion] = await Promise.all([
      supabase.from('partidos').select('*').eq('temporada_id', temporada_id),
      supabase.from('estadisticas').select('*').eq('temporada_id', temporada_id),
      supabase.from('clasificacion').select('*').eq('temporada_id', temporada_id),
    ])
    return {
      partidos: partidos.data || [],
      stats: stats.data || [],
      clasificacion: (clasificacion.data || []).sort((a, b) => b.pts - a.pts),
    }
  },

  // =====================
  // PATROCINADORES
  // =====================
  async getPatrocinadores() {
    if (USE_SUPABASE) {
      const { data } = await supabase.from('patrocinadores').select('*').order('created_at', { ascending: true })
      return data || []
    }
    return load('tj_patrocinadores', [])
  },
  async addPatrocinador(nombre, archivo) {
    if (USE_SUPABASE) {
      let imagen_url = null
      if (archivo) {
        const ext = archivo.name.split('.').pop()
        const path = `patrocinador_${Date.now()}.${ext}`
        await supabase.storage.from('patrocinadores').upload(path, archivo, { upsert: true })
        const { data } = supabase.storage.from('patrocinadores').getPublicUrl(path)
        imagen_url = data.publicUrl
      }
      const { data } = await supabase.from('patrocinadores').insert({ nombre, imagen_url }).select().single()
      return data
    } else {
      const p = { id: Date.now(), nombre, imagen_url: null, created_at: new Date().toISOString() }
      const list = load('tj_patrocinadores', [])
      save('tj_patrocinadores', [...list, p])
      return p
    }
  },
  async deletePatrocinador(id) {
    if (USE_SUPABASE) await supabase.from('patrocinadores').delete().eq('id', id)
    else {
      const list = load('tj_patrocinadores', [])
      save('tj_patrocinadores', list.filter(p => p.id !== id))
    }
  },

  // =====================
  // RESET
  // =====================
  resetAll() {
    _jugadores = jugadoresIniciales
    _partidos = partidosIniciales
    _stats = statsIniciales
    _clasificacion = clasificacionInicial
      ;['tj_jugadores', 'tj_partidos', 'tj_stats', 'tj_clasificacion'].forEach(k => localStorage.removeItem(k))
    notify()
  }
}
