import { cn } from '@/lib/utils'

type LoadingStateProps = {
  label?: string
  className?: string
}

function PulseBlock({ className }: { className?: string }) {
  return <div className={cn('animate-pulse bg-[#e8eee8]', className)} />
}

export function PageLoadingState({ label = 'Loading classifieds', className }: LoadingStateProps) {
  return (
    <div className={cn('mx-auto w-full max-w-[var(--editable-container)] px-4 py-10 lg:px-0', className)} aria-live="polite" aria-busy="true">
      <p className="text-xs uppercase text-[#87909d]">{label}</p>
      <PulseBlock className="mt-5 h-10 w-3/4 max-w-3xl" />
      <PulseBlock className="mt-4 h-5 w-2/3 max-w-2xl" />
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {[0, 1, 2].map((item) => (
          <div key={item} className="border border-[var(--editable-border)] bg-white p-5">
            <PulseBlock className="h-32 w-full" />
            <PulseBlock className="mt-5 h-5 w-4/5" />
            <PulseBlock className="mt-3 h-4 w-3/5" />
          </div>
        ))}
      </div>
    </div>
  )
}

export function CardGridLoadingState({ count = 6, className }: LoadingStateProps & { count?: number }) {
  return (
    <div className={cn('grid gap-5 sm:grid-cols-2 lg:grid-cols-3', className)} aria-live="polite" aria-busy="true">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="border border-[var(--editable-border)] bg-white p-4">
          <PulseBlock className="h-28 w-full" />
          <PulseBlock className="mt-4 h-5 w-5/6" />
          <PulseBlock className="mt-3 h-4 w-2/3" />
          <PulseBlock className="mt-6 h-9 w-32" />
        </div>
      ))}
    </div>
  )
}

export function DetailLoadingState({ label = 'Loading listing detail', className }: LoadingStateProps) {
  return (
    <div className={cn('mx-auto grid w-full max-w-[var(--editable-container)] gap-8 px-4 py-10 lg:grid-cols-[minmax(0,1fr)_364px] lg:px-0', className)} aria-live="polite" aria-busy="true">
      <PulseBlock className="h-80 w-full" />
      <div>
        <p className="text-xs uppercase text-[#87909d]">{label}</p>
        <PulseBlock className="mt-5 h-12 w-4/5" />
        <PulseBlock className="mt-5 h-4 w-full" />
        <PulseBlock className="mt-3 h-4 w-5/6" />
        <PulseBlock className="mt-3 h-4 w-2/3" />
      </div>
    </div>
  )
}
