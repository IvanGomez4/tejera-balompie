import { useState } from 'react'
import { useStore } from '../hooks/useStore'

function initials(n) { return n.split(' ').map(w=>w[0]).join('').slice(0,2).toUpperCase() }
const posiciones = ['Todos','Portero','Defensa','Centrocampista','Extremo','Delantero']
const posClass = { Portero:'pos-portero', Defensa:'pos-defensa', Centrocampista:'pos-centrocampista', Extremo:'pos-extremo', Delantero:'pos-delantero' }

export default function Jugadores() {
  const { jugadores, stats } = useStore()
  const [filtro, setFiltro] = useState('Todos')
  const [selected, setSelected] = useState(null)

  const conTotales = jugadores.map(j => {
    const ss = stats.filter(s=>s.jugador_id===j.id)
    return { ...j, partidos:ss.length, goles:ss.reduce((a,s)=>a+s.goles,0), asistencias:ss.reduce((a,s)=>a+s.asistencias,0), tarjetas_amarillas:ss.reduce((a,s)=>a+s.tarjetas_amarillas,0), tarjetas_rojas:ss.reduce((a,s)=>a+s.tarjetas_rojas,0) }
  })
  const filtrados = filtro==='Todos' ? conTotales : conTotales.filter(j=>j.posicion===filtro)
  const jugador   = selected ? conTotales.find(j=>j.id===selected) : null

  return (
    <div className="page">
      <h1 className="page-title">Plantilla · {jugadores.length}</h1>
      <div style={{ display:'flex', gap:8, overflowX:'auto', paddingBottom:8, marginBottom:'1rem', scrollbarWidth:'none' }}>
        {posiciones.map(p=>(
          <button key={p} onClick={()=>setFiltro(p)} style={{ padding:'7px 14px', borderRadius:20, whiteSpace:'nowrap', border:'1.5px solid', fontSize:13, fontWeight:600, cursor:'pointer', flexShrink:0, minHeight:36, background:filtro===p?'var(--verde)':'white', color:filtro===p?'white':'var(--verde-mid)', borderColor:filtro===p?'var(--verde)':'#c0d0c0' }}>{p}</button>
        ))}
      </div>

      <div className="card" style={{ padding:0, overflow:'hidden' }}>
        {filtrados.map((j,i)=>(
          <div key={j.id} onClick={()=>setSelected(j.id===selected?null:j.id)} style={{ display:'flex', alignItems:'center', gap:12, padding:'12px 14px', borderBottom:i<filtrados.length-1?'1px solid #f0f4f0':'none', background:selected===j.id?'#f0f9f0':'white', cursor:'pointer' }}>
            <div className="avatar avatar-md">{initials(j.nombre)}</div>
            <div style={{ flex:1, minWidth:0 }}>
              <div style={{ fontSize:15, fontWeight:600 }}>{j.nombre}</div>
              <div style={{ display:'flex', alignItems:'center', gap:6, marginTop:2 }}>
                <span className={`pos-pill ${posClass[j.posicion]}`}>{j.posicion}</span>
                <span style={{ fontSize:12, color:'var(--gris-mid)' }}>#{j.dorsal}</span>
              </div>
            </div>
            <div style={{ display:'flex', gap:12, flexShrink:0 }}>
              {[['⚽',j.goles],['🅰️',j.asistencias],['🎮',j.partidos]].map(([ic,v])=>(
                <div key={ic} style={{ textAlign:'center' }}>
                  <div style={{ fontFamily:'Bebas Neue', fontSize:20, color:'var(--verde)', lineHeight:1 }}>{v}</div>
                  <div style={{ fontSize:9, color:'var(--gris-mid)' }}>{ic}</div>
                </div>
              ))}
            </div>
            <div style={{ color:'#c0d0c0', fontSize:16 }}>›</div>
          </div>
        ))}
      </div>

      {jugador && (
        <>
          <div onClick={()=>setSelected(null)} style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.5)', zIndex:200 }}/>
          <div style={{ position:'fixed', bottom:0, left:0, right:0, zIndex:300, background:'white', borderRadius:'20px 20px 0 0', padding:'1.5rem', paddingBottom:'calc(1.5rem + env(safe-area-inset-bottom))', boxShadow:'0 -4px 30px rgba(0,0,0,0.15)', maxHeight:'75vh', overflowY:'auto' }}>
            <div style={{ width:36, height:4, background:'#ddd', borderRadius:2, margin:'-0.5rem auto 1.25rem' }}/>
            <div style={{ display:'flex', alignItems:'center', gap:14, marginBottom:'1.25rem' }}>
              <div className="avatar avatar-lg">{initials(jugador.nombre)}</div>
              <div>
                <div style={{ fontFamily:'Bebas Neue', fontSize:26, color:'var(--verde)', lineHeight:1 }}>{jugador.nombre}</div>
                <div style={{ display:'flex', gap:8, marginTop:4 }}>
                  <span className={`pos-pill ${posClass[jugador.posicion]}`}>{jugador.posicion}</span>
                  <span style={{ fontFamily:'Bebas Neue', fontSize:20, color:'#c0d0c0' }}>#{jugador.dorsal}</span>
                </div>
              </div>
            </div>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:10, marginBottom:'1rem' }}>
              {[['Partidos',jugador.partidos,'var(--verde)'],['Goles',jugador.goles,'var(--verde-mid)'],['Asistencias',jugador.asistencias,'var(--dorado)'],['Amarillas',jugador.tarjetas_amarillas,'#c8a800']].map(([l,v,c])=>(
                <div key={l} style={{ background:'#f4f7f4', borderRadius:12, padding:'12px 8px', textAlign:'center' }}>
                  <div style={{ fontFamily:'Bebas Neue', fontSize:28, color:c, lineHeight:1 }}>{v}</div>
                  <div style={{ fontSize:10, color:'var(--gris-mid)', textTransform:'uppercase', letterSpacing:'0.06em', marginTop:3 }}>{l}</div>
                </div>
              ))}
            </div>
            {(jugador.goles+jugador.asistencias)>0 && (
              <div style={{ background:'#f4f7f4', borderRadius:12, padding:'12px 14px' }}>
                <div style={{ fontSize:12, color:'var(--gris-mid)', marginBottom:6 }}>Participación ofensiva</div>
                <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                  <div className="bar-wrap"><div className="bar-fill" style={{ width:`${Math.round((jugador.goles+jugador.asistencias)/Math.max(...conTotales.map(j=>j.goles+j.asistencias),1)*100)}%` }}/></div>
                  <span style={{ fontFamily:'Bebas Neue', fontSize:20, color:'var(--verde)' }}>{jugador.goles+jugador.asistencias}</span>
                </div>
              </div>
            )}
            <button onClick={()=>setSelected(null)} className="btn btn-primary btn-block" style={{ marginTop:'1.25rem' }}>Cerrar</button>
          </div>
        </>
      )}
    </div>
  )
}
