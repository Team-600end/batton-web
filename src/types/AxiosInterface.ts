import axios, {
  Axios,
  AxiosInstance,
  AxiosInterceptorManager,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";
import { APIResponse } from "@typess/ResponseInterface";
import { getCookie } from "@src/state/tokenState";
// import { getCookie, setCookie } from "@state/tokenState";


// axios instance without Auth
export const instanceNonAuth: AxiosInstance = axios.create({
  baseURL: "/api"
});

instanceNonAuth.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    console.log(error);
    return Promise.reject(error);
  }
)
instanceNonAuth.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    console.log(error);
    return Promise.reject(error);
  }
)


// Axios instance with Auth
export const instanceAuth: AxiosInstance = axios.create({
  baseURL: "/api",
  withCredentials: true,
});

// .common[]
instanceAuth.interceptors.request.use(
  function (config) {
    config.headers['Content-Type'] = 'application/json';
    // config.headers['Refresh-Token'] = cookies.refreshToken;
    console.log(getCookie('accessToken'));
    config.headers['Authorization'] = `Bearer ${getCookie('accessToken')}`
    return config;
  },
  function (error) {
    console.log(error);
    return Promise.reject(error);
  }
);

// 응답에 대한 리턴값 설정과 오류 발생에 대한 처리
instanceAuth.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (err) {
    // const originalConfig = err.config;
    console.log(err);
    if (err.response && err.response.data.status === "TokenExpired") {
      try {
        // // 기존에 쿠키에 저장된 refresh token을 가져옴
        // const refreshToken = await getCookie("refreshToken");
        // axios.defaults.headers.common["refreshToken"] = refreshToken;
		// 토큰을 다시 발급 받는 api 호출 함수 
        // refreshAccessToken();
      } catch (err: any) {
        console.log("error", err.response);
        // navigate("/");
      }
      return Promise.reject(err);
    }
    return Promise.reject(err);
  }
);


// const refreshAccessToken = async () => {
//   const response = await axios.post("http://localhost:8080/member/reissue", {
//     headers: { Authorization: "Bearer " + getCookie("accessToken"), RefreshToken: getCookie("refreshToken") },
//   });
// 	// response를 받고 header부분에 token을 받아서 쿠키에 담기 
//   const access_token = response.headers["authorization"];
//   setCookie("access_token", access_token, { path: "/", secure: false, httpOnly: false, sameSite: "none" }); 
// 	// 화면에 바로 반영이 안돼서 강제적으로 reload 시킴..?
//   // window.location.reload();
// };

// // GET
// export const get = async <T>(
//   url: string,
//   config?: AxiosRequestConfig
// ): Promise<APIResponse<T>> => {
//   try {
//     const response = await client.get<APIResponse<T>>(url, config);
//     return response.data;
//   } catch (error: any) {
//     alert("error");
//     throw new Error(error.message);
//   }
// };

// // POST
// export const postNonAuth = async <T>(
//   url: string,
//   data?: any,
//   config?: AxiosRequestConfig
// ): Promise<APIResponse<T>> => {
//   try {
//     const response = await instanceNonAuth.post<APIResponse<T>>(url, data, config);
//     return response.data;
//   } catch (error: any) {
//     throw new Error(error.message);
//   }
// };

// // PATCH 메서드
// export const patchData = async <T>(
//   url: string,
//   data?: any,
//   config?: AxiosRequestConfig
// ): Promise<APIResponse<T>> => {
//   try {
//     const response = await client.patch<APIResponse<T>>(url, data, config);
//     return response.data;
//   } catch (error: any) {
//     throw new Error(error.message);
//   }
// };

// // Delete 메서드
// export const deleteData = async <T>(
//   url: string,
//   config?: AxiosRequestConfig
// ): Promise<APIResponse<T>> => {
//   try {
//     const response = await client.delete<APIResponse<T>>(url, config);
//     return response.data;
//   } catch (error: any) {
//     throw new Error(error.message);
//   }
// };
