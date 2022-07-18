import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import httpServ from "../../services/http.service";
import { toast } from "react-toastify";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { Link } from "react-router-dom";
import moment from "moment";

export default function TicketList() {
  const [data, setData] = useState([]);
  const [pageSize, setPageSize] = useState(15);
  const [selectedRows, setSelectedRows] = useState([]);
  const [deleteAction, setDeleteAction] = useState(false);

  const deleteTicket = async () => {
    try {
      await Promise.all(
        selectedRows.map(async (item) => {
          let res = await httpServ.xoaVe(item.id);
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
        .xoaVe(_id)
        .then((res) => {
          // console.log(res);
          toast.success("Xóa thành công!");
        })
        .catch((err) => toast.error("Xóa không thành công!"));
    } else {
      deleteTicket();
    }
    setDeleteAction(!deleteAction);

    setSelectedRows([]);
  };

  useEffect(() => {
    httpServ
      .layDanhSachVe()
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err));
  }, [deleteAction]);

  const columns = [
    { field: "id", headerName: "Ticket Id", minWidth: 120, flex: 1 },
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
      field: "roomName",
      headerName: "Room Name",
      minWidth: 230,
      flex: 1,
      renderCell: (params) => {
        return (
          <div className="cellWithImg">
            <img className="cellImg" src={params.row.image} alt="avatar" />
            {params.row.roomName}
          </div>
        );
      },
    },

    {
      field: "action",
      headerName: "Action",
      minWidth: 160,
      flex: 1,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/tickets/" + params.row.id}>
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

  const rows = data?.map((item) => ({
    id: item?._id,
    userId: item?.userId,
    checkIn: item?.checkIn,
    checkOut: item?.checkOut,
    roomName: item?.roomId?.name,
    image: item?.roomId?.image,
  }));

  return (
    <div style={{ width: "100%" }}>
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
