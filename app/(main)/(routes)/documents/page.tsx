"use client";

import Image from "next/image";
import { useUser } from "@clerk/nextjs";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { query } from "@/convex/_generated/server";

const DocumentPage = () => {
  const { user } = useUser();
  const createNote = useMutation(api.documents.create);

  const handleCreate = () => {
    const promise = createNote({ title: "Untitled" });
    toast.promise(promise, {
      loading: "Creating a new note...",
      success: "New note created!",
      error: "Failed to create a new note.",
    });
  };
  return (
    <div className="h-full flex flex-col items-center justify-center space-y-4">
      {/* <Image
            src=""
            height=""
            width=""
            alt=""
            className="dark:hidden"
            />
             <Image
            src=""
            height=""
            width=""
            alt=""
            className="hidden dark:block"
            /> */}

      <h2>Welcome to {user?.firstName}&apos;s Skribe</h2>
      <Button onClick={handleCreate}>
        <PlusCircle className="h-4 w-4 mr-2" />
        Create a Note
      </Button>
    </div>
  );
};

export default DocumentPage;
