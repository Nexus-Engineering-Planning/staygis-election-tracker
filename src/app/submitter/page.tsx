import Map from "@/components/map";

const SubmitterHomePage = () => {
  return (
    <div className="flex flex-1 flex-col gap-4 px-4 py-10">
      <div className="bg-muted/50 mx-auto h-24 w-full max-w-3xl rounded-xl" />
      <div className="bg-muted/50 mx-auto h-full w-full max-w-3xl rounded-xl z-0">
        <Map />
      </div>
    </div>
    // <div className="h-full w-full flex-col bg-white">
    //   <div className="grid auto-rows-min gap-4 md:grid-cols-3">
    //     <div className="bg-muted/50 aspect-video rounded-xl">
    //       <Button onClick={handleOpenDrawer}>Open Drawer</Button>
    //     </div>
    //     <div className="bg-muted/50 aspect-video rounded-xl" />
    //     <div className="bg-muted/50 aspect-video rounded-xl" />
    //   </div>

    //   <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min">
    //     <Map />
    //   </div>
    // </div>
  );
};

export default SubmitterHomePage;
