import { 
  Building2, 
  Mountain, 
  Crown, 
  Waves, 
  BookOpen, 
  Sparkles,
  LucideIcon 
} from 'lucide-react'

export const iconMap: Record<string, LucideIcon> = {
  'Building2': Building2,
  'Mountain': Mountain,
  'Crown': Crown,
  'Waves': Waves,
  'BookOpen': BookOpen,
  'Sparkles': Sparkles,
}

export function getIcon(iconName: string): LucideIcon {
  return iconMap[iconName] || Sparkles
}

