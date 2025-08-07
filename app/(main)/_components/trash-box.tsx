"use client";

import { ConfirmModal } from "@/components/modals/confirm-modal";
import { Spinner } from "@/components/Spinner";
import { Input } from "@/components/ui/input";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import { Funnel, RotateCcw, Search, Trash } from "lucide-react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const TrashBox = () => {
    const router = useRouter();
    const params = useParams();
    const documents = useQuery(api.documents.getTrash);
    const remove = useMutation(api.documents.remove);
    const restore = useMutation(api.documents.remove);

    const[search,setSearch] = useState("");
    const filterDocuments = documents?.filter((documents) => {
        return documents.title.toLowerCase().includes(search.toLowerCase());
    });

    const onClick = (documentId: string) =>{
        router.push(`/documents/${documentId}`);
    };

    const onRestore = (
        event : React.MouseEvent<HTMLDivElement,MouseEvent>,
        documentId:Id<"documents">,
    )=>{
        event.stopPropagation();
        const promise = restore({id : documentId});

        toast.promise(promise,{
            loading:"Restoring note...",
            success:"Note restored!",
            error:"Failed to restore note."
        });
    }

    const onRemove = (
        documentId:Id<"documents">,
    )=>{
        const promise = remove({id:documentId});

        toast.promise(promise,{
            loading:"Deleting note...",
            success:"Note deleted!",
            error:"Failed to delete note."
        });

        if(params.documentId === documentId){
            router.push("/documents");
        }
    }
    if(documents === undefined){
        return(
            <div className="h-full flex items-center justify-center p-4">
                <Spinner size={"lg"}/>
            </div>
        )
    }

    return (
        <div className="text-sm pb-2">
            <div className="flex items-center gap-x-2.5 py-2 px-4">
                <Funnel className="w-4.5 h-4.5"/>
                <Input 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-7 px-0 focus-visible:ring-transparent bg-transparent outline-none shadow-none border-b-2 border-x-0 border-t-0 rounded-none"
                placeholder="Filter by title..."
                />
            </div>
            <div className="mt-0 pb-0 px-1">
                {filterDocuments?.length === 0 && (
                <p className="text-sm text-start text-muted-foreground pl-3">
                    No documents found!
                </p>
                )}

                <div className="mt-1 w-full max-h-[calc(100vh-17.5vh)] overflow-y-auto pl-2 pr-1">
                {filterDocuments?.map((document) => (
                    <div
                    key={document._id}
                    role="button"
                    onClick={() => onClick(document._id)}
                    className="text-sm rounded-sm w-full flex items-center text-primary justify-between px-1 py-1"
                    >
                        <span className="truncate">
                            {document.title}
                        </span>
                        <div className="flex items-center gap-2">
                            <div
                            onClick={(e)=>onRestore(e,document._id)}
                            role="button"
                            className="hover:bg-sidebar-ring/15 p-1 rounded-sm"
                            >
                                 <RotateCcw className="w-3.5 h-3.5 cursor-pointer" strokeWidth="2.5"/>
                            </div>
                            <ConfirmModal onConfirm={() => onRemove(document._id)}>
                            <div
                            // onClick={(e)=>onRestore(e,document._id)}
                            role="button"
                            className="hover:bg-sidebar-ring/15 p-1 rounded-sm"
                            >
                                 <Trash className="w-3.5 h-3.5 cursor-pointer" strokeWidth="2.5"/>
                            </div>
                            </ConfirmModal>
                        </div>
                    </div>
                ))}
                </div>
            </div>
        </div>
    );
};
 
export default TrashBox;