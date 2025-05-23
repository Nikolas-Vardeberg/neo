"use client"

import { getWorkSpaces } from "@/actions/workspace";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { userQueryData } from "@/hooks/useQueryData";
import { NotificationsProps, WorkspaceProps } from "@/types";
import { usePathname, useRouter } from "next/navigation";
import Modal from "../modal";
import { Menu, PlusCircle } from "lucide-react";
import Search from "../search";
import { MENU_ITEMS } from "@/constants";
import SidebarItem from "./sidebar-item";
import { getNotifications } from "@/actions/user";
import WorkspacePlaceholder from "./workspace-placeholder";
import GlobalCard from "../global-card";
import { Button } from "@/components/ui/button";
import Loader from "../loader";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import InfoBar from "../info-bar";
import { useDispatch } from "react-redux";
import { WORKSPACES } from "@/lib/redux/slices/workspace";

type Props = {
    activeWorkspaceId: string;
}

const Sidebar = ({ activeWorkspaceId }: Props) => {
    const router = useRouter();
    const pathname = usePathname();
    const dispatch = useDispatch();

    const { data, isFetched } = userQueryData(["user-workspaces"], getWorkSpaces);
    const { data: notifcations } = userQueryData(["user-notifications"], getNotifications)
    const menuItems = MENU_ITEMS(activeWorkspaceId);

    
    const { data: workspace } = data as WorkspaceProps;
    const { data: count } = data as NotificationsProps

    const onChangeActiveWorkspace = (value: string) => {
        router.push(`/dashboard/${value}`)
    }

    const currentWorkspace = workspace.WorkSpace.find(
        (s) => s.id === activeWorkspaceId
    )

    if (isFetched && workspace) {
        dispatch(WORKSPACES({ workspaces: workspace.WorkSpace }))
    }

    const SidebarSection = (
        <div className="bg-[#111111] flex-none relative p-4 h-full w-[250px] flex flex-col gap-4 items-center overflow-hidden">
            <div className="bg-[#11111] p-4 flex gap-2 justify-center items-center mb-4 absolute top-0 left-0 right-0">
                <p className="text-2xl">Neo</p>
            </div>
            <Select
                defaultValue={activeWorkspaceId}
                onValueChange={onChangeActiveWorkspace}
            >
                <SelectTrigger className="mt-16 text-neutral-400 bg-transparent w-full">
                    <SelectValue placeholder="Select a workspace"></SelectValue>
                </SelectTrigger>
                <SelectContent className="bg-[#111111] backdrop-blur-xl">
                    <SelectGroup>
                        <SelectLabel>Workspaces</SelectLabel>
                        <Separator />
                        {workspace.WorkSpace.map((workspace) => (
                            <SelectItem
                                key={workspace.id}
                                value={workspace.id}
                            >
                                {workspace.name}
                            </SelectItem>
                        ))}
                        {workspace.members.length > 0 && workspace.members.map((workspace) => workspace.WorkSpace && (
                            <SelectItem
                                value={workspace.WorkSpace.id}
                                key={workspace.WorkSpace.id}
                            >
                                {workspace.WorkSpace.name}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
            {currentWorkspace?.type === "PUBLIC" && workspace.subscription?.plan == "PRO" && (
                <Modal description="Invite other users to your workspace" title="Invite To Workspace" trigger={<span className="text-sm cursor-pointer flex items-center justify-center bg-neutral-800/90 hover:bg-neutral-800/60 w-full rounded-sm p-[5px] gap-2"><PlusCircle size={15} className="text-neutral-800/90 fill-neutral-500" /><span className="text-neutral-400 font-semibold text-xs">Invite To Workspace</span></span>}>
                    <Search workspaceId={activeWorkspaceId} />
                </Modal>     
            )}
            <p className="w-full text-[#9D9D9D] font-bold mt-4">Menu</p>
            <nav className="w-full">
                <ul>
                    {menuItems.map((item) => (
                        <SidebarItem
                            href={item.href}
                            icon={item.icon}
                            selected={pathname === item.href}
                            title={item.title}
                            key={item.title}
                            notifcations={(item.title === "Notifications" && count._count && count._count.notification) || 0}
                        />
                    ))}
                </ul>
            </nav>
            <Separator className="w-4/5" />
            <p className="w-full text-[#9D9D9D] font-bold mt-4">Workspaces</p>
            {workspace.WorkSpace.length === 1 && workspace.members.length === 0 && (
                <div className="w-full mt-[-10px]">
                    <p className="text-[#3c3c3c] font-medium text-sm">{workspace.subscription?.plan === "FREE" ? "Upgrade to create workspaces": "No workspaces"}</p>
                </div>
            )}
            <nav className="w-full">
                 <ul className="h-[150px] overflow-auto overflow-x-hidden fade">
                     {workspace.WorkSpace.length > 0 && workspace.WorkSpace.map((item) => item.type !== "PERSONAL" && (
                         <SidebarItem 
                             href={`/dashboard/${item.id}`}
                             selected={pathname === `/dashboard/${item.id}`}
                             title={item.name}
                             notifcations={0}
                             key={item.name}
                             icon={
                                 <WorkspacePlaceholder>
                                     {item.name.charAt(0)}
                                 </WorkspacePlaceholder>
                             }
                         />
                     ))}
                     {workspace.members.length > 0 && workspace.members.map((item) => (
                         <SidebarItem 
                             href={`/dashboard/${item.WorkSpace.id}`}
                             selected={pathname === `/dashboard/${item.WorkSpace.id}`}
                             title={item.WorkSpace.name}
                             notifcations={0}
                             key={item.WorkSpace.name}
                             icon={
                                 <WorkspacePlaceholder>
                                     {item.WorkSpace.name.charAt(0)}
                                 </WorkspacePlaceholder>
                             }
                         />
                     ))}
                 </ul>
            </nav>
            <Separator className="w-4/5" />
            <div className="w-full">
                {workspace.subscription?.plan === "FREE" && (
                    <GlobalCard 
                        title="Upgrade to Pro"
                        description="Unlock AI features like transcription, AI summary, and more."
                        footer={
                            <Button className="text-sm w-full">
                                <Loader state={false}>Upgrade</Loader>
                            </Button>
                        }
                    />
                )}
            </div>
        </div>
    )

    return (
       <div className="full">
            <InfoBar />
            <div className="md:hidden fixed my-4">
                <Sheet>
                    <SheetTrigger asChild className="ml-2">
                        <Button variant="ghost" className="mt-[2px]">
                            <Menu />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="p-0 w-fit h-full">
                        {SidebarSection}
                    </SheetContent>
                </Sheet>
            </div>
            <div className="md:block hidden h-full">{SidebarSection}</div>
       </div>
    )
}

export default Sidebar