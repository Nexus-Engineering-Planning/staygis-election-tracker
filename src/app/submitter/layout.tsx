import DrawerProvider from "@/components/drawer-provider";
import ProtectedRoute from "@/components/protected-route";
import SubmitterDashboardSidebar from "@/components/submitter-dashboard-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { UserRole } from "@/lib/types/user-types";

interface SubmitterDashboardLayoutProps {
  children: React.ReactNode;
}

const SubmitterDashboardLayout = ({
  children,
}: SubmitterDashboardLayoutProps) => {
  return (
    <ProtectedRoute allowed={UserRole.SUBMITTER}>
      <DrawerProvider>
        <SidebarProvider>
          <SubmitterDashboardSidebar />
          <SidebarInset>
            <header className="flex h-16 shrink-0 items-center gap-2">
              <div className="flex items-center gap-2 px-4">
                <SidebarTrigger className="-ml-1" />
                <Separator
                  orientation="vertical"
                  className="mr-2 data-[orientation=vertical]:h-4"
                />
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem className="hidden md:block">
                      <BreadcrumbLink href="#">
                        Building Your Application
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className="hidden md:block" />
                    <BreadcrumbItem>
                      <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </div>
            </header>
            {children}
          </SidebarInset>
        </SidebarProvider>
      </DrawerProvider>
    </ProtectedRoute>
  );
};

export default SubmitterDashboardLayout;
