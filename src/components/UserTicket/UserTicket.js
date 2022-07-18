import React, { useEffect, useState } from "react";
import httpServ from "../../services/http.service";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { DataGrid } from "@mui/x-data-grid";
import moment from "moment";
import { toast } from "react-toastify";

export default function UserTicket({ userId }) {
  const [listData, setListData] = useState([]);
  const [pageSize, setPageSize] = useState(15);
  const [selectedRows, setSelectedRows] = useState([]);

  useEffect(() => {
    httpServ
      .layDanhSachVeTheoNguoiDung(userId)
      .then((res) => {
        setListData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const deleteTicket = async () => {
    let selectionFilter = selectedRows.map((item) => item.id);

    try {
      await Promise.all(
        selectedRows.map(async (item) => {
          let res = await httpServ.xoaVe(item.id);
          // console.log(res);
        })
      );
      setListData(
        listData.filter((item) => !selectionFilter.includes(item._id))
      );
      // console.log(listData);
      toast.success("Xóa thành công!");
    } catch {
      toast.error("Xóa không thành công!");
    }
  };

  const handleDelete = (_id) => {
    if (!selectedRows.length) {
      httpServ
        .xoaVe(_id)
        .then((res) => {
          setListData(listData.filter((item) => item._id !== _id));
          toast.success("Xóa thành công!");
        })
        .catch((err) => toast.error("Xóa không thành công!"));
    } else {
      deleteTicket();
    }
  };
  // console.log(selectedRows);

  const columns = [
    { field: "id", headerName: "Id", minWidth: 120, flex: 1 },
    {
      field: "checkIn",
      headerName: "Check In",
      minWidth: 120,
      flex: 1,
      renderCell: (params) => {
        return (
          <>
            <span>{moment(params.row.checkIn).format("DD/MM/YYYY")}</span>
          </>
        );
      },
    },
    {
      field: "checkOut",
      headerName: "Check Out",
      minWidth: 120,
      flex: 1,
      renderCell: (params) => {
        return (
          <>
            <span>{moment(params.row.checkOut).format("DD/MM/YYYY")}</span>
          </>
        );
      },
    },
    {
      field: "roomId",
      headerName: "Room Id",
      minWidth: 230,
      flex: 1,
    },
    {
      field: "roomName",
      headerName: "Room Name",
      minWidth: 230,
      flex: 1,
    },

    {
      field: "delete",
      headerName: "Delete",
      minWidth: 160,
      flex: 1,
      renderCell: (params) => {
        return (
          <>
            <DeleteOutlineIcon
              className="userListDelete"
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    },
  ];
  const rows = listData?.map((item) => ({
    id: item?._id,
    checkIn: item?.checkIn,
    checkOut: item?.checkOut,
    roomId: item?.roomId?._id || "No information",
    roomName: item?.roomId?.name || "No information",
  }));

  return (
    <div style={{ width: "100%" }}>
      <h1 className="title">User's Ticket</h1>
      <DataGrid
        autoHeight
        rows={rows}
        columns={columns}
        pageSize={pageSize}
        disableSelectionOnClick
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        rowsPerPageOptions={[15, 25]}
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
