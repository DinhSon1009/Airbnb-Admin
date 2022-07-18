import React, { useEffect, useState } from "react";
import httpServ from "../../services/http.service";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { DataGrid } from "@mui/x-data-grid";
import moment from "moment";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

export default function LocationRooms({ locationId }) {
  const [listData, setListData] = useState([]);
  const [pageSize, setPageSize] = useState(15);
  const [selectedRows, setSelectedRows] = useState([]);

  useEffect(() => {
    httpServ
      .layDanhSachPhongChoThueTheoViTri(locationId)
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
      field: "roomName",
      headerName: "Room Name",
      minWidth: 230,
      flex: 1,
    },
    {
      field: "image",
      headerName: "Ảnh",
      minWidth: 230,
      flex: 1,
      renderCell: (params) => {
        return (
          <div className="cellWithImg">
            <img className="cellImg" src={params.row.image} alt="avatar" />
            {params.row.name}
          </div>
        );
      },
    },

    {
      field: "delete",
      headerName: "Delete",
      minWidth: 160,
      flex: 1,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/rooms/" + params.row.id}>
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
  const rows = listData?.map((item) => ({
    id: item?._id,
    roomName: item?.name || "No information",
    image: item?.image,
  }));

  return (
    <div style={{ width: "100%" }}>
      <h1 className="title">User's Rooms</h1>
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
