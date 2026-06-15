"use client";

import { motion } from "motion/react";

interface Props {
  article: { headline?: string; description?: string; story?: string; images?: Array<{ url: string }>; links?: { web?: { href: string } }; published?: string };
}

export function MatchArticle({ article }: Props) {
  if (!article || !article.headline) return null;
  var img = article.images && article.images[0] ? article.images[0].url : null;

  return (
    <div className="glass rounded-xl overflow-hidden group">
      {img && (
        <div className="relative h-48 sm:h-56 overflow-hidden">
          <motion.img
            src={img}
            alt={article.headline || ""}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.5 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        </div>
      )}
      <div className="p-4">
        <h2 className="text-base font-bold text-white leading-snug group-hover:text-brand-300 transition-colors">{article.headline}</h2>
        {article.description && (
          <p className="text-xs text-white/35 mt-2 leading-relaxed line-clamp-3">{article.description}</p>
        )}
        <div className="mt-3 flex items-center gap-2">
          <span className="text-[9px] text-brand-400/40 font-bold uppercase tracking-wider">ESPN</span>
          {article.published && <span className="text-[9px] text-white/15">{new Date(article.published).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}</span>}
        </div>
      </div>
    </div>
  );
}
