import {
  Sidebar,
  SidebarHeader,
  SidebarTrigger,
  SidebarProvider,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
} from '@/components/ui/sidebar';
import { TooltipProvider } from '@/components/ui/tooltip';
import { AppSidebarClient } from './_AppSidebarClient';
import Link from 'next/link';
import { LogIn } from 'lucide-react';
import { SignedInStatus } from '@/services/clerk/components/SignInStatus';
import { SidebarUserButton } from '@/features/users/components/SidebarUserButton';

export default function Home() {
  return (
    <TooltipProvider>
      <SidebarProvider className="overflow-y-hidden">
        <AppSidebarClient>
          <Sidebar collapsible="icon" className="overflow-y-hidden">
            <SidebarHeader className="flex-row">
              <SidebarTrigger />
              <span className="text-xl text-nowrap">Matin Jobs</span>
            </SidebarHeader>
            <SidebarContent>
              <SidebarGroup>
                <SidebarMenu>
                  <SignedInStatus status="signed-out">
                    <SidebarMenuItem>
                      <SidebarMenuButton>
                        <Link
                          href="/sign-in"
                          className="flex flex-row items-center gap-1.5"
                        >
                          <LogIn />
                          <span className="text-sm">Log In</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SignedInStatus>
                </SidebarMenu>
              </SidebarGroup>
            </SidebarContent>
            <SignedInStatus status="signed-in">
              <SidebarFooter>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarUserButton />
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarFooter>
            </SignedInStatus>
          </Sidebar>
          <main className="flex-1">bullshit</main>
        </AppSidebarClient>
      </SidebarProvider>
    </TooltipProvider>
  );
}
