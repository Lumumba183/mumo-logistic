import { Link } from "react-router";
import { ArrowLeft, Clock, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { mockBlogPosts } from "@/data/mockData";

export default function Blog() {
  return (
    <div className="min-h-screen bg-[#0A0A0F]">
      <div className="border-b border-white/5 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link to="/">
            <Button variant="ghost" className="text-[#9CA3AF] hover:text-[#F5E6D3]">
              <ArrowLeft className="w-4 h-4 mr-2" /> Home
            </Button>
          </Link>
          <h1 className="text-lg font-bold text-[#F5E6D3]" style={{ fontFamily: "'Playfair Display', serif" }}>
            EliteHub Blog
          </h1>
          <div className="w-20" />
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1
            className="text-4xl font-bold text-[#F5E6D3] mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Insights & Stories
          </h1>
          <p className="text-[#9CA3AF] max-w-lg mx-auto">
            Expert advice, industry trends, and success stories from the EliteHub community
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockBlogPosts.map((post) => (
            <Link key={post.id} to={`/blog/${post.slug}`}>
              <article className="glass glass-border rounded-xl overflow-hidden hover:border-[#E11D48]/20 transition-all group h-full flex flex-col">
                <div className="h-48 overflow-hidden">
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <h3 className="text-lg font-semibold text-[#F5E6D3] mb-2 group-hover:text-[#E11D48] transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-sm text-[#9CA3AF] line-clamp-2 mb-4 flex-1">
                    {post.metaDescription}
                  </p>
                  <div className="flex items-center gap-3 text-xs text-[#9CA3AF]">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </span>
                    {post.seoScore && (
                      <span className="flex items-center gap-1 text-[#10B981]">
                        <Tag className="w-3 h-3" />
                        SEO {post.seoScore}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-1 mt-3">
                    {post.hashtags.slice(0, 3).map(tag => (
                      <span key={tag} className="px-2 py-0.5 rounded-full bg-[#E11D48]/10 text-[#E11D48] text-[10px]">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
