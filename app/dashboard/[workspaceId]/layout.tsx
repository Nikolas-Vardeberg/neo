import { getNotifications, onAuthenticateUser } from "@/actions/user";
import { getAllUserVideos, getWorkspaceFolders, getWorkSpaces, verifyAccessToWorkspace } from "@/actions/workspace";
import { redirect } from "next/navigation";
import {
    dehydrate,
    HydrationBoundary,
    QueryClient
} from "@tanstack/react-query";

type Props = {
    params: { workspaceId: string }
    children: React.ReactNode;
}

export default async function Layout({ params: { workspaceId }, children }: Props) {
    const auth = await onAuthenticateUser();
    if (!auth.user?.WorkSpace) redirect("/auth/sign-in")
    if (!auth.user.WorkSpace.length) redirect("/auth/sign-in")
    const hasAccess = await verifyAccessToWorkspace(workspaceId);

    if (hasAccess.status !== 200) {
        redirect(`/dashboard/${auth.user.WorkSpace[0].id}`)
    }
    
    if (!hasAccess.data?.workspace) return null;

    const query = new QueryClient();

    await query.prefetchQuery({
        queryKey: ["workspace-folders"],
        queryFn: () => getWorkspaceFolders(workspaceId),
    })

    await query.prefetchQuery({
        queryKey: ["user-videos"],
        queryFn: () => getAllUserVideos(workspaceId),
    })

    await query.prefetchQuery({
        queryKey: ["user-workspaces"],
        queryFn: () => getWorkSpaces(),
    })

    await query.prefetchQuery({
        queryKey: ["user-notifcations"],
        queryFn: () => getNotifications(),
    })

    return(
        <HydrationBoundary state={dehydrate(query)}>
            <div className="flex h-screen w-screen">
                {children}
            </div>
        </HydrationBoundary>
    )
}
