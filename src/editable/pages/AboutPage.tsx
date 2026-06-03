import Link from 'next/link'
import { Award, BadgeCheck, Gauge, ScanLine } from 'lucide-react'
import { fetchTaskPosts } from '@/lib/task-data'
import { SITE_CONFIG } from '@/lib/site-config'
import { getEditableExcerpt, getEditablePostImage, postHref } from '@/editable/cards/PostCards'
import { pagesContent } from '@/editable/content/pages.content'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'

const stats = [
  ['Deals', 'Affordable finds'],
  ['Jobs', 'Local opportunities'],
  ['Property', 'Rental and sale posts'],
]

const capabilities = [
  { icon: ScanLine, title: 'Quick discovery', body: 'Compact cards and category links help visitors compare useful classifieds faster.' },
  { icon: Gauge, title: 'Practical details', body: 'Listing pages keep images, summaries, price cues, location notes, and contact paths together.' },
  { icon: BadgeCheck, title: 'Seller context', body: 'Profiles, related listings, and contact panels make each post easier to evaluate.' },
  { icon: Award, title: 'Everyday categories', body: 'Useful across deals, second-hand products, services, jobs, property, travel, and events.' },
]

export default async function AboutPage() {
  const posts = await fetchTaskPosts('listing', 3, { allowMockFallback: true })
  const heroPost = posts[0] || null
  return (
    <EditableSiteShell>
      <main className="pt-32 text-[#10203a]">
        <section className="rapid-shell grid gap-10 py-12 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <div className="rapid-animate-slide">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#0b5483]">{pagesContent.about.badge}</p>
            <h1 className="mt-5 text-[56px] font-black leading-[1.05] tracking-[-0.04em] text-[#153b72]">
              Clear discovery for deals, services, jobs, property and local classifieds.
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-9 text-[#183b69]">{pagesContent.about.description}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/classified" className="rapid-pill px-6 py-3 text-sm font-bold text-black">Explore Listings</Link>
              <Link href="/contact" className="rapid-pill px-6 py-3 text-sm font-bold text-black">Contact_Us</Link>
            </div>
          </div>
          <div className="rapid-glass rapid-animate-rise rounded-[28px] p-8">
            <Link href={heroPost ? postHref('listing', heroPost, '/listing') : '/listing'} className="rapid-feature-card block overflow-hidden rounded-[18px] bg-white/70 shadow-[0_22px_58px_rgba(15,80,120,.22)]">
              {heroPost ? (
                <img src={getEditablePostImage(heroPost)} alt={heroPost.title} className="h-[330px] w-full object-cover" />
              ) : (
                <div className="flex h-[330px] items-center justify-center bg-[#d7eef8] text-[#0b5483]">
                  Browse listings
                </div>
              )}
              {heroPost ? (
                <div className="p-5">
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-[#0b5483]">{heroPost.tags?.[0] || 'Listing'}</p>
                  <h3 className="mt-2 line-clamp-2 text-2xl font-black text-[#101827]">{heroPost.title}</h3>
                  <p className="mt-2 line-clamp-3 text-sm leading-7 text-[#637083]">{getEditableExcerpt(heroPost, 120)}</p>
                </div>
              ) : null}
            </Link>
            <div className="mt-7 grid gap-4 sm:grid-cols-3">
              {stats.map(([value, label]) => (
                <div key={label} className="rounded-2xl bg-white/70 p-5 text-center">
                  <p className="text-3xl font-black italic text-black">{value}</p>
                  <p className="mt-2 text-sm font-bold text-[#0b5483]">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="rapid-shell rapid-glass rounded-[28px] p-8 sm:p-10">
          <div className="grid gap-7 md:grid-cols-2">
            {capabilities.map((item, index) => (
              <div key={item.title} className="rapid-feature-card rounded-2xl bg-white/80 p-6" style={{ animationDelay: `${index * 90}ms` }}>
                <item.icon className="h-8 w-8 text-[#0b5483]" />
                <h2 className="mt-5 text-2xl font-black text-[#0b5483]">{item.title}</h2>
                <p className="mt-3 text-sm leading-7 text-[#637083]">{item.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 grid gap-5 text-sm leading-8 text-[#183b69] md:grid-cols-2">
            {pagesContent.about.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
        </section>

        <section className="rapid-shell mt-16">
          <h2 className="text-center text-[48px] font-black text-[#0b5483]">About {SITE_CONFIG.name}</h2>
        </section>
      </main>
    </EditableSiteShell>
  )
}
