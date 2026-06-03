import { slot4BrandConfig } from '@/editable/theme/brand.config'

export const pagesContent = {
  home: {
    metadata: {
      title: 'Classifieds, deals, jobs, property, and local services',
      description: 'Browse viendoanhnhan.com for affordable deals, second-hand products, property listings, jobs, services, events, and local opportunities.',
      openGraphTitle: 'viendoanhnhan.com Classifieds',
      openGraphDescription: 'Find practical classifieds, local offers, services, jobs, property listings, and seller details.',
      keywords: ['classifieds', 'local deals', 'second hand products', 'property listings', 'job listings', 'services'],
    },
    hero: {
      badge: 'Local classifieds marketplace',
      title: ['Find deals, jobs, services,', 'property, and useful local listings.'],
      description: 'Search active classified ads, compare offers, and contact sellers from one practical marketplace.',
      primaryCta: { label: 'Browse classifieds', href: '/classified' },
      secondaryCta: { label: 'Post an Ad', href: '/create' },
      searchPlaceholder: 'Search deals, jobs, property, services, and listings',
      focusLabel: 'Categories',
      featureCardBadge: 'latest classifieds',
      featureCardTitle: 'Fresh local listings are organized for quick browsing.',
      featureCardDescription: 'Listings stay easy to scan with category, price, location, seller, and contact details.',
    },
    intro: {
      badge: 'About the marketplace',
      title: 'A practical classifieds board for everyday buying, selling, hiring, and local discovery.',
      paragraphs: [
        'viendoanhnhan.com brings together classified ads for affordable deals, second-hand products, property, jobs, services, and events.',
        'Visitors can browse categories, search by keyword, review listing details, and move quickly from discovery to contact.',
        'The layout is built for simple scanning, clear seller information, and useful listing pages across all supported sections.',
      ],
      sideBadge: 'At a glance',
      sidePoints: [
        'Search-first classified browsing.',
        'Categories for deals, property, jobs, services, travel, and events.',
        'Detail pages with images, descriptions, seller panels, and related listings.',
        'Responsive pages for mobile and desktop visitors.',
      ],
      primaryLink: { label: 'Browse classifieds', href: '/classified' },
      secondaryLink: { label: 'Post an Ad', href: '/create' },
    },
    cta: {
      badge: 'Start browsing',
      title: 'Find the listing you need or publish one for others to discover.',
      description: 'Browse active classifieds, compare options, and use clear contact paths to connect with sellers.',
      primaryCta: { label: 'Browse Classifieds', href: '/classified' },
      secondaryCta: { label: 'Contact Us', href: '/contact' },
    },
    taskSection: {
      heading: 'Latest {label}',
      descriptionSuffix: 'Browse the newest listings in this section.',
    },
  },
  about: {
    badge: 'About the marketplace',
    title: 'A clear classifieds experience for everyday local discovery.',
    description: `${slot4BrandConfig.siteName} helps visitors find affordable products, useful services, property listings, jobs, events, and seller information in one organized place.`,
    paragraphs: [
      'The site is designed around practical browsing: categories are visible, listing cards are compact, and detail pages keep descriptions, images, price, location, and contact prompts together.',
      'Whether someone is looking for a second-hand product, a property option, a service provider, or a job opportunity, the marketplace keeps the path from search to contact straightforward.',
    ],
    values: [
      {
        title: 'Easy classified discovery',
        description: 'Search, category links, compact listing grids, and related ads help visitors scan useful options quickly.',
      },
      {
        title: 'Useful listing details',
        description: 'Each listing page supports images, descriptions, seller information, location cues, and contact actions.',
      },
      {
        title: 'Built for local intent',
        description: 'The content system supports products, property, jobs, services, travel, events, and other classified categories.',
      },
    ],
  },
  contact: {
    eyebrow: `Contact ${slot4BrandConfig.siteName}`,
    title: 'Need help with a listing, seller contact, category, or account?',
    description: 'Send a message about posting an ad, updating listing details, finding the right category, or resolving a marketplace question.',
    formTitle: 'Send a marketplace request',
  },
  search: {
    metadata: {
      title: 'Search Classifieds',
      description: 'Search deals, jobs, property, services, and other classifieds across the site.',
    },
    hero: {
      badge: 'Search classifieds',
      title: 'Find local listings faster.',
      description: 'Use keywords, categories, and content type filters to find deals, jobs, property, services, and seller pages.',
      placeholder: 'Search deals, jobs, services, property, or sellers',
    },
    resultsTitle: 'Latest searchable listings',
  },
  create: {
    metadata: {
      title: 'Post an Ad',
      description: 'Create and submit a new classified listing.',
    },
    locked: {
      badge: 'Seller access',
      title: 'Login to post a classified ad.',
      description: 'Use your account to add listing details, images, category, price, summary, and contact information.',
    },
    hero: {
      badge: 'Post an Ad',
      title: 'Create a listing for the marketplace.',
      description: 'Choose a section, add clear details, and prepare a classified ad that visitors can browse and contact you about.',
    },
    formTitle: 'Listing details',
    submitLabel: 'Submit listing',
    successTitle: 'Listing saved successfully.',
  },
  auth: {
    login: {
      metadataDescription: 'Login page for classified sellers and visitors.',
      badge: 'Member access',
      title: 'Sign in to manage classifieds.',
      description: 'Login to post ads, manage saved listing details, and continue using marketplace features.',
      formTitle: 'Sign in',
      submitLabel: 'Continue',
      noAccount: 'No account matched these details. Create an account first, then login.',
      success: 'Login successful. Redirecting...',
      createCta: 'Create an account',
    },
    signup: {
      metadataDescription: 'Signup page for classified marketplace access.',
      badge: 'Create account',
      title: 'Create an account to post listings.',
      description: 'Create an account to submit classified ads, keep seller details, and access the posting workspace.',
      formTitle: 'Create account',
      submitLabel: 'Create account',
      passwordShort: 'Use at least 4 characters for the password.',
      success: 'Account created successfully. Redirecting...',
      loginCta: 'Login',
    },
  },
  detailPages: {
    article: {
      relatedTitle: 'Related marketplace updates',
      fallbackTitle: 'Marketplace update',
    },
    listing: {
      relatedTitle: 'Related business listings',
      fallbackTitle: 'Business listing details',
    },
    image: {
      relatedTitle: 'Related listing images',
      fallbackTitle: 'Image listing details',
    },
    profile: {
      relatedTitle: 'Related sellers',
      fallbackDescription: 'Seller profile details will appear when available.',
      visitButton: 'Visit seller page',
    },
  },
} as const
