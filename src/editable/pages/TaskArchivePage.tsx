import Link from 'next/link'
import { Filter, Search } from 'lucide-react'
import { buildTaskMetadata } from '@/lib/seo'
import { CATEGORY_OPTIONS, normalizeCategory } from '@/lib/categories'
import { fetchPaginatedTaskPosts, buildPostUrl } from '@/lib/task-data'
import { getTaskConfig, SITE_CONFIG, type TaskKey } from '@/lib/site-config'
import type { SiteFeedPagination, SitePost } from '@/lib/site-connector'
import { taskPageMetadata } from '@/config/site.content'
import { taskPageVoices } from '@/editable/content/task-pages.content'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { getEditableCategory, getEditableExcerpt, getEditableLocation, getEditablePostImage } from '@/editable/cards/PostCards'

export const revalidate = 3

export const taskMetadata = (task: TaskKey, path: string) =>
  buildTaskMetadata(task, {
    path,
    title: taskPageMetadata[task]?.title,
    description: taskPageMetadata[task]?.description,
  })

function pageHref(basePath: string, category: string, page: number) {
  const params = new URLSearchParams()
  if (category && category !== 'all') params.set('category', category)
  if (page > 1) params.set('page', String(page))
  const query = params.toString()
  return query ? `${basePath}?${query}` : basePath
}

export async function EditableTaskArchiveRoute({
  task,
  searchParams,
  basePath,
}: {
  task: TaskKey
  searchParams?: Promise<{ category?: string; page?: string }>
  basePath?: string
}) {
  const resolved = (await searchParams) || {}
  const page = Math.max(1, Math.floor(Number(resolved.page) || 1))
  const category = resolved.category ? normalizeCategory(resolved.category) : 'all'
  const taskConfig = getTaskConfig(task)
  const { posts, pagination } = await fetchPaginatedTaskPosts(task, { page, limit: 24, category })
  return <TaskArchiveView task={task} posts={posts} pagination={pagination} category={category} basePath={basePath || taskConfig?.route || `/${task}`} />
}

