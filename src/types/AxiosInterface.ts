import axios, {
  Axios,
  AxiosInstance,
  AxiosInterceptorManager,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";
import { APIResponse } from "@typess/ResponseInterface";
import { getCookie } from "@src/state/tokenState";

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
const instanceNonAuth: Axios = axios.create({
  baseURL: "http://localhost:5173", // Frontend React BaseURL
  headers: {
    "Content-Type": "application/json",
  },
});

const instanceAuth: Axios = axios.create({
  baseURL: "http://localhost:5173",
  headers: {
    "Content-Type": "application/json",
    withCredentials: true,
  },
});

// config에 header 설정을 하고, 요청에 대한 오류 발생시에는 오류 내용을 출력하고 전송 요청이 거절되도록 설정
instanceAuth.interceptors.request.use(
  function (config) {
    config.headers['Content-Type'] = 'application/json';
    config.headers['Authorization'] = `Bearer ${getCookie('AccessToken')}`
    return config;
  },
  function (error) {
    console.log(error);
    return Promise.reject(error);
  }
);

// 응답에 대한 리턴값 설정과 오류 발생에 대한 처리
// 404, 503 등의 에러 코드에 대한 오류 처리를 위해서 별도로 errorController 생성
instanceAuth.interceptors.response.use(
  function (response) {
    console.log(response);
    return response.data.data;
  },
  function (error) {
    console.log(error);
    return;
  }
);

// GET
export const getData = async <T>(
  url: string,
  config?: AxiosRequestConfig
): Promise<APIResponse<T>> => {
  try {
    const response = await client.get<APIResponse<T>>(url, config);
    return response.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// POST
export const postData = async <T>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<APIResponse<T>> => {
  try {
    const response = await client.post<APIResponse<T>>(url, data, config);
    return response.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

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
