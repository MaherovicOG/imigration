'use client';

import React, { useState } from 'react';
import { Share2, Copy, Check, Code, Link as LinkIcon, Star } from 'lucide-react';

interface CitationEmbedWidgetProps {
  title: string;
  url: string;
}

export function CitationEmbedWidget({ title, url }: CitationEmbedWidgetProps) {
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedEmbed, setCopiedEmbed] = useState(false);

  const fullUrl = url.startsWith('http') ? url : `https://moveamericausa.com${url}`;
  const embedCode = `<iframe src="${fullUrl}" width="100%" height="650" frameborder="0" title="${title}"></iframe><p><small>Data provided by <a href="${fullUrl}" target="_blank" rel="noopener">MoveAmerica USA</a></small></p>`;

  const handleCopyLink = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(fullUrl);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const handleCopyEmbed = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(embedCode);
      setCopiedEmbed(true);
      setTimeout(() => setCopiedEmbed(false), 2500);
    }
  };

  return (
    <div className="bg-slate-900 text-white rounded-2xl border-2 border-slate-800 p-5 sm:p-6 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-red-600/20 text-red-400 border border-red-500/30">
            <Share2 className="w-4 h-4" />
          </div>
          <div>
            <span className="text-xs font-black uppercase tracking-wider text-red-400 block">
              Cite & Share This Data
            </span>
            <span className="text-sm font-bold text-white">
              Link or Embed on Your Blog, Article, or Forum
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleCopyLink}
            className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-bold transition-all flex items-center gap-1.5 border border-white/10"
          >
            {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <LinkIcon className="w-3.5 h-3.5" />}
            <span>{copiedLink ? 'Link Copied!' : 'Copy Direct Link'}</span>
          </button>

          <button
            type="button"
            onClick={handleCopyEmbed}
            className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-xs font-bold transition-all flex items-center gap-1.5 shadow-xs"
          >
            {copiedEmbed ? <Check className="w-3.5 h-3.5 text-white" /> : <Code className="w-3.5 h-3.5" />}
            <span>{copiedEmbed ? 'Embed Code Copied!' : 'Embed Widget'}</span>
          </button>
        </div>
      </div>

      <p className="text-xs text-slate-400 leading-relaxed">
        Writing an article or researching state relocations? You are welcome to cite and link to this dataset. Please attribute data to <strong>MoveAmerica USA</strong> with a direct link back to this report.
      </p>
    </div>
  );
}
