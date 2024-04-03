import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import MainLayout from "../Layout/MainLayout";
import { getAllUsers } from "../../api/user";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const columns = [
  { field: "#", headerName: "#", width: 70, sortable: false },
  { field: "username", headerName: "Username", width: 200 },
  { field: "email", headerName: "Email", width: 200 },
  { field: "first_name", headerName: "First Name", width: 160 },
  { field: "last_name", headerName: "Last Name", width: 160 },
  {
    field: "profile_picture",
    headerName: "Profile Picture",
    width: 200,
    renderCell: (params) =>
      params.value ? (
        <img
          src={params.value}
          alt="Profile"
          style={{ height: 50, borderRadius: "50%" }}
        />
      ) : (
        "No Image"
      ),
  },
];

export default function UsersTable() {
  const { user } = useSelector((state) => state.profile);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getAllUsers();
        const users = data.map((user, index) => ({
          ...user,
          "#": index + 1,
        }));
        setUsers(users);
      } catch (error) {
        console.error("Failed to fetch users", error);
      }
    };

    // if{user?.is_user_admin ? "admin" : "user"}
    if (user?.is_user_admin) fetchUsers();
    else navigate("/user");
  }, [navigate, user?.is_user_admin]);

  return (
    <MainLayout>
      <div
        style={{
          width: 1000,
          display: "flex",
          margin: "auto",
        }}>
        <DataGrid
          rows={users}
          columns={columns}
          pageSize={5}
          getRowId={(row) => row.username}
        />
      </div>
    </MainLayout>
  );
}
