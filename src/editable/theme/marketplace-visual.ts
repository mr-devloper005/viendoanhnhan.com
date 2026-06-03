export type MarketplaceVisualScene =
  | 'hero'
  | 'feature'
  | 'category'
  | 'audience'
  | 'about'
  | 'signin'
  | 'detail'
  | 'deals'
  | 'jobs'
  | 'property'
  | 'services'
  | 'vehicles'
  | 'events'
  | 'travel'
  | 'business'
  | 'electronics'
  | 'home'
  | 'sellers'

type MarketplaceVisualOptions = {
  title?: string
  subtitle?: string
  accent?: string
  variant?: number
  scene?: MarketplaceVisualScene
}

const palette = ['#0b5483', '#1f6e9b', '#2e83b8', '#4a95c8', '#0f7c6d', '#215c93', '#6a882d', '#8a547b', '#4f6477', '#846745']

function escapeXml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

function sceneIndex(scene: MarketplaceVisualScene) {
  return ['hero', 'feature', 'category', 'audience', 'about', 'signin', 'detail', 'deals', 'jobs', 'property', 'services', 'vehicles', 'events', 'travel', 'business', 'electronics', 'home', 'sellers'].indexOf(scene)
}

function baseTheme(scene: MarketplaceVisualScene, variant = 0, accent?: string) {
  const index = sceneIndex(scene)
  const color = accent || palette[(variant + Math.max(index, 0)) % palette.length]
  const themes: Record<MarketplaceVisualScene, { bg1: string; bg2: string; bg3: string; main1: string; main2: string; rightPanel: string; photo1: string; photo2: string; footerPanel: string }> = {
    hero: { bg1: '#d9eff8', bg2: '#a8d5ea', bg3: '#58a7d5', main1: '#2a78a6', main2: '#0f3453', rightPanel: '#76b5d9', photo1: '#2b5e85', photo2: '#16324f', footerPanel: '#cfe9f5' },
    feature: { bg1: '#d8eef7', bg2: '#98cde8', bg3: '#3f8bbc', main1: '#336c9a', main2: '#12324f', rightPanel: '#6fb1d9', photo1: '#285d86', photo2: '#0f2339', footerPanel: '#d2eaf6' },
    category: { bg1: '#deeff8', bg2: '#b0d8ea', bg3: '#64a9d4', main1: '#2d78a5', main2: '#123650', rightPanel: '#77b6db', photo1: '#244f75', photo2: '#15324a', footerPanel: '#d6ebf6' },
    audience: { bg1: '#d5eef7', bg2: '#a2d4ea', bg3: '#5ca8d6', main1: '#2e76a6', main2: '#10324e', rightPanel: '#78b4da', photo1: '#355f7f', photo2: '#19324a', footerPanel: '#d5ebf7' },
    about: { bg1: '#dfeef7', bg2: '#b7dae9', bg3: '#6aa8d2', main1: '#356f9c', main2: '#173953', rightPanel: '#7fb8dc', photo1: '#2f5f83', photo2: '#163248', footerPanel: '#d8ebf6' },
    signin: { bg1: '#dceff7', bg2: '#aad4e7', bg3: '#63a9d6', main1: '#3076a4', main2: '#10324f', rightPanel: '#75b4da', photo1: '#2a4f7a', photo2: '#163249', footerPanel: '#d7ecf7' },
    detail: { bg1: '#ddedf7', bg2: '#a6d1e7', bg3: '#5aa6d5', main1: '#2f76a4', main2: '#13334f', rightPanel: '#79b7db', photo1: '#2d5f86', photo2: '#132c44', footerPanel: '#d7ecf6' },
    deals: { bg1: '#eef4d9', bg2: '#d6e3ad', bg3: '#9abf54', main1: '#688234', main2: '#314010', rightPanel: '#a8c65e', photo1: '#64733a', photo2: '#2f3a12', footerPanel: '#eef5d9' },
    jobs: { bg1: '#e3eef8', bg2: '#c0d6eb', bg3: '#6c95c5', main1: '#40678f', main2: '#182f4d', rightPanel: '#86aed6', photo1: '#406180', photo2: '#1a3046', footerPanel: '#deebf7' },
    property: { bg1: '#e7eef4', bg2: '#c9d7e4', bg3: '#7a9bb7', main1: '#516b87', main2: '#202e3f', rightPanel: '#92aac0', photo1: '#5c7084', photo2: '#2e3948', footerPanel: '#e2eaf1' },
    services: { bg1: '#ddeff2', bg2: '#b6d8e0', bg3: '#70aab7', main1: '#356d7b', main2: '#17373d', rightPanel: '#83b6c0', photo1: '#376270', photo2: '#17313b', footerPanel: '#d8ebef' },
    vehicles: { bg1: '#e4edf4', bg2: '#c0d0de', bg3: '#7a90a4', main1: '#52677a', main2: '#1f2c3a', rightPanel: '#8ea1b2', photo1: '#617183', photo2: '#2e3b48', footerPanel: '#e2e8ee' },
    events: { bg1: '#f1e6ee', bg2: '#d7bfd0', bg3: '#a96d97', main1: '#865377', main2: '#35202f', rightPanel: '#b17ba0', photo1: '#7a436a', photo2: '#412131', footerPanel: '#f3e6f0' },
    travel: { bg1: '#e1f0f2', bg2: '#bfdbe1', bg3: '#78aeb9', main1: '#4e7881', main2: '#20363b', rightPanel: '#8fbac0', photo1: '#4d6970', photo2: '#243a3f', footerPanel: '#def0f2' },
    business: { bg1: '#e1ecf7', bg2: '#bfd4eb', bg3: '#7a9cc8', main1: '#4f6c97', main2: '#1d314f', rightPanel: '#8daed4', photo1: '#4d6690', photo2: '#243754', footerPanel: '#deebf7' },
    electronics: { bg1: '#e3eef7', bg2: '#bfd4e8', bg3: '#7496c0', main1: '#4a6792', main2: '#182b4a', rightPanel: '#87aad3', photo1: '#4a5d83', photo2: '#24344f', footerPanel: '#deebf7' },
    home: { bg1: '#f0ebe2', bg2: '#dccdb7', bg3: '#b78f5f', main1: '#846746', main2: '#3a2815', rightPanel: '#c6a57d', photo1: '#7f6343', photo2: '#43311f', footerPanel: '#f1e8d8' },
    sellers: { bg1: '#e0eff7', bg2: '#b5d5e9', bg3: '#6da7d3', main1: '#39719d', main2: '#16344f', rightPanel: '#7fb7db', photo1: '#316085', photo2: '#183149', footerPanel: '#d9ebf7' },
  }
  return { color, ...themes[scene] }
}

