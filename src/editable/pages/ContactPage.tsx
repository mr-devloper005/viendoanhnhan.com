import { Building2, Mail, MapPin, Phone, PlusCircle } from 'lucide-react'
import Link from 'next/link'
import { fetchTaskPosts } from '@/lib/task-data'
import { getEditableExcerpt, getEditablePostImage, postHref } from '@/editable/cards/PostCards'
import { pagesContent } from '@/editable/content/pages.content'
import { EditableContactLeadForm } from '@/editable/components/EditableContactLeadForm'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'

const lanes = [
  { icon: PlusCircle, title: 'Listing enquiry', body: 'Ask about a classified post, seller details, category choice, pricing notes, or publishing a new ad.' },
  { icon: Building2, title: 'Business listing support', body: 'Request updates for company pages, service details, seller profiles, or product information.' },
  { icon: MapPin, title: 'Category guidance', body: 'Share what you are trying to buy, sell, rent, hire, or promote so the right section can be suggested.' },
  { icon: Phone, title: 'Contact details', body: 'Report outdated listing details or ask for the best contact path for a product or service.' },
]

export default async function ContactPage() {
  const relatedPosts = await fetchTaskPosts('listing', 3, { allowMockFallback: true })
  return (
    <EditableSiteShell>
      <main className="pt-32 text-[#10203a]">
        <section className="rapid-shell py-12">
          <div className="rapid-glass rounded-[28px] p-8 sm:p-10">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#0b5483]">{pagesContent.contact.eyebrow}</p>
            <h1 className="mt-5 max-w-3xl text-[54px] font-black leading-[1.05] tracking-[-0.04em] text-[#153b72]">{pagesContent.contact.title}</h1>
            <p className="mt-7 max-w-2xl text-lg leading-9 text-[#183b69]">{pagesContent.contact.description}</p>
          </div>
        </section>

        <section className="rapid-shell grid min-w-0 gap-10 py-8 lg:grid-cols-[minmax(0,1fr)_470px]">
          <div className="rapid-animate-slide">
            <div className="grid gap-5 sm:grid-cols-2">
              {relatedPosts.map((post) => (
                <Link key={post.id || post.slug} href={postHref('listing', post, '/listing')} className="rapid-feature-card overflow-hidden rounded-2xl bg-white/80 p-4 shadow-[0_12px_32px_rgba(11,84,131,0.13)]">
                  <img src={getEditablePostImage(post)} alt={post.title} className="h-36 w-full rounded-xl object-cover" />
                  <p className="mt-4 text-sm font-bold uppercase tracking-[0.14em] text-[#0b5483]">{post.tags?.[0] || 'Listing'}</p>
                  <h2 className="mt-2 line-clamp-2 text-xl font-black text-[#0b5483]">{post.title}</h2>
                  <p className="mt-2 line-clamp-3 text-sm leading-7 text-[#637083]">{getEditableExcerpt(post, 120)}</p>
                </Link>
              ))}
            </div>
            <div className="mt-10 grid gap-5 sm:grid-cols-2">
              {lanes.map((lane, index) => (
                <div key={lane.title} className="rapid-feature-card rounded-2xl bg-white/75 p-6 shadow-[0_12px_32px_rgba(11,84,131,0.13)]" style={{ animationDelay: `${index * 80}ms` }}>
                  <lane.icon className="h-7 w-7 text-[#0b5483]" />
                  <h2 className="mt-4 text-xl font-black text-[#0b5483]">{lane.title}</h2>
                  <p className="mt-2 text-sm leading-7 text-[#637083]">{lane.body}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rapid-glass rapid-animate-rise min-w-0 overflow-hidden rounded-[28px] p-6 sm:p-7">
            <div className="mb-5 flex items-center gap-3">
              <span className="rapid-pill flex h-12 w-12 items-center justify-center"><Mail className="h-5 w-5 text-[#0b5483]" /></span>
              <h2 className="text-2xl font-black text-[#0b5483]">{pagesContent.contact.formTitle}</h2>
            </div>
            <EditableContactLeadForm />
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
