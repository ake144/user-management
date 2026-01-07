"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { toast } from "sonner";

interface ReferralShareProps {
  referralLink: string;
}

export function ReferralShare({ referralLink }: ReferralShareProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
      setCopied(true);
      toast.success("Referral link copied!");
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error("Failed to copy link");
    }
  };

  const shareUrls = {
    twitter: `https://twitter.com/intent/tweet?text=Join%20me%20on%20this%20awesome%20platform!&url=${encodeURIComponent(referralLink)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(referralLink)}`,
    telegram: `https://t.me/share/url?url=${encodeURIComponent(referralLink)}&text=Join%20me!`,
    whatsapp: `https://wa.me/?text=Join%20me!%20${encodeURIComponent(referralLink)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(referralLink)}`
  };

  return (
    <div className="rounded-xl border bg-gradient-to-br from-primary/10 to-purple-500/10 p-6">
      <h3 className="font-semibold mb-2">Your Referral Link</h3>
      <div className="flex gap-2 mb-4">
        <div 
          className="flex-1 bg-background/50 border rounded-md p-2 font-mono text-xs sm:text-sm truncate flex items-center px-3"
          aria-label="Your referral link"
        >
          {referralLink}
        </div>
        <Button size="icon" variant="outline" onClick={copyToClipboard} className="shrink-0 bg-background/50 hover:bg-background h-9 w-9">
          {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
        </Button>
      </div>

      <p className="text-xs text-muted-foreground mb-3 font-medium">Share via</p>
      
      <div className="flex gap-3 flex-wrap">
        {/* Twitter/X */}
        <a href={shareUrls.twitter} target="_blank" rel="noopener noreferrer" className="h-8 w-8 flex items-center justify-center bg-black text-white rounded-full hover:opacity-80 transition-opacity" title="Share on X">
          <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
        </a>
        
        {/* Facebook */}
        <a href={shareUrls.facebook} target="_blank" rel="noopener noreferrer" className="h-8 w-8 flex items-center justify-center bg-[#1877F2] text-white rounded-full hover:opacity-80 transition-opacity" title="Share on Facebook">
            <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current"><path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036c-2.048 0-2.733.984-2.733 2.596v1.376h5.04l-.359 3.667h-4.681v7.98H9.101Z"/></svg>
        </a>

        {/* Telegram */}
        <a href={shareUrls.telegram} target="_blank" rel="noopener noreferrer" className="h-8 w-8 flex items-center justify-center bg-[#229ED9] text-white rounded-full hover:opacity-80 transition-opacity" title="Share on Telegram">
            <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current"><path d="m20.665 3.717-17.73 6.837c-1.21.486-1.203 1.161-.222 1.462l4.552 1.42 10.532-6.645c.498-.303.953-.14.579.192l-8.533 7.701h-.002l-.002.001-.314 4.692c.46 0 .663-.211.921-.46l2.211-2.15 4.599 3.397c.848.467 1.457.227 1.668-.785l3.019-14.228c.309-1.239-.473-1.8-1.282-1.434Z"/></svg>
        </a>

        {/* WhatsApp */}
        <a href={shareUrls.whatsapp} target="_blank" rel="noopener noreferrer" className="h-8 w-8 flex items-center justify-center bg-[#25D366] text-white rounded-full hover:opacity-80 transition-opacity" title="Share on WhatsApp">
            <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
        </a>

        {/* LinkedIn */}
        <a href={shareUrls.linkedin} target="_blank" rel="noopener noreferrer" className="h-8 w-8 flex items-center justify-center bg-[#0077b5] text-white rounded-full hover:opacity-80 transition-opacity" title="Share on LinkedIn">
            <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
        </a>
      </div>
    </div>
  );
}
