"use client";

import { motion } from "motion/react";
import { BlurFade } from "@/components/ui/blur-fade";
import { GlassPanel } from "@/components/ui/shell";
import type { ESPNArticle } from "@/lib/espn-types";

interface Props { articles: ESPNArticle[]; }

export function NewsFeed({ articles }: Props) {
  var hero = articles[0];
  var rest = articles.slice(1);
  var heroImg = hero && hero.images && hero.images[0] ? hero.images[0].url : null;
  var heroLink = hero && hero.links && hero.links.web ? hero.links.web.href : "#";

  return (
    <div className="space-y-4">
      {/* Hero article */}
      {hero && (
        <BlurFade delay={0}>
          <a href={heroLink} target="_blank" rel="noopener noreferrer" className="block group">
            <GlassPanel className="overflow-hidden p-0">
              <div className="relative h-56 sm:h-72 overflow-hidden">
                {heroImg && (
                  <motion.img
                    src={heroImg}
                    alt={hero.headline}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.6 }}
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <span className="inline-block rounded-full bg-brand-400/20 border border-brand-400/30 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-brand-300 mb-3">Featured</span>
                  <h3 className="text-lg sm:text-xl font-bold text-white leading-tight group-hover:text-brand-300 transition-colors">{hero.headline}</h3>
                  <p className="text-xs text-white/40 mt-2 line-clamp-2">{hero.description}</p>
                </div>
              </div>
            </GlassPanel>
          </a>
        </BlurFade>
      )}

      {/* Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {rest.map(function(article, i) {
          var imgUrl = article.images && article.images[0] ? article.images[0].url : null;
          var link = article.links && article.links.web ? article.links.web.href : "#";
          return (
            <BlurFade key={i} delay={0.05 + i * 0.04}>
              <a href={link} target="_blank" rel="noopener noreferrer" className="block h-full group">
                <GlassPanel className="h-full overflow-hidden p-0 hover-lift">
                  {imgUrl && (
                    <div className="relative h-36 overflow-hidden">
                      <motion.img
                        src={imgUrl}
                        alt={article.headline}
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.6 }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    </div>
                  )}
                  <div className="p-4">
                    <h3 className="text-sm font-bold text-white leading-snug mb-2 group-hover:text-brand-300 transition-colors line-clamp-2">{article.headline}</h3>
                    <p className="text-[11px] text-white/30 leading-relaxed line-clamp-2">{article.description}</p>
                    <div className="mt-3 flex items-center gap-2">
                      <span className="text-[9px] uppercase tracking-wider text-brand-400/40 font-bold">ESPN</span>
                      {article.published && (
                        <span className="text-[9px] text-white/15">{new Date(article.published).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}</span>
                      )}
                    </div>
                  </div>
                </GlassPanel>
              </a>
            </BlurFade>
          );
        })}
      </div>
    </div>
  );
}
