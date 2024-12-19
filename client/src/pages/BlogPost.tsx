import { useRoute, Link } from "wouter";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { BLOG_POSTS } from "@/lib/constants";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, ArrowLeft } from "lucide-react";

export function BlogPost() {
  const [, params] = useRoute("/blog/:slug");
  const post = BLOG_POSTS.find((post) => post.slug === params?.slug);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md mx-4">
          <CardContent className="pt-6">
            <h1 className="text-2xl font-bold mb-4">Post Not Found</h1>
            <Link href="/blog">
              <Button variant="default">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Blog
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
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

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
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

              <div className="prose dark:prose-invert max-w-none">
                {/* Blog content would be rendered here */}
                <p>Content coming soon...</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </article>
  );
}

export default BlogPost;