function chip(x: number, y: number, text: string, fill: string, textFill = '#0b2940') {
  const w = Math.max(88, text.length * 14 + 36)
  return `<rect x="${x}" y="${y}" width="${w}" height="42" rx="21" fill="${fill}"/><text x="${x + w / 2}" y="${y + 27}" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="20" font-weight="700" fill="${textFill}">${escapeXml(text)}</text>`
}

function commonFrame(theme: ReturnType<typeof baseTheme>, title: string, subtitle: string, accent: string) {
  return `
    <rect width="1400" height="900" rx="44" fill="url(#bg)"/>
    <circle cx="148" cy="126" r="86" fill="#ffffff" fill-opacity="0.20"/>
    <circle cx="1228" cy="170" r="124" fill="#ffffff" fill-opacity="0.10"/>
    <circle cx="1080" cy="672" r="180" fill="#ffffff" fill-opacity="0.09"/>
    <rect x="110" y="80" width="1180" height="740" rx="36" fill="url(#panel)" filter="url(#shadow)"/>
    <rect x="132" y="126" width="184" height="58" rx="29" fill="${accent}"/>
    <text x="164" y="164" font-family="Segoe UI, Arial, sans-serif" font-size="30" font-weight="900" fill="#ffffff">VN</text>
    <text x="342" y="165" font-family="Segoe UI, Arial, sans-serif" font-size="36" font-weight="900" fill="#114a79">Viendoanhnhan</text>
    <text x="342" y="202" font-family="Segoe UI, Arial, sans-serif" font-size="22" font-weight="700" fill="#2f5f84">${escapeXml(subtitle)}</text>
    <rect x="154" y="214" width="430" height="528" rx="32" fill="url(#maincard)" filter="url(#shadow)"/>
    <text x="190" y="350" font-family="Segoe UI, Arial, sans-serif" font-size="58" font-weight="900" fill="#ffffff" opacity="0.95">${escapeXml(title)}</text>
  `
}

