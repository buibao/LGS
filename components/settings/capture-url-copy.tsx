"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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
      <Input readOnly value={url} />
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <Button className="w-full sm:w-auto" onClick={copy} type="button" variant={copied ? "secondary" : "default"}>
          {copied ? <Check className="mr-2 h-4 w-4" /> : <Copy className="mr-2 h-4 w-4" />}
          {copied ? t("copied") : t("copy")}
        </Button>
        <p className="text-xs leading-6 text-slate-500">{t("helper")}</p>
      </div>
    </div>
  );
}
