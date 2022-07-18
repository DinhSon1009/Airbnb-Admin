import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import httpServ from "../../services/http.service";
import "./UserList.scss";
import { toast } from "react-toastify";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { Link } from "react-router-dom";
import Searchbar from "../../components/Searchbar/Searchbar";

export default function User() {
  const [data, setData] = useState([]);
  const [pageSize, setPageSize] = useState(15);
  const [selectedRows, setSelectedRows] = useState([]);
  const [deleteAction, setDeleteAction] = useState(false);
  const [rows, setRows] = useState([]);

  const deleteUser = async () => {
    try {
      await Promise.all(
        selectedRows.map(async (item) => {
          let res = await httpServ.xoaNguoiDung(item.id);
          // console.log(res);
        })
      );
      toast.success("Xóa thành công!");
    } catch {
      toast.error("Xóa không thành công!");
    }
  };
  const handleDelete = (_id) => {
    if (!selectedRows.length) {
      httpServ
        .xoaNguoiDung(_id)
        .then((res) => {
          // console.log(res);
          toast.success("Xóa thành công!");
        })
        .catch((err) => toast.error("Xóa không thành công!"));
    } else {
      deleteUser();
    }
    setDeleteAction(!deleteAction);

    setSelectedRows([]);
  };

  useEffect(() => {
    httpServ
      .layDanhSachNguoiDung()
      .then((res) => {
        setData(res.data);
        setRows(
          res.data?.map((item) => ({
            id: item?._id,
            name: item?.name,
            email: item?.email,
            phone: item?.phone,
            type: item?.type,
            img: item?.avatar,
            address: item?.address,
          }))
        );
      })
      .catch((err) => console.log(err));
  }, [deleteAction]);

  const columns = [
    { field: "id", headerName: "Id", minWidth: 120, flex: 1 },
    {
      field: "user",
      headerName: "User",
      width: 230,
      renderCell: (params) => {
        return (
          <div className="cellWithImg">
            <img className="cellImg" src={params.row.img} alt="avatar" />
            {params.row.name}
          </div>
        );
      },
    },
    { field: "email", headerName: "Email", minWidth: 200, flex: 1 },
    {
      field: "phone",
      headerName: "Phone",
      type: "number",
      width: 160,
    },
    { field: "address", headerName: "Address", minWidth: 230, flex: 1 },

    {
      field: "type",
      headerName: "Type",
      width: 120,
      renderCell: (params) => {
        return (
          <div className={`cellWithStatus ${params.row.type}`}>
            {params.row.type}
          </div>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 120,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/users/" + params.row.id}>
              <button className="userListEdit">Edit</button>
            </Link>
            <DeleteOutlineIcon
              className="userListDelete"
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div style={{ width: "100%" }}>
      {/* <Searchbar setRows={setRows} platform={data} columns={columns} /> */}
      <DataGrid
        autoHeight
        rows={rows}
        columns={columns}
        pageSize={pageSize}
        disableSelectionOnClick
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        rowsPerPageOptions={[15, 25, 100]}
        checkboxSelection
        pagination
        onSelectionModelChange={(ids) => {
          const selectedIDs = new Set(ids);
          const selectedRowData = rows.filter((row) =>
            selectedIDs.has(row.id.toString())
          );
          setSelectedRows(selectedRowData);
        }}
      />
    </div>
  );
}
