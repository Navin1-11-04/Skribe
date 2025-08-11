"use client";

import { Doc } from "@/convex/_generated/dataModel";
import { Image } from "lucide-react";
import { Button } from "./ui/button";
import { ElementRef, useRef, useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import TextareaAutosize from "react-textarea-autosize";

interface ToolbarProps {
    initialData : Doc<"documents">;
    preview?:boolean;
}
export const Toolbar = ({
    initialData,
    preview
}:ToolbarProps) =>{
    const inputRef = useRef<ElementRef<"textarea">>(null);
    const [isEditing, setIsEditing] = useState(false);

    const [value,setValue] = useState(initialData.title);


    const update = useMutation(api.documents.update);

    const enableInput = () => {
        if(preview) return;

        setIsEditing(true);
        setTimeout(() => {
            setValue(initialData.title);
            inputRef.current?.focus();
        },0);
    };

    const disableInput = () => setIsEditing(false);

    const onInput = (value:string) => {
        setValue(value);
        update({
            id: initialData._id,
            title: value || "Untitled"
        });
    };

    const onKeydown = (
        event:React.KeyboardEvent<HTMLTextAreaElement>
    ) => {
        if(event.key === "Enter"){
            event.preventDefault();
            disableInput();
        }
    };


    return (
        <div className="w-full max-w-6xl mx-auto px-6 mt-6 border-b-1 pb-2 mb-2">
            {/* <div className="opacity-0 group-hover:opacity-100 flex items-center gapx-x-1 py-4">
                {!initialData.coverImage && !preview && (
                    <Button
                    onClick={() => {}}
                    className="text-muted-foreground text-xs"
                    variant="outline"
                    size="sm"
                    >
                        <Image className="h-4 w-4 mr-2"/>
                        Add Cover
                    </Button>
                )}
            </div> */}
            {isEditing && !preview ? (
                <TextareaAutosize
                ref={inputRef}
                onBlur={disableInput}
                onKeyDown={onKeydown}
                value={value}
                onChange={(e) => onInput(e.target.value)}
                className="text-5xl bg-transparent font-bold break-words outline-none text-[#3f3f3f] dark:text-[#cfcfcf] resize-none"
                       
                />
            ):(
               <div
               onClick={enableInput}
               className="pb-[11.5px] text-5xl font-bold break-words outline-none
               text-[#3f3f3f] dark:text-[#efefef]"
               >
                    {initialData.title}
               </div> 
            )}
        </div>
    )
}