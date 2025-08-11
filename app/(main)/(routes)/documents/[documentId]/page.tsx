"use client";

import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { Toolbar } from "@/components/toolbar";
import { use } from "react";
import { Cover } from "@/components/cover";
import { Skeleton } from "@/components/ui/skeleton";
import Editor from "@/components/editor";

interface DocumentIdPageProps {
    params:Promise<{
        documentId: Id<"documents">;
    }>;
};

const DocumentIdPage = ({
    params
}:DocumentIdPageProps) => {
    const { documentId } = use(params);
    const document = useQuery(api.documents.getById, {
        documentId
    })

    const update = useMutation(api.documents.update);

    const onChange = (content : string) => {
        update({
            id: documentId,
            content
        })
    }
    if(document === undefined){
        return (
            <div>
                <Skeleton className="w-full h-[15vh]"/>
                <div className="w-full max-w-7xl mx-auto px-6 mt-6">
                    <div className="space-y-4 pl-8 pt-4">
                        <Skeleton className="h-14 w-[50%]"/>
                        <Skeleton className="h-4 w-[80%]"/>
                        <Skeleton className="h-4 w-[30%]"/>
                        <Skeleton className="h-4 w-[60%]"/>
                    </div>
                </div>
            </div>
        )
    }
    if(document === null){
        return <div>Not found</div>
    }
    return (
        <div className="pb-40 flex items-start flex-col  w-full">
            <Cover url={document.coverImage}/>
            <Toolbar initialData={document}/>
            <div className="w-full max-w-7xl px-10">
            <Editor 
            onChange={onChange}
            initialContent = {document.content}/>
            </div>
        </div>
    );
}
 
export default DocumentIdPage;