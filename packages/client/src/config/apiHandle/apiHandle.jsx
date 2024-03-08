import axios from "axios";
import dayjs from "dayjs";
// import jwt_decode from "jwt-decode";
import { VITE_APP_API_URL } from "../env_configs";
import { save_tokens_constant } from "../../utlis/constants";
import { exit_session } from "../../helper/exit_session";
// import { toast } from "react-toastify";

const api_url = VITE_APP_API_URL
export const baseURL = `${api_url}`;
export const apiHandle = axios.create({
  baseURL: `${baseURL}`,
});
apiHandle.defaults.timeout = 15000;

apiHandle.interceptors.request.use(async (req) => {
  // console.log(req?.headers);
  const auth_token = localStorage.getItem(save_tokens_constant) || null;
  if (auth_token) {
    req.headers.Authorization = `Bearer ${auth_token}`;
  }
  return req;
});



apiHandle.interceptors.response.use(
  (response) => {
    // Handle successful responses here
    // response.data

    return response;
  },
  (error) => {
    // Handle errors here
    // if(error.login_required){
    //   console.log("redirect");
    // }
    if (error.response.data.message === "Token should be passed in headers!") {
      // alert("asiud");
      // success_toast_message(
      //   "To perform actions you have to login first! (redirecting you to login page)"
      // );
      // setTimeout(() => {
      //   window.location.href = "/login";
      // }, 3000);
      // if (
      //   window.confirm(
      //     "To perform actions you have to login first! (by clicking ok you will be redirected to login)"
      //   ) === true
      // ) {
      //   window.location.href = "/login";
      // }
      let dialog = document.getElementById("dialog");
      dialog.innerHTML = ` <h3>Alert</h3>
      <p style="font-size:18px;">
        To perform actions you have to login first!
      </p>
      <div
        style="
          display: flex;
          flex-direction: row;
          justify-content:end;
          gap:20px
        "
      >
        <button     style="
          padding: 10px;
          font-size: 16px;
          cursor: pointer;
          background-color: #FE9316;
          color: white;
          border: none;
          border-radius:10px;
        " id="btnId" >Close</button>
        <button style="
        padding: 10px;
        font-size: 16px;
        cursor: pointer;
        background-color: #FE9316;
        color: white;
        border: none;
        border-radius:10px;
      " id="navigate" >Ok</button>
      </div>`;
      let btn = document.getElementById("btnId");
      btn.addEventListener("click", () => {
        dialog.close();
      });
      let navigate = document.getElementById("navigate");
      navigate.addEventListener("click", () => {
        dialog.close();
        window.location.href = "/login";
      });
      dialog.showModal();
    }
    if (error.response.data.message === "Invalid token") {
      exit_session();
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);
