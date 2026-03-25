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
    if (!USE_SUPABASE) return  // usa localStorage

    const [jugadores, partidos, stats, clasificacion] = await Promise.all([
      sbFetch('jugadores'),
      sbFetch('partidos'),
      sbFetch('estadisticas'),
      sbFetch('clasificacion', '*, pos'),
    ])

    _jugadores = jugadores.map(j => ({ id: j.id, nombre: j.nombre, posicion: j.posicion, dorsal: j.dorsal }))
    _partidos = partidos.map(p => ({ ...p, jugado: p.jugado || false, mvp_jugador_id: p.mvp_jugador_id || null }))
    _stats = stats.map(s => ({ id: s.id, jugador_id: s.jugador_id, partido_id: s.partido_id, goles: s.goles, asistencias: s.asistencias, tarjetas_amarillas: s.tarjetas_amarillas, tarjetas_rojas: s.tarjetas_rojas, minutos: s.minutos, paradas: s.paradas || 0, goles_encajados: s.goles_encajados || 0 }))
    _clasificacion = clasificacion.sort((a, b) => a.pos - b.pos)

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
    notify()
  },
  async updateJugador(id, data) {
    if (USE_SUPABASE) await supabase.from('jugadores').update({ nombre: data.nombre, posicion: data.posicion, dorsal: data.dorsal }).eq('id', id)
    _jugadores = _jugadores.map(j => j.id === id ? { ...j, ...data } : j)
    if (!USE_SUPABASE) save('tj_jugadores', _jugadores)
    notify()
  },
  async deleteJugador(id) {
    if (USE_SUPABASE) await supabase.from('jugadores').delete().eq('id', id)
    _jugadores = _jugadores.filter(j => j.id !== id)
    _stats = _stats.filter(s => s.jugador_id !== id)
    if (!USE_SUPABASE) { save('tj_jugadores', _jugadores); save('tj_stats', _stats) }
    notify()
  },

  // =====================
  // PARTIDOS
  // =====================
  async addPartido(p) {
    if (USE_SUPABASE) {
      const { data } = await supabase.from('partidos').insert({ jornada: p.jornada, fecha: p.fecha, local: p.local, visitante: p.visitante, campo: p.campo, jugado: p.jugado || false, goles_local: p.goles_local || 0, goles_visitante: p.goles_visitante || 0 }).select().single()
      if (data) { _partidos = [..._partidos, data] }
    } else {
      const id = Math.max(0, ..._partidos.map(x => x.id)) + 1
      _partidos = [..._partidos, { ...p, id, jugado: false, goles_local: 0, goles_visitante: 0 }]
      save('tj_partidos', _partidos)
    }
    notify()
  },
  async updatePartido(id, data) {
    if (USE_SUPABASE) await supabase.from('partidos').update({ jornada: data.jornada, fecha: data.fecha, local: data.local, visitante: data.visitante, campo: data.campo, jugado: data.jugado, goles_local: data.goles_local, goles_visitante: data.goles_visitante, mvp_jugador_id: data.mvp_jugador_id || null, alineacion: data.alineacion || null, formacion: data.formacion || '1-3-2-1' }).eq('id', id)
    _partidos = _partidos.map(p => p.id === id ? { ...p, ...data } : p)
    if (!USE_SUPABASE) save('tj_partidos', _partidos)
    notify()
  },
  async deletePartido(id) {
    if (USE_SUPABASE) await supabase.from('partidos').delete().eq('id', id)
    _partidos = _partidos.filter(p => p.id !== id)
    _stats = _stats.filter(s => s.partido_id !== id)
    if (!USE_SUPABASE) { save('tj_partidos', _partidos); save('tj_stats', _stats) }
    notify()
  },

  // =====================
  // ESTADÍSTICAS
  // =====================
  async upsertStat(data) {
    if (USE_SUPABASE) {
      await supabase.from('estadisticas').upsert({ jugador_id: data.jugador_id, partido_id: data.partido_id, goles: data.goles, asistencias: data.asistencias, tarjetas_amarillas: data.tarjetas_amarillas, tarjetas_rojas: data.tarjetas_rojas, minutos: data.minutos, paradas: data.paradas || 0, goles_encajados: data.goles_encajados || 0 }, { onConflict: 'jugador_id,partido_id' })
    }
    const existing = _stats.find(s => s.jugador_id === data.jugador_id && s.partido_id === data.partido_id)
    if (existing) {
      _stats = _stats.map(s => (s.jugador_id === data.jugador_id && s.partido_id === data.partido_id) ? { ...s, ...data } : s)
    } else {
      const id = Math.max(0, ..._stats.map(x => x.id)) + 1
      _stats = [..._stats, { ...data, id }]
    }
    if (!USE_SUPABASE) save('tj_stats', _stats)
    notify()
  },
  async deleteStat(jugador_id, partido_id) {
    if (USE_SUPABASE) await supabase.from('estadisticas').delete().eq('jugador_id', jugador_id).eq('partido_id', partido_id)
    _stats = _stats.filter(s => !(s.jugador_id === jugador_id && s.partido_id === partido_id))
    if (!USE_SUPABASE) save('tj_stats', _stats)
    notify()
  },

  // =====================
  // CLASIFICACIÓN
  // =====================
  async updateFilaClasificacion(equipo, data) {
    if (USE_SUPABASE) await supabase.from('clasificacion').update({ pj: data.pj, pg: data.pg, pe: data.pe, pp: data.pp, gf: data.gf, gc: data.gc, pts: data.pts }).eq('equipo', equipo)
    _clasificacion = _clasificacion.map(e => e.equipo === equipo ? { ...e, ...data } : e)
    if (!USE_SUPABASE) save('tj_clasificacion', _clasificacion)
    notify()
  },

  // =====================
  // VOTOS MVP
  // =====================
  async votarMvp(partido_id, votante_id, votado_id) {
    if (USE_SUPABASE) {
      await supabase.from('votos_mvp').upsert(
        { partido_id, votante_id, votado_id },
        { onConflict: 'partido_id,votante_id' }
      )
    }
    // Recalcular MVP por votos
    if (USE_SUPABASE) {
      const { data } = await supabase
        .from('votos_mvp')
        .select('votado_id')
        .eq('partido_id', partido_id)
      if (data && data.length > 0) {
        const conteo = data.reduce((acc, v) => {
          acc[v.votado_id] = (acc[v.votado_id] || 0) + 1
          return acc
        }, {})
        const mvp_id = Number(Object.entries(conteo).sort((a, b) => b[1] - a[1])[0][0])
        await supabase.from('partidos').update({ mvp_jugador_id: mvp_id }).eq('id', partido_id)
        _partidos = _partidos.map(p => p.id === partido_id ? { ...p, mvp_jugador_id: mvp_id } : p)
      }
    }
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
