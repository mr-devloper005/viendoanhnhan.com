import Link from 'next/link'
import { notFound } from 'next/navigation'
import { CheckCircle, Eye, Heart, Mail, Phone, Share2 } from 'lucide-react'
import { buildPostMetadata, buildTaskMetadata } from '@/lib/seo'
import { buildPostUrl, fetchArticleComments, fetchTaskPostBySlug, fetchTaskPosts } from '@/lib/task-data'
import { getTaskConfig, SITE_CONFIG, type TaskKey } from '@/lib/site-config'
import type { SitePost } from '@/lib/site-connector'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { getEditableCategory, getEditableExcerpt, getEditableLocation, getEditablePostImage, getEditablePrice } from '@/editable/cards/PostCards'

export const revalidate = 3

export async function generateEditableDetailMetadata(task: TaskKey, params: Promise<{ slug?: string; username?: string }>) {
  const resolved = await params
  const slug = resolved.slug || resolved.username || ''
  const post = await fetchTaskPostBySlug(task, slug)
  return post ? await buildPostMetadata(task, post) : await buildTaskMetadata(task)
}

export async function EditableTaskDetailRoute({ task, params }: { task: TaskKey; params: Promise<{ slug?: string; username?: string }> }) {
  const resolved = await params
  const slug = resolved.slug || resolved.username || ''
  const post = await fetchTaskPostBySlug(task, slug)
  if (!post) notFound()
  const related = (await fetchTaskPosts(task, 12)).filter((item) => item.slug !== post.slug).slice(0, 8)
  const comments = task === 'article' ? await fetchArticleComments(post.slug, 50) : []
  return <TaskDetailView task={task} post={post} related={related} comments={comments} />
}

const contentOf = (post: SitePost) => post.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
const asText = (value: unknown) => typeof value === 'string' ? value.trim() : ''
const isUrl = (value: string) => value.startsWith('/') || /^https?:\/\//i.test(value)
const getField = (post: SitePost, keys: string[]) => {
  const content = contentOf(post)
  for (const key of keys) {
    const value = asText(content[key])
    if (value) return value
  }
  return ''
}
const getImages = (post: SitePost) => {
  const content = contentOf(post)
  const media = Array.isArray(post.media) ? post.media.map((item) => item?.url).filter((url): url is string => typeof url === 'string' && isUrl(url)) : []
  const images = Array.isArray(content.images) ? content.images.filter((url): url is string => typeof url === 'string' && isUrl(url)) : []
  const singles = ['image', 'featuredImage', 'thumbnail', 'logo', 'avatar'].map((key) => asText(content[key])).filter((url) => url && isUrl(url))
  return [...media, ...images, ...singles].filter(Boolean).slice(0, 10)
}
const bodyText = (post: SitePost) => asText(contentOf(post).body) || asText(contentOf(post).description) || asText(contentOf(post).details) || post.summary || 'This listing is active on viendoanhnhan.com. Contact the seller or browse related classifieds for more information.'

