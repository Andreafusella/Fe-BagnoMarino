import type { LucideIcon } from "lucide-react";
import * as LucideIcons from 'lucide-react';

export function getLucideIconByName(iconName: string): LucideIcon {
    const icon = (LucideIcons as unknown as Record<string, LucideIcon>)[iconName];
    return icon || LucideIcons.HelpCircle;
}