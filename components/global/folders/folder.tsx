"use client"

import { cn } from "@/lib/utils";
import Loader from "../loader";
import { FileIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { useMutationData } from "@/hooks/useMutationData";
import { renameFolders } from "@/actions/workspace";
import { Input } from "@/components/ui/input";

type Props = {
    name: string;
    id: string;
    optimistic?: boolean;
    count?: number;
}


const Folder = ({ id, name, count, optimistic }: Props) => {
    const inputRef = useRef<HTMLInputElement | null>(null); 
    const folderCardRef = useRef<HTMLDivElement | null>(null);
    const pathname = usePathname();
    const router = useRouter();
    const [onRename, setOnRename] = useState(false);

    const Rename = () => setOnRename(true);
    const Renamed = () => setOnRename(false);

    const { mutate, isPending } = useMutationData(
        ["rename-folders"],
        (data: { name: string }) => renameFolders(id, name),
        "workspace-folders",
        Renamed
    )

    const handleFolderClick = () => {
        if (onRename) return
        router.push(`${pathname}/folder/${id}`)
    }

    const handleNameDoubleClick = (e: React.MouseEvent<HTMLParagraphElement>) => {
        e.stopPropagation();
        Rename()
    }

    const updateFolderName = (e: React.FocusEvent<HTMLInputElement>) => {
        if (inputRef.current && folderCardRef.current) {
            if (!inputRef.current.contains(e.target as Node | null) && !folderCardRef.current.contains(e.target as Node | null)) {
                if (inputRef.current.value) {
                    mutate({ name: inputRef.current.value })
                } else Renamed()
            }
        }
    }

    return(
        <div ref={folderCardRef} onClick={handleFolderClick} className={cn(optimistic && "opacity-60", "flex hover:bg-neutral-800 cursor-pointer transition duration-150 items-center gap-2 justify-between min-w-[250px] py-6 px-4 rounded-lg border-1")}>
            <Loader state={false}>
                <div className="flex flex-col gap-[1px]">
                    {onRename ? (
                        <input 
                            onBlur={(e: React.FocusEvent<HTMLInputElement>) => updateFolderName(e)}
                            autoFocus
                            placeholder={name}
                            className="!border-none text-base w-full !outline-none text-neutral-300 !bg-transparent p-0"
                            ref={inputRef}
                        />
                    ): (
                        <p onClick={(e) => e.stopPropagation()} className="text-neutral-300" onDoubleClick={handleNameDoubleClick}>
                            {name}
                        </p>
                    )}
                    <span className="text-sm text-neutral-500">{count || 0} videos</span>
                </div>
            </Loader>
            <FileIcon />
        </div>
    )
}

export default Folder