import { slot4BrandConfig } from '@/editable/theme/brand.config'

export const globalContent = {
  site: {
    name: slot4BrandConfig.siteName,
    tagline: 'Classifieds for deals, services, jobs, property, and local opportunities',
    domain: slot4BrandConfig.domain,
    baseUrl: slot4BrandConfig.baseUrl,
  },
  nav: {
    tagline: 'Local classifieds marketplace',
    primaryLinks: [
      { label: 'Classifieds', href: '/classified' },
      { label: 'Jobs', href: '/classified?category=jobs' },
      { label: 'Property', href: '/classified?category=property' },
      { label: 'Services', href: '/classified?category=services' },
      { label: 'Contact', href: '/contact' },
    ],
    actions: {
      primary: { label: 'Browse listings', href: '/classified' },
      secondary: { label: 'Post an Ad', href: '/create' },
    },
  },
  footer: {
    tagline: 'Deals, second-hand products, property, jobs, and services',
    description: 'viendoanhnhan.com helps visitors browse local classifieds, compare offers, find services, and connect with sellers through clear listing pages.',
    columns: [
      {
        title: 'Browse',
        links: [
          { label: 'Classifieds', href: '/classified' },
          { label: 'Jobs', href: '/classified?category=jobs' },
          { label: 'Property', href: '/classified?category=property' },
          { label: 'Services', href: '/classified?category=services' },
        ],
      },
      {
        title: 'Site',
        links: [
          { label: 'About', href: '/about' },
          { label: 'Contact', href: '/contact' },
          { label: 'Search', href: '/search' },
          { label: 'Post an Ad', href: '/create' },
        ],
      },
    ],
    bottomNote: 'Built for practical classified discovery.',
  },
  commonLabels: {
    readMore: 'View listing',
    viewAll: 'View all',
    explore: 'Browse',
    latest: 'Latest',
    related: 'Related listings',
    published: 'Published',
  },
} as const
