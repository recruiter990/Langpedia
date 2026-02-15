import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Learn 15 European Languages Free | Interactive Language Learning',
  description: 'Master Italian, Spanish, French, German and 11+ European languages with interactive lessons, instant translation, and gamified learning. 100% free forever.',
  keywords: 'learn italian, spanish lessons, french course, european languages, free language learning, language translator, interactive language learning',
  openGraph: {
    title: 'Learn European Languages Free',
    description: 'Interactive lessons for 15 European languages',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

