"use client";

import SubmissionDataTable from "@/components/submission-data-table";
import { Button } from "@/components/ui/button";
import { DrawerId, useDrawerActions } from "@/stores/drawer-manager-store";

const SubmitterSubmissionsPage = () => {
  const { openDrawer } = useDrawerActions();

  const handleOpenDrawer = () => {
    openDrawer(DrawerId.SUBMISSION_FORM_DRAWER);
  };

  return (
    // <div className="flex flex-1 flex-col gap-4 px-4 py-10">
    //   <div className="bg-muted/50 mx-auto h-24 w-full max-w-3xl rounded-xl">
    //     <Button onClick={handleOpenDrawer}>Open Drawer</Button>
    //   </div>
    //   <div className="bg-muted/50 mx-auto h-full w-full max-w-3xl rounded-xl z-0">
    //     <Map />
    //   </div>
    // </div>
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <div className="bg-muted/50 aspect-video rounded-xl">
          <Button onClick={handleOpenDrawer}>Submit Result</Button>
        </div>
        <div className="bg-muted/50 aspect-video rounded-xl" />
        <div className="bg-muted/50 aspect-video rounded-xl" />
      </div>

      <div className="min-h-[100vh] flex-1 rounded-xl md:min-h-min">
        <SubmissionDataTable />
      </div>
    </div>
  );
};

export default SubmitterSubmissionsPage;
