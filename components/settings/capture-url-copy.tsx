"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Check, Copy, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CaptureUrlCopy({ url }: { url: string }) {
  const [copied, setCopied] = useState(false);
  const t = useTranslations("SettingsCapture");

  const copy = async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-3">
      <div className="overflow-x-auto rounded-2xl border border-border/70 bg-[var(--secondary)]/45 px-4 py-3">
        <code className="block min-w-max text-sm text-slate-700">{url}</code>
      </div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <Button className="w-full sm:w-auto" onClick={copy} type="button" variant={copied ? "secondary" : "default"}>
            {copied ? <Check className="mr-2 h-4 w-4" /> : <Copy className="mr-2 h-4 w-4" />}
            {copied ? t("copied") : t("copy")}
          </Button>
          <a href={url} target="_blank" rel="noreferrer" className="w-full sm:w-auto">
            <Button className="w-full sm:w-auto" type="button" variant="outline">
              <ExternalLink className="mr-2 h-4 w-4" />
              {t("open")}
            </Button>
          </a>
        </div>
        <p className="text-xs leading-6 text-slate-500">{t("helper")}</p>
      </div>
    </div>
  );
}
