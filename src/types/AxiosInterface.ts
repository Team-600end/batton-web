import axios, {
  Axios,
  AxiosInstance,
  AxiosInterceptorManager,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";
import { APIResponse } from "@typess/ResponseInterface";
import { getCookie, setCookie } from "@state/tokenState";

// const navigate = useNavigate();

const axiosConfig: AxiosRequestConfig = {
  baseURL: 'BASE_URL'
}
const client: AxiosInstance = axios.create(axiosConfig);  // client: AxiosInstance

// interface CustomInstance extends AxiosInstance {
//     interceptors: {
//         request: AxiosInterceptorManager<AxiosRequestConfig>;
//         response: AxiosInterceptorManager<AxiosResponse<APIResponse>>;
//     };

//     getUri(config?: AxiosRequestConfig): string;
//     request<T>(config: AxiosRequestConfig): Promise<T>;
//     get<T>(url: string, config?: AxiosRequestConfig): Promise<T>;
//     delete<T>(url: string, config?: AxiosRequestConfig): Promise<T>;
//     head<T>(url: string, config?: AxiosRequestConfig): Promise<T>;
//     options<T>(url: string, config?: AxiosRequestConfig): Promise<T>;
//     post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
//     put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
//     patch<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
// }

// axios instance For non-Auth
// Login 요청의 경우, instance 호출시에 Cookie Method를 따로 호출해서 사용한다.
export const instanceNonAuth: AxiosInstance = axios.create({
  baseURL: "/api",
  // headers: {
  //   "content-type": "application/json; charset=UTF-8",
  //   // 백엔드 적용 필요
  //   // "Access-Control-Allow-Origin": `http://localhost:5173`,
  //   // 'Access-Control-Allow-Credentials': "true",
  // },
});

export const instanceAuth: AxiosInstance = axios.create({
  baseURL: "/api",
  headers: {
    "content-type": "application/json; charset=UTF-8",
    accept: "application/json,"
  },
  withCredentials: true,
});

// config에 header 설정을 하고, 요청에 대한 오류 발생시에는 오류 내용을 출력하고 전송 요청이 거절되도록 설정
// .common[]
instanceAuth.interceptors.request.use(
  function (config) {
    config.headers['Content-Type'] = 'application/json';
    config.headers['Authorization'] = `Bearer ${getCookie('access-token')}`
    // config.headers['Refresh-Token'] = getCookie('refresh-token')
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
        // 기존에 쿠키에 저장된 refresh token을 가져옴
        const refreshToken = await getCookie("refreshToken");
        axios.defaults.headers.common["refreshToken"] = refreshToken;
		// 토큰을 다시 발급 받는 api 호출 함수 
        refreshAccessToken();
      } catch (err: any) {
        console.log("error", err.response);
        // navigate("/");
      }
      return Promise.reject(err);
    }
    return Promise.reject(err);
  }
);

const refreshAccessToken = async () => {
  const response = await axios.post("http://localhost:8080/member/reissue", {
    headers: { Authorization: "Bearer " + getCookie("accessToken"), RefreshToken: getCookie("refreshToken") },
  });
	// response를 받고 header부분에 token을 받아서 쿠키에 담기 
  const access_token = response.headers["authorization"];
  setCookie("access_token", access_token, { path: "/", secure: false, httpOnly: false, sameSite: "none" }); 
	// 화면에 바로 반영이 안돼서 강제적으로 reload 시킴..?
  // window.location.reload();
};

// GET
export const get = async <T>(
  url: string,
  config?: AxiosRequestConfig
): Promise<APIResponse<T>> => {
  try {
    const response = await client.get<APIResponse<T>>(url, config);
    return response.data;
  } catch (error: any) {
    alert("error");
    throw new Error(error.message);
  }
};

// POST
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

// PATCH 메서드
export const patchData = async <T>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<APIResponse<T>> => {
  try {
    const response = await client.patch<APIResponse<T>>(url, data, config);
    return response.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// Delete 메서드
export const deleteData = async <T>(
  url: string,
  config?: AxiosRequestConfig
): Promise<APIResponse<T>> => {
  try {
    const response = await client.delete<APIResponse<T>>(url, config);
    return response.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
