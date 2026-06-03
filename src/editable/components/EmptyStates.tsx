import Link from 'next/link'
import { ArrowRight, SearchX } from 'lucide-react'
import { cn } from '@/lib/utils'

type EmptyStateProps = {
  title?: string
  description?: string
  actionLabel?: string
  actionHref?: string
  className?: string
}

export function EmptyState({
  title = 'No listings are available right now',
  description = 'New classified ads, jobs, property, services, and local offers will appear here as soon as they are published.',
  actionLabel = 'Browse classifieds',
  actionHref = '/',
  className,
}: EmptyStateProps) {
  return (
    <section className={cn('border border-[var(--editable-border)] bg-[#f4f4f4] p-8 text-center', className)}>
      <div className="mx-auto flex h-14 w-14 items-center justify-center bg-white text-[#87909d]">
        <SearchX className="h-6 w-6" />
      </div>
      <h2 className="mt-5 text-2xl font-light text-[#25324a]">{title}</h2>
      <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-[#637083]">{description}</p>
      <Link href={actionHref} className="mt-6 inline-flex items-center gap-2 bg-[var(--editable-nav-dark)] px-5 py-3 text-sm text-white">
        {actionLabel}
        <ArrowRight className="h-4 w-4" />
      </Link>
    </section>
  )
}

export function TaskEmptyState({ taskLabel = 'listings', className }: { taskLabel?: string; className?: string }) {
  return (
    <EmptyState
      className={className}
      title={`No ${taskLabel} available yet`}
      description={`Published ${taskLabel} will appear here automatically when new marketplace content is available.`}
      actionLabel="Explore classifieds"
      actionHref="/classified"
    />
  )
}

export function ContactSuccessState({ className }: { className?: string }) {
  return (
    <EmptyState
      className={className}
      title="Message received"
      description="Thanks for contacting viendoanhnhan.com. Your marketplace request has been submitted."
      actionLabel="Return to classifieds"
      actionHref="/classified"
    />
  )
}
