import AxiosServ from "./axios.service";

/* eslint-disable no-useless-constructor */
class HttpRequestService {
  constructor() {}

  layDanhSachNguoiDung = () => {
    const uri = `/api/users/pagination?skip=0&`;
    return AxiosServ.getMethod(uri);
  };
  xoaNguoiDung = (id) => {
    const uri = `/api/users/${id}`;
    return AxiosServ.deleteMothod(uri);
  };
  layThongTinChiTietNguoiDung = (id) => {
    const uri = `/api/users/${id}`;
    return AxiosServ.getMethod(uri);
  };
  capNhatNguoiDung = (id, data) => {
    const uri = `/api/users/${id}`;
    return AxiosServ.putMethod(uri, data);
  };
  capNhatAnhDaiDien = (data) => {
    const uri = "/api/users/upload-avatar";
    return AxiosServ.postMethod(uri, data);
  };
  taoTaiKhoan = (data) => {
    const uri = "/api/users";
    return AxiosServ.postMethod(uri, data);
  };
  layDanhSachVeTheoNguoiDung = (id) => {
    const uri = `/api/tickets/by-user?userId=${id}`;
    return AxiosServ.getMethod(uri);
  };
  xoaVe = (id) => {
    const uri = `/api/tickets/${id}`;
    return AxiosServ.deleteMothod(uri);
  };
  layDanhSachViTri = () => {
    const uri = `/api/locations`;
    return AxiosServ.getMethod(uri);
  };
  xoaVitri = (id) => {
    const uri = `/api/locations/${id}`;
    return AxiosServ.deleteMothod(uri);
  };
  layThongTinChiTietViTri = (id) => {
    const uri = `/api/locations/${id}`;
    return AxiosServ.getMethod(uri);
  };
  capNhatAnhViTri = (id, data) => {
    const uri = `/api/locations/upload-images/${id}`;
    return AxiosServ.postMethod(uri, data);
  };
  capNhatThongTinViTri = (id, data) => {
    const uri = `/api/locations/${id}`;
    return AxiosServ.putMethod(uri, data);
  };
  taoViTri = (data) => {
    const uri = `/api/locations`;
    return AxiosServ.postMethod(uri, data);
  };
  layDanhSachVe = () => {
    const uri = `/api/tickets`;
    return AxiosServ.getMethod(uri);
  };
  layDanhSachPhong = () => {
    const uri = "/api/rooms";
    return AxiosServ.getMethod(uri);
  };
  xoaPhongChoThue = (id) => {
    const uri = `/api/rooms/${id}`;
    return AxiosServ.deleteMothod(uri);
  };
}

const httpServ = new HttpRequestService();

export default httpServ;