function heroLayout(title: string, subtitle: string, t: ReturnType<typeof baseTheme>) {
  return `${commonFrame(t, title, subtitle, t.color)}
    <rect x="154" y="230" width="380" height="96" rx="26" fill="${t.main1}"/>
    <rect x="154" y="354" width="380" height="96" rx="26" fill="${t.main2}"/>
    <rect x="154" y="478" width="380" height="96" rx="26" fill="${t.rightPanel}"/>
    <circle cx="204" cy="278" r="26" fill="#ffe3a8"/>
    <circle cx="204" cy="402" r="26" fill="#d8eaf7"/>
    <circle cx="204" cy="526" r="26" fill="#f0d0a5"/>
    <rect x="250" y="254" width="220" height="16" rx="8" fill="#ffffff" fill-opacity="0.78"/>
    <rect x="250" y="377" width="220" height="16" rx="8" fill="#ffffff" fill-opacity="0.78"/>
    <rect x="250" y="501" width="220" height="16" rx="8" fill="#ffffff" fill-opacity="0.78"/>
    <rect x="690" y="214" width="560" height="364" rx="32" fill="${t.rightPanel}" filter="url(#shadow)"/>
    <rect x="724" y="250" width="490" height="292" rx="28" fill="url(#maincard)"/>
    <rect x="742" y="266" width="250" height="178" rx="22" fill="${t.photo1}"/>
    <rect x="1008" y="266" width="184" height="178" rx="22" fill="${t.photo2}"/>
    <circle cx="858" cy="355" r="52" fill="#ffffff" fill-opacity="0.26"/>
    <circle cx="1080" cy="355" r="46" fill="#ffffff" fill-opacity="0.18"/>
    <circle cx="1080" cy="355" r="26" fill="#ffffff" fill-opacity="0.12"/>
    ${chip(118, 98, 'Deals', '#ffffff')}
    ${chip(302, 98, 'Jobs', '#ffffff')}
    ${chip(484, 98, 'Property', '#ffffff')}
    ${chip(666, 98, 'Services', '#ffffff')}
    <rect x="690" y="604" width="560" height="138" rx="28" fill="${t.footerPanel}"/>
    <rect x="126" y="690" width="132" height="68" rx="20" fill="#ebf7fd"/><text x="192" y="732" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="20" font-weight="800" fill="#124a79">Deals</text>
    <rect x="280" y="690" width="132" height="68" rx="20" fill="#eaf6fd"/><text x="346" y="732" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="20" font-weight="800" fill="#124a79">Jobs</text>
    <rect x="434" y="690" width="132" height="68" rx="20" fill="#f0fbff"/><text x="500" y="732" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="20" font-weight="800" fill="#124a79">Homes</text>
    <rect x="588" y="690" width="132" height="68" rx="20" fill="#e6f3fb"/><text x="654" y="732" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="20" font-weight="800" fill="#124a79">Services</text>
    <text x="742" y="612" font-family="Segoe UI, Arial, sans-serif" font-size="48" font-weight="900" fill="#173e66">Deals, Jobs, Property, Services</text>
    <text x="742" y="648" font-family="Segoe UI, Arial, sans-serif" font-size="24" font-weight="700" fill="#365f85">Browse by category and contact sellers faster.</text>
  `
}

function featureLayout(title: string, subtitle: string, t: ReturnType<typeof baseTheme>) {
  return `${commonFrame(t, title, subtitle, t.color)}
    <rect x="154" y="230" width="380" height="96" rx="26" fill="${t.main1}"/>
    <rect x="154" y="354" width="380" height="96" rx="26" fill="${t.rightPanel}"/>
    <rect x="154" y="478" width="380" height="96" rx="26" fill="${t.main2}"/>
    <circle cx="204" cy="278" r="26" fill="#f0d0a5"/>
    <circle cx="204" cy="402" r="26" fill="#d8eaf7"/>
    <circle cx="204" cy="526" r="26" fill="#b5cff0"/>
    <rect x="250" y="254" width="220" height="16" rx="8" fill="#ffffff" fill-opacity="0.78"/>
    <rect x="250" y="377" width="220" height="16" rx="8" fill="#ffffff" fill-opacity="0.78"/>
    <rect x="250" y="501" width="220" height="16" rx="8" fill="#ffffff" fill-opacity="0.78"/>
    <rect x="690" y="214" width="560" height="364" rx="32" fill="${t.rightPanel}" filter="url(#shadow)"/>
    <rect x="724" y="248" width="490" height="292" rx="28" fill="#0f2339" fill-opacity="0.18"/>
    <rect x="742" y="266" width="250" height="178" rx="22" fill="${t.photo1}"/>
    <rect x="1008" y="266" width="184" height="178" rx="22" fill="${t.photo2}"/>
    <rect x="760" y="282" width="214" height="24" rx="12" fill="#ffffff" fill-opacity="0.28"/>
    <rect x="760" y="318" width="164" height="14" rx="7" fill="#ffffff" fill-opacity="0.22"/>
    <rect x="760" y="344" width="194" height="14" rx="7" fill="#ffffff" fill-opacity="0.16"/>
    <rect x="760" y="370" width="152" height="14" rx="7" fill="#ffffff" fill-opacity="0.12"/>
    <circle cx="1080" cy="355" r="46" fill="#ffffff" fill-opacity="0.18"/>
    <circle cx="1080" cy="355" r="26" fill="#ffffff" fill-opacity="0.12"/>
    ${chip(118, 98, 'Search', '#ffffff')}
    ${chip(302, 98, 'Compare', '#ffffff')}
    ${chip(484, 98, 'Contact', '#ffffff')}
    ${chip(666, 98, 'Browse', '#ffffff')}
    <rect x="690" y="604" width="560" height="138" rx="28" fill="${t.footerPanel}"/>
    <text x="742" y="612" font-family="Segoe UI, Arial, sans-serif" font-size="48" font-weight="900" fill="#173e66">Search, review, contact</text>
    <text x="742" y="648" font-family="Segoe UI, Arial, sans-serif" font-size="24" font-weight="700" fill="#365f85">Feature cards explain how the marketplace works.</text>
    <rect x="126" y="690" width="132" height="68" rx="20" fill="#ecf8fd"/><text x="192" y="732" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="20" font-weight="800" fill="#124a79">Search</text>
    <rect x="280" y="690" width="132" height="68" rx="20" fill="#edf8fe"/><text x="346" y="732" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="20" font-weight="800" fill="#124a79">Compare</text>
    <rect x="434" y="690" width="132" height="68" rx="20" fill="#eaf7fd"/><text x="500" y="732" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="20" font-weight="800" fill="#124a79">Contact</text>
    <rect x="588" y="690" width="132" height="68" rx="20" fill="#f0fbff"/><text x="654" y="732" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="20" font-weight="800" fill="#124a79">Review</text>
  `
}