export function TaskArchiveView({ task, posts, pagination, category, basePath }: { task: TaskKey; posts: SitePost[]; pagination: SiteFeedPagination; category: string; basePath: string }) {
  const taskConfig = getTaskConfig(task)
  const voice = taskPageVoices[task]
  const page = pagination.page || 1
  const categoryLabel = category === 'all' ? 'Any Category' : CATEGORY_OPTIONS.find((item) => item.slug === category)?.name || category

  return (
    <EditableSiteShell>
      <main className="pt-32">
        <section className="rapid-shell">
          <div className="rapid-glass rounded-[28px] p-8 text-[#10203a]">
            <div className="text-center">
              <h1 className="text-[46px] font-black tracking-[-0.04em] text-[#0b5483]">{voice?.headline || `${taskConfig?.label || task}`}</h1>
              <p className="mx-auto mt-4 max-w-3xl text-base leading-8 text-[#183b69]">{voice?.description || SITE_CONFIG.description}</p>
              <form action={basePath} className="mx-auto mt-7 grid max-w-4xl gap-4 md:grid-cols-[minmax(0,1fr)_260px_120px]">
                <input name="q" placeholder="Search deals, jobs, services, property, or sellers" className="h-12 rounded-full border border-white/50 bg-white/85 px-5 text-sm text-[#183b69] outline-none" />
                <select name="category" defaultValue={categoryLabel === 'Any Category' ? 'all' : category} className="h-12 rounded-full border border-white/50 bg-white/85 px-5 text-sm text-[#183b69]">
                  <option value="all">Any Category</option>
                  {CATEGORY_OPTIONS.map((item) => <option key={item.slug} value={item.slug}>{item.name}</option>)}
                </select>
                <button className="h-12 rounded-full bg-[#0b5483] text-sm font-bold text-white">Search</button>
              </form>
            </div>
          </div>
        </section>

        <section className="rapid-shell grid gap-7 py-12 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div>
            <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-sm text-[#0b5483]">viendoanhnhan.com / {taskConfig?.label || task} / {categoryLabel}</p>
                <h2 className="mt-2 text-[42px] font-black tracking-[-0.04em] text-[#101827]">{taskConfig?.label || 'Listings'}</h2>
              </div>
              <Link href="/create" className="rapid-pill px-6 py-3 text-sm font-bold text-black">Add Enquiry</Link>
            </div>

            {posts.length ? (
              <div className="grid gap-5">
                {posts.map((post, index) => <ArchiveRow key={post.id || post.slug} post={post} task={task} basePath={basePath} index={index} />)}
              </div>
            ) : (
              <div className="bg-[#f4f4f4] p-10 text-center">
                <Search className="mx-auto h-8 w-8 text-[#9aa0a8]" />
                <h2 className="mt-4 text-2xl font-light text-[#25324a]">No classifieds found</h2>
                <p className="mt-2 text-sm text-[#637083]">Try another category or check back after new listings are published.</p>
              </div>
            )}

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              {pagination.hasPrevPage ? <Link href={pageHref(basePath, category, page - 1)} className="border border-[var(--editable-border)] px-5 py-2 text-sm">Previous</Link> : null}
              <span className="bg-[var(--editable-nav-dark)] px-5 py-2 text-sm text-white">Page {page} of {pagination.totalPages || 1}</span>
              {pagination.hasNextPage ? <Link href={pageHref(basePath, category, page + 1)} className="border border-[var(--editable-border)] px-5 py-2 text-sm">Next</Link> : null}
            </div>
          </div>

          <aside className="space-y-7">
            <div className="rapid-glass rounded-2xl p-6">
              <h3 className="mb-4 text-xl font-bold text-[#0b5483]">Quick Search</h3>
              <form action="/search" className="space-y-4">
                <input name="q" placeholder="Listing, category, or seller" className="h-11 w-full rounded-full border border-white/50 px-4 text-sm" />
                <button className="h-11 w-full rounded-full bg-[#0b5483] text-sm font-bold text-white">Search</button>
              </form>
            </div>
            <div className="rapid-glass rounded-2xl p-6">
              <h3 className="mb-4 flex items-center gap-2 text-xl font-bold text-[#0b5483]"><Filter className="h-4 w-4" /> Categories</h3>
              <div className="grid gap-2">
                <Link href={basePath} className="text-sm">All categories</Link>
                {CATEGORY_OPTIONS.slice(0, 12).map((item) => <Link key={item.slug} href={pageHref(basePath, item.slug, 1)} className="text-sm">{item.name}</Link>)}
              </div>
            </div>
            <div className="rapid-glass rounded-2xl p-6"><h3 className="mb-4 text-xl font-bold text-[#0b5483]">Popular Sections</h3><p className="text-lg font-black text-black">Deals · Jobs · Property</p></div>
          </aside>
        </section>
      </main>
    </EditableSiteShell>
  )
}

function ArchiveRow({ post, task, basePath, index }: { post: SitePost; task: TaskKey; basePath: string; index: number }) {
  const href = `${basePath}/${post.slug}` || buildPostUrl(task, post.slug)
  const variant = index % 5
  if (variant === 0) {
    return (
      <Link href={href} className="rapid-feature-card group grid gap-5 overflow-hidden rounded-2xl bg-white p-5 shadow-[0_18px_42px_rgba(11,84,131,0.16)] sm:grid-cols-[190px_minmax(0,1fr)]">
        <img src={getEditablePostImage(post)} alt={post.title} className="h-36 w-full rounded-xl object-cover" />
        <div>
          <p className="text-sm font-bold text-[#0b5483]">{getEditableCategory(post)}</p>
          <h2 className="mt-2 text-2xl font-bold text-[#101827] group-hover:underline">{post.title}</h2>
          <p className="mt-3 line-clamp-3 text-sm leading-6 text-[#637083]">{getEditableExcerpt(post, 220)}</p>
        </div>
      </Link>
    )
  }
  return (
    <Link href={href} className="rapid-feature-card group grid gap-4 rounded-2xl bg-white/80 p-4 shadow-[0_12px_30px_rgba(11,84,131,0.11)] sm:grid-cols-[92px_minmax(0,1fr)]">
      <img src={getEditablePostImage(post)} alt={post.title} className="h-[76px] w-[92px] rounded-xl object-cover" />
      <div className="min-w-0">
        <h2 className="line-clamp-2 text-lg leading-6 text-[var(--editable-link)] group-hover:underline">{post.title}</h2>
        <p className="mt-2 line-clamp-2 text-sm leading-6 text-[#637083]">{getEditableExcerpt(post, 140)}</p>
        <p className="mt-1 text-xs text-[#87909d]">{getEditableLocation(post)}</p>
      </div>
    </Link>
  )
}