export function TaskDetailView({ task, post, related, comments = [] }: { task: TaskKey; post: SitePost; related: SitePost[]; comments?: Array<{ id: string; name: string; comment: string; createdAt: string }> }) {
  const taskConfig = getTaskConfig(task)
  const images = getImages(post)
  const mainImage = images[0] || getEditablePostImage(post)
  const seller = getField(post, ['seller', 'company', 'author', 'name']) || SITE_CONFIG.name
  const phone = getField(post, ['phone', 'telephone', 'mobile'])
  const email = getField(post, ['email'])

  return (
    <EditableSiteShell>
      <main className="pt-32">
        <section className="rapid-shell grid gap-7 py-8 lg:grid-cols-[minmax(0,1fr)_364px]">
          <article className="min-w-0">
            <div className="mb-5 text-sm text-[#4a9d5d]">
              <Link href="/">viendoanhnhan.com</Link> / <Link href={taskConfig?.route || `/${task}`}>{taskConfig?.label || task}</Link> / {getEditableCategory(post)} / {post.title}
            </div>
            <h2 className="mb-5 text-[32px] font-black text-[#0b5483]">Listing Detail</h2>

            <div className="rapid-glass rounded-2xl p-3">
              <div className="mb-2 flex justify-center gap-5 py-2 text-[#37b760]"><Share2 className="h-5 w-5" /><CheckCircle className="h-5 w-5" /><Heart className="h-5 w-5" /></div>
              <div className="relative">
                <img src={mainImage} alt={post.title} className="h-auto max-h-[650px] w-full rounded-xl object-cover" />
                <span className="absolute left-4 top-4 bg-black/40 px-3 py-2 text-sm text-white">View Larger</span>
                <span className="absolute right-4 top-4 bg-black/40 px-3 py-2 text-sm text-white">Map View</span>
              </div>
              {images.length > 1 ? (
                <div className="flex gap-3 bg-[#999] px-20 py-3">
                  {images.slice(0, 4).map((image, index) => <img key={`${image}-${index}`} src={image} alt="" className="h-[60px] w-[72px] border border-white object-cover" />)}
                </div>
              ) : null}
            </div>

            <div className="rapid-glass mt-7 rounded-2xl px-8 py-8">
              <div className="mb-7 flex gap-10 border-b border-[#d3d3d3] text-[16px]">
                {['Listing', 'Tell a Friend', 'Loan / Mortgage', 'Comments'].map((tab, index) => <span key={tab} className={`pb-4 ${index === 0 ? 'border-b-3 border-black text-black' : 'text-[#4a9d5d]'}`}>{tab}</span>)}
              </div>
              <h1 className="text-[38px] font-black leading-tight text-[#101827]">{post.title}</h1>
              <p className="mt-4 text-2xl text-black">{getEditablePrice(post)}</p>
              <p className="mt-5 inline-flex items-center gap-2 text-xs uppercase text-[#87909d]"><span className="flex h-18 w-18 items-center justify-center rounded-full bg-[#50bd6d] text-white">⌃</span> Common</p>
              <h2 className="mt-5 text-sm text-[#87909d]">Description</h2>
              <div className="mt-3 max-w-3xl whitespace-pre-line text-sm leading-7 text-[#25324a]">{bodyText(post).replace(/<[^>]*>/g, ' ')}</div>

              <div className="mt-8">
                <p className="mb-4 inline-flex items-center gap-2 text-xs uppercase text-[#87909d]"><span className="flex h-18 w-18 items-center justify-center rounded-full bg-[#50bd6d] text-white">⌃</span> Location</p>
                <dl className="grid max-w-xl grid-cols-[150px_minmax(0,1fr)] gap-y-3 text-sm">
                  <dt className="text-[#87909d]">Country</dt><dd>Country is hidden, please sign in</dd>
                  <dt className="text-[#87909d]">Region</dt><dd>{getEditableLocation(post)}</dd>
                  <dt className="text-[#87909d]">Address</dt><dd>{getField(post, ['address']) || getEditableLocation(post)}</dd>
                </dl>
              </div>

              <div className="mt-8">
                <p className="mb-3 text-sm text-[#4a9d5d]">Save as PDF</p>
                <div className="flex w-fit border border-dotted border-red-500">
                  {['f', 't', 'w', 'v', '+'].map((item) => <span key={item} className="flex h-8 w-8 items-center justify-center bg-[#3366ff] text-lg font-bold text-white">{item}</span>)}
                </div>
                <Link href="/search" className="mt-5 block text-sm">View QR Code ▦</Link>
              </div>
            </div>

            <section className="mt-8">
              <h2 className="mb-5 text-[26px] font-light text-[#25324a]">Get More Details</h2>
              <SellerPanel seller={seller} phone={phone} email={email} wide />
            </section>
            <section className="mt-8">
              <h2 className="mb-5 text-[32px] font-black text-[#0b5483]">Listing Overview</h2>
              <div className="rapid-glass overflow-hidden rounded-[18px] p-4">
                {images.length ? (
                  <div className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_180px]">
                    <img src={mainImage} alt={post.title} className="h-[220px] w-full rounded-[14px] object-cover" />
                    <div className="grid gap-3">
                      {images.slice(1, 4).map((image, index) => (
                        <img key={`${image}-${index}`} src={image} alt={`${post.title} related ${index + 1}`} className="h-[64px] w-full rounded-[12px] object-cover" />
                      ))}
                      {images.length === 1 ? <img src={mainImage} alt={`${post.title} related preview`} className="h-[64px] w-full rounded-[12px] object-cover" /> : null}
                    </div>
                  </div>
                ) : (
                  <img src={getEditablePostImage(post)} alt={post.title} className="h-[220px] w-full rounded-[14px] object-cover" />
                )}
              </div>
            </section>
            <RelatedListings task={task} related={related} />
            {comments.length ? <Comments comments={comments} /> : null}
          </article>

          <aside className="space-y-7">
            <SellerPanel seller={seller} phone={phone} email={email} />
            <NewsPanel related={related} task={task} />
            <div className="classified-widget"><h3 className="mb-4 text-xl font-normal text-[#25324a]">Polls</h3><p className="text-sm font-semibold">How is your business doing?</p><label className="mt-3 block text-sm"><input type="radio" name="business" /> Up</label><label className="block text-sm"><input type="radio" name="business" /> Down</label><button className="mt-4 bg-[var(--editable-nav-dark)] px-6 py-3 text-sm text-white">Vote</button></div>
          </aside>
        </section>
      </main>
    </EditableSiteShell>
  )
}

