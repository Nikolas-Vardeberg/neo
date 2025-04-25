import Link from "next/link";
import Loader from "../loader";
import CopyLink from "./copy-link";
import CardMenu from "./video-card-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dot, Share2, User } from "lucide-react";


type Props = {
    User: {
        firstname: string | null;
        lastname: string | null;
        image: string | null;
    } | null;
    id: string;
    Folder: {
        id: string;
        name: string;
    } | null;
    createdAt: Date;
    title: string | null;
    source: string;
    processing: boolean;
    workspaceId: string;
}

const VideoCard = (props: Props) => {
    const daysAgo = Math.floor((new Date().getTime() - props.createdAt.getTime()) / (24 * 60 * 60 * 1000))

    return(
        <Loader className="bg-[#171717] flex justify-center items-center border-[1px] border-[#252525] rounded-xl" state={props.processing}>
            <div className="overflow-hidden group cursor-pointer bg-[#171717] relative border-[1px] border-[#252525] flex flex-col rounded-xl">
                <div className="absolute top-3 items-center right-3 z-50 hidden group-hover:flex gap-3">
                    <CardMenu 
                        currentFolderName={props.Folder?.name}
                        videoId={props.id}
                        currentWorkspace={props.workspaceId}
                        currentFolder={props.Folder?.id}
                    />
                    <CopyLink 
                        className="p-3 bg-transparent"
                        videoId={props.id}
                        variant="ghost"
                    />
                </div>
                <Link
                    href={`/dashboard/${props.workspaceId}/video/${props.id}`}
                    className="hover:bg-[#252525] transition duration-150 flex flex-col justify-between"
                >
                    <video
                        controls={false}
                        preload="metadata"
                        className="w-full aspect-video opacity-50 z-20"
                    >
                        <source 
                            src={`${process.env.NEXT_PUBLIC_CLOUD_FRONT_STREAM_URL}/${props.source}#t=1`}
                        />
                    </video>
                    <div className="px-5 py-3 flex flex-col  z-20">
                        <h2 className="text-sm font-semibold text-[#BDBDBD]">
                            {props.title}
                        </h2>
                        <div className="flex gap-x-2 items-center mt-4">
                            <Avatar className="w-8 h-8">
                                <AvatarImage src={props?.User?.image as string} />
                                <AvatarFallback>
                                    <User />
                                </AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="capitalize text-xs text-[#BDBDBD]">
                                    {props.User?.firstname} {props.User?.lastname}
                                </p>
                                <p className="text-[#6b6b6b] text-xs flex items-center">
                                    <Dot />
                                    {daysAgo === 0 ? "Today": `${daysAgo}d ago`}
                                </p>
                            </div>
                        </div>
                        <div className="mt-4">
                            <span className="flex gap-1 items-center">
                                <Share2 
                                    fill="#9D9D9D"
                                    className="text-[#9D9D9D]"
                                    size={12}
                                />
                                <p className="text-xs text-[#9D9D9D] capitalize">
                                    {props?.User?.firstname}'s Workspace
                                </p>
                            </span>
                        </div>
                    </div>
                </Link>
            </div>
        </Loader>
    )
}

export default VideoCard