import { Metadata } from 'next'
import { BLOG_POSTS } from '@/lib/constants'
import Link from 'next/link'
import Image from 'next/image'
import { format } from 'date-fns'
import { motion } from 'framer-motion'
import { TagCloud } from '@/components/ui/tag-cloud'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Clock, Calendar } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Blog | Vamsi Krishna Kolli',
  description: 'Technical articles and insights about software development, cloud architecture, and more.',
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
}

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-background py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* @ts-expect-error Async Server Component */}
          <TagCloud />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-bold mb-4">Technical Blog</h1>
            <p className="text-muted-foreground text-lg">
              Insights and experiences in software development, cloud architecture, and modern tech stacks.
            </p>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-8"
          >
            {BLOG_POSTS.map((post) => (
              <motion.div key={post.slug} variants={item}>
                <Link href={`/blog/${post.slug}`}>
                  <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                    {post.coverImage && (
                      <div className="relative h-48 w-full">
                        <Image
                          src={post.coverImage}
                          alt={post.title}
                          fill
                          className="object-cover"
                          priority
                        />
                      </div>
                    )}
                    <CardHeader className="space-y-2">
                      <div className="flex flex-wrap gap-2">
                        {post.tags.map((tag) => (
                          <Badge key={tag} variant="secondary">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <h2 className="text-2xl font-bold hover:text-primary transition-colors">
                        {post.title}
                      </h2>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4">{post.excerpt}</p>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          {format(new Date(post.date), 'MMM d, yyyy')}
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          {post.readTime}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  )
}
