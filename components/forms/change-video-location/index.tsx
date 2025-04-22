import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

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
    return(
        <div className="flex flex-col gap-y-5">
            <div className="border-1 rounded-xl p-5">
                <h2 className="text-xs mb-5 text-[#a4a4a4]">Current</h2>
                <p className="text-[#a4a4a4]">Workspace</p>
                <p className="text-[#a4a4a4] text-sm">This video has no folder</p>
            </div>
            <Separator />
            <div className="flex flex-col gap-y-5 p-5 border-1 rounded-xl">
                <h2 className="text-sm text-[#a4a4a4]">To</h2>
                <Label className="flex-col gap-y-2 flex">
                    <p className="text-xs">Workspace</p>
                    <select className="rounded-xl text-base bg-transparent">
                        <option>

                        </option>
                    </select>
                </Label>
            </div>
        </div>
    )
}

export default ChangeVideoLocation