export default function Camiseta({ nombre, dorsal, pequeña = false }) {
    const size = pequeña ? 52 : 64
    const fontSize = pequeña ? 9 : 11
    const dorsalSize = pequeña ? 16 : 20

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
            {/* Camiseta SVG verde con dorsal */}
            <div style={{ position: 'relative', width: size, height: size * 0.85 }}>
                <svg viewBox="0 0 100 85" width={size} height={size * 0.85} xmlns="http://www.w3.org/2000/svg">
                    {/* Cuerpo camiseta */}
                    <path d="M25 10 L10 30 L25 35 L25 80 L75 80 L75 35 L90 30 L75 10 L65 20 Q50 28 35 20 Z"
                        fill="#5a1520" stroke="#7a1e30" strokeWidth="2" />
                    {/* Cuello */}
                    <path d="M35 20 Q50 30 65 20 Q60 10 50 12 Q40 10 35 20 Z"
                        fill="#4a1020" stroke="#7a1e30" strokeWidth="1" />
                    {/* Mangas */}
                    <path d="M25 10 L10 30 L25 35 Z" fill="#4a1020" stroke="#7a1e30" strokeWidth="1" />
                    <path d="M75 10 L90 30 L75 35 Z" fill="#4a1020" stroke="#7a1e30" strokeWidth="1" />
                    {/* Dorsal */}
                    <text x="50" y="58" textAnchor="middle" fill="#f0c040"
                        fontSize={dorsalSize} fontWeight="bold" fontFamily="'Bebas Neue', sans-serif">
                        {dorsal || '?'}
                    </text>
                </svg>
            </div>
            {/* Nombre */}
            <div style={{
                fontSize, fontWeight: 700, color: 'white',
                textAlign: 'center', maxWidth: size + 10,
                textShadow: '0 1px 3px rgba(0,0,0,0.8)',
                lineHeight: 1.2,
                overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'
            }}>
                {nombre ? nombre.split(' ')[0].toUpperCase() : '—'}
            </div>
        </div>
    )
}