import Link from 'next/link'
import { Eye, MapPin, Tag } from 'lucide-react'
import type { SitePost } from '@/lib/site-connector'
import type { TaskKey } from '@/lib/site-config'
import logoAsset from '@/editable/assets/site-logo.png'
import { buildMarketplaceVisualDataUri, type MarketplaceVisualScene } from '@/editable/theme/marketplace-visual'

const fallbackImage = typeof logoAsset === 'string' ? logoAsset : logoAsset.src
const contentOf = (post?: SitePost | null) => post?.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
const asText = (value: unknown) => typeof value === 'string' ? value.trim() : ''
const isUrl = (value: string) => value.startsWith('/') || /^https?:\/\//i.test(value)

function normalizePostText(post?: SitePost | null) {
  const content = contentOf(post)
  return [
    post?.title,
    post?.summary,
    asText(content.category),
    asText(content.description),
    asText(content.summary),
    asText(content.body),
    ...(post?.tags || []),
  ].join(' ').toLowerCase()
}

function getSceneForPost(post?: SitePost | null): MarketplaceVisualScene {
  const text = normalizePostText(post)
  if (/(job|hire|career|role|apply|opening)/.test(text)) return 'jobs'
  if (/(property|rent|home|house|room|apartment|flat|condo)/.test(text)) return 'property'
  if (/(service|repair|clean|help|plumb|electric|design)/.test(text)) return 'services'
  if (/(vehicle|car|bike|auto|motor|transport|ride)/.test(text)) return 'vehicles'
  if (/(event|meetup|community|festival|social|gather)/.test(text)) return 'events'
  if (/(travel|trip|tour|stay|hotel|vacation|destination)/.test(text)) return 'travel'
  if (/(business|shop|company|provider|seller|directory)/.test(text)) return 'business'
  if (/(electron|device|gadget|tech|phone|computer|tablet)/.test(text)) return 'electronics'
  if (/(home|furniture|decor|kitchen|household|living)/.test(text)) return 'home'
  if (/(seller|profile|contact)/.test(text)) return 'sellers'
  if (/(detail|listing|featured|ad)/.test(text)) return 'detail'
  return 'deals'
}

export function getEditablePostImage(post?: SitePost | null) {
  const content = contentOf(post)
  const media = Array.isArray(post?.media) ? post?.media.map((item) => item?.url).filter((url): url is string => typeof url === 'string' && isUrl(url)) : []
  const images = Array.isArray(content.images) ? content.images.filter((url): url is string => typeof url === 'string' && isUrl(url)) : []
  const singles = ['image', 'featuredImage', 'thumbnail', 'logo', 'avatar'].map((key) => asText(content[key])).filter((url) => url && isUrl(url))
  return [...media, ...images, ...singles][0] || buildMarketplaceVisualDataUri({
    title: asText(content.category) || post?.title || 'Viendoanhnhan',
    subtitle: post?.summary || 'Local classifieds marketplace',
    variant: 0,
    scene: getSceneForPost(post),
  }) || fallbackImage
}

export function getEditableExcerpt(post?: SitePost | null, limit = 150) {
  const content = contentOf(post)
  const raw = asText(content.description) || asText(content.summary) || asText(content.excerpt) || asText(content.body) || post?.summary || ''
  const clean = raw.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
  return clean.length > limit ? `${clean.slice(0, limit).trim()}...` : clean
}

export function getEditableCategory(post?: SitePost | null) {
  const content = contentOf(post)
  return asText(content.category) || post?.tags?.[0] || 'Classified'
}

export function getEditablePrice(post?: SitePost | null) {
  const content = contentOf(post)
  return asText(content.price) || asText(content.amount) || 'Rs 0.00'
}

export function getEditableLocation(post?: SitePost | null) {
  const content = contentOf(post)
  return asText(content.location) || asText(content.city) || asText(content.address) || 'United States'
}

