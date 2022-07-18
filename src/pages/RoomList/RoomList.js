import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import httpServ from "../../services/http.service";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";

export default function RoomList() {
  const [data, setData] = useState([]);
  const [pageSize, setPageSize] = useState(15);
  const [selectedRows, setSelectedRows] = useState([]);

  const deleteRoom = async () => {
    let selectionFilter = selectedRows.map((item) => item.id);
    try {
      await Promise.all(
        selectedRows.map(async (item) => {
          let res = await httpServ.xoaPhongChoThue(item.id);
        })
      );
      setData(data.filter((item) => !selectionFilter.includes(item._id)));
      toast.success("Xóa thành công!");
    } catch {
      toast.error("Xóa không thành công!");
    }
  };
  const handleDelete = (_id) => {
    if (!selectedRows.length) {
      httpServ
        .xoaPhongChoThue(_id)
        .then((res) => {
          setData(data.filter((item) => item._id !== _id));
          toast.success("Xóa thành công!");
        })
        .catch((err) => toast.error("Xóa không thành công!"));
    } else {
      deleteRoom();
    }
  };

  useEffect(() => {
    httpServ
      .layDanhSachPhong()
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  // useEffect(() => {
  //   const layDanhSachPhongChoThue = async () => {
  //     const roomList = [];
  //     const locationList = await httpServ.layDanhSachViTri();

  //     await Promise.all(
  //       locationList.data.map(async (location) => {
  //         const res = await httpServ.layDanhSachPhongChoThueTheoViTri(
  //           location._id
  //         );
  //         roomList.push(
  //           ...res.data.map((room) => {
  //             return {
  //               ...room,
  //               locationId: { ...room.locationId, _id: location._id },
  //             };
  //           })
  //         );
  //       })
  //     );
  //     setData(roomList);
  //   };
  //   layDanhSachPhongChoThue();
  // }, []);
  console.log(data);
  const columns = [
    { field: "id", headerName: "Id", minWidth: 230 },
    {
      field: "name",
      headerName: "Location",
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
      field: "Province",
      headerName: "Province",
      minWidth: 300,
      flex: 1,
      renderCell: (params) => {
        return <span>{params.row?.location || "Unknown"}</span>;
      },
    },
    {
      field: "country",
      headerName: "Country",
      minWidth: 300,
      flex: 1,
      renderCell: (params) => {
        return <span>{params.row.country}</span>;
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
            <Link to={"/rooms/" + params.row.id + "/" + params.row.locationId}>
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
    name: item?.name,
    location: item?.locationId?.name,
    country: item?.locationId?.country,
    image: item?.image,
    // locationId: item?.locationId._id,
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
        // onPageChange={(b) => console.log(b)}
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
