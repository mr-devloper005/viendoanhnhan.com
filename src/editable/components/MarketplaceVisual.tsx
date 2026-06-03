import { buildMarketplaceVisualDataUri, type MarketplaceVisualScene } from '@/editable/theme/marketplace-visual'

type MarketplaceVisualProps = {
  title?: string
  subtitle?: string
  accent?: string
  variant?: number
  scene?: MarketplaceVisualScene
  className?: string
  alt?: string
}

export function MarketplaceVisual({ title = 'Viendoanhnhan', subtitle = 'Local classifieds marketplace', accent, variant = 0, scene = 'hero', className = '', alt }: MarketplaceVisualProps) {
  return (
    <img
      src={buildMarketplaceVisualDataUri({ title, subtitle, accent, variant, scene })}
      alt={alt || `${title} marketplace visual`}
      className={`block object-cover ${className}`.trim()}
    />
  )
}
