import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { ClassNames } from "@emotion/react";

export default function DisableClickSelectionGrid() {
  const [rows, setRows] = React.useState([
    {
      id: 1,
      repository: "Repository A",
      tag: "Tag",
      imageId: "Image Id",
      price: 10.5,
      size: "170MB",
    },
    {
      id: 2,
      repository: "Repository A",
      tag: "Tag",
      imageId: "Image Id",
      price: 10.5,
      size: "170MB",
    },
  ]);

  const handleRowClick = (row) => {
    console.log("Image:", row);
  };

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 100,
    },
    { field: "repository", headerName: "Repository", width: 200, flex: 1 },
    { field: "tag", headerName: "Tag", width: 200, flex: 1 },
    { field: "imageId", headerName: "Image Id", width: 200, flex: 1 },
    { field: "size", headerName: "Size", width: 200, flex: 1 },
  ];

  return (
    <div style={{ height: 400, border: "1px solid #89A6CC" }}
    className="bg-[white] rounded-md shadow-lg"
       >
      <DataGrid
        rows={rows}
        columns={columns}
        onRowClick={handleRowClick}
        initialState={{
          pagination: { paginationModel: { pageSize: 5 } },
        }}
        pageSizeOptions={[5, 10, 25]}
      />
    </div>
  );
}
