import Link from 'next/link'
import type { SitePost } from '@/lib/site-connector'
import type { HomeTimeSection } from '@/lib/task-data'
import type { TaskKey } from '@/lib/site-config'
import { getEditableExcerpt, getEditablePostImage, postHref } from '@/editable/cards/PostCards'
import { MarketplaceVisual } from '@/editable/components/MarketplaceVisual'

type HomeSectionProps = {
  primaryTask: TaskKey
  primaryRoute: string
  posts: SitePost[]
  timeSections: HomeTimeSection[]
}

const categoryRail = ['Deals', 'Second-Hand', 'Property', 'Jobs', 'Services', 'Vehicles', 'Events', 'Travel', 'Business', 'Electronics', 'Home Goods']
const featureCards = [
  {
    title: 'Search by category',
    description: 'Move quickly between deals, services, jobs, property, events, and local offers.',
  },
  {
    title: 'Clear listing details',
    description: 'Review photos, price, location, seller notes, and descriptions before contacting.',
  },
  {
    title: 'Seller contact flow',
    description: 'Use simple sign-in and contact prompts when a listing needs more information.',
  },
]
const systems = ['Affordable Deals', 'Used Products', 'Property Rentals', 'Job Openings', 'Local Services', 'Business Listings', 'Travel Offers', 'Community Events', 'Electronics', 'Home & Garden', 'Vehicle Listings', 'Seller Profiles']
const apps = ['Students', 'Families', 'Small Businesses', 'Job Seekers', 'Property Hunters', 'Local Sellers']

function ProductVisual({ className = '', title = 'Viendoanhnhan', subtitle = 'Local classifieds marketplace', variant = 0, scene = 'hero' }: { className?: string; title?: string; subtitle?: string; variant?: number; scene?: Parameters<typeof MarketplaceVisual>[0]['scene'] }) {
  return <MarketplaceVisual title={title} subtitle={subtitle} variant={variant} scene={scene} className={`rapid-product-visual block ${className}`} alt={`${title} marketplace visual`} />
}

function pickPost(posts: SitePost[], index: number, offset = 0) {
  if (!posts.length) return null
  return posts[(index + offset) % posts.length] || null
}

function CardImage({ post, title, className = 'h-24 w-full' }: { post: SitePost | null; title: string; className?: string }) {
  const image = getEditablePostImage(post)
  return <img src={image} alt={title} className={`rounded-lg object-cover ${className}`} />
}

function DetailHeroImage({ post, title, className = 'h-full w-full' }: { post: SitePost | null; title: string; className?: string }) {
  const image = getEditablePostImage(post)
  return <img src={image} alt={title} className={`block rounded-[18px] object-cover ${className}`} />
}

function PostProductCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  const image = getEditablePostImage(post)
  return (
    <Link href={href} className="rapid-feature-card overflow-hidden rounded-2xl bg-white text-[#101827] shadow-[0_22px_54px_rgba(11,84,131,0.18)]" style={{ animationDelay: `${index * 90}ms` }}>
      <div className="h-56 overflow-hidden bg-[#70b5dc]">
        <img src={image} alt={post.title} className="h-full w-full object-cover transition duration-500 hover:scale-105" />
      </div>
      <div className="p-6">
        <h3 className="line-clamp-2 text-xl font-semibold">{post.title}</h3>
        <p className="mt-5 line-clamp-2 text-sm text-[#687386]">{getEditableExcerpt(post, 90) || 'Browse listing details and contact the seller.'}</p>
      </div>
    </Link>
  )
}

export function EditableHomeHero({ posts }: HomeSectionProps) {
  return (
    <section className="rapid-shell grid min-h-[720px] items-center gap-12 pb-10 pt-32 lg:grid-cols-[0.95fr_1.05fr] lg:pt-36">
      <div className="rapid-animate-slide">
        <h1 className="max-w-[540px] text-[52px] font-black leading-[1.24] tracking-[0.04em] text-[#153b72] sm:text-[58px]">
          Find Affordable Deals, Jobs, Property, Services and Local Listings
        </h1>
        <p className="mt-8 max-w-[560px] text-[20px] font-normal leading-[1.9] text-[#183b69]">
          viendoanhnhan.com brings together practical classifieds for buyers, sellers, job seekers, renters, local businesses, and anyone comparing everyday opportunities.
        </p>
      </div>
      <div className="rapid-animate-rise">
        <div className="mb-8 rounded-2xl bg-[#55addd]/35 px-3 py-3 text-[#0b4a7a]">
          <p className="text-[48px] font-semibold uppercase leading-none tracking-[0.03em]">Local Listings</p>
          <p className="mt-4 text-[44px] font-black italic text-black">Browse Now</p>
        </div>
        <div className="rapid-animate-float overflow-hidden rounded-[18px]">
          <DetailHeroImage post={pickPost(posts, 0)} title="Viendoanhnhan listing image" className="min-h-[330px] w-full" />
        </div>
      </div>
      <span className="rapid-dot top-[39%]" />
    </section>
  )
}

