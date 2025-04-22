"use client"

import { getWorkSpaces } from "@/actions/workspace"
import { userQueryData } from "@/hooks/useQueryData"
import Modal from "../modal"
import { Button } from "@/components/ui/button"
import { FilePlus } from "lucide-react"
import WorkspaceForm from "@/components/forms/workspace-form"


const CreateWorkspace = () => {
    const { data } = userQueryData(["user-workspaces"], getWorkSpaces)

    const { data: plan } = data as {
        status: number
        data: {
            subscription: {
                plan: "PRO" | "FREE"
            } | null
        }
    }

    if (plan.subscription?.plan === "FREE") {
        return(
            <>
            </>
        )
    }

    if (plan.subscription?.plan === "PRO") {
        return(
            <Modal
            title="Create a Workspace"
            description="Workspaces helps you collaborate with team members. You are assigned a default personal workspace where you can share videos in private with youself."
            trigger={
                <Button className="bg-[#1D1D1D] text-[#707070] flex items-center gap-2 py-6 px-4 rounded-2xl">
                    <FilePlus />
                    Create a Workspace
                </Button>
            }
        >
            <WorkspaceForm />
        </Modal>
        )
    }

}

export default CreateWorkspace