export function postHref(task: TaskKey, post: SitePost, route = `/${task}`) {
  return `${route}/${post.slug}`
}

export function EditorialFeatureCard({ post, href, label = 'Featured' }: { post: SitePost; href: string; label?: string }) {
  return (
    <Link href={href} className="rapid-feature-card group block overflow-hidden rounded-2xl bg-white p-5 shadow-[0_18px_42px_rgba(11,84,131,0.16)]">
      <div className="grid gap-5 sm:grid-cols-[210px_minmax(0,1fr)]">
        <img src={getEditablePostImage(post)} alt={post.title} className="h-44 w-full object-cover" />
        <div className="min-w-0">
          <p className="text-sm font-bold text-[var(--editable-link)]">{label}</p>
          <h3 className="mt-2 line-clamp-2 text-2xl font-bold leading-tight text-[#101827] group-hover:underline">{post.title}</h3>
          <p className="mt-3 line-clamp-3 text-sm leading-6 text-[#5d6675]">{getEditableExcerpt(post, 180)}</p>
          <p className="mt-4 text-lg text-[#1f1f1f]">{getEditablePrice(post)}</p>
        </div>
      </div>
    </Link>
  )
}

export function RailPostCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  return (
    <Link href={href} className="rapid-feature-card group flex min-w-0 gap-4 rounded-xl bg-white/80 p-4 shadow-[0_10px_24px_rgba(11,84,131,0.12)]">
      <img src={getEditablePostImage(post)} alt={post.title} className="h-[60px] w-[60px] shrink-0 rounded-lg object-cover" />
      <div className="min-w-0">
        <p className="line-clamp-2 text-sm leading-5 text-[var(--editable-link)] group-hover:underline">{post.title}</p>
        {index % 3 === 0 ? <p className="mt-1 text-sm text-[#1f1f1f]">{getEditablePrice(post)}</p> : null}
      </div>
    </Link>
  )
}

export function CompactIndexCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  return (
    <Link href={href} className="rapid-feature-card group grid grid-cols-[60px_minmax(0,1fr)] gap-3 rounded-xl bg-white/80 p-3">
      <img src={getEditablePostImage(post)} alt={post.title} className="h-[60px] w-[60px] rounded-lg object-cover" />
      <div className="min-w-0">
        <p className="line-clamp-2 text-sm leading-5 text-[var(--editable-link)] group-hover:underline">{post.title}</p>
        <p className="mt-1 flex items-center gap-1 text-xs text-[#9aa0a8]"><Tag className="h-3 w-3" /> {index + 1}</p>
      </div>
    </Link>
  )
}

export function ArticleListCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  const withImage = index % 2 === 0
  return (
    <Link href={href} className={`rapid-feature-card group grid min-w-0 gap-4 rounded-2xl bg-white/80 p-5 shadow-[0_12px_30px_rgba(11,84,131,0.11)] ${withImage ? 'sm:grid-cols-[150px_minmax(0,1fr)]' : ''}`}>
      {withImage ? <img src={getEditablePostImage(post)} alt={post.title} className="h-28 w-full rounded-xl object-cover" /> : null}
      <div className="min-w-0">
        <div className="flex items-center justify-between gap-3 text-xs text-[#9aa0a8]">
          <span>{index + 2} months ago</span>
          <span className="inline-flex items-center gap-1">View <Eye className="h-4 w-4 text-[#0b5483]" /></span>
        </div>
        <h2 className="mt-2 line-clamp-2 text-lg leading-6 text-[var(--editable-link)] group-hover:underline">{post.title}</h2>
        <p className="mt-2 line-clamp-3 text-sm leading-6 text-[#5d6675]">{getEditableExcerpt(post, 170)}</p>
        <p className="mt-2 inline-flex items-center gap-1 text-xs text-[#87909d]"><MapPin className="h-3 w-3" /> {getEditableLocation(post)}</p>
      </div>
    </Link>
  )
}
