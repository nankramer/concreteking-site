import './globals.css'

export const metadata = {
  title: 'ConcreteKing | Concrete & Roofing Specialists — Durban, KZN',
  description: 'Professional concrete and roofing contractor in Durban, KwaZulu-Natal. Driveways, slabs, roof construction, repairs & waterproofing. Free quotes. Master Builders KZN member.',
  keywords: 'concrete contractor durban, roofing durban, concrete driveways kzn, roof repairs durban, retaining walls durban, building contractor kwazulu-natal',
  openGraph: {
    title: 'ConcreteKing | Concrete & Roofing Specialists — Durban, KZN',
    description: 'Professional concrete and roofing contractor serving Durban and KZN. Free quotes within 2 hours.',
    type: 'website',
    locale: 'en_ZA',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
