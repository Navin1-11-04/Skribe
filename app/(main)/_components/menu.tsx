"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useCoverImage } from "@/hooks/use-cover-image";
import { useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { Ellipsis, Image, MoreHorizontal, Trash2, Undo2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface MenuProps {
  documentId: Id<"documents">;
  isArchived: boolean;
}

export const Menu = ({ documentId,isArchived }: MenuProps) => {
  const router = useRouter();
  const { user } = useUser();
  const archive = useMutation(api.documents.archieve);
  const restore = useMutation(api.documents.restore);
  const coverImage = useCoverImage();


  const onArchive = () => {
    const promise = archive({ id: documentId });

    toast.promise(promise, {
      loading: "Moving to trash...",
      success: " Note moved to trash!",
      error: "Failed to archieve note.",
    });
    router.push("/documents");
  };

  const onRestore = () => {
    const promise = restore({ id: documentId });
    toast.promise(promise, {
      loading: "Restoring note...",
      success: "Note restored!",
      error: "Failed to restore note.",
    });
    router.push("/documents");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div
          role="button"
          className="
            cursor-pointer
            hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50
            px-1 rounded-sm
            "
        >
          <Ellipsis size={24} />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40" align="end"
      alignOffset={5} 
      forceMount>
        {!isArchived && (
    <DropdownMenuItem onClick={coverImage.onOpen}>
      <Image className="h-5 w-5 mr-1 text-primary" />
      <span className="font-[550]">Add Cover</span>
    </DropdownMenuItem>
  )}
        {isArchived ? (
          <DropdownMenuItem onClick={onRestore}>
            <Undo2 className="h-5 w-5 mr-1 text-primary" />
            <span className="font-[550]">Restore</span>
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem onClick={onArchive}>
            <Trash2 className="h-5 w-5 mr-1 text-primary" />
            <span className="font-[550]">Delete</span>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

Menu.Skeleton = function MenuSkeleton(){
    return (
        <Skeleton className="h-4 w-8 rounded-sm"/>
    )
}