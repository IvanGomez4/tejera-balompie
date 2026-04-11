import { useState, useEffect } from 'react'
import Camiseta from './Camiseta'

const FORMACIONES = {
    '1-3-2-1': { portero: 1, defensas: 3, medios: 2, delanteros: 1 },
    '1-2-3-1': { portero: 1, defensas: 2, medios: 3, delanteros: 1 },
    '1-2-2-2': { portero: 1, defensas: 2, medios: 2, delanteros: 2 },
    '1-1-3-2': { portero: 1, defensas: 1, medios: 3, delanteros: 2 },
}

const LINEAS = ['portero', 'defensas', 'medios', 'delanteros']

function CampoVisual({ slots, jugadores, formacion }) {
    const getJugador = (id) => jugadores.find(j => j.id === id)
    const getSlots = (linea) => slots.filter(s => s.linea === linea)

    return (
        <div style={{
            background: 'linear-gradient(180deg, #6b1828 0%, #4a1020 50%, #6b1828 100%)',
            borderRadius: 16, padding: '20px 12px',
            position: 'relative', minHeight: 380,
            border: '3px solid #1a4a1a',
            display: 'flex', flexDirection: 'column', justifyContent: 'space-around', gap: 12
        }}>
            <div style={{ position: 'absolute', top: '50%', left: '5%', right: '5%', height: 1, background: 'rgba(255,255,255,0.2)' }} />
            <div style={{ position: 'absolute', top: '12%', left: '20%', right: '20%', bottom: '12%', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 4, pointerEvents: 'none' }} />

            {[...LINEAS].reverse().map(linea => (
                <div key={linea} style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', zIndex: 1 }}>
                    {getSlots(linea).map((slot, i) => {
                        const jug = slot.jugador_id ? getJugador(slot.jugador_id) : null
                        return (
                            <div key={i}>
                                {jug ? (
                                    <Camiseta nombre={jug.nombre} dorsal={jug.dorsal} />
                                ) : (
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                                        <div style={{ width: 64, height: 54, border: '2px dashed rgba(255,255,255,0.2)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: 18 }}>—</span>
                                        </div>
                                        <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.2)' }}>Vacío</div>
                                    </div>
                                )}
                            </div>
                        )
                    })}
                </div>
            ))}
        </div>
    )
}

function ModalEditar({ alineacionInicial, formacionInicial, jugadores, onSave, onClose }) {
    const [formacion, setFormacion] = useState(formacionInicial || '1-3-2-1')
    const [slots, setSlots] = useState([])
    const [slotEditando, setSlotEditando] = useState(null)
    const [guardando, setGuardando] = useState(false)
    const [guardado, setGuardado] = useState(false)

    const generarSlotsVacios = (f) => {
        const est = FORMACIONES[f]
        const nuevos = []
        Object.keys(est).forEach(linea => {
            for (let i = 0; i < est[linea]; i++) {
                nuevos.push({ linea, posicion: i, jugador_id: null })
            }
        })
        return nuevos
    }

    // Al abrir el modal — carga slots existentes o genera vacíos con la formación actual
    useEffect(() => {
        if (alineacionInicial?.jugadores?.length) {
            setSlots(alineacionInicial.jugadores)
        } else {
            setSlots(generarSlotsVacios(formacion))
        }
    }, [])

    // Al cambiar formación — genera slots vacíos (el usuario sabe que va a resetear)
    const cambiarFormacion = (f) => {
        setFormacion(f)
        setSlots(generarSlotsVacios(f))
        setSlotEditando(null)
    }

    const getJugador = (id) => jugadores.find(j => j.id === id)
    const getSlots = (linea) => slots.filter(s => s.linea === linea)

    const asignarJugador = (linea, posicion, jugador_id) => {
        setSlots(prev => prev.map(s =>
            s.linea === linea && s.posicion === posicion
                ? { ...s, jugador_id: jugador_id ? Number(jugador_id) : null }
                : s
        ))
        setSlotEditando(null)
    }

    const jugadoresUsados = slots.filter(s => s.jugador_id).map(s => s.jugador_id)
    const jugadoresDisponibles = jugadores.filter(j => !jugadoresUsados.includes(j.id))

    const handleSave = async () => {
        setGuardando(true)
        await onSave(formacion, slots)
        setGuardando(false)
        setGuardado(true)
        setTimeout(() => {
            setGuardado(false)
            onClose(formacion, slots)
        }, 1500)
    }

    return (
        <>
            <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 400 }} />
            <div style={{
                position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 500,
                background: 'white', borderRadius: '20px 20px 0 0',
                padding: '1.5rem', paddingBottom: 'calc(1.5rem + env(safe-area-inset-bottom))',
                maxHeight: '92vh', overflowY: 'auto',
                boxShadow: '0 -4px 30px rgba(0,0,0,0.2)'
            }}>
                <div style={{ width: 36, height: 4, background: '#ddd', borderRadius: 2, margin: '-0.5rem auto 1rem' }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                    <h2 style={{ fontSize: 20, color: 'var(--verde)' }}>✏️ Editar alineación</h2>
                    <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: 22, cursor: 'pointer', color: '#aaa' }}>✕</button>
                </div>

                {/* Selector formación */}
                <div style={{ marginBottom: 14 }}>
                    <div style={{ fontSize: 12, color: 'var(--gris-mid)', marginBottom: 8 }}>Formación</div>
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                        {Object.keys(FORMACIONES).map(f => (
                            <button key={f} onClick={() => cambiarFormacion(f)} style={{
                                padding: '6px 14px', borderRadius: 20, border: '1.5px solid',
                                fontSize: 13, fontWeight: 600, cursor: 'pointer',
                                background: formacion === f ? 'var(--verde)' : 'white',
                                color: formacion === f ? 'white' : 'var(--verde-mid)',
                                borderColor: formacion === f ? 'var(--verde)' : '#c8aab2'
                            }}>{f}</button>
                        ))}
                    </div>
                    {formacion !== (formacionInicial || '1-3-2-1') && (
                        <div style={{ fontSize: 11, color: '#c0392b', marginTop: 6 }}>
                            ⚠️ Al cambiar de formación se vacían las posiciones
                        </div>
                    )}
                </div>

                {/* Campo editable */}
                <div style={{
                    background: 'linear-gradient(180deg, #6b1828 0%, #4a1020 50%, #6b1828 100%)',
                    borderRadius: 16, padding: '20px 12px',
                    position: 'relative', minHeight: 380,
                    border: '3px solid #1a4a1a',
                    display: 'flex', flexDirection: 'column', justifyContent: 'space-around', gap: 12,
                    marginBottom: 14
                }}>
                    <div style={{ position: 'absolute', top: '50%', left: '5%', right: '5%', height: 1, background: 'rgba(255,255,255,0.2)' }} />
                    <div style={{ position: 'absolute', top: '12%', left: '20%', right: '20%', bottom: '12%', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 4, pointerEvents: 'none' }} />

                    {[...LINEAS].reverse().map(linea => (
                        <div key={linea} style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', zIndex: 1 }}>
                            {getSlots(linea).map((slot, i) => {
                                const jug = slot.jugador_id ? getJugador(slot.jugador_id) : null
                                const editando = slotEditando?.linea === linea && slotEditando?.posicion === slot.posicion

                                return (
                                    <div key={i}>
                                        {editando ? (
                                            <div style={{ background: 'white', borderRadius: 10, padding: 8, minWidth: 150, boxShadow: '0 4px 20px rgba(0,0,0,0.3)', zIndex: 10 }}>
                                                <select
                                                    className="select"
                                                    style={{ fontSize: 13, padding: '6px 8px', minHeight: 40 }}
                                                    value={slot.jugador_id || ''}
                                                    onChange={e => asignarJugador(linea, slot.posicion, e.target.value)}
                                                    autoFocus
                                                >
                                                    <option value="">— Vacío —</option>
                                                    {jug && <option value={jug.id}>{jug.nombre} #{jug.dorsal}</option>}
                                                    {jugadoresDisponibles.map(j => (
                                                        <option key={j.id} value={j.id}>{j.nombre} #{j.dorsal}</option>
                                                    ))}
                                                </select>
                                                <button onClick={() => setSlotEditando(null)} style={{ marginTop: 4, width: '100%', fontSize: 11, padding: '4px', background: 'none', border: '1px solid #ddd', borderRadius: 6, cursor: 'pointer' }}>
                                                    Cancelar
                                                </button>
                                            </div>
                                        ) : (
                                            <div onClick={() => setSlotEditando({ linea, posicion: slot.posicion })} style={{ cursor: 'pointer' }}>
                                                {jug ? (
                                                    <Camiseta nombre={jug.nombre} dorsal={jug.dorsal} />
                                                ) : (
                                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                                                        <div style={{ width: 64, height: 54, border: '2px dashed rgba(255,255,255,0.4)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                            <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 22 }}>+</span>
                                                        </div>
                                                        <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)' }}>
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

                {guardado ? (
                    <div style={{ background: 'var(--verde-pale)', border: '1px solid #c3e0c3', borderRadius: 10, padding: '12px', textAlign: 'center', fontSize: 14, color: 'var(--verde)', fontWeight: 600 }}>
                        ✅ Alineación guardada correctamente
                    </div>
                ) : (
                    <button onClick={handleSave} disabled={guardando} className="btn btn-primary btn-block" style={{ fontSize: 16 }}>
                        {guardando ? 'Guardando...' : 'Guardar alineación'}
                    </button>
                )}
            </div>
        </>
    )
}

export default function Alineacion({ partido, jugadores, alineacionInicial, onSave, modoEdicion = false }) {
    const [modalAbierto, setModalAbierto] = useState(false)
    const [alineacionLocal, setAlineacionLocal] = useState(alineacionInicial)

    // Sincronizar si llega alineacionInicial después (carga async)
    useEffect(() => {
        setAlineacionLocal(alineacionInicial)
    }, [alineacionInicial])

    const slotsVista = (() => {
        const formacion = alineacionLocal?.formacion || '1-3-2-1'
        const est = FORMACIONES[formacion]
        if (alineacionLocal?.jugadores?.length) return alineacionLocal.jugadores
        // Si no hay alineación, devuelve slots vacíos
        const vacios = []
        Object.keys(est).forEach(linea => {
            for (let i = 0; i < est[linea]; i++) {
                vacios.push({ linea, posicion: i, jugador_id: null })
            }
        })
        return vacios
    })()

    const handleClose = (formacion, slots) => {
        if (formacion && slots) {
            setAlineacionLocal({ formacion, jugadores: slots })
        }
        setModalAbierto(false)
    }

    return (
        <div>
            {/* Vista — igual para todos */}
            <CampoVisual
                slots={slotsVista}
                jugadores={jugadores}
                formacion={alineacionLocal?.formacion || '1-3-2-1'}
            />

            {/* Botón editar — solo admins */}
            {modoEdicion && (
                <button
                    onClick={() => setModalAbierto(true)}
                    className="btn btn-ghost btn-block"
                    style={{ marginTop: 10 }}>
                    ✏️ Editar alineación
                </button>
            )}

            {/* Modal de edición */}
            {modalAbierto && (
                <ModalEditar
                    alineacionInicial={alineacionLocal}
                    formacionInicial={alineacionLocal?.formacion}
                    jugadores={jugadores}
                    onSave={onSave}
                    onClose={handleClose}
                />
            )}
        </div>
    )
}