function categoryLayout(title: string, subtitle: string, t: ReturnType<typeof baseTheme>) {
  const tileText = ['Deals', 'Property', 'Jobs', 'Travel', 'Services', 'Vehicles', 'Events', 'Business', 'Home']
  const tiles = tileText.map((text, index) => {
    const row = Math.floor(index / 3)
    const col = index % 3
    const x = 724 + col * 160
    const y = 260 + row * 112
    const fills = [t.main1, t.rightPanel, t.main2]
    return `
      <rect x="${x}" y="${y}" width="138" height="84" rx="20" fill="${fills[index % fills.length]}"/>
      <text x="${x + 69}" y="${y + 50}" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="23" font-weight="800" fill="#ffffff">${escapeXml(text)}</text>`
  }).join('')
  return `${commonFrame(t, title, subtitle, t.color)}
    <rect x="154" y="230" width="380" height="96" rx="26" fill="${t.main1}"/>
    <rect x="154" y="354" width="380" height="96" rx="26" fill="${t.rightPanel}"/>
    <rect x="154" y="478" width="380" height="96" rx="26" fill="${t.main2}"/>
    <circle cx="204" cy="278" r="26" fill="#ffe2a8"/>
    <circle cx="204" cy="402" r="26" fill="#d8f0fb"/>
    <circle cx="204" cy="526" r="26" fill="#ffd6b0"/>
    <rect x="250" y="254" width="220" height="16" rx="8" fill="#ffffff" fill-opacity="0.78"/>
    <rect x="250" y="377" width="220" height="16" rx="8" fill="#ffffff" fill-opacity="0.78"/>
    <rect x="250" y="501" width="220" height="16" rx="8" fill="#ffffff" fill-opacity="0.78"/>
    <rect x="690" y="214" width="560" height="364" rx="32" fill="${t.rightPanel}" filter="url(#shadow)"/>
    <rect x="724" y="248" width="490" height="292" rx="28" fill="#0f2339" fill-opacity="0.14"/>
    ${tiles}
    ${chip(118, 98, 'Deals', '#ffffff')}
    ${chip(302, 98, 'Property', '#ffffff')}
    ${chip(484, 98, 'Jobs', '#ffffff')}
    ${chip(666, 98, 'Travel', '#ffffff')}
    <rect x="690" y="604" width="560" height="138" rx="28" fill="${t.footerPanel}"/>
    <text x="742" y="612" font-family="Segoe UI, Arial, sans-serif" font-size="48" font-weight="900" fill="#173e66">Category grid</text>
    <text x="742" y="648" font-family="Segoe UI, Arial, sans-serif" font-size="24" font-weight="700" fill="#365f85">Each tile reflects a common browsing path.</text>
    <rect x="126" y="690" width="132" height="68" rx="20" fill="#edf8fd"/><text x="192" y="732" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="20" font-weight="800" fill="#124a79">Deals</text>
    <rect x="280" y="690" width="132" height="68" rx="20" fill="#edf8fd"/><text x="346" y="732" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="20" font-weight="800" fill="#124a79">Property</text>
    <rect x="434" y="690" width="132" height="68" rx="20" fill="#edf8fd"/><text x="500" y="732" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="20" font-weight="800" fill="#124a79">Jobs</text>
    <rect x="588" y="690" width="132" height="68" rx="20" fill="#edf8fd"/><text x="654" y="732" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="20" font-weight="800" fill="#124a79">Travel</text>
  `
}

