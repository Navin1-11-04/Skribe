"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { Toolbar } from "@/components/toolbar";
import { use } from "react";
import { Cover } from "@/components/cover";

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

    if(document === undefined){
        return (
            <div>
                Loading...
            </div>
        )
    }
    if(document === null){
        return <div>Not found</div>
    }
    return (
        <div className="pb-40 flex items-start flex-col justify-center w-full">
            <Cover url={document.coverImage}/>
            <div className="w-full mx-auto p-5">
                <Toolbar initialData={document}/>
            </div>
        </div>
    );
}
 
export default DocumentIdPage;