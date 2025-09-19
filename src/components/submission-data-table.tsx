import React, { useMemo } from "react";
import { DataTable } from "./data-table";
import { ColumnDef } from "@tanstack/react-table";
import { formatDate } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { MoreHorizontal } from "lucide-react";
import useSubmitterSubmission from "@/lib/hooks/submissions/use-submitter-submission";

type SubmissionTableData = {
  id: string;
  electionTypeId: string;
  pollingUnit: string;
  ward: string;
  lga: string;
  state: string;
  createdAt: string;
};

function getTaskTableColumns(
  onEdit: (id: string) => void,
  onDelete: (id: string) => void
): ColumnDef<SubmissionTableData>[] {
  return [
    {
      accessorKey: "electionTypeId",
      header: "Election Type",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("electionTypeId")}</div>
      ),
    },
    {
      accessorKey: "pollingUnit",
      header: "Polling Unit",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("pollingUnit")}</div>
      ),
    },
    {
      accessorKey: "ward",
      header: "Ward",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("ward")}</div>
      ),
    },
    {
      accessorKey: "lga",
      header: "LGA",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("lga")}</div>
      ),
    },
    {
      accessorKey: "state",
      header: "State",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("state")}</div>
      ),
    },
    // {
    //   accessorKey: "status",
    //   header: "Status",
    //   cell: ({ row }) => (
    //     <Badge variant="outline" className="text-muted-foreground px-1.5">
    //       {row.original.status === "done" ? (
    //         <IconCircleCheckFilled color="oklch(72.3% 0.219 149.579)" />
    //       ) : row.original.status === "in-progress" ? (
    //         <IconLoader color="oklch(79.5% 0.184 86.047)" />
    //       ) : (
    //         <IconProgressAlert color="oklch(55.1% 0.027 264.364)" />
    //       )}
    //       {row.original.status}
    //     </Badge>
    //   ),
    // },
    {
      accessorKey: "createdAt",
      header: "Created At",
      cell: ({ row }) => (
        <div className="capitalize">
          {formatDate(row.getValue("created_at"))}
        </div>
      ),
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const taskId = row.original.id;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel className="text-xs font-medium">
                Actions
              </DropdownMenuLabel>

              <DropdownMenuItem onClick={() => onEdit(taskId)}>
                Update
              </DropdownMenuItem>
              <DropdownMenuSeparator />

              <DropdownMenuItem
                variant="destructive"
                onClick={() => onDelete(taskId)}
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
}

const SubmissionDataTable = () => {
  const { useGetAllSubmitterSubmissions } = useSubmitterSubmission();

  const { data, isLoading } = useGetAllSubmitterSubmissions(1);

  const onUpdateTaskRowActionClick = (id: string) => {
    console.log(id);
    // setSelectedTaskId(id);
    // setOpenUpdateTaskModal(true);
  };

  const onDeleteTaskRowActionClick = (id: string) => {
    console.log(id);
    // setSelectedTaskId(id);
    // setOpenDeleteTaskConfirmationModal(true);
  };

  const columns = getTaskTableColumns(
    onUpdateTaskRowActionClick,
    onDeleteTaskRowActionClick
  );

  const mappedTableData = useMemo(
    () =>
      data?.map((submission) => ({
        id: submission.id,
        electionTypeId: submission.electionTypeId,
        pollingUnit: submission.pollingUnit.name,
        ward: submission.ward.name,
        lga: submission.lga.name,
        state: submission.state.s_name,
        createdAt: submission.createdAt,
      })) ?? [],
    [data]
  );

  return (
    <>
      <DataTable
        isLoading={isLoading}
        data={mappedTableData}
        columns={columns}
        filterSearchBy="pollingUnit"
      />
    </>
  );
};

export default SubmissionDataTable;
