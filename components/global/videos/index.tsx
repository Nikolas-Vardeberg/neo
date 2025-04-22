"use client"

import { getAllUserVideos } from "@/actions/workspace";
import { userQueryData } from "@/hooks/useQueryData";
import { cn } from "@/lib/utils";
import { VideosProps } from "@/types";
import { Video } from "lucide-react";
import VideoCard from "./video-card";

type Props = {
    folderId: string;
    videosKey: string;
    workspaceId: string;
}


const Videos = ({ folderId, videosKey, workspaceId }: Props) => {
    const { data: videoData } = userQueryData([videosKey], () => getAllUserVideos(folderId))

    const { status: videosStatus, data: videos } = videoData as VideosProps
    
    return(
        <div className="flex flex-col gap-4 mt-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Video />
                    <h2 className="text-[#BdBdBd] text-xl">Videos</h2>
                </div>
            </div>
            <section
                className={cn(videosStatus !== 200 ? "p-5" : "grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5")}
            >
                {videosStatus === 200 ? (
                    videos.map((video) => (
                        <VideoCard 
                            key={video.id}
                            workspaceId={workspaceId}
                            {...video}
                        />
                    ))
                ): (
                    <p className="text-[#BDBDBD]">
                        No videos in workspace
                    </p>
                )}
            </section>
        </div>
    )
}

export default Videos;