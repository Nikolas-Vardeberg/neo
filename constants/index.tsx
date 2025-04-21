import { Banknote, Bell, File, Home, Settings } from "lucide-react";

export const MENU_ITEMS = (
    workspaceId: string
): { title: string; href: string; icon: React.ReactNode }[] => [
    {
        title: "Home",
        href: `/dashboard/${workspaceId}/home`,
        icon: <Home />
    },
    {
        title: "My Library",
        href: `/dashboard/${workspaceId}/home`,
        icon: <File />
    },
    {
        title: "Notifications",
        href: `/dashboard/${workspaceId}/notifcations`,
        icon: <Bell />
    },
    {
        title: "Billing",
        href: `/dashboard/${workspaceId}/billing`,
        icon: <Banknote />
    },
    {
        title: "Settings",
        href: `/dashboard/${workspaceId}/settings`,
        icon: <Settings />
    },
]