import type { Metadata } from 'next'
import { Plus_Jakarta_Sans } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import './globals.css'

const font = Plus_Jakarta_Sans({ subsets: ['latin'], display: 'swap' })

export const metadata: Metadata = {
  title: 'Lion Dev - Desenvolvimento Web',
  description:
    'Sistemas sob medida, e-commerce com pagamentos e sites profissionais. Desenvolvimento Full Stack com Ítalo Henrique.',
  generator: 'Lion Dev',
  keywords: [
    'Lion Dev',
    'Desenvolvimento Web',
    'Desenvolvedor Full Stack',
    'Sistemas sob medida',
    'E-commerce',
    'Sites',
    'Landing Page',
    'Criar Site Profissional',
  ],
  authors: [{ name: 'Ítalo Henrique', url: 'https://liondev.com.br' }],
  creator: 'Lion Dev',
  metadataBase: new URL('https://liondev.com.br'),
  openGraph: {
    title: 'Lion Dev - Desenvolvimento Web',
    description: 'Sistemas sob medida, e-commerce e sites profissionais.',
    url: 'https://liondev.com.br',
    siteName: 'Lion Dev',
    locale: 'pt_BR',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="icon" href="/logo.png" sizes="any" />
        <link rel="apple-touch-icon" href="/logo.png" />
      </head>
      <body className={font.className}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
