import { Link, useParams } from "react-router";
import { ArrowLeft, Clock, Tag, Share2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { mockBlogPosts } from "@/data/mockData";

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = mockBlogPosts.find((p) => p.slug === slug);

  return (
    <div className="min-h-screen bg-[#0A0A0F]">
      <div className="border-b border-white/5 px-6 py-4">
        <div className="max-w-3xl mx-auto">
          <Link to="/blog">
            <Button variant="ghost" className="text-[#9CA3AF] hover:text-[#F5E6D3]">
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to Blog
            </Button>
          </Link>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-12">
        {!post ? (
          <div className="text-center py-20">
            <p className="text-[#9CA3AF] text-lg">Blog post not found</p>
            <Link to="/blog" className="text-[#E11D48] hover:text-[#FB7185] text-sm mt-2 inline-block">
              Back to Blog
            </Link>
          </div>
        ) : (
          <article>
            <div className="h-64 rounded-xl overflow-hidden mb-8">
              <img
                src={post.coverImage}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>

            <h1
              className="text-3xl md:text-4xl font-bold text-[#F5E6D3] mb-4"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {post.title}
            </h1>

            <div className="flex items-center gap-4 mb-8 text-sm text-[#9CA3AF]">
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {post.readTime}
              </span>
              <span className="flex items-center gap-1 text-[#10B981]">
                <Tag className="w-4 h-4" />
                SEO Score: {post.seoScore}
              </span>
              <button className="flex items-center gap-1 hover:text-[#F5E6D3] transition-colors ml-auto">
                <Share2 className="w-4 h-4" /> Share
              </button>
            </div>

            <p className="text-lg text-[#9CA3AF] italic mb-8 border-l-2 border-[#E11D48] pl-4">
              {post.metaDescription}
            </p>

            <div
              className="prose prose-invert max-w-none prose-headings:text-[#F5E6D3] prose-p:text-[#9CA3AF] prose-a:text-[#E11D48] prose-strong:text-[#F5E6D3] prose-blockquote:border-[#E11D48] prose-blockquote:text-[#9CA3AF]"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            <div className="mt-10 pt-6 border-t border-white/5">
              <p className="text-sm text-[#9CA3AF] mb-3">Tags:</p>
              <div className="flex flex-wrap gap-2">
                {post.keywords.map((tag) => (
                  <span key={tag} className="px-3 py-1 rounded-full bg-[#E11D48]/10 text-[#E11D48] text-xs">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/5">
              <p className="text-sm text-[#9CA3AF] mb-3">Hashtags:</p>
              <div className="flex flex-wrap gap-2">
                {post.hashtags.map((tag) => (
                  <span key={tag} className="px-3 py-1 rounded-full bg-white/5 text-[#9CA3AF] text-xs">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA Section */}
            <div className="mt-12 p-8 rounded-xl bg-[#E11D48]/10 border border-[#E11D48]/20 text-center">
              <h3 className="text-xl font-bold text-[#F5E6D3] mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                Ready to Join EliteHub?
              </h3>
              <p className="text-sm text-[#9CA3AF] mb-6 max-w-md mx-auto">
                Whether you are looking to earn or connect, EliteHub is the premier platform for premium companionship. Sign up today and experience the difference.
              </p>
              <Link to="/register">
                <Button className="gradient-crimson text-white border-0 hover:opacity-90 rounded-full px-8 py-6 text-base font-semibold">
                  Get Started Free <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </article>
        )}
      </div>
    </div>
  );
}
