"use client"

import { getWorkSpaces } from "@/actions/workspace";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { userQueryData } from "@/hooks/useQueryData";
import { WorkspaceProps } from "@/types";
import { useRouter } from "next/navigation";

type Props = {
    activeWorkspaceId: string;
}

const Sidebar = ({ activeWorkspaceId }: Props) => {
    const router = useRouter();

    const { data, isFetched } = userQueryData(["user-workspaces"], getWorkSpaces);

    const { data: workspace } = data as WorkspaceProps;

    const onChangeActiveWorkspace = (value: string) => {
        router.push(`/dashboard/${value}`)
    }

    return (
        <div className="bg-[#111111] flex-none relative p-4 h-full w-[250px] flex flex-col gap-4 items-center overflow-hidden">
            <div className="bg-[#11111] p-4 flex gap-2 justify-center items-center mb-4 absolute top-0 left-0 right-0">
                <p className="text-2xl">Neo</p>
            </div>
            <Select
                defaultValue={activeWorkspaceId}
                onValueChange={onChangeActiveWorkspace}
            >
                <SelectTrigger className="mt-16 text-neutral-400 bg-transparent">
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
        </div>
    )
}

export default Sidebar