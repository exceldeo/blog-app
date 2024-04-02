import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import MainLayout from "../Layout/MainLayout";

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "firstName", headerName: "First name", width: 130 },
  { field: "lastName", headerName: "Last name", width: 130 },
];

const rows = [
  { id: 1, firstName: "John", lastName: "Doe" },
  { id: 2, firstName: "Jane", lastName: "Doe" },
  // Add more users here
];

export default function UsersTable() {
  return (
    <MainLayout>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid rows={rows} columns={columns} pageSize={5} />
      </div>
    </MainLayout>
  );
}
