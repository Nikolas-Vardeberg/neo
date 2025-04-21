import { Loader2 } from "lucide-react";



type Props = {
    color?: string;
}

export const Spinner = ({ color }: Props) => {
    return(
        <div role="status">
            <Loader2 className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600" />
        </div>
    )
}