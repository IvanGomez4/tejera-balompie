import { useState, useEffect } from 'react'
import Camiseta from './Camiseta'

const FORMACIONES = {
    '1-3-2-1': { portero: 1, defensas: 3, medios: 2, delanteros: 1 },
    '1-2-3-1': { portero: 1, defensas: 2, medios: 3, delanteros: 1 },
    '1-2-2-2': { portero: 1, defensas: 2, medios: 2, delanteros: 2 },
    '1-1-3-2': { portero: 1, defensas: 1, medios: 3, delanteros: 2 },
}

const LINEAS = ['portero', 'defensas', 'medios', 'delanteros']

export default function Alineacion({ partido, jugadores, alineacionInicial, onSave, modoEdicion = false }) {
    const [formacion, setFormacion] = useState(alineacionInicial?.formacion || '1-3-2-1')
    const [slots, setSlots] = useState([]) // [{linea, posicion, jugador_id}]
    const [slotEditando, setSlotEditando] = useState(null)
    const [guardado, setGuardado] = useState(false)
    const [guardando, setGuardando] = useState(false)
    const [montado, setMontado] = useState(false)

    const generarSlotsVacios = (f) => {
        const est = FORMACIONES[f]
        const nuevos = []
        Object.keys(est).forEach(linea => {
            for (let i = 0; i < est[linea]; i++) {
                nuevos.push({ linea, posicion: i, jugador_id: null })
            }
        })
        setSlots(nuevos)
    }

    useEffect(() => {
        if (!montado) {
            // Primera vez — carga guardado si existe
            setMontado(true)
            if (alineacionInicial?.jugadores?.length) {
                setSlots(alineacionInicial.jugadores)
                return
            }
        }
        // Cambio de formación — slots vacíos
        generarSlotsVacios(formacion)
    }, [formacion])

    const getJugador = (id) => jugadores.find(j => j.id === id)

    const asignarJugador = (linea, posicion, jugador_id) => {
        setSlots(prev => prev.map(s =>
            s.linea === linea && s.posicion === posicion
                ? { ...s, jugador_id: jugador_id ? Number(jugador_id) : null }
                : s
        ))
        setSlotEditando(null)
    }

    const getSlots = (linea) => slots.filter(s => s.linea === linea)

    const jugadoresUsados = slots.filter(s => s.jugador_id).map(s => s.jugador_id)
    const jugadoresDisponibles = jugadores.filter(j => !jugadoresUsados.includes(j.id))

    const handleSave = async () => {
        if (!onSave) return
        setGuardando(true)
        await onSave(formacion, slots)
        setGuardando(false)
        setGuardado(true)
        setTimeout(() => setGuardado(false), 3000)
    }

    return (
        <div>
            {/* Selector de formación (solo en modo edición) */}
            {modoEdicion && (
                <div style={{ marginBottom: 12 }}>
                    <div style={{ fontSize: 12, color: 'var(--gris-mid)', marginBottom: 6 }}>Formación</div>
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                        {Object.keys(FORMACIONES).map(f => (
                            <button key={f} onClick={() => setFormacion(f)} style={{
                                padding: '5px 12px', borderRadius: 20, border: '1.5px solid',
                                fontSize: 13, fontWeight: 600, cursor: 'pointer',
                                background: formacion === f ? 'var(--verde)' : 'white',
                                color: formacion === f ? 'white' : 'var(--verde-mid)',
                                borderColor: formacion === f ? 'var(--verde)' : '#c0d0c0'
                            }}>{f}</button>
                        ))}
                    </div>
                </div>
            )}

            {/* Campo de fútbol */}
            <div style={{
                background: 'linear-gradient(180deg, #2d7a2d 0%, #1e5a1e 50%, #2d7a2d 100%)',
                borderRadius: 16, padding: '20px 12px',
                position: 'relative', minHeight: 420,
                border: '3px solid #1a4a1a',
                display: 'flex', flexDirection: 'column', justifyContent: 'space-around', gap: 12
            }}>
                {/* Líneas del campo */}
                <div style={{ position: 'absolute', top: '50%', left: '5%', right: '5%', height: 1, background: 'rgba(255,255,255,0.2)' }} />
                <div style={{ position: 'absolute', top: '12%', left: '20%', right: '20%', bottom: '12%', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 4, pointerEvents: 'none' }} />

                {/* Filas por línea — de arriba (delanteros) a abajo (portero) */}
                {[...LINEAS].reverse().map(linea => (
                    <div key={linea} style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', zIndex: 1 }}>
                        {getSlots(linea).map((slot, i) => {
                            const jug = slot.jugador_id ? getJugador(slot.jugador_id) : null
                            const editando = slotEditando?.linea === linea && slotEditando?.posicion === slot.posicion

                            return (
                                <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    {modoEdicion && editando ? (
                                        <div style={{ background: 'white', borderRadius: 10, padding: 8, minWidth: 140, boxShadow: '0 4px 20px rgba(0,0,0,0.3)', zIndex: 10 }}>
                                            <select
                                                className="select"
                                                style={{ fontSize: 13, padding: '6px 8px', minHeight: 36 }}
                                                value={slot.jugador_id || ''}
                                                onChange={e => asignarJugador(linea, slot.posicion, e.target.value)}
                                                autoFocus
                                            >
                                                <option value="">— Vacío —</option>
                                                {jug && <option value={jug.id}>{jug.nombre}</option>}
                                                {jugadoresDisponibles.map(j => (
                                                    <option key={j.id} value={j.id}>{j.nombre} #{j.dorsal}</option>
                                                ))}
                                            </select>
                                            <button onClick={() => setSlotEditando(null)} style={{ marginTop: 4, width: '100%', fontSize: 11, padding: '3px', background: 'none', border: '1px solid #ddd', borderRadius: 6, cursor: 'pointer' }}>
                                                Cancelar
                                            </button>
                                        </div>
                                    ) : (
                                        <div
                                            onClick={() => modoEdicion && setSlotEditando({ linea, posicion: slot.posicion })}
                                            style={{ cursor: modoEdicion ? 'pointer' : 'default', opacity: modoEdicion && !jug ? 0.5 : 1 }}>
                                            {jug ? (
                                                <Camiseta nombre={jug.nombre} dorsal={jug.dorsal} />
                                            ) : (
                                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                                                    <div style={{ width: 64, height: 54, border: '2px dashed rgba(255,255,255,0.3)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: 22 }}>+</span>
                                                    </div>
                                                    <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)' }}>
                                                        {linea.charAt(0).toUpperCase() + linea.slice(1, -1)}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            )
                        })}
                    </div>
                ))}
            </div>

            {modoEdicion && (
                <>
                    <button
                        onClick={handleSave}
                        disabled={guardando}
                        className="btn btn-primary btn-block"
                        style={{ marginTop: 12 }}>
                        {guardando ? 'Guardando...' : 'Guardar alineación'}
                    </button>

                    {guardado && (
                        <div style={{
                            marginTop: 10, background: 'var(--verde-pale)', border: '1px solid #c3e0c3',
                            borderRadius: 10, padding: '10px 14px', textAlign: 'center',
                            fontSize: 13, color: 'var(--verde)', fontWeight: 600
                        }}>
                            ✅ Alineación guardada correctamente
                        </div>
                    )}
                </>
            )}
        </div>
    )
}