function audienceLayout(title: string, subtitle: string, t: ReturnType<typeof baseTheme>) {
  const people = ['Students', 'Families', 'Small business', 'Job seekers', 'Property hunters', 'Local sellers']
  const tiles = people.map((text, index) => {
    const row = Math.floor(index / 3)
    const col = index % 3
    const x = 724 + col * 160
    const y = 260 + row * 112
    return `
      <rect x="${x}" y="${y}" width="138" height="84" rx="20" fill="${[t.main1, t.rightPanel, t.main2][index % 3]}"/>
      <circle cx="${x + 50}" cy="${y + 38}" r="16" fill="#e2c19f"/>
      <circle cx="${x + 80}" cy="${y + 46}" r="14" fill="#b89671"/>
      <text x="${x + 20}" y="${y + 72}" font-family="Segoe UI, Arial, sans-serif" font-size="16" font-weight="800" fill="#ffffff">${escapeXml(text)}</text>`
  }).join('')
  return `${commonFrame(t, title, subtitle, t.color)}
    <rect x="154" y="230" width="380" height="96" rx="26" fill="${t.main1}"/>
    <rect x="154" y="354" width="380" height="96" rx="26" fill="${t.rightPanel}"/>
    <rect x="154" y="478" width="380" height="96" rx="26" fill="${t.main2}"/>
    <circle cx="204" cy="278" r="26" fill="#e2c19f"/>
    <circle cx="204" cy="402" r="26" fill="#b89671"/>
    <circle cx="204" cy="526" r="26" fill="#f0d8b9"/>
    <rect x="250" y="254" width="220" height="16" rx="8" fill="#ffffff" fill-opacity="0.78"/>
    <rect x="250" y="377" width="220" height="16" rx="8" fill="#ffffff" fill-opacity="0.78"/>
    <rect x="250" y="501" width="220" height="16" rx="8" fill="#ffffff" fill-opacity="0.78"/>
    <rect x="690" y="214" width="560" height="364" rx="32" fill="${t.rightPanel}" filter="url(#shadow)"/>
    <rect x="724" y="248" width="490" height="292" rx="28" fill="#0f2339" fill-opacity="0.14"/>
    ${tiles}
    ${chip(118, 98, 'Students', '#ffffff')}
    ${chip(302, 98, 'Families', '#ffffff')}
    ${chip(484, 98, 'Businesses', '#ffffff')}
    ${chip(666, 98, 'Sellers', '#ffffff')}
    <rect x="690" y="604" width="560" height="138" rx="28" fill="${t.footerPanel}"/>
    <text x="742" y="612" font-family="Segoe UI, Arial, sans-serif" font-size="48" font-weight="900" fill="#173e66">Visitor groups</text>
    <text x="742" y="648" font-family="Segoe UI, Arial, sans-serif" font-size="24" font-weight="700" fill="#365f85">Different audiences, one practical marketplace.</text>
    <rect x="126" y="690" width="132" height="68" rx="20" fill="#edf8fd"/><text x="192" y="732" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="20" font-weight="800" fill="#124a79">Students</text>
    <rect x="280" y="690" width="132" height="68" rx="20" fill="#edf8fd"/><text x="346" y="732" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="20" font-weight="800" fill="#124a79">Families</text>
    <rect x="434" y="690" width="132" height="68" rx="20" fill="#edf8fd"/><text x="500" y="732" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="20" font-weight="800" fill="#124a79">Business</text>
    <rect x="588" y="690" width="132" height="68" rx="20" fill="#edf8fd"/><text x="654" y="732" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="20" font-weight="800" fill="#124a79">Sellers</text>
  `
}

function aboutLayout(title: string, subtitle: string, t: ReturnType<typeof baseTheme>) {
  return `${commonFrame(t, title, subtitle, t.color)}
    <rect x="154" y="230" width="380" height="96" rx="26" fill="${t.main1}"/>
    <rect x="154" y="354" width="380" height="96" rx="26" fill="${t.rightPanel}"/>
    <rect x="154" y="478" width="380" height="96" rx="26" fill="${t.main2}"/>
    <circle cx="204" cy="278" r="26" fill="#e8c9a7"/>
    <circle cx="204" cy="402" r="26" fill="#c8e8f8"/>
    <circle cx="204" cy="526" r="26" fill="#f0d3b0"/>
    <rect x="250" y="254" width="220" height="16" rx="8" fill="#ffffff" fill-opacity="0.78"/>
    <rect x="250" y="377" width="220" height="16" rx="8" fill="#ffffff" fill-opacity="0.78"/>
    <rect x="250" y="501" width="220" height="16" rx="8" fill="#ffffff" fill-opacity="0.78"/>
    <rect x="690" y="214" width="560" height="364" rx="32" fill="${t.rightPanel}" filter="url(#shadow)"/>
    <rect x="724" y="248" width="490" height="292" rx="28" fill="#0f2339" fill-opacity="0.14"/>
    <rect x="746" y="266" width="220" height="216" rx="24" fill="${t.photo1}"/>
    <rect x="982" y="266" width="212" height="216" rx="24" fill="${t.photo2}"/>
    <rect x="768" y="292" width="176" height="20" rx="10" fill="#ffffff" fill-opacity="0.52"/>
    <rect x="768" y="328" width="150" height="14" rx="7" fill="#ffffff" fill-opacity="0.34"/>
    <rect x="768" y="354" width="132" height="14" rx="7" fill="#ffffff" fill-opacity="0.22"/>
    <rect x="1004" y="292" width="160" height="20" rx="10" fill="#ffffff" fill-opacity="0.34"/>
    <rect x="1004" y="328" width="140" height="14" rx="7" fill="#ffffff" fill-opacity="0.22"/>
    <rect x="1004" y="354" width="118" height="14" rx="7" fill="#ffffff" fill-opacity="0.16"/>
    ${chip(118, 98, 'Discovery', '#ffffff')}
    ${chip(332, 98, 'Details', '#ffffff')}
    ${chip(504, 98, 'Contact', '#ffffff')}
    ${chip(676, 98, 'Local', '#ffffff')}
    <rect x="690" y="604" width="560" height="138" rx="28" fill="${t.footerPanel}"/>
    <text x="742" y="612" font-family="Segoe UI, Arial, sans-serif" font-size="48" font-weight="900" fill="#173e66">About this site</text>
    <text x="742" y="648" font-family="Segoe UI, Arial, sans-serif" font-size="24" font-weight="700" fill="#365f85">Designed around practical browsing and contact paths.</text>
    <rect x="126" y="690" width="132" height="68" rx="20" fill="#edf8fd"/><text x="192" y="732" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="20" font-weight="800" fill="#124a79">Discovery</text>
    <rect x="280" y="690" width="132" height="68" rx="20" fill="#edf8fd"/><text x="346" y="732" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="20" font-weight="800" fill="#124a79">Details</text>
    <rect x="434" y="690" width="132" height="68" rx="20" fill="#edf8fd"/><text x="500" y="732" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="20" font-weight="800" fill="#124a79">Trust</text>
    <rect x="588" y="690" width="132" height="68" rx="20" fill="#edf8fd"/><text x="654" y="732" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="20" font-weight="800" fill="#124a79">Contact</text>
  `
}

