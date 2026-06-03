import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, UserPlus } from 'lucide-react'
import { buildPageMetadata } from '@/lib/seo'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { EditableLocalSignupForm } from '@/editable/components/EditableLocalAuthForms'
import { pagesContent } from '@/editable/content/pages.content'

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({ path: '/signup', title: 'Sign up', description: pagesContent.auth.signup.metadataDescription })
}

export default function SignupPage() {
  return (
    <EditableSiteShell>
      <main className="pt-32 text-[#10203a]">
        <section className="rapid-shell grid min-h-[calc(100vh-14rem)] items-center gap-10 py-12 lg:grid-cols-[440px_1fr]">
          <div className="rapid-glass rapid-animate-rise rounded-[30px] p-8">
            <div className="mb-6 flex items-center gap-4">
              <span className="rapid-pill flex h-14 w-14 items-center justify-center"><UserPlus className="h-6 w-6 text-[#0b5483]" /></span>
              <div>
                <h1 className="text-3xl font-black text-[#0b5483]">{pagesContent.auth.signup.formTitle}</h1>
                <p className="mt-1 text-sm text-[#637083]">Create access for enquiries and listing submissions.</p>
              </div>
            </div>
            <EditableLocalSignupForm />
            <p className="mt-6 text-sm text-[#183b69]">
              Already have an account? <Link href="/login" className="font-black text-[#0b5483] underline-offset-4 hover:underline">{pagesContent.auth.signup.loginCta}</Link>
            </p>
          </div>

          <div className="rapid-animate-slide lg:pl-8">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#0b5483]">{pagesContent.auth.signup.badge}</p>
            <h2 className="mt-5 max-w-2xl text-[58px] font-black leading-[1.05] tracking-[-0.04em] text-[#153b72]">{pagesContent.auth.signup.title}</h2>
            <p className="mt-7 max-w-xl text-lg leading-9 text-[#183b69]">{pagesContent.auth.signup.description}</p>
            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {['Listing enquiries', 'Service details', 'Seller access', 'Ad submissions'].map((item) => (
                <div key={item} className="rapid-pill px-5 py-4 text-center text-sm font-bold text-[#0b5483]">{item}</div>
              ))}
            </div>
            <Link href="/" className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-[#0b5483]">
              Back to Home <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
