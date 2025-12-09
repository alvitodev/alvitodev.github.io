import React, { useState, useMemo } from 'react';

// Tipe data sederhana untuk props (agar tidak ribet import dari content collection)
type Post = {
  id: string;
  title: string;
  description: string;
  publishDate: Date;
  category: 'technical' | 'opinion' | 'tutorial';
  isFeatured: boolean;
};

interface Props {
  posts: Post[];
}

export default function WritingDashboard({ posts }: Props) {
  // State untuk Tab yang aktif
  const [activeTab, setActiveTab] = useState<'all' | 'technical' | 'opinion' | 'featured'>('all');

  // Filter logika
  const filteredPosts = useMemo(() => {
    if (activeTab === 'all') return posts;
    if (activeTab === 'featured') return posts.filter(p => p.isFeatured);
    return posts.filter(p => p.category === activeTab);
  }, [activeTab, posts]);

  // Format tanggal (Helper function kecil)
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date(date));
  };

  return (
    <div className="flex flex-col gap-8">
      
      {/* --- TAB CONTROLS --- */}
      <div className="flex flex-wrap gap-2 border-b border-zinc-800 pb-4">
        {['all', 'technical', 'opinion', 'featured'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={`
              px-4 py-1.5 text-xs font-mono uppercase tracking-wider border transition-all duration-300
              ${activeTab === tab 
                ? 'bg-amber-500 text-zinc-950 border-amber-500 font-bold shadow-[0_0_10px_rgba(245,158,11,0.4)]' 
                : 'bg-zinc-900/50 text-zinc-500 border-zinc-800 hover:border-zinc-600 hover:text-zinc-300'}
            `}
          >
            [{tab.toUpperCase()}]
          </button>
        ))}
      </div>

      {/* --- POST LIST --- */}
      <div className="grid gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
        {filteredPosts.length === 0 ? (
          <div className="p-8 text-center border border-dashed border-zinc-800 text-zinc-600 font-mono text-sm">
            // NO_DATA_FOUND_IN_SECTOR
          </div>
        ) : (
          filteredPosts.map((post) => (
            <a 
              key={post.id} 
              href={`/writing/${post.id}`}
              className="group relative block border border-zinc-800 bg-zinc-900/40 p-5 hover:bg-zinc-900 hover:border-amber-500/50 transition-all duration-300"
            >
              {/* Dekorasi Hover di Kiri */}
              <div className="absolute top-0 left-0 h-full w-1 bg-amber-500 opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2">
                <h3 className="text-lg font-bold text-zinc-200 font-mono group-hover:text-amber-500 transition-colors">
                  {post.title}
                </h3>
                <span className="text-xs text-zinc-600 font-mono whitespace-nowrap">
                  {formatDate(post.publishDate)}
                </span>
              </div>
              
              <p className="mt-2 text-sm text-zinc-400 line-clamp-2 max-w-2xl">
                {post.description}
              </p>

              <div className="mt-3 flex gap-2">
                {/* Badge Kategori */}
                <span className="text-[10px] uppercase px-1.5 py-0.5 border border-zinc-700 rounded text-zinc-500">
                  {post.category}
                </span>
                {post.isFeatured && (
                  <span className="text-[10px] uppercase px-1.5 py-0.5 border border-amber-900/50 bg-amber-900/10 text-amber-600 rounded">
                    Featured
                  </span>
                )}
              </div>
            </a>
          ))
        )}
      </div>
    </div>
  );
}