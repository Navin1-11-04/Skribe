"use client";

import { ConfirmModal } from "@/components/modals/confirm-modal";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface BannerProps {
    documentId:Id<"documents">;
}
export const Banner = ({
    documentId
}:BannerProps) => {
    const router = useRouter();
    const remove = useMutation(api.documents.remove);

    const restore = useMutation(api.documents.restore);

    const onRemove = () => {
        const promise = remove({id : documentId})
        toast.promise(promise, {
            loading: " Deleting note...",
            success: "Note deleted!",
            error: "Failed to delete note."
        });

        router.push("/documents");
    };

    const onRestore = () => {
        const promise = restore({id : documentId});

        toast.promise(promise, {
            loading: "Restoring note...",
            success: "Note restored!",
            error: "Failed to restore note."
        });
    };


    return (
        <div className="w-full font-[550] py-1.5 px-4.5 bg-rose-500 text-center text-sm text-white flex items-center gap-x-2 justify-center">
            <p>
                This Note is archived in Trash
            </p>
            {/* <div className="flex gap-x-1.5">
            <Button
            onClick={onRestore}
            variant="outline"
            className="border-white border-2 bg-transparent hover:bg-primary/40 text-white hover:text-white p-0.5 px-2 h-auto font-[550] text-xs flex pt-1 justify-center"
            >
                Restore Note
            </Button>
            <ConfirmModal onConfirm={onRemove}>
            <Button
            variant="outline"
            className="border-white border-2 bg-transparent hover:bg-primary/40 text-white hover:text-white p-0.5 px-2 h-auto font-[550] text-xs flex pt-1 justify-center"
            >
                Delete Note
            </Button>
            </ConfirmModal>
            </div> */}
        </div>
    )
}