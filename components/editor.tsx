"use client";

import { useEffect } from "react";
import { BlockNoteEditor, PartialBlock } from "@blocknote/core";
import "@blocknote/mantine/style.css";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import { useTheme } from "next-themes";
import { useEdgeStore } from "@/lib/edgestore";
import { Edit } from "lucide-react";

// Simple debounce helper
function debounce<T extends (...args: any[]) => void>(fn: T, delay: number) {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

interface EditorProps {
  onChange: (value: string) => void;
  initialContent?: string;
  editable?: boolean;
}

const Editor = ({
  onChange,
  initialContent,
  editable = true,
}: EditorProps) => {
  const { resolvedTheme } = useTheme();

  const {edgestore} = useEdgeStore();
  
  const handleUpload = async (file: File) => {
    const response = await edgestore.publicFiles.upload({
      file
    });
    return response.url;
  }
  const editor = useCreateBlockNote({
    initialContent: initialContent
      ? (JSON.parse(initialContent) as PartialBlock[])
      : undefined,
      uploadFile:handleUpload,
  });

  useEffect(() => {
    if (!editor) return;

    const debouncedChange = debounce(() => {
      onChange(JSON.stringify(editor.topLevelBlocks, null, 2));
    }, 500);

    const unsubscribe = editor.onChange(debouncedChange);

    return () => {
      unsubscribe?.();
    };
  }, [editor, onChange]);

  return (
    <BlockNoteView
      editor={editor}
      editable={editable}
      theme={resolvedTheme === "dark" ? "dark" : "light"}
      className="w-full"
    />
  );
};

export default Editor;