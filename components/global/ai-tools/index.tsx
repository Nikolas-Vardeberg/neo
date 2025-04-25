import { Button } from "@/components/ui/button";
import { TabsContent } from "@/components/ui/tabs";
import Loader from "../loader";
import { Download, File, Pencil, PersonStanding, Star, Video } from "lucide-react";

type Props = {
    plan: "PRO" | "FREE";
    trial: boolean;
    videoId: string;
}

const AiTools = ({ plan, trial, videoId }: Props) => {
    return(
        <TabsContent
            value="Ai tools"
            className="p-5 bg-[#1D1D1D] rounded-xl flex flex-col gap-y-10"
        >
            {" "}
            <div className="flex items-center">
                <div className="w-8/12"> 
                    <h2 className="text-3xl font-bold">Ai tools</h2>
                    <p className="text-[#BDBDBD]">
                        Taking your videos to the next <br /> step with the power of AI.
                    </p>
                </div>
                <div className="flex items-center justify-between gap-4">
                    <Button
                        className="mt-2 text-sm"
                    >
                        <Loader state={false} color="#000">
                            Try now
                        </Loader>
                    </Button>
                    <Button
                        className="mt-2 text-sm"
                        variant="secondary"
                    >
                        <Loader state={false} color="#000">
                            Pay now
                        </Loader>
                    </Button>
                </div>
            </div>
            <div className="border-1 rounded-xl p-4 gap-4 flex flex-col bg-[#1b0f1b7f]">
                <div className="flex items-center gap-2">
                    <h2 className="text-2xl font-bold text-[#a22fe0]">Neo AI</h2>
                    <Star color="#a22fe0" fill="#a22fe0" />
                </div>
                <div className="flex gap-2 items-start">
                    <div className="p-2 rounded-full border-[#2d2d2d] border-[2px] bg-[#2b2b2b]">
                        <Pencil color="#a22fe0" />
                    </div>
                    <div className="flex flex-col">
                        <h3>Summary</h3>
                        <p className="text-muted-foreground text-sm">
                            Generate a description for your video using AI.
                        </p>
                    </div>
                </div>
                <div className="flex gap-2 items-start">
                    <div className="p-2 rounded-full border-[#2d2d2d] border-[2px] bg-[#2b2b2b]">
                        <File color="#a22fe0" />
                    </div>
                    <div className="flex flex-col">
                        <h3>Summary</h3>
                        <p className="text-muted-foreground text-sm">
                            Generate a description for your video using AI.
                        </p>
                    </div>
                </div>
                <div className="flex gap-2 items-start">
                    <div className="p-2 rounded-full border-[#2d2d2d] border-[2px] bg-[#2b2b2b]">
                        <PersonStanding color="#a22fe0" />
                    </div>
                    <div className="flex flex-col">
                        <h3>Summary</h3>
                        <p className="text-muted-foreground text-sm">
                            Generate a description for your video using AI.
                        </p>
                    </div>
                </div>

            </div>
        </TabsContent>
    )
}

export default AiTools;