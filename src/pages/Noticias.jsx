import { useState, useEffect } from 'react'
import { useStore } from '../hooks/useStore'
import { adminAuth } from '../lib/adminAuth'

function formatFecha(iso) {
  const d = new Date(iso)
  return d.toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })
}

// Convierte un File a base64 en el componente, donde FileReader funciona bien
function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (e) => resolve(e.target.result)
    reader.onerror = () => reject(new Error('Error leyendo el archivo'))
    reader.readAsDataURL(file)
  })
}

export default function Noticias() {
  const { store } = useStore()
  const [noticias, setNoticias] = useState([])
  const [loading, setLoading] = useState(true)
  const [visor, setVisor] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const logged = adminAuth.isLogged()

  const [titulo, setTitulo] = useState('')
  const [archivo, setArchivo] = useState(null)
  const [preview, setPreview] = useState(null)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    store.getNoticias().then(data => {
      setNoticias(data)
      setLoading(false)
    }).catch(() => {
      setLoading(false)
    })
  }, [])

  const handleArchivo = (e) => {
    const f = e.target.files[0]
    if (!f) return
    setArchivo(f)
    fileToBase64(f).then(b64 => setPreview(b64))
  }

  const handleSubmit = async () => {
    if (!titulo.trim()) { setError('Escribe un título'); return }
    if (!archivo) { setError('Selecciona una imagen'); return }
    setSaving(true)
    setError('')
    try {
      // Convertimos a base64 aquí, en el componente
      const imagen_url_local = await fileToBase64(archivo)
      const nueva = await store.addNoticia({ titulo: titulo.trim(), archivo, imagen_url_local })
      setNoticias(prev => [nueva, ...prev])
      setTitulo('')
      setArchivo(null)
      setPreview(null)
      setShowForm(false)
    } catch (e) {
      console.error(e)
      setError('Error al guardar la portada. Inténtalo de nuevo.')
    }
    setSaving(false)
  }

  const handleDelete = async (id) => {
    if (!window.confirm('¿Eliminar esta portada?')) return
    await store.deleteNoticia(id)
    setNoticias(prev => prev.filter(n => n.id !== id))
    if (visor?.id === id) setVisor(null)
  }

  const cancelForm = () => {
    setShowForm(false)
    setTitulo('')
    setArchivo(null)
    setPreview(null)
    setError('')
  }

  return (
    <div className="page">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
        <h1 className="page-title" style={{ margin: 0 }}>Noticias 📰</h1>
        {logged && (
          <button
            onClick={() => setShowForm(true)}
            className="btn btn-primary btn-sm"
          >
            + Portada
          </button>
        )}
      </div>

      {loading && (
        <div style={{ textAlign: 'center', padding: '3rem 0', color: 'var(--gris-mid)' }}>
          Cargando portadas...
        </div>
      )}

      {!loading && noticias.length === 0 && (
        <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
          <div style={{ fontSize: 56, marginBottom: '1rem' }}>📰</div>
          <div style={{ fontFamily: 'Bebas Neue', fontSize: 22, color: 'var(--verde)', marginBottom: 8 }}>
            Sin portadas todavía
          </div>
          <div style={{ color: 'var(--gris-mid)', fontSize: 14, maxWidth: 260, margin: '0 auto' }}>
            {logged ? 'Pulsa "+ Portada" para subir la primera.' : 'Pronto aparecerán las mejores portadas del vestuario.'}
          </div>
        </div>
      )}

      {/* Grid de portadas */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 12 }}>
        {noticias.map(n => (
          <div
            key={n.id}
            onClick={() => setVisor(n)}
            style={{
              borderRadius: 12,
              overflow: 'hidden',
              boxShadow: '0 2px 12px rgba(0,0,0,0.13)',
              cursor: 'pointer',
              background: 'white',
              border: '1px solid rgba(0,0,0,0.06)',
              transition: 'transform 0.15s, box-shadow 0.15s',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.02)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.18)' }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.13)' }}
          >
            <div style={{ aspectRatio: '3/4', overflow: 'hidden', background: '#eee' }}>
              <img
                src={n.imagen_url}
                alt={n.titulo}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </div>
            <div style={{ padding: '8px 10px 10px' }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--negro)', lineHeight: 1.3, marginBottom: 4 }}>
                {n.titulo}
              </div>
              <div style={{ fontSize: 10, color: 'var(--gris-mid)' }}>
                {formatFecha(n.created_at)}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Visor a pantalla completa */}
      {visor && (
        <div
          onClick={() => setVisor(null)}
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', zIndex: 500, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{ position: 'relative', maxWidth: 480, width: '100%', borderRadius: 16, overflow: 'hidden', background: 'white', boxShadow: '0 8px 40px rgba(0,0,0,0.5)' }}
          >
            <img
              src={visor.imagen_url}
              alt={visor.titulo}
              style={{ width: '100%', display: 'block', maxHeight: '70vh', objectFit: 'contain', background: '#111' }}
            />
            <div style={{ padding: '14px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10 }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: 'Bebas Neue', fontSize: 20, color: 'var(--verde)', lineHeight: 1.2 }}>{visor.titulo}</div>
                <div style={{ fontSize: 11, color: 'var(--gris-mid)', marginTop: 2 }}>{formatFecha(visor.created_at)}</div>
              </div>
              <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
                {logged && (
                  <button
                    onClick={() => handleDelete(visor.id)}
                    style={{ background: '#fee', border: '1px solid #fcc', color: '#c0392b', borderRadius: 8, padding: '6px 12px', fontSize: 13, cursor: 'pointer', fontWeight: 600 }}
                  >
                    🗑️
                  </button>
                )}
                <button
                  onClick={() => setVisor(null)}
                  style={{ background: '#f4f7f4', border: 'none', borderRadius: 8, padding: '6px 14px', fontSize: 13, cursor: 'pointer', fontWeight: 600, color: 'var(--negro)' }}
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal añadir portada */}
      {showForm && (
        <>
          <div onClick={cancelForm} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.55)', zIndex: 400 }} />
          <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 500, background: 'white', borderRadius: '20px 20px 0 0', padding: '1.5rem', paddingBottom: 'calc(1.5rem + env(safe-area-inset-bottom))', boxShadow: '0 -4px 30px rgba(0,0,0,0.2)', maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ width: 36, height: 4, background: '#ddd', borderRadius: 2, margin: '-0.5rem auto 1.25rem' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <h2 style={{ fontSize: 22, color: 'var(--verde)', fontFamily: 'Bebas Neue' }}>Nueva portada</h2>
              <button onClick={cancelForm} style={{ background: 'none', border: 'none', fontSize: 22, cursor: 'pointer', color: '#aaa' }}>✕</button>
            </div>

            {error && (
              <div style={{ background: '#fde8e8', border: '1px solid #f5c0c0', borderRadius: 10, padding: '10px 14px', marginBottom: 14, fontSize: 13, color: '#c0392b' }}>
                {error}
              </div>
            )}

            {/* Preview imagen */}
            <div
              onClick={() => document.getElementById('input-portada').click()}
              style={{
                width: '100%', aspectRatio: '3/2', borderRadius: 12, border: '2px dashed #c0d0c0',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                overflow: 'hidden', marginBottom: '1rem', cursor: 'pointer',
                background: preview ? 'black' : '#f4f7f4',
              }}
            >
              {preview
                ? <img src={preview} alt="preview" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                : (
                  <div style={{ textAlign: 'center', color: 'var(--gris-mid)' }}>
                    <div style={{ fontSize: 36, marginBottom: 8 }}>🖼️</div>
                    <div style={{ fontSize: 14, fontWeight: 600 }}>Toca para elegir imagen</div>
                    <div style={{ fontSize: 12, marginTop: 4 }}>JPG, PNG, WebP...</div>
                  </div>
                )
              }
            </div>
            <input
              id="input-portada"
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={handleArchivo}
            />

            <div className="form-group" style={{ marginBottom: '1rem' }}>
              <label className="label">Titular</label>
              <input
                className="input"
                type="text"
                placeholder="Ej: Messi ficha por el Tejera Balompié"
                value={titulo}
                onChange={e => { setTitulo(e.target.value); setError('') }}
                maxLength={120}
              />
            </div>

            <button
              onClick={handleSubmit}
              disabled={saving}
              className="btn btn-primary btn-block"
              style={{ fontSize: 16, opacity: saving ? 0.7 : 1 }}
            >
              {saving ? 'Guardando...' : '📰 Publicar portada'}
            </button>
          </div>
        </>
      )}
    </div>
  )
}
