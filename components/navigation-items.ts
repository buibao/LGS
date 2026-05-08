import { BarChart3, Megaphone, Settings, Sparkles, Users } from "lucide-react";

export const appNavigationItems = [
  { href: "/dashboard", label: "dashboard", icon: BarChart3 },
  { href: "/leads", label: "leads", icon: Users },
  { href: "/campaigns", label: "campaigns", icon: Megaphone },
  { href: "/reports", label: "reports", icon: Sparkles },
  { href: "/settings", label: "settings", icon: Settings },
] as const;
