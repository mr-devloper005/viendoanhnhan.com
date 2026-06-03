import type { TaskKey } from '@/lib/site-config'

export const slot4TaskSupport = {
  article: true,
  classified: true,
  sbm: true,
  profile: true,
  pdf: true,
  listing: true,
  image: true,
} satisfies Record<TaskKey, boolean>

export const editableTaskDescriptions = {
  article: 'Marketplace news, guides, and classified user resources',
  classified: 'Classified ads, offers, services, jobs, property, and local opportunities',
  sbm: 'Saved marketplace resources and useful classified links',
  profile: 'Seller, business, and marketplace member profiles',
  pdf: 'Downloadable documents, forms, and listing resources',
  listing: 'Business directory pages and service provider listings',
  image: 'Image-led listing posts, product photos, and service visuals',
} satisfies Record<TaskKey, string>
