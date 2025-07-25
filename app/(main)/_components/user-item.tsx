"use client";

import { SignOutButton, useUser } from "@clerk/nextjs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { ChevronsLeftRight } from "lucide-react";

export const Useritem = () => {
  const { user } = useUser();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div
          role="button"
          className="flex items-center text-sm p-4 w-full hover:bg-zinc-100 cursor-pointer"
        >
          <div className="gap-x-3 flex items-center max-w-[150px]">
            <Avatar className="h-6 w-6">
              <AvatarImage src={user?.imageUrl} />
            </Avatar>
            <span className="text-start font-medium line-clamp-1">
              {user?.fullName}
            </span>
          </div>
          <ChevronsLeftRight className="rotate-90 ml-3 text-sidebar-ring h-4 w-4" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-65"
        align="start"
        alignOffset={11}
        forceMount
      >
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <div className="flex flex-col space-y-4 p-2">
          <p className="text-xs font-medium leding-none text-muted-foreground">
            {user?.emailAddresses[0].emailAddress}
          </p>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="w-full cursor-pointer text-muted-foreground">
          <SignOutButton>Log out</SignOutButton>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