function signinLayout(title: string, subtitle: string, t: ReturnType<typeof baseTheme>) {
  return `${commonFrame(t, title, subtitle, t.color)}
    <rect x="154" y="230" width="380" height="96" rx="26" fill="${t.main1}"/>
    <rect x="154" y="354" width="380" height="96" rx="26" fill="${t.rightPanel}"/>
    <rect x="154" y="478" width="380" height="96" rx="26" fill="${t.main2}"/>
    <circle cx="204" cy="278" r="26" fill="#dfeef8"/>
    <circle cx="204" cy="402" r="26" fill="#f0d7b3"/>
    <circle cx="204" cy="526" r="26" fill="#d5ebf7"/>
    <rect x="250" y="254" width="220" height="16" rx="8" fill="#ffffff" fill-opacity="0.78"/>
    <rect x="250" y="377" width="220" height="16" rx="8" fill="#ffffff" fill-opacity="0.78"/>
    <rect x="250" y="501" width="220" height="16" rx="8" fill="#ffffff" fill-opacity="0.78"/>
    <rect x="690" y="214" width="560" height="364" rx="32" fill="${t.rightPanel}" filter="url(#shadow)"/>
    <rect x="742" y="246" width="456" height="300" rx="28" fill="${t.main1}" fill-opacity="0.84"/>
    <circle cx="970" cy="350" r="68" fill="#ffffff" fill-opacity="0.12"/>
    <path d="M970 310c-29 0-52 23-52 52v22h104v-22c0-29-23-52-52-52zm0 20c18 0 32 14 32 32v20h-64v-20c0-18 14-32 32-32z" fill="#ffffff" fill-opacity="0.86"/>
    <rect x="786" y="292" width="160" height="18" rx="9" fill="#ffffff" fill-opacity="0.8"/>
    <rect x="786" y="328" width="222" height="42" rx="21" fill="#ffffff" fill-opacity="0.2"/>
    <rect x="786" y="388" width="260" height="42" rx="21" fill="#ffffff" fill-opacity="0.14"/>
    <rect x="786" y="448" width="120" height="42" rx="21" fill="#ffffff" fill-opacity="0.12"/>
    ${chip(118, 98, 'Sign in', '#ffffff')}
    ${chip(302, 98, 'Account', '#ffffff')}
    ${chip(484, 98, 'Seller', '#ffffff')}
    ${chip(666, 98, 'Post', '#ffffff')}
    <rect x="690" y="604" width="560" height="138" rx="28" fill="${t.footerPanel}"/>
    <text x="742" y="612" font-family="Segoe UI, Arial, sans-serif" font-size="48" font-weight="900" fill="#173e66">Secure seller access</text>
    <text x="742" y="648" font-family="Segoe UI, Arial, sans-serif" font-size="24" font-weight="700" fill="#365f85">Login to post ads and manage details.</text>
    <rect x="126" y="690" width="132" height="68" rx="20" fill="#edf8fd"/><text x="192" y="732" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="20" font-weight="800" fill="#124a79">Sign in</text>
    <rect x="280" y="690" width="132" height="68" rx="20" fill="#edf8fd"/><text x="346" y="732" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="20" font-weight="800" fill="#124a79">Account</text>
    <rect x="434" y="690" width="132" height="68" rx="20" fill="#edf8fd"/><text x="500" y="732" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="20" font-weight="800" fill="#124a79">Post</text>
    <rect x="588" y="690" width="132" height="68" rx="20" fill="#edf8fd"/><text x="654" y="732" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="20" font-weight="800" fill="#124a79">Manage</text>
  `
}

