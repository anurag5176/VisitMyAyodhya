import { cn } from '@/lib/utils'
import { getIcon } from '@/lib/icon-map'
import { LucideIcon } from 'lucide-react'

interface ImagePlaceholderProps {
  aspectRatio?: 'square' | 'video' | 'wide' | 'portrait' | 'auto'
  className?: string
  icon?: string | LucideIcon
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
}

const aspectRatioClasses = {
  square: 'aspect-square',
  video: 'aspect-video',
  wide: 'aspect-[21/9]',
  portrait: 'aspect-[3/4]',
  auto: '',
}

const sizeClasses = {
  sm: 'h-32',
  md: 'h-48 md:h-64',
  lg: 'h-64 md:h-80',
  xl: 'h-80 md:h-96',
  full: 'h-full',
}

export function ImagePlaceholder({
  aspectRatio = 'video',
  className,
  icon = 'Sparkles',
  size = 'md',
}: ImagePlaceholderProps) {
  const IconComponent = typeof icon === 'string' ? getIcon(icon) : icon
  
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-xl bg-gradient-to-br from-[#0B1A3A] via-[#1a2d5c] to-[#0B1A3A] flex items-center justify-center',
        aspectRatioClasses[aspectRatio],
        size !== 'full' && sizeClasses[size],
        className
      )}
    >
      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#D97B2B]/10 via-transparent to-[#C9A961]/10"></div>
      
      {/* Pattern overlay */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
        backgroundSize: '24px 24px',
      }}></div>
      
      {/* Icon */}
      <div className="relative z-10 opacity-30">
        <IconComponent className="w-16 h-16 md:w-24 md:h-24 text-white" />
      </div>
      
      {/* Shine effect */}
      <div className="absolute inset-0 -translate-x-full animate-shine bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
    </div>
  )
}

