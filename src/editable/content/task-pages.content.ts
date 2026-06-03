import type { TaskKey } from '@/lib/site-config'

export type TaskPageVoice = {
  eyebrow: string
  headline: string
  description: string
  filterLabel: string
  secondaryNote: string
  chips: string[]
}

export const taskPageVoices = {
  article: {
    eyebrow: 'Marketplace news',
    headline: 'Guides and updates for classified buyers, sellers, and local businesses.',
    description: 'Browse helpful marketplace articles about posting ads, choosing categories, finding deals, and improving listing visibility.',
    filterLabel: 'Choose topic',
    secondaryNote: 'Helpful reading for classified marketplace users.',
    chips: ['Posting tips', 'Buyer guides', 'Local business'],
  },
  classified: {
    eyebrow: 'Classified board',
    headline: 'Browse current classified ads, offers, services, jobs, and local listings.',
    description: 'Find affordable deals, second-hand products, property options, job opportunities, service providers, events, and more.',
    filterLabel: 'Filter classified category',
    secondaryNote: 'Scan quickly by category, price, image, and location.',
    chips: ['Deals', 'Services', 'Jobs'],
  },
  sbm: {
    eyebrow: 'Saved resources',
    headline: 'Useful marketplace links and saved classified resources.',
    description: 'Find helpful saved pages related to buying, selling, services, jobs, property, and local discovery.',
    filterLabel: 'Filter resources',
    secondaryNote: 'Reference links for marketplace visitors.',
    chips: ['Resources', 'Saved links', 'References'],
  },
  profile: {
    eyebrow: 'Seller profiles',
    headline: 'Browse seller, business, and contributor profiles.',
    description: 'Profiles help visitors understand who is connected to a listing, service, or local offer.',
    filterLabel: 'Filter profiles',
    secondaryNote: 'Identity and contact context for listings.',
    chips: ['Sellers', 'Businesses', 'Profiles'],
  },
  pdf: {
    eyebrow: 'Documents',
    headline: 'Downloadable documents and classified marketplace resources.',
    description: 'Browse PDF files, forms, guides, and supporting documents related to listings and services.',
    filterLabel: 'Filter documents',
    secondaryNote: 'Document resources for marketplace use.',
    chips: ['Documents', 'Forms', 'Guides'],
  },
  listing: {
    eyebrow: 'Business directory',
    headline: 'Browse business listings, service providers, and local company pages.',
    description: 'Find businesses and service providers with practical details, descriptions, locations, and contact paths.',
    filterLabel: 'Filter business category',
    secondaryNote: 'Compare providers and contact the right business.',
    chips: ['Directory', 'Services', 'Business'],
  },
  image: {
    eyebrow: 'Listing images',
    headline: 'Browse image-based listing posts and product visuals.',
    description: 'View listing images, product photos, service visuals, and other image-led classified posts.',
    filterLabel: 'Filter image category',
    secondaryNote: 'Visual browsing for listings and offers.',
    chips: ['Photos', 'Products', 'Visual listings'],
  },
} satisfies Record<TaskKey, TaskPageVoice>
