import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog | Vamsi Krishna Kolli',
  description: 'Technical articles and insights about software development, cloud architecture, and more.',
}

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background">
      {children}
    </div>
  )
}
