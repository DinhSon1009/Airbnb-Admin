import Axios from "axios";
// import { store } from "../index";
import { DOMAIN, TOKEN_CYBERSOFT } from "../configURL/constants";
// import { setSpinnerEnd, setSpinnerStart } from "../redux/spinnerSlice";

import localStorageServ from "./localStorage.service";

class AxiosService {
  axios;
  axiosConfig;
  authService;
  constructor(params) {
    this.axios = Axios.create({
      baseURL: this.getBaseUrl(),
    });
    this.getAxiosConfig();
  }

  getBaseUrl() {
    return DOMAIN;
  }

  // domain production  => user
  // domain test => tester
  //  domain dev
  getAxiosConfig = (_token) => {
    // const token = _token ? _token : localStorageServ.accessToken.get();
    this.axiosConfig = {
      headers: {
        tokenByClass: TOKEN_CYBERSOFT,
        token:
          // localStorageServ.accessToken?.get() ||
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTdmNGQ3YzFkMjA5NjAwMWM1ZGY5M2QiLCJlbWFpbCI6InRodXlAZ21haWwuY29tIiwidHlwZSI6IkFETUlOIiwiaWF0IjoxNjU1MTg3MjM3fQ.HWgysvBgP2HTdlUntTa15t3_5mheT3fv0LEowcSjjm4",
        // Authorization: "bearer " + localStorageServ.accessToken?.get(),
      },
    };
  };

  removeAxiosConfig = () => {
    this.axiosConfig = {
      headers: {
        iKeapy: ``,
        "Content-Type": "application/json",
      },
    };
  };

  getMethod(uri, loading = true) {
    return this.handleFlow(this.axios.get(uri, this.axiosConfig), loading);
  }

  postMethod(uri, data, loading = true) {
    return this.handleFlow(
      this.axios.post(uri, data, this.axiosConfig),
      loading
    );
  }

  putMethod(uri, data, loading = true) {
    return this.handleFlow(
      this.axios.put(uri, data, this.axiosConfig),
      loading
    );
  }

  patchMethod(uri, data, loading = true) {
    return this.handleFlow(
      this.axios.patch(uri, data, this.axiosConfig),
      loading
    );
  }

  deleteMothod(uri, loading = true) {
    return this.handleFlow(this.axios.delete(uri, this.axiosConfig), loading);
  }

  handleFlow(method, loading = true) {
    // store.dispatch(setSpinnerStart());
    return new Promise((resolve, reject) => {
      method
        .then((res) => {
          setTimeout(() => {
            // store.dispatch(setSpinnerEnd());
          }, 2000);
          resolve({
            data: res.data,
            status: res.status,
            isSuccess: true,
          });
        })
        .catch((err) => {
          setTimeout(() => {
            // store.dispatch(setSpinnerEnd());
          }, 2000);
          // store.dispatch(setSpinnerEnd());
          this.handleError(err);
          reject({
            err: err,
          });
        });
    });
  }

  handleError = (err) => {
    const status = err.response?.status;
    switch (status) {
      // case 400:
      case 401:
      case 403:
      // window.location.assign("/login");
      //   break;
      // default:
      //   break;
    }
  };
  //
  axiosInstance = (req) => {
    this.axios(req, this.axiosConfig);
  };
}

const AxiosServ = new AxiosService();
export default AxiosServ;