function detailLayout(title: string, subtitle: string, t: ReturnType<typeof baseTheme>) {
  return `${commonFrame(t, title, subtitle, t.color)}
    <rect x="154" y="230" width="380" height="96" rx="26" fill="${t.main1}"/>
    <rect x="154" y="354" width="380" height="96" rx="26" fill="${t.rightPanel}"/>
    <rect x="154" y="478" width="380" height="96" rx="26" fill="${t.main2}"/>
    <circle cx="204" cy="278" r="26" fill="#f2d3aa"/>
    <circle cx="204" cy="402" r="26" fill="#d8ecf7"/>
    <circle cx="204" cy="526" r="26" fill="#ffd7b8"/>
    <rect x="250" y="254" width="220" height="16" rx="8" fill="#ffffff" fill-opacity="0.78"/>
    <rect x="250" y="377" width="220" height="16" rx="8" fill="#ffffff" fill-opacity="0.78"/>
    <rect x="250" y="501" width="220" height="16" rx="8" fill="#ffffff" fill-opacity="0.78"/>
    <rect x="690" y="214" width="560" height="364" rx="32" fill="${t.rightPanel}" filter="url(#shadow)"/>
    <rect x="724" y="248" width="490" height="292" rx="28" fill="#0f2339" fill-opacity="0.14"/>
    <rect x="742" y="266" width="250" height="178" rx="22" fill="${t.photo1}"/>
    <rect x="1008" y="266" width="184" height="178" rx="22" fill="${t.photo2}"/>
    <rect x="760" y="286" width="214" height="22" rx="11" fill="#ffffff" fill-opacity="0.62"/>
    <rect x="760" y="322" width="166" height="14" rx="7" fill="#ffffff" fill-opacity="0.34"/>
    <rect x="760" y="348" width="194" height="14" rx="7" fill="#ffffff" fill-opacity="0.22"/>
    <rect x="760" y="374" width="152" height="14" rx="7" fill="#ffffff" fill-opacity="0.18"/>
    <circle cx="1080" cy="355" r="46" fill="#ffffff" fill-opacity="0.18"/>
    <circle cx="1080" cy="355" r="26" fill="#ffffff" fill-opacity="0.12"/>
    ${chip(118, 98, 'Photos', '#ffffff')}
    ${chip(302, 98, 'Price', '#ffffff')}
    ${chip(484, 98, 'Location', '#ffffff')}
    ${chip(666, 98, 'Seller', '#ffffff')}
    <rect x="690" y="604" width="560" height="138" rx="28" fill="${t.footerPanel}"/>
    <text x="742" y="612" font-family="Segoe UI, Arial, sans-serif" font-size="48" font-weight="900" fill="#173e66">Detail view</text>
    <text x="742" y="648" font-family="Segoe UI, Arial, sans-serif" font-size="24" font-weight="700" fill="#365f85">A full listing page with contact and related items.</text>
    <rect x="126" y="690" width="132" height="68" rx="20" fill="#edf8fd"/><text x="192" y="732" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="20" font-weight="800" fill="#124a79">Photos</text>
    <rect x="280" y="690" width="132" height="68" rx="20" fill="#edf8fd"/><text x="346" y="732" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="20" font-weight="800" fill="#124a79">Price</text>
    <rect x="434" y="690" width="132" height="68" rx="20" fill="#edf8fd"/><text x="500" y="732" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="20" font-weight="800" fill="#124a79">Seller</text>
    <rect x="588" y="690" width="132" height="68" rx="20" fill="#edf8fd"/><text x="654" y="732" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="20" font-weight="800" fill="#124a79">Related</text>
  `
}

