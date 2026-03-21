import { useState, useEffect } from 'react'
import { store } from '../lib/store'

let initialized = false

export function useStore() {
  const [tick, setTick] = useState(0)

  useEffect(() => {
    if (!initialized) {
      initialized = true
      store.init()  // carga desde Supabase si está configurado
    }
    return store.subscribe(() => setTick(t => t + 1))
  }, [])

  return {
    jugadores:     store.getJugadores(),
    partidos:      store.getPartidos(),
    stats:         store.getStats(),
    clasificacion: store.getClasificacion(),
    store,
  }
}
