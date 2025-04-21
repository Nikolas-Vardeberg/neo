import { onAuthenticateUser } from "@/actions/user";
import { verifyAccessToWorkspace } from "@/actions/workspace";
import { redirect } from "next/navigation";

type Props = {
    params: { workspaceId: string }
    children: React.ReactNode;
}

export default async function Layout({ params: { workspaceId }, children }: Props) {
    const auth = await onAuthenticateUser();
    if (!auth.user?.workspace) redirect("/auth/sign-in")
    if (!auth.user.workspace.length) redirect("/auth/sign-in")
    const hasAccess = await verifyAccessToWorkspace(workspaceId);

    if (hasAccess.status !== 200) {
        redirect(`/dashboard/${auth.user.workspace[0].id}`)
    }
    
    if (!hasAccess.data?.workspace) return null;

    return(
        <>
            Layout
        </>
    )
}
