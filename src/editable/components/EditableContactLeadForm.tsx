'use client'

import { useState } from 'react'
import { CheckCircle2, Loader2 } from 'lucide-react'

type FormStatus = 'idle' | 'submitting' | 'success' | 'error'

export function EditableContactLeadForm() {
  const [status, setStatus] = useState<FormStatus>('idle')
  const [message, setMessage] = useState('')

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus('submitting')
    setMessage('')
    const form = event.currentTarget
    const formData = new FormData(form)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(formData.entries())),
      })
      const data = await response.json().catch(() => ({}))
      if (!response.ok) throw new Error(data?.message || 'Unable to send your message.')
      setStatus('success')
      setMessage(data?.message || 'Thanks. Your message has been received.')
      form.reset()
    } catch (error) {
      setStatus('error')
      setMessage(error instanceof Error ? error.message : 'Unable to send your message.')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="min-w-0 overflow-hidden rounded-[2rem] border border-white/60 bg-white/90 p-5 shadow-[0_22px_48px_rgba(11,84,131,0.16)] backdrop-blur sm:p-7">
      <div className="grid min-w-0 gap-4 sm:grid-cols-2">
        <Field name="name" label="Full name" placeholder="Seller or buyer name" required />
        <Field name="email" type="email" label="Email address" placeholder="Contact email" required />
      </div>
      <div className="mt-4 grid min-w-0 gap-4 sm:grid-cols-2">
        <Field name="phone" label="Phone number" placeholder="Listing contact number" />
        <Field name="subject" label="Subject" placeholder="Listing or category question" />
      </div>
      <label className="mt-4 grid min-w-0 gap-2 text-sm font-black text-[#4b5568]">
        Message
        <textarea name="message" required rows={6} placeholder="Share the listing title, category, or marketplace question..." className="min-w-0 resize-y rounded-2xl border border-white/70 bg-white px-4 py-3 text-base font-medium text-[#10203a] outline-none transition placeholder:text-[#9aa4b5] focus:border-[#0b5483]" />
      </label>
      <input name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      {message ? (
        <div className={`mt-5 flex items-start gap-3 rounded-2xl px-4 py-3 text-sm font-bold ${status === 'success' ? 'bg-emerald-50 text-emerald-800' : 'bg-red-50 text-red-700'}`}>
          {status === 'success' ? <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" /> : null}
          <span>{message}</span>
        </div>
      ) : null}
      <button type="submit" disabled={status === 'submitting'} className="mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#0b5483] px-6 text-sm font-black uppercase tracking-[0.16em] text-white shadow-[0_14px_30px_rgba(11,84,131,0.24)] transition hover:-translate-y-0.5 hover:bg-[#083f63] disabled:cursor-not-allowed disabled:opacity-70">
        {status === 'submitting' ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
        Send message
      </button>
    </form>
  )
}

function Field({ name, label, type = 'text', placeholder, required = false }: { name: string; label: string; type?: string; placeholder?: string; required?: boolean }) {
  return (
    <label className="grid min-w-0 gap-2 text-sm font-black text-[#4b5568]">
      {label}
      <input name={name} type={type} required={required} placeholder={placeholder} className="h-12 min-w-0 w-full rounded-full border border-white/70 bg-white px-4 text-base font-medium text-[#10203a] outline-none transition placeholder:text-[#9aa4b5] focus:border-[#0b5483]" />
    </label>
  )
}
