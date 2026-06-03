import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, LockKeyhole } from 'lucide-react'
import { buildPageMetadata } from '@/lib/seo'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { EditableLocalLoginForm } from '@/editable/components/EditableLocalAuthForms'
import { pagesContent } from '@/editable/content/pages.content'
import { MarketplaceVisual } from '@/editable/components/MarketplaceVisual'

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({ path: '/login', title: 'Sign in', description: pagesContent.auth.login.metadataDescription })
}

export default function LoginPage() {
  return (
    <EditableSiteShell>
      <main className="pt-32 text-[#10203a]">
        <section className="rapid-shell grid min-h-[calc(100vh-14rem)] items-center gap-10 py-12 lg:grid-cols-[1fr_440px]">
          <div className="rapid-animate-slide">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#0b5483]">{pagesContent.auth.login.badge}</p>
            <h1 className="mt-5 max-w-2xl text-[58px] font-black leading-[1.05] tracking-[-0.04em] text-[#153b72]">{pagesContent.auth.login.title}</h1>
            <p className="mt-7 max-w-xl text-lg leading-9 text-[#183b69]">{pagesContent.auth.login.description}</p>
            <div className="mt-10 max-w-xl rounded-[28px] bg-white/35 p-4">
              <MarketplaceVisual
                title="Sign in to browse"
                subtitle="Seller access for Viendoanhnhan"
                variant={3}
                scene="signin"
                className="rapid-product-visual h-[230px] w-full rounded-[18px]"
                alt="Viendoanhnhan sign in visual"
              />
            </div>
          </div>

          <div className="rapid-glass rapid-animate-rise rounded-[30px] p-8">
            <div className="mb-6 flex items-center gap-4">
              <span className="rapid-pill flex h-14 w-14 items-center justify-center"><LockKeyhole className="h-6 w-6 text-[#0b5483]" /></span>
              <div>
                <h2 className="text-3xl font-black text-[#0b5483]">{pagesContent.auth.login.formTitle}</h2>
                <p className="mt-1 text-sm text-[#637083]">Use the supported sign-in route: /login</p>
              </div>
            </div>
            <EditableLocalLoginForm />
            <p className="mt-6 text-sm text-[#183b69]">
              New here? <Link href="/signup" className="font-black text-[#0b5483] underline-offset-4 hover:underline">{pagesContent.auth.login.createCta}</Link>
            </p>
            <Link href="/" className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#0b5483]">
              Back to Home <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
