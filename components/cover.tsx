"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "./ui/button";
import { ImageIcon, Pi, X } from "lucide-react";
import { useCoverImage } from "@/hooks/use-cover-image";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useParams } from "next/navigation";
import { Id } from "@/convex/_generated/dataModel";
import { useEdgeStore } from "@/lib/edgestore";
import { Skeleton } from "./ui/skeleton";

interface CoverImageProps {
    url?:string;
    preview?: boolean;
}
export const Cover = ({
    url,
    preview
}: CoverImageProps) => {
    const {edgestore} = useEdgeStore();
    const coverImage = useCoverImage();
    const params = useParams();
    const removeImage = useMutation(api.documents.removeCoverImage);

    const onRemove = async () => {
        if(url){
            await edgestore.publicFiles.delete({url : url});
        }
        removeImage({
            id:params.documentId as Id<"documents">
        })
    };


    return (
        <div className={cn(
    "relative w-full group",
    !url && "h-[10vh]",
    url && "h-[35vh] sm:h-[40vh] rounded-xl overflow-hidden shadow-sm"
  )}
>
  {!!url && (
    <Image
      src={url}
      fill
      alt="Cover Image"
      className="object-cover transition-transform duration-300 group-hover:scale-105"
    />
  )}
            {url && !preview && (
                <div className="opacity-0 group-hover:opacity-100 absolute bottom-5 right-5 flex items-center gap-x-2 bg-gradient-to-b from-black/20 to-transparent">
                    <Button
                    onClick={() => coverImage.onReplace(url)}
                    className="text-muted-foreground text-sm rounded-sm font-[550]"
                    variant="outline"
                    size={"sm"}
                    >
                        <ImageIcon className="h-4.5 w-4.5" strokeWidth={2.3}/>
                        Change cover
                    </Button>
                    <Button
                    onClick={onRemove}
                    className="text-muted-foreground text-sm rounded-sm font-[550]"
                    variant="outline"
                    size="sm"
                    >
                        <X className="h-4.5 w-4.5" strokeWidth={2.3}/>
                        Remove
                    </Button>
                </div>
            )}
        </div>
    )
}