function categoryFallbackLayout(title: string, subtitle: string, t: ReturnType<typeof baseTheme>, labelA: string, labelB: string, labelC: string) {
  return `${commonFrame(t, title, subtitle, t.color)}
    <rect x="154" y="230" width="380" height="96" rx="26" fill="${t.main1}"/>
    <rect x="154" y="354" width="380" height="96" rx="26" fill="${t.rightPanel}"/>
    <rect x="154" y="478" width="380" height="96" rx="26" fill="${t.main2}"/>
    <circle cx="204" cy="278" r="26" fill="#fff"/>
    <circle cx="204" cy="402" r="26" fill="#fff"/>
    <circle cx="204" cy="526" r="26" fill="#fff"/>
    <rect x="250" y="254" width="220" height="16" rx="8" fill="#ffffff" fill-opacity="0.78"/>
    <rect x="250" y="377" width="220" height="16" rx="8" fill="#ffffff" fill-opacity="0.78"/>
    <rect x="250" y="501" width="220" height="16" rx="8" fill="#ffffff" fill-opacity="0.78"/>
    <rect x="690" y="214" width="560" height="364" rx="32" fill="${t.rightPanel}" filter="url(#shadow)"/>
    <rect x="724" y="248" width="490" height="292" rx="28" fill="#0f2339" fill-opacity="0.14"/>
    <rect x="742" y="266" width="146" height="178" rx="20" fill="${t.photo1}"/>
    <rect x="898" y="266" width="146" height="178" rx="20" fill="${t.photo2}"/>
    <rect x="1054" y="266" width="146" height="178" rx="20" fill="${t.main1}"/>
    <text x="770" y="362" font-family="Segoe UI, Arial, sans-serif" font-size="28" font-weight="900" fill="#ffffff">${escapeXml(labelA)}</text>
    <text x="925" y="362" font-family="Segoe UI, Arial, sans-serif" font-size="28" font-weight="900" fill="#ffffff">${escapeXml(labelB)}</text>
    <text x="1079" y="362" font-family="Segoe UI, Arial, sans-serif" font-size="28" font-weight="900" fill="#ffffff">${escapeXml(labelC)}</text>
    ${chip(118, 98, labelA, '#ffffff')}
    ${chip(302, 98, labelB, '#ffffff')}
    ${chip(484, 98, labelC, '#ffffff')}
    ${chip(666, 98, title, '#ffffff')}
    <rect x="690" y="604" width="560" height="138" rx="28" fill="${t.footerPanel}"/>
    <text x="742" y="612" font-family="Segoe UI, Arial, sans-serif" font-size="48" font-weight="900" fill="#173e66">${escapeXml(title)}</text>
    <text x="742" y="648" font-family="Segoe UI, Arial, sans-serif" font-size="24" font-weight="700" fill="#365f85">${escapeXml(subtitle)}</text>
    <rect x="126" y="690" width="132" height="68" rx="20" fill="#edf8fd"/><text x="192" y="732" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="18" font-weight="800" fill="#124a79">${escapeXml(labelA)}</text>
    <rect x="280" y="690" width="132" height="68" rx="20" fill="#edf8fd"/><text x="346" y="732" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="18" font-weight="800" fill="#124a79">${escapeXml(labelB)}</text>
    <rect x="434" y="690" width="132" height="68" rx="20" fill="#edf8fd"/><text x="500" y="732" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="18" font-weight="800" fill="#124a79">${escapeXml(labelC)}</text>
    <rect x="588" y="690" width="132" height="68" rx="20" fill="#edf8fd"/><text x="654" y="732" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="18" font-weight="800" fill="#124a79">Browse</text>
  `
}

export function buildMarketplaceVisualDataUri(options: MarketplaceVisualOptions = {}) {
  const scene = options.scene || 'hero'
  const title = escapeXml(options.title || 'Viendoanhnhan')
  const subtitle = escapeXml(options.subtitle || 'Local classifieds marketplace')
  const theme = baseTheme(scene, options.variant || 0, options.accent)

  const svg = (() => {
    const common = `
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="${theme.bg1}"/>
          <stop offset="48%" stop-color="${theme.bg2}"/>
          <stop offset="100%" stop-color="${theme.bg3}"/>
        </linearGradient>
        <linearGradient id="panel" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#ffffff" stop-opacity="0.66"/>
          <stop offset="100%" stop-color="#ffffff" stop-opacity="0.20"/>
        </linearGradient>
        <linearGradient id="maincard" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="${theme.main1}"/>
          <stop offset="100%" stop-color="${theme.main2}"/>
        </linearGradient>
        <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="20" stdDeviation="18" flood-color="#0c2d46" flood-opacity="0.20"/>
        </filter>
      </defs>`

    const map: Record<MarketplaceVisualScene, string> = {
      hero: heroLayout(title, subtitle, theme),
      feature: featureLayout(title, subtitle, theme),
      category: categoryLayout(title, subtitle, theme),
      audience: audienceLayout(title, subtitle, theme),
      about: aboutLayout(title, subtitle, theme),
      signin: signinLayout(title, subtitle, theme),
      detail: detailLayout(title, subtitle, theme),
      deals: categoryFallbackLayout(title, subtitle, theme, 'Deals', 'Used', 'Offers'),
      jobs: categoryFallbackLayout(title, subtitle, theme, 'Jobs', 'Hire', 'Apply'),
      property: categoryFallbackLayout(title, subtitle, theme, 'Rent', 'Buy', 'Homes'),
      services: categoryFallbackLayout(title, subtitle, theme, 'Help', 'Repair', 'Service'),
      vehicles: categoryFallbackLayout(title, subtitle, theme, 'Cars', 'Bikes', 'Parts'),
      events: categoryFallbackLayout(title, subtitle, theme, 'Meet', 'Share', 'Gather'),
      travel: categoryFallbackLayout(title, subtitle, theme, 'Trips', 'Stays', 'Explore'),
      business: categoryFallbackLayout(title, subtitle, theme, 'Shop', 'Profile', 'Contact'),
      electronics: categoryFallbackLayout(title, subtitle, theme, 'Device', 'Gear', 'Tech'),
      home: categoryFallbackLayout(title, subtitle, theme, 'Home', 'Decor', 'Living'),
      sellers: categoryFallbackLayout(title, subtitle, theme, 'Profile', 'Trust', 'Contact'),
    }

    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1400 900">${common}${map[scene]}</svg>`
  })()

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`
}
