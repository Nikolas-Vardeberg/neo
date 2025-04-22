"use client"

import { cn } from "@/lib/utils";
import { ArrowRight, FolderIcon } from "lucide-react";
import Folder from "./folder";
import { userQueryData } from "@/hooks/useQueryData";
import { getWorkspaceFolders } from "@/actions/workspace";
import { useMutationDataState } from "@/hooks/useMutationData";


type Props = {
    workspaceId: string;
}

export type FoldersProps = {
    status: number;
    data: ({
        _count: {
            videos: number;
        }
    } & {
        id: string;
        name: string;
        createdAt: Date;
        workSpaceId: string | null;
    })[]
}

const Folders = ({ workspaceId }: Props) => {
    const { data, isFetched } = userQueryData(["workspace-folders"], () => getWorkspaceFolders(workspaceId));
    
    const { latestVariables } = useMutationDataState(["create-folder"])

    const { status, data: folders } = data as FoldersProps



    return(
        <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <FolderIcon />
                    <h2 className="text-[#DBDBDB] text-xl">Folders</h2>
                </div>
                <div className="flex items-center gap-2">
                    <p className="text-[#DBDBDB]">Se all</p>
                    <ArrowRight color="#707070" />
                </div>
            </div>
            <section
                className={cn(status !== 200 && "justify-center", "flex items-center gap-4 overflow-x-auto w-full")}
            >
                {status !== 200 ? (
                    <p className="text-neutral-200">No folders in workspace</p>
                ): (
                    <>
                        {latestVariables && latestVariables.status === "pending" && (
                            <Folder 
                                name={latestVariables.variables.name}
                                id={latestVariables.variables.id}
                                optimistic
                            />
                        )}
                        {folders.map((folder) => (
                            <Folder 
                                name={folder.name}
                                count={folder._count.videos}
                                id={folder.id}
                                key={folder.id}
                            />
                        ))}
                    </>
                )}
            </section>
        </div>
    )
}

export default Folders;