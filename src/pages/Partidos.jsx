import { useNavigate } from 'react-router-dom'
import { useStore } from '../hooks/useStore'
import { EQUIPO_NOMBRE } from '../lib/mockData'

function fmt(str) { return new Date(str).toLocaleDateString('es-ES',{weekday:'short',day:'numeric',month:'short'}) }
function res(p) {
  const esL = p.local===EQUIPO_NOMBRE
  const n = esL?p.goles_local:p.goles_visitante, r = esL?p.goles_visitante:p.goles_local
  return n>r?'victoria':n<r?'derrota':'empate'
}

export default function Partidos() {
  const nav = useNavigate()
  const { partidos } = useStore()
  const nuestros = partidos.filter(p=>p.local===EQUIPO_NOMBRE||p.visitante===EQUIPO_NOMBRE)
  const jugados  = [...nuestros].filter(p=>p.jugado).sort((a,b)=>new Date(b.fecha)-new Date(a.fecha))
  const proximos = [...nuestros].filter(p=>!p.jugado).sort((a,b)=>new Date(a.fecha)-new Date(b.fecha))

  return (
    <div className="page">
      <h1 className="page-title">Partidos</h1>

      {proximos.length>0 && <>
        <h2 style={{ fontSize:16, fontWeight:700, color:'var(--gris-mid)', textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:8 }}>Próximos</h2>
        <div style={{ display:'flex', gap:10, overflowX:'auto', paddingBottom:8, marginBottom:'1.25rem', scrollbarWidth:'none' }}>
          {proximos.map((p,i)=>{
            const rival = p.local===EQUIPO_NOMBRE?p.visitante:p.local
            const cond  = p.local===EQUIPO_NOMBRE?'Local':'Visitante'
            return (
              <div key={p.id} onClick={()=>nav(`/partido/${p.id}`)} style={{ background:i===0?'var(--negro-soft)':'white', borderRadius:14, padding:'1rem', flexShrink:0, minWidth:180, border:'1px solid', borderColor:i===0?'var(--verde)':'#eef2ee', cursor:'pointer' }}>
                <div style={{ fontSize:10, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:4, color:i===0?'#7dce7d':'var(--verde-mid)' }}>J{p.jornada} · {cond}</div>
                <div style={{ fontSize:16, fontWeight:700, color:i===0?'white':'var(--negro)', marginBottom:4 }}>vs. {rival}</div>
                <div style={{ fontSize:12, color:i===0?'#666':'var(--gris-mid)' }}>{fmt(p.fecha)}</div>
                <div style={{ fontSize:11, color:i===0?'#555':'var(--gris-light)', marginTop:3 }}>📍 {p.campo}</div>
              </div>
            )
          })}
        </div>
      </>}

      <h2 style={{ fontSize:16, fontWeight:700, color:'var(--gris-mid)', textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:8 }}>Historial</h2>
      <div className="card" style={{ padding:0, overflow:'hidden' }}>
        {jugados.length===0 && <div className="empty">Sin partidos jugados</div>}
        {jugados.map((p,i)=>{
          const esL = p.local===EQUIPO_NOMBRE
          const r   = res(p)
          const rival = esL?p.visitante:p.local
          return (
            <div key={p.id} onClick={()=>nav(`/partido/${p.id}`)} style={{ display:'flex', alignItems:'center', gap:10, padding:'12px 14px', borderBottom:i<jugados.length-1?'1px solid #f0f4f0':'none', cursor:'pointer', WebkitTapHighlightColor:'rgba(0,0,0,0.04)' }}>
              <div style={{ width:4, height:40, borderRadius:2, flexShrink:0, background:r==='victoria'?'var(--verde-mid)':r==='derrota'?'#c0392b':'#bbb' }} />
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ fontSize:14, fontWeight:600, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>vs. {rival}</div>
                <div style={{ fontSize:11, color:'var(--gris-mid)', marginTop:1 }}>J{p.jornada} · {fmt(p.fecha)} · {esL?'Local':'Visitante'}</div>
              </div>
              <div style={{ display:'flex', alignItems:'center', gap:8, flexShrink:0 }}>
                <div style={{ display:'flex', alignItems:'baseline', gap:3 }}>
                  <span style={{ fontFamily:'Bebas Neue', fontSize:24, color:esL?'var(--verde)':'var(--gris-mid)' }}>{p.goles_local}</span>
                  <span style={{ color:'#ccc', fontSize:16 }}>–</span>
                  <span style={{ fontFamily:'Bebas Neue', fontSize:24, color:!esL?'var(--verde)':'var(--gris-mid)' }}>{p.goles_visitante}</span>
                </div>
                <span className={`tag-${r}`}>{r==='victoria'?'V':r==='derrota'?'D':'E'}</span>
              </div>
              <div style={{ color:'#ddd', fontSize:16 }}>›</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
