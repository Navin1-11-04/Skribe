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
import { ChevronsLeftRight, Mail } from "lucide-react";

export const Useritem = () => {
  const { user } = useUser();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div
          role="button"
          className="flex items-center text-sm py-3 px-2.5 w-full hover:bg-sidebar-accent cursor-pointer"
        >
          <div className="gap-x-3 flex items-center max-w-[150px]">
            <Avatar className="h-6 w-6">
              <AvatarImage src={user?.imageUrl} />
            </Avatar>
            <span className="text-start font-medium line-clamp-1 text-foreground">
              {user?.fullName}
            </span>
          </div>
          {/* <ChevronsLeftRight className="rotate-90 ml-3 text-sidebar-primary/50 h-4 w-4" /> */}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-65"
        align="start"
        alignOffset={11}
        forceMount
      >
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <div className="flex items-center  justify-start space-x-2 p-2">
          <Mail className="h-3 w-3 mt-0.5 text-accent-foreground"/>
          <p className="text-xs font-medium leding-none text-primary/50">
            {user?.emailAddresses[0].emailAddress}
          </p>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="w-full cursor-pointer font-medium text-muted-foreground hover:text-primary">
          <SignOutButton>Log out</SignOutButton>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
