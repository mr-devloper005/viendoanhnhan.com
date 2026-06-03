'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import logoAsset from '@/editable/assets/site-logo.png'

const logoSrc = typeof logoAsset === 'string' ? logoAsset : logoAsset.src

const links = [
  ['Home', '/'],
  ['Classifieds', '/classified'],
  ['About', '/about'],
]

export function EditableNavbar() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const existing = document.querySelector<HTMLLinkElement>('link[rel="icon"]')
    const icon = existing || document.createElement('link')
    icon.rel = 'icon'
    icon.type = 'image/png'
    icon.href = logoSrc
    if (!existing) document.head.appendChild(icon)
  }, [])

  return (
    <header className="fixed left-0 right-0 top-5 z-50 px-4">
      <nav className="rapid-shell rapid-glass rounded-[42px] px-7 py-4">
        <div className="flex items-center justify-between gap-5">
          <Link href="/" className="flex items-center gap-4">
            <span className="flex h-14 w-14 overflow-hidden rounded-2xl bg-[#0b5483] shadow-lg">
              <img src={logoSrc} alt={`${SITE_CONFIG.name} logo`} className="h-full w-full object-cover" />
            </span>
            <span className="leading-none">
              <span className="block text-[30px] font-black italic tracking-[-0.07em] text-[#174d9a]">Viendoanhnhan</span>
              
            </span>
          </Link>

          <div className="hidden items-center gap-8 text-[16px] font-semibold text-black lg:flex">
            {links.map(([label, href]) => <Link key={label} href={href} className="transition hover:-translate-y-0.5 hover:text-[#0b5483]">{label}</Link>)}
          </div>

          <div className="hidden items-center gap-9 lg:flex">
         
            <Link href="/contact" className="rapid-pill px-6 py-3 text-[16px] font-semibold text-black">Contact_Us</Link>
            <Link href="/signup" className="rapid-pill px-6 py-3 text-[16px] font-semibold text-black">Sign Up</Link>
            <Link href="/login" className="rapid-pill px-6 py-3 text-[16px] font-semibold text-black">Sign in</Link>

          </div>

          <button type="button" onClick={() => setOpen((value) => !value)} className="rapid-pill p-3 lg:hidden" aria-label="Toggle menu">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {open ? (
          <div className="mt-5 grid gap-3 border-t border-white/40 pt-5 lg:hidden">
            {links.map(([label, href]) => <Link key={label} href={href} onClick={() => setOpen(false)} className="rapid-pill px-4 py-3 text-sm font-semibold text-black">{label}</Link>)}
            <Link href="/classified" onClick={() => setOpen(false)} className="rapid-pill px-4 py-3 text-sm font-semibold text-black">Browse Listings</Link>
            <Link href="/contact" onClick={() => setOpen(false)} className="rapid-pill px-4 py-3 text-sm font-semibold text-black">Contact_Us</Link>
          </div>
        ) : null}
      </nav>
    </header>
  )
}
