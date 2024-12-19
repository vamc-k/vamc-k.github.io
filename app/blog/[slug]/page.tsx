import { notFound } from 'next/navigation'
import { BLOG_POSTS } from '@/lib/constants'
import { format } from 'date-fns'
import Image from 'next/image'
import { ShareButtons } from '@/components/ui/share-buttons'
import { Calendar, Clock, ArrowLeft } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

export function generateMetadata({ params }: BlogPostPageProps) {
  const post = BLOG_POSTS.find((post) => post.slug === params.slug)
  
  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  return {
    title: `${post.title} | Vamsi Krishna Kolli`,
    description: post.excerpt,
  }
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = BLOG_POSTS.find((post) => post.slug === params.slug)

  if (!post) {
    notFound()
  }

  return (
    <article className="min-h-screen bg-background py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <Link href="/blog">
            <Button variant="ghost" className="mb-8">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Button>
          </Link>

          {post.coverImage && (
            <div className="relative h-64 md:h-96 w-full mb-8 rounded-lg overflow-hidden">
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>

            <h1 className="text-4xl font-bold">{post.title}</h1>

            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {format(new Date(post.date), 'MMM d, yyyy')}
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {post.readTime}
              </div>
            </div>

            <p className="text-lg text-muted-foreground">{post.excerpt}</p>

            {/* This is where the actual blog content would go */}
            <div className="prose dark:prose-invert max-w-none">
              <p>Content coming soon...</p>
            </div>

            <div className="mt-8 pt-8 border-t">
              <h3 className="text-lg font-semibold mb-4">Share this article</h3>
              <ShareButtons 
                title={post.title}
                url={`${process.env.NEXT_PUBLIC_APP_URL || ''}/blog/${post.slug}`}
                description={post.excerpt}
              />
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}