function SellerPanel({ seller, phone, email, wide = false }: { seller: string; phone?: string; email?: string; wide?: boolean }) {
  return (
    <div className={`rapid-glass rounded-2xl p-8 ${wide ? '' : ''}`}>
      <div className={wide ? 'grid gap-8 sm:grid-cols-[260px_minmax(0,1fr)]' : ''}>
        <div>
          <div className="flex h-[110px] w-[110px] items-center justify-center rounded-3xl bg-[#0b5483] text-3xl font-black italic text-white">VN</div>
          <p className="mt-3 text-[var(--editable-link)]">{seller}</p>
          <p className="text-sm italic text-[#87909d]">Seller information available on request</p>
          <Link href="/classified" className="rapid-pill mt-4 inline-block px-4 py-2 text-sm font-bold text-black">View related listings</Link>
        </div>
      
      </div>
    </div>
  )
}

function NewsPanel({ related, task }: { related: SitePost[]; task: TaskKey }) {
  return (
    <div className="rapid-glass rounded-2xl p-6">
      <h3 className="mb-5 text-xl font-bold text-[#0b5483]">Related Updates</h3>
      <div className="grid gap-5">
        {related.slice(0, 4).map((post, index) => (
          <Link key={post.id || post.slug} href={buildPostUrl(task, post.slug)} className="block">
            <div className="mb-2 flex justify-between text-xs text-[#a0a6af]"><span>Related listing</span><span className="inline-flex items-center gap-1">View <Eye className="h-4 w-4 text-[#0b5483]" /></span></div>
            <h4 className="text-[16px] leading-6 text-[var(--editable-link)]">{post.title}</h4>
            {index % 2 === 0 ? <img src={getEditablePostImage(post)} alt={post.title} className="mt-3 h-[166px] w-full object-cover" /> : null}
            <p className="mt-3 line-clamp-4 text-sm leading-6 text-[#5d6675]">{getEditableExcerpt(post, 180)}</p>
          </Link>
        ))}
        <Link href="/article" className="block rounded-full bg-[#0b5483] py-3 text-center text-sm font-bold text-white">All updates</Link>
      </div>
    </div>
  )
}

function RelatedListings({ task, related }: { task: TaskKey; related: SitePost[] }) {
  if (!related.length) return null
  return (
    <section className="mt-8">
      <h2 className="mb-5 text-[36px] font-black text-[#0b5483]">Latest Related Listings</h2>
      <div className="rapid-glass grid gap-x-8 gap-y-7 rounded-2xl p-7 sm:grid-cols-2 lg:grid-cols-3">
        {related.slice(0, 12).map((post) => (
          <Link key={post.id || post.slug} href={buildPostUrl(task, post.slug)} className="grid grid-cols-[60px_minmax(0,1fr)] gap-3">
            <img src={getEditablePostImage(post)} alt={post.title} className="h-[60px] w-[60px] object-cover" />
            <span className="line-clamp-2 text-sm leading-5 text-[var(--editable-link)]">{post.title}</span>
          </Link>
        ))}
      </div>
    </section>
  )
}

function Comments({ comments }: { comments: Array<{ id: string; name: string; comment: string; createdAt: string }> }) {
  return (
    <section className="mt-8 bg-[#f4f4f4] p-7">
      <h2 className="mb-5 text-[26px] font-light text-[#25324a]">Comments</h2>
      {comments.slice(0, 5).map((comment) => <div key={comment.id} className="mb-4 border-b border-[#d3d3d3] pb-4 text-sm"><p className="font-semibold">{comment.name}</p><p className="mt-2 text-[#637083]">{comment.comment}</p></div>)}
    </section>
  )
}
