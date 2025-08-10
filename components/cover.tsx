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

interface CoverImageProps {
    url?:string;
    preview?: boolean;
}
export const Cover = ({
    url,
    preview
}: CoverImageProps) => {
    const coverImage = useCoverImage();
    const params = useParams();
    const removeImage = useMutation(api.documents.removeCoverImage);

    const onRemove = () => {
        removeImage({
            id:params.documentId as Id<"documents">
        })
    };


    return (
        <div className={cn(
            "relative w-full h-[40vh] group",
            !url && "h-[10vh]",
            url && "bg-muted"
        )}>
            {!!url && (
                <Image
                src={url}
                fill
                alt="Cover Image"
                className="object-cover"
                />
            )}
            {url && !preview && (
                <div className="opacity-0 group-hover:opacity-100 absolute bottom-5 right-5 flex items-center gap-x-2">
                    <Button
                    onClick={coverImage.onOpen}
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