"use client";

import { 
    DropdownMenu,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    DropdownMenuItem,
    DropdownMenuContent
 } from "@/components/ui/dropdown-menu";

import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { ChevronDown, ChevronRight, LucideIcon, MoreHorizontal, Plus, Trash2, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface itemProps{
    id?:Id<"documents">;
    documentIcon?:string;
    active?:boolean;
    expanded?:boolean;
    isSearch?:boolean;
    level?:number;
    onExpand?:() => void;
    label:string;
    onClick?: () => void;
    icon:LucideIcon;
}

const Item = ({
    id,
    documentIcon,
    active,
    expanded,
    isSearch,
    level = 0,
    onExpand,
    label,
    onClick,
    icon:Icon
}: itemProps) => {
    const { user }= useUser();
    const ChevronIcon = expanded ? ChevronDown : ChevronRight;
    const router = useRouter();
    const create = useMutation(api.documents.create);

    const archieve = useMutation(api.documents.archieve);

    const onArchieve = (
         event: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) =>{
        event.stopPropagation();
         if(!id) return;
        const promise = archieve({id});
        toast.promise(promise, {
      loading: "Moving to trash...",
      success: "Note moved to trash!",
      error: "Failed to archieve note.",
        });
    };

    const handleExpand = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
        event.stopPropagation();
        onExpand?.();
    }

    const onCreate = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
        event.stopPropagation();

        if(!id) return;
        const promise = create({title: "Untitled", parentDocument:id})
        .then((documentId) => {
            if(!expanded){
                onExpand?.();
            }
            // router.push(`/documents/${documentId}`);
        });
        toast.promise(promise, {
      loading: "Creating a new note...",
      success: "New note created!",
      error: "Failed to create a new note.",
    });
    }
    return (
        <div
        onClick={onClick}
        role="button"
        style={{
            paddingLeft: level ? `${(level * 12)+ 12}px`:"0px"
        }}
        className={cn(
            "group min-h-[35px] text-sm w-full hover:bg-gray-100 hover:outline-1 outline-gray-200 rounded-sm flex items-center text-muted-foreground hover:text-primary font-medium cursor-default pr-1",
            active && "text-primary",
            label == "Trash" && "hover:outline-none")}
        >   {!!id && (
            <div role="button"
            className="h-full mx-1.5"
            onClick={handleExpand}
            >
                <ChevronIcon
                className="h-4 w-4 shrink-0 text-muted-foreground"/>
            </div>
        )}
           {documentIcon ? (
            <div className="shrink-0 mr-2 text-sm">
                {documentIcon}
            </div>
           ) : (
            <Icon className="shrink-0 mr-2 h-4 w-4"/>
           )}
            <span className="truncate mr-2">
            {label}
            </span>
            {isSearch && (
                <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] text-muted-foreground opacity-100">
                    <span className="text-xs">
                      x 
                    </span>k
                </kbd>
            )}
            {!!id && (
                <div className="ml-auto flex items-center gap-x-1">
                    <DropdownMenu>
                        <DropdownMenuTrigger
                        onClick={(e) => e.stopPropagation()}
                        asChild
                        >
                          <div
                          role="button"
                          className="opacity-0 flex items-center justify-center group-hover:opacity-100 h-5.5 w-5.5 ml-auto hover:bg-gray-200 text-muted-foreground hover:text-primary rounded-full"
                          >
                            <MoreHorizontal className="h-4 w-4 hover:text-primary cursor-pointer"/>
                          </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                        className="w-60"
                        align="start"
                        side="right"
                        forceMount>
                            <DropdownMenuItem onClick={onArchieve}>
                               <Trash2 className="h-4 w-4 mr-2"/> 
                               Delete
                            </DropdownMenuItem>
                            <DropdownMenuSeparator/>
                            <div className="text-xs text-muted-foregroundp-2">
                                Last edited by : {user?.fullName}
                            </div>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <div
                    role="button"
                    onClick={onCreate}
                    className="opacity-0 flex items-center justify-center cursor-pointer group-hover:opacity-100 h-5.5 w-5.5 ml-auto rounded-full hover:bg-gray-200">
                        <Plus className="text-muted-foreground w-4 h-4 hover:text-primary" strokeWidth={"2.3"} />
                    </div>
                </div>
            )}
        </div>
    );
}
 
export default Item;

Item.skeleton = function ItemSkeleton({level}:{level?:number}){
    return(
        <div className="flex gap-x-2 py-[3px]"
        style={{
            paddingLeft:level?`${(level * 12) + 25}px`:"12px"
        }}
        >
            <Skeleton className="h-4 w-4"/>
            <Skeleton className="h-4 w-[30%]"/>
        </div>
    )
}