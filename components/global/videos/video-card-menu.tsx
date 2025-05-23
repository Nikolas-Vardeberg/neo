import { Move } from "lucide-react";
import Modal from "../modal";
import ChangeVideoLocation from "@/components/forms/change-video-location";

type Props = {
    videoId: string;
    currentWorkspace?: string;
    currentFolder?: string;
    currentFolderName?: string;
}

const CardMenu = ({ videoId, currentFolder, currentFolderName, currentWorkspace }: Props) => {
    return(
        <Modal
            className="flex items-center cursor-pointer gap-x-2"
            title="Move to new Workspace/Folder"
            description="This action cannot be undone. This will permanently delete your account and remove you data from our servers."
            trigger={
                <Move 
                    size={20}
                    fill="#a4a4a4"
                    className="text-[#a4a4a4]"
                />
            }
        >
            <ChangeVideoLocation
                videoId={videoId}
                currentWorkSpace={currentWorkspace}
                currentFolder={currentFolder}
                currentFolderName={currentFolderName}
            />
        </Modal>
    )
}

export default CardMenu