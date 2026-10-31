'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { SidebarMenuButton, useSidebar } from '@/components/ui/sidebar';
import { SignOutButton } from '@/services/clerk/components/AuthButton';
import { useClerk } from '@clerk/nextjs';
import {
  ChevronsUpDown,
  LogOutIcon,
  SettingsIcon,
  UserIcon,
} from 'lucide-react';
import Link from 'next/link';

type User = {
  id: string;
  name: string;
  imageUrl: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
};

export const SidebarUserButtonClient = ({ user }: { user: User }) => {
  const { isMobile, setOpenMobile } = useSidebar();
  const { openUserProfile } = useClerk();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <SidebarMenuButton
            size="lg"
            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
          />
        }
      >
        <UserInfo {...user} />
        <ChevronsUpDown className="ml-auto group-data-[state=collapsed]:hidden" />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        sideOffset={4}
        align="end"
        side={isMobile ? 'bottom' : 'right'}
        className="min-w-64 max-w-80"
      >
        <DropdownMenuGroup>
          <DropdownMenuLabel className="font-normal p-1">
            <UserInfo {...user} />
          </DropdownMenuLabel>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={() => {
              openUserProfile();
              setOpenMobile(false);
            }}
          >
            <UserIcon className="mr-1" /> Profile
          </DropdownMenuItem>
          <DropdownMenuItem
            render={<Link href="/user-settings/notifications" />}
          >
            <SettingsIcon className="mr-1" /> Settings
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <SignOutButton>
          <DropdownMenuItem onClick={() => null}>
            <LogOutIcon className="mr-1" /> Log Out
          </DropdownMenuItem>
        </SignOutButton>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const UserInfo = ({ imageUrl, name, email }: User) => {
  const userInitials = name
    .split(' ')
    .slice(0, 2)
    .map((str) => str[0])
    .join('');

  return (
    <div className="flex items-center gap-2 overflow-hidden">
      <Avatar className="rounded-lg size-8">
        <AvatarImage src={imageUrl} alt={name} />
        <AvatarFallback className="uppercase bg-primary text-primary text-primary-foreground">
          {userInitials}
        </AvatarFallback>
      </Avatar>
      <div className="flex flex-col flex-1 min-w-0 leading-tight group-data-[state=collapsed]:hidden">
        <span className="text-sm font-semibold truncate">{name}</span>
        <span className="text-xs truncate">{email}</span>
      </div>
    </div>
  );
};
