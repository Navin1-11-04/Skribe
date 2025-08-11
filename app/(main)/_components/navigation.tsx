"use client";

import { ChevronLeft, FilePlus2, Folder, Menu, PanelLeft, PanelRight, Plus, PlusCircle, Search, Settings, SquarePlus, ToolCase, Trash2, UserRoundPen } from "lucide-react";
import { useParams, usePathname, useRouter } from "next/navigation";
import { ElementRef, useEffect, useRef, useState } from "react";
import { useMediaQuery } from "usehooks-ts";
import { cn } from "@/lib/utils";
import { Useritem } from "./user-item";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import Item from "./item";
import { toast } from "sonner";
import DocumentList from "./document-list";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import TrashBox from "./trash-box";
import { useSearch } from "@/hooks/use-search";
import { useSettings } from "@/hooks/use-settings";
import { Button } from "@/components/ui/button";
import { Navbar } from "./navbar";
import Image from "next/image";

const Navigation = () => {
  const search = useSearch();
  const settings = useSettings();
  const params = useParams();
  const pathname = usePathname();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const router = useRouter();

  const isResizing = useRef(false);
  const sidebar = useRef<ElementRef<"aside">>(null);
  const navbarRef = useRef<ElementRef<"div">>(null);
  const [isResetting, setIsResetting] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(isMobile);

  const createNote = useMutation(api.documents.create);

  useEffect(() => {
    if (isMobile) {
      collapse();
    } else {
      resetWidth();
    }
  }, [isMobile]);

  useEffect(() => {
    if (isMobile) {
      collapse();
    }
  }, [pathname, isMobile]);

  const handleMouseDown = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.preventDefault();
    event.stopPropagation();

    isResizing.current = true;
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (event: MouseEvent) => {
    if (!isResizing.current) return;
    let newWidth = event.clientX;

    if (newWidth < 240) newWidth = 240;
    if (newWidth > 480) newWidth = 480;

    if (sidebar.current && navbarRef.current) {
      sidebar.current.style.width = `${newWidth}px`;
      navbarRef.current.style.setProperty("left", `${newWidth}px`);
      navbarRef.current.style.setProperty("width", `calc(100% - ${newWidth}px`);
    }
  };

  const handleMouseUp = () => {
    isResizing.current = false;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  const resetWidth = () => {
    if (sidebar.current && navbarRef.current) {
      setIsCollapsed(false);
      setIsResetting(true);

      sidebar.current.style.width = isMobile ? "100%" : "240px";
      navbarRef.current.style.setProperty(
        "width",
        isMobile ? "0" : "calc(100% - 240px)"
      );
      navbarRef.current.style.setProperty("left", isMobile ? "100%" : "240px");

      setTimeout(() => setIsResetting(false), 300);
    }
  };

  const collapse = () => {
    if (sidebar.current && navbarRef.current) {
      setIsCollapsed(true);
      setIsResetting(true);

      sidebar.current.style.width = "0";
      navbarRef.current.style.setProperty("width", "100%");
      navbarRef.current.style.setProperty("left", "0");

      setTimeout(() => setIsResetting(false), 300);
    }
  };

  const handleCreate = () => {
    const promise = createNote({ title: "Untitled" })
    .then((documentId) =>router.push(`/documents/${documentId}`))
    toast.promise(promise, {
      loading: "Creating a new note...",
      success: "New note created!",
      error: "Failed to create a new note.",
    });
  };
  return (
    <>
      <aside
        ref={sidebar}
        className={cn(
          "group/sidebar h-full bg-sidebar dark:bg-sidebar-accent overflow-y-auto relative flex w-60 flex-col z-[9999]}",
          isResetting && "transition-all ease-in-out duration-300",
          isMobile && "w-0"
        )}
      > 
        <div className="flex items-center justify-between gap-x-1 p-2.5 border-b-1">     
        <div>
              <Image 
                    src="/logo_dark.svg"
                    height="25"
                    width="25"
                    alt='logo'
                    className='dark:hidden'
                    />
              <Image 
                    src="/logo_light.svg"
                    height="25"
                    width="25"
                    alt='logo'
                    className='hidden dark:block'
              />
        </div>
        <div
          role="button"
          onClick={collapse}
          className={cn(
            "text-sidebar-ring opacity-100 group-hover/sidebar:text-primary flex items-center hover:bg-sidebar-ring/15 p-1 rounded-sm",
            isMobile && "opacity-100"
          )}
        >
          <PanelLeft className="h-5 w-5" strokeWidth="2"/>
        </div>
        </div>
        <div className="py-3 px-2.5  mr-0.5 h-full max-h-[80%] overflow-y-hidden border-b">
          <div className="flex items-end justify-between w-full h-auto pb-1">
          <h2 className="flex items-center-safe gap-x-2 font-bold text-sm w-full text-accent-foreground">
            <Folder className="w-4.5 h-4.5 mb-0.5" strokeWidth={2.2}/>
             All Notes
          </h2>
            <div
          role="button"
          onClick={handleCreate}
          className={cn(
            "text-sidebar-ring cursor-pointer hover:bg-sidebar-ring/15 hover:text-primary flex items-center justify-center p-1 rounded-sm -mr-1"
          )}
          >
            <FilePlus2 className="w-4.5 h-4.5" strokeWidth="2"/>
          </div>  
          </div>
          <div
          className="w-full max-h-[92%] overflow-y-auto px-0.5 py-1"
          >
          <DocumentList/>
          </div>
        </div>
        <div>
        <div className="w-full h-auto py-3">
          <h2 className="px-2.5 pb-2 flex items-center-safe gap-x-2 font-bold text-sm w-full text-accent-foreground">
            <ToolCase className="w-5 h-5 mb-1.5"/>
             Tools
          </h2>
          <div className="w-full">
            <Item label="Search" icon={Search} isSearch onClick={search.onOpen} variant="utility" />
            <Item label="Settings" icon={Settings} onClick={settings.onOpen} variant="utility" />
            <Item onClick={handleCreate} label="New Note" icon={SquarePlus} variant="utility" />
          </div>
        </div>
        </div>
        <div className="w-full m-auto border-t-1 hover:bg-sidebar-ring/15">
           <Popover>
            <PopoverTrigger className="w-full my-2 px-2.5">
              <Item label="Trash" icon={Trash2}/>
            </PopoverTrigger>
            <PopoverContent
            className="w-60 max-h-[92.5vh]"
            side={isMobile ? "bottom" : "right" }
            sideOffset={15}
            >
              <TrashBox />
            </PopoverContent>
          </Popover>
        </div>
        <div className="border-t-1">
          {/* <div className="flex items-center-safe gap-x-2 px-2.5 pt-2 pb-1">
          <UserRoundPen className="w-4.5 h-4.5 mb-1" strokeWidth={2.2}/>
          <h2 className="font-bold text-sm">Profile</h2>
          </div> */}
          <Useritem />
        </div>
        <div
          onMouseDown={handleMouseDown}
          onClick={resetWidth}
          className="opacity-0 group-hover/sidebar:opacity-100 transition cursor-ew-resize absolute h-full w-[4px] bg-primary/10 right-0 top-0"
        />
      </aside>
      <div
        ref={navbarRef}
        className={cn(
          "absolute top-0 z-[9999] left-60 w-[calc(100%-240px)]",
          isResetting && "transition-all ease-in-out duration-300",
          isMobile && "left-0 w-full"
        )}
      >
        {!!params.documentId ? (
          <Navbar
          isCollapsed={isCollapsed}
          onResetWidth={resetWidth}
          />
        ):(

        <nav className="bg-transparent px-3 py-2 w-full">
          {isCollapsed && (
            <Menu
              onClick={resetWidth}
              role="button"
              className="h-6 w-6text-muted-foreground"
            />
          )}
        </nav>
        )}
      </div>
    </>
  );
};

export default Navigation;
