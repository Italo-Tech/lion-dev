import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Lion Dev - Desenvolvimento Web',
  description: 'Sites profissionais, modernos e rápidos. Crie seu projeto conosco!',
  generator: 'Lion Dev',
  keywords: ['Lion Dev', 'Desenvolvimento Web', 'Sites', 'Landing Page', 'Site', 'Criar Site', 'Criar Site Profissional'],
  authors: [{ name: 'Ítalo Henrique', url: 'https://liondev.com.br' }],
  creator: 'Lion Dev',
  metadataBase: new URL('https://liondev.com.br'),
  openGraph: {
    title: 'Lion Dev - Desenvolvimento Web',
    description: 'Sites profissionais, modernos e rápidos.',
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
        <link rel="icon" type="logo/png" href="/icon.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body>{children}</body>
    </html>
  )
}
