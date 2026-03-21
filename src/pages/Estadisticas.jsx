import { useState } from 'react'
import { useStore } from '../hooks/useStore'

function initials(n) { return n.split(' ').map(w=>w[0]).join('').slice(0,2).toUpperCase() }
const tabs = [
  { key:'goles',             label:'⚽ Goles',       color:'var(--verde)' },
  { key:'asistencias',       label:'🅰️ Asistencias', color:'var(--dorado)' },
  { key:'partidos',          label:'🎮 Partidos',    color:'var(--verde-mid)' },
  { key:'tarjetas_amarillas',label:'🟨 Amarillas',   color:'#c8a800' },
]

export default function Estadisticas() {
  const { jugadores, stats } = useStore()
  const [tab, setTab] = useState('goles')
  const cur = tabs.find(t=>t.key===tab)

  const conTotales = jugadores.map(j => {
    const ss = stats.filter(s=>s.jugador_id===j.id)
    return { ...j, partidos:ss.length, goles:ss.reduce((a,s)=>a+s.goles,0), asistencias:ss.reduce((a,s)=>a+s.asistencias,0), tarjetas_amarillas:ss.reduce((a,s)=>a+s.tarjetas_amarillas,0) }
  })

  const sorted = [...conTotales].filter(j=>j[tab]>0).sort((a,b)=>b[tab]-a[tab])
  const max    = Math.max(...conTotales.map(j=>j[tab]),1)
  const totGoles = conTotales.reduce((s,j)=>s+j.goles,0)
  const totAsist = conTotales.reduce((s,j)=>s+j.asistencias,0)
  const totAmar  = conTotales.reduce((s,j)=>s+j.tarjetas_amarillas,0)
  const maxPJ    = Math.max(...conTotales.map(j=>j.partidos),0)

  return (
    <div className="page">
      <h1 className="page-title">Estadísticas</h1>
      <div className="grid-4" style={{ marginBottom:'1.25rem' }}>
        {[['Goles',totGoles,'var(--verde)'],['Asistencias',totAsist,'var(--verde-mid)'],['Amarillas',totAmar,'#c8a800'],['Jornadas',maxPJ,'var(--verde)']].map(([l,v,c])=>(
          <div key={l} className="metric-card"><div className="metric-label">{l}</div><div className="metric-value" style={{color:c}}>{v}</div></div>
        ))}
      </div>

      <div style={{ display:'flex', gap:8, overflowX:'auto', paddingBottom:8, marginBottom:'1rem', scrollbarWidth:'none' }}>
        {tabs.map(t=>(
          <button key={t.key} onClick={()=>setTab(t.key)} style={{ padding:'8px 16px', borderRadius:20, whiteSpace:'nowrap', border:'1.5px solid', fontSize:13, fontWeight:600, cursor:'pointer', flexShrink:0, background:tab===t.key?'var(--verde)':'white', color:tab===t.key?'white':'var(--verde-mid)', borderColor:tab===t.key?'var(--verde)':'#c0d0c0' }}>{t.label}</button>
        ))}
      </div>

      <div className="card" style={{ padding:0, overflow:'hidden', marginBottom:'1.25rem' }}>
        {sorted.length===0 && <div className="empty">Sin datos aún</div>}
        {sorted.map((j,i)=>(
          <div key={j.id} style={{ display:'flex', alignItems:'center', gap:12, padding:'12px 14px', borderBottom:i<sorted.length-1?'1px solid #f0f4f0':'none', background:i===0?'#f0f9f0':'white' }}>
            <div style={{ fontFamily:'Bebas Neue', fontSize:20, minWidth:24, textAlign:'center', color:['#c8a800','#909090','#a06030','#c0d0c0'][Math.min(i,3)] }}>{i+1}</div>
            <div className="avatar avatar-sm">{initials(j.nombre)}</div>
            <div style={{ flex:1 }}><div style={{ fontSize:14, fontWeight:600 }}>{j.nombre}</div><div style={{ fontSize:11, color:'var(--gris-mid)' }}>{j.posicion}</div></div>
            <div className="bar-wrap" style={{ maxWidth:80 }}><div className="bar-fill" style={{ width:`${Math.round(j[tab]/max*100)}%`, background:cur.color }}/></div>
            <div style={{ fontFamily:'Bebas Neue', fontSize:26, color:cur.color, minWidth:28, textAlign:'right' }}>{j[tab]}</div>
          </div>
        ))}
      </div>

      <div className="card" style={{ padding:0, overflowX:'auto' }}>
        <table>
          <thead><tr><th>Jugador</th><th style={{textAlign:'center'}}>PJ</th><th style={{textAlign:'center'}}>⚽</th><th style={{textAlign:'center'}}>🅰️</th><th style={{textAlign:'center'}}>🟨</th></tr></thead>
          <tbody>
            {[...conTotales].sort((a,b)=>(b.goles+b.asistencias)-(a.goles+a.asistencias)).map(j=>(
              <tr key={j.id}>
                <td><div style={{display:'flex',alignItems:'center',gap:8}}><div className="avatar avatar-sm">{initials(j.nombre)}</div><div><div style={{fontSize:13,fontWeight:600,lineHeight:1.2}}>{j.nombre}</div><div style={{fontSize:10,color:'var(--gris-mid)'}}>{j.posicion}</div></div></div></td>
                <td style={{textAlign:'center',fontSize:14}}>{j.partidos}</td>
                <td style={{textAlign:'center',fontSize:14,fontWeight:700,color:j.goles>0?'var(--verde)':'#ccc'}}>{j.goles||'—'}</td>
                <td style={{textAlign:'center',fontSize:14,fontWeight:700,color:j.asistencias>0?'var(--dorado)':'#ccc'}}>{j.asistencias||'—'}</td>
                <td style={{textAlign:'center',fontSize:14}}>{j.tarjetas_amarillas>0?<span style={{display:'inline-flex',alignItems:'center',gap:3}}><span style={{width:10,height:13,background:'#f0c040',borderRadius:2,display:'inline-block'}}/>{j.tarjetas_amarillas}</span>:<span style={{color:'#ddd'}}>—</span>}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
