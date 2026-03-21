import { useStore } from '../hooks/useStore'
import { EQUIPO_NOMBRE } from '../lib/mockData'
import escudo from '../assets/escudo.png'

const medalColors = ['#c8a800','#909090','#a06030']

export default function Clasificacion() {
  const { clasificacion } = useStore()
  return (
    <div className="page">
      <h1 className="page-title">Clasificación</h1>
      <div className="card" style={{ padding:'0.75rem 0' }}>
        <div style={{ display:'grid', gridTemplateColumns:'28px 1fr 28px 28px 28px 28px 30px', gap:4, padding:'0 10px 8px', borderBottom:'1.5px solid #eef2ee' }}>
          {['#','Equipo','PJ','PG','PP','DG','Pts'].map(h=>(
            <div key={h} style={{ fontSize:10, fontWeight:700, color:'var(--gris-mid)', textAlign:h==='Equipo'?'left':'center', textTransform:'uppercase', letterSpacing:'0.06em' }}>{h}</div>
          ))}
        </div>
        {clasificacion.map((e,i)=>{
          const esN = e.equipo===EQUIPO_NOMBRE, dg=e.gf-e.gc
          return (
            <div key={i} style={{ display:'grid', gridTemplateColumns:'28px 1fr 28px 28px 28px 28px 30px', gap:4, padding:'10px', background:esN?'#f0f9f0':'transparent', borderBottom:i<clasificacion.length-1?'1px solid #f5f5f5':'none', alignItems:'center' }}>
              <div style={{ display:'flex', alignItems:'center', justifyContent:'center' }}>
                <div style={{ width:22, height:22, borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', fontSize:11, fontWeight:700, background:i<3?medalColors[i]:'#f0f0f0', color:i<3?'white':'#aaa' }}>{e.pos}</div>
              </div>
              <div style={{ display:'flex', alignItems:'center', gap:6, overflow:'hidden' }}>
                {esN && <img src={escudo} alt="" style={{ width:20, height:20, objectFit:'contain', flexShrink:0 }}/>}
                <span style={{ fontSize:13, fontWeight:esN?700:400, color:esN?'var(--verde)':'#333', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{e.equipo}</span>
              </div>
              {[e.pj,e.pg,e.pp].map((v,vi)=>(
                <div key={vi} style={{ textAlign:'center', fontSize:13, color:'#555' }}>{v}</div>
              ))}
              <div style={{ textAlign:'center', fontSize:13, fontWeight:600, color:dg>0?'var(--verde-mid)':dg<0?'#c0392b':'#888' }}>{dg>0?`+${dg}`:dg}</div>
              <div style={{ textAlign:'center', fontFamily:'Bebas Neue', fontSize:20, color:esN?'var(--verde)':'var(--negro)' }}>{e.pts}</div>
            </div>
          )
        })}
      </div>
      <div style={{ marginTop:'0.75rem', fontSize:11, color:'var(--gris-mid)', display:'flex', flexWrap:'wrap', gap:'6px 14px' }}>
        <span>PJ=Jugados</span><span>PG=Ganados</span><span>PP=Perdidos</span><span>DG=Dif. goles</span><span>Pts=Puntos</span>
      </div>
    </div>
  )
}
