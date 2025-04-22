import { Banknote, Bell, File, Home, Settings } from "lucide-react";

export const MENU_ITEMS = (
    workspaceId: string
): { title: string; href: string; icon: React.ReactNode }[] => [
    {
        title: "Home",
        href: `/dashboard/${workspaceId}/home`,
        icon: <Home className="text-[#707070]" />
    },
    {
        title: "My Library",
        href: `/dashboard/${workspaceId}/home`,
        icon: <File className="text-[#707070]" />
    },
    {
        title: "Notifications",
        href: `/dashboard/${workspaceId}/notifcations`,
        icon: <Bell className="text-[#707070]" />
    },
    {
        title: "Billing",
        href: `/dashboard/${workspaceId}/billing`,
        icon: <Banknote className="text-[#707070]" />
    },
    {
        title: "Settings",
        href: `/dashboard/${workspaceId}/settings`,
        icon: <Settings className="text-[#707070]" />
    },
]