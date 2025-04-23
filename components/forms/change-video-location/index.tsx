import Loader from "@/components/global/loader";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useMoveVideos } from "@/hooks/useFolder";

type Props = {
    videoId: string;
    currentFolder?: string;
    currentWorkSpace?: string;
    currentFolderName?: string;
}

const ChangeVideoLocation = ({
    videoId,
    currentFolder,
    currentFolderName,
    currentWorkSpace
}: Props) => {
    const {
        register,
        isPending,
        onFormSubmit,
        folders,
        workspaces,
        isFetching,
        isFolders
    } = useMoveVideos(videoId, currentWorkSpace!);

    const folder = folders.find((f) => f.id === currentFolder);
    const workspace = workspaces.find((f) => f.id === currentWorkSpace);

    return(
        <form onSubmit={onFormSubmit} className="flex flex-col gap-y-5">
            <div className="border-1 rounded-xl p-5">
                <h2 className="text-xs mb-5 text-[#a4a4a4]">Current</h2>
                {workspace && (
                    <p className="text-[#a4a4a4]">{workspace.name} Workspace</p>
                )}
                <h2 className="text-xs text-[#a4a4a4] mt-4">Current Folder</h2>
                {folder ? <p>{folder.name}</p> : "This video has no folder"}
            </div>
            <Separator orientation="horizontal" />
            <div className="flex flex-col gap-y-5 p-5 border-1 rounded-xl">
                <h2 className="text-sm text-[#a4a4a4]">To</h2>
                <Label className="flex-col gap-y-2 flex">
                    <p className="text-xs">Workspace</p>
                    <Select {...register("workspace_id")}>
                        <SelectTrigger className="w-full">
                            {workspace?.name || "Select Workspace"}
                        </SelectTrigger>
                        <SelectContent className="bg-[#111111] backdrop-blur-xl">
                            <SelectGroup>
                                {workspaces.map((space) => (
                                    <SelectItem
                                        key={space.id}
                                        value={space.id}
                                    >
                                    {space.name}
                                </SelectItem> 
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </Label>
                {isFetching ? (
                    <Skeleton className="w-full h-[40px] rounded-xl" />
                ): (
                    <Label className="flex flex-col gap-2">
                        <p className="text-sm">Folders in this workspace</p>
                        {isFolders && isFolders.length > 0 ? (
                            <Select {...register("folder_id")}>
                                <SelectTrigger className="w-full">
                                    {currentFolderName || "Select Folder"}
                                </SelectTrigger>
                                <SelectContent className="bg-[#111111] backdrop-blur-xl">
                                    <SelectGroup>
                                    {isFolders.map((folder, key) => key === 0 ? (
                                    <SelectItem
                                        className="text-[#a4a4a4]"
                                        key={folder.id}
                                        value={folder.id}
                                    >
                                        {folder.name}
                                    </SelectItem>
                                ) : (
                                    <SelectItem
                                        className="text-[#a4a4a4] "
                                        key={folder.id}
                                        value={folder.id}
                                    >
                                        {folder.name}
                                    </SelectItem>
                                ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        ) : (
                            <p className="text-[#a4a4a4] text-sm">
                                This workspace has no folders
                            </p>
                        )}
                    </Label>
                )}
            </div>
            <Button>
                <Loader state={isPending} color="#000">
                    Transfer
                </Loader>
            </Button>
        </form>
    )
}

export default ChangeVideoLocation