export function EditableStoryRail({ primaryTask, primaryRoute, posts }: HomeSectionProps) {
  const visible = posts.slice(0, 10)
  return (
    <section className="rapid-shell rapid-glass rounded-[22px] px-8 py-8">
      <div className="grid grid-cols-2 gap-x-12 gap-y-10 sm:grid-cols-3 lg:grid-cols-6">
        {categoryRail.map((name, index) => (
          <Link key={name} href={visible[index] ? postHref(primaryTask, visible[index], primaryRoute) : primaryRoute} className="rapid-logo-tile flex h-[62px] items-center justify-center px-4 text-center text-sm font-black uppercase text-[#1c5990] transition hover:-translate-y-1">
            {name}
          </Link>
        ))}
      </div>
    </section>
  )
}

export function EditableMagazineSplit({ primaryTask, primaryRoute, posts }: HomeSectionProps) {
  const heroPosts = posts.slice(0, 3)
  return (
    <section className="rapid-shell py-28">
      <div className="mx-auto mb-24 max-w-[560px]">
        <DetailHeroImage post={pickPost(posts, 1)} title="Marketplace feature listing image" className="min-h-[340px] w-full" />
      </div>
      <h2 className="text-center text-[54px] font-bold tracking-[-0.04em] text-[#101827]">Marketplace Features</h2>
      <div className="rapid-glass mt-16 grid gap-7 rounded-2xl p-6 md:grid-cols-2 lg:grid-cols-3">
        {featureCards.map(({ title, description }, index) => (
          <Link key={title} href={posts[index] ? postHref(primaryTask, posts[index], primaryRoute) : primaryRoute} className="rapid-feature-card relative min-h-[280px] overflow-hidden rounded-2xl bg-[#6eb2dc] p-0 text-white" style={{ animationDelay: `${index * 110}ms` }}>
            <CardImage post={pickPost(heroPosts, index, 0)} title={title} className="absolute inset-0 h-full w-full" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#03101f]/76 via-[#03101f]/18 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-end p-6">
              <h3 className="text-lg font-bold drop-shadow">{title}</h3>
              <p className="mt-2 max-w-sm text-sm leading-6 text-white/88">{description}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

export function EditableTimeCollections({ primaryTask, primaryRoute, posts }: HomeSectionProps) {
  const productPosts = posts.slice(0, 3)
  return (
    <>
      <section className="rapid-shell rapid-glass rounded-2xl px-7 py-10">
        <h2 className="text-center text-[48px] font-black tracking-[0.08em] text-[#0b5483] sm:text-[52px]">Browse Classified Categories</h2>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {systems.map((item, index) => (
            <Link key={item} href={primaryRoute} className="rapid-feature-card overflow-hidden rounded-xl bg-white px-4 py-4 text-center text-[16px] font-bold text-[#0b5483] shadow-[0_10px_22px_rgba(16,87,135,0.16)]" style={{ animationDelay: `${index * 45}ms` }}>
              <CardImage post={pickPost(posts, index, 0)} title={`${item} listing image`} className="mb-4 h-20 w-full" />
              {item}
            </Link>
          ))}
        </div>
      </section>

      <section className="rapid-shell rapid-glass mt-20 rounded-2xl px-6 py-10 sm:px-12">
        <h2 className="text-center text-[50px] font-black tracking-[0.02em] text-[#0b5483]">Useful For Everyday Visitors</h2>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {apps.map((item, index) => (
            <Link key={item} href={primaryRoute} className="rapid-feature-card overflow-hidden rounded-xl bg-[#6eb2dc] p-4 text-center text-lg font-bold text-[#0b5483] shadow-[0_12px_28px_rgba(16,87,135,0.2)]" style={{ animationDelay: `${index * 70}ms` }}>
              <CardImage post={pickPost(posts, index, 3)} title={`${item} listing image`} className="mx-auto mb-4 h-36 w-full" />
              {item}
            </Link>
          ))}
        </div>
      </section>

      <section className="rapid-shell mt-24">
        <div className="mb-16 flex items-end justify-between gap-6">
          <h2 className="text-[64px] font-light tracking-[-0.05em] text-[#6c7788]"><span className="text-[#6c7788]">Latest</span> <span className="font-normal text-[#101827]">Listings</span></h2>
          <Link href={primaryRoute} className="text-lg font-semibold text-black">View All Listings -&gt;</Link>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          {productPosts.length ? productPosts.map((post, index) => <PostProductCard key={post.id || post.slug} post={post} href={postHref(primaryTask, post, primaryRoute)} index={index} />) : [0, 1, 2].map((index) => (
            <Link key={index} href={primaryRoute} className="rapid-feature-card overflow-hidden rounded-2xl bg-white text-[#101827] shadow-[0_22px_54px_rgba(11,84,131,0.18)]">
              <ProductVisual className="min-h-[220px] rounded-none" />
              <div className="p-6">
                <h3 className="text-xl font-semibold">{['Affordable Deals', 'Local Services', 'Property and Jobs'][index]}</h3>
                <p className="mt-5 text-sm text-[#687386]">New listings appear here when published.</p>
              </div>
            </Link>
          ))}
        </div>
        <span className="rapid-dot top-[76%]" />
      </section>
    </>
  )
}

export function EditableHomeCta() {
  return null
}
