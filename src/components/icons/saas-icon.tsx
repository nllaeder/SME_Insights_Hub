import type { SVGProps } from "react"

type SaasName =
  | "Mailchimp"
  | "Constant Contact"
  | "QuickBooks"
  | "Asana"
  | "Monday.com"
  | "ShipStation"
  | "Shopify"

interface SaasIconProps extends SVGProps<SVGSVGElement> {
  name: SaasName
}

// Simple placeholder icons
const icons: Record<SaasName, (props: SVGProps<SVGSVGElement>) => JSX.Element> = {
  Mailchimp: (props) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 14V5a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v9l-3 3v2h16v-2l-3-3zM9 5h6" />
    </svg>
  ),
  'Constant Contact': (props) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
  ),
  QuickBooks: (props) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16v16H4zM4 9h16M9 13h6" />
    </svg>
  ),
  Asana: (props) => (
    <svg {...props} viewBox="0 0 24 24" fill="currentColor">
      <circle cx="12" cy="12" r="3" />
      <circle cx="19" cy="19" r="3" />
      <circle cx="5" cy="19" r="3" />
    </svg>
  ),
  'Monday.com': (props) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 7h3v10H8zM13 7h3v10h-3z" />
    </svg>
  ),
  ShipStation: (props) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 18H3c0-1.9.6-3.7 1.8-5.2A6.7 6.7 0 0 1 12 5a6.7 6.7 0 0 1 7.2 7.8c1.2 1.5 1.8 3.3 1.8 5.2h-2M12 5v14" />
    </svg>
  ),
  Shopify: (props) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 10H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-2M6 14h12M6 18h12" />
    </svg>
  ),
}

export function SaasIcon({ name, ...props }: SaasIconProps) {
  const IconComponent = icons[name]
  if (!IconComponent) {
    return null // Or a default icon
  }
  return <IconComponent {...props} />
}
