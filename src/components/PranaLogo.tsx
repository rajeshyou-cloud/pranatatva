/**
 * PranaTatva SVG logo — gold lotus with white meditating figure (namaste pose).
 * Transparent background: renders cleanly on any dark surface without a white box.
 * Use the actual PNG (/Logo.jpeg) only on light/cream backgrounds via <img> directly.
 */
export default function PranaLogo({
  size = 40,
  color = '#D4AD25',
}: {
  size?: number
  color?: string
}) {
  const height = Math.round(size * 290 / 280)

  return (
    <svg
      width={size}
      height={height}
      viewBox="0 0 280 290"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* ── Lotus petals ── */}
      <path fill={color} d="M130 174 C122 162 106 140 82 112 C64 89 50 70 47 58 C56 49 73 59 95 85 C119 114 132 150 135 172 Z"/>
      <path fill={color} d="M150 174 C158 162 174 140 198 112 C216 89 230 70 233 58 C224 49 207 59 185 85 C161 114 148 150 145 172 Z"/>
      <path fill={color} d="M126 190 C110 179 80 167 52 172 C28 176 10 193 10 210 C10 227 28 238 52 234 C82 230 112 216 126 202 Z"/>
      <path fill={color} d="M154 190 C170 179 200 167 228 172 C252 176 270 193 270 210 C270 227 252 238 228 234 C198 230 168 216 154 202 Z"/>
      <path fill={color} d="M118 216 C112 232 110 256 122 270 C130 280 140 288 140 288 C140 288 150 280 158 270 C170 256 168 232 162 216 Z"/>
      <ellipse cx="140" cy="197" rx="37" ry="25" fill={color}/>
      <path fill={color} d="M126 188 C118 184 108 182 100 185 C92 189 89 197 94 204 C102 210 116 208 124 202 C126 198 127 193 126 188 Z"/>
      <path fill={color} d="M154 188 C162 184 172 182 180 185 C188 189 191 197 186 204 C178 210 164 208 156 202 C154 198 153 193 154 188 Z"/>

      {/* ── White meditating figure (namaste pose) ── */}
      <circle fill="white" cx="140" cy="108" r="13"/>
      <path fill="white" d="M140 73 C136 84 128 102 123 122 C119 135 118 150 120 162 C122 172 127 180 134 184 C137 186 139 190 138 196 C137 199 138 202 140 203 C142 202 143 199 142 196 C141 190 143 186 146 184 C153 180 158 172 160 162 C162 150 161 135 157 122 C152 102 144 84 140 73 Z"/>
      <path fill="white" d="M120 195 C113 202 111 214 117 223 C123 230 132 232 140 228 C132 222 124 214 120 204 Z"/>
      <path fill="white" d="M160 195 C167 202 169 214 163 223 C157 230 148 232 140 228 C148 222 156 214 160 204 Z"/>
    </svg>
  )
}
