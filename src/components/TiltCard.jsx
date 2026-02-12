import { useRef, useState } from 'react'

export default function TiltCard({ children, className = '' }) {
  const ref = useRef(null)
  const [style, setStyle] = useState({})

  const handleMouseMove = (e) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    setStyle({
      transform: `perspective(600px) rotateX(${y * -6}deg) rotateY(${x * 6}deg) scale(1.02)`,
      transition: 'transform 0.15s ease',
    })
  }

  const handleMouseLeave = () => {
    setStyle({
      transform: 'perspective(600px) rotateX(0) rotateY(0) scale(1)',
      transition: 'transform 0.4s ease',
    })
  }

  return (
    <div
      ref={ref}
      className={className}
      style={style}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  )
}
