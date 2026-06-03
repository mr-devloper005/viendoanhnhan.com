import Link from 'next/link'
import { SITE_CONFIG } from '@/lib/site-config'
import logoAsset from '@/editable/assets/site-logo.png'

const logoSrc = typeof logoAsset === 'string' ? logoAsset : logoAsset.src

export function EditableFooter() {
  return (
    <footer className="mt-24 bg-[#101827] text-[#a9b5c7]">
      <div className="rapid-shell relative flex min-h-[120px] flex-col items-center justify-between gap-6 overflow-hidden px-4 py-10 text-sm md:flex-row">
        <span className="pointer-events-none absolute inset-0 flex items-center justify-center text-[110px] font-black tracking-[-0.08em] text-white/[0.025]">VIENDOANHNHAN</span>
        <Link href="/" className="relative flex items-center gap-3">
          <span className="flex h-14 w-14 overflow-hidden rounded-2xl bg-white/10 shadow-lg ring-1 ring-white/15">
            <img src={logoSrc} alt={`${SITE_CONFIG.name} logo`} className="h-full w-full object-cover" />
          </span>
          <span className="text-lg font-black text-white">{SITE_CONFIG.name}</span>
        </Link>
        <div className="relative flex flex-wrap justify-center gap-8">
          
          <Link href="/about" style={{ color: '#fff' }} className="hover:text-white">About</Link>
          <Link href="/contact" style={{ color: '#fff' }} className="hover:text-white">Contact</Link>
          <Link href="/classified" style={{ color: '#fff' }} className="hover:text-white">Classified</Link>
        </div>
       
      </div>
    </footer>
  )
}
