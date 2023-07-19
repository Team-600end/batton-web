// import axios, {
//   Axios,
//   AxiosInstance,
//   AxiosInterceptorManager,
//   AxiosRequestConfig,
//   AxiosResponse,
// } from "axios";
// import { APIResponse } from "@typess/ResponseInterface";

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

// // axios 인스턴스 생성
// const instanceNonAuth: Axios = axios.create({
//   baseURL: "http://localhost:5173", // Frontend React BaseURL
//   headers: {
//     "Content-Type": "application/json",
//     withCredentials: true,
//   },
// });

// const instanceAuth: Axios = axios.create({
//   baseURL: "http://localhost:5137",
// });

// // config에 header 설정을 하고, 요청에 대한 오류 발생시에는 오류 내용을 출력하고 전송 요청이 거절되도록 설정
// instanceAuth.interceptors.request.use(
//   function (config) {
//     config.headers["Content-Type"] = "application/json; charset=utf-8";
//     config.headers["Authorization"] = " 토큰 값";
//     return config;
//   },
//   function (error) {
//     console.log(error);
//     return Promise.reject(error);
//   }
// );

// // 응답에 대한 리턴값 설정과 오류 발생에 대한 처리
// // 404, 503 등의 에러 코드에 대한 오류 처리를 위해서 별도로 errorController 생성
// instanceAuth.interceptors.response.use(
//   function (response) {
//     console.log(response);
//     return response.data.data;
//   },
//   function (error) {
//     console.log(error);
//     return;
//   }
// );

// // //TODO: GET 메서드
// // export const getData = async <T>(
// //   url: string,
// //   config?: AxiosRequestConfig
// // ): Promise<APIResponse<T>> => {
// //   try {
// //     const response = await client.get<APIResponse<T>>(url, config);
// //     return response.data;
// //   } catch (error: any) {
// //     throw new Error(error.message);
// //   }
// // };

// // //TODO: POST 메서드
// // export const postData = async <T>(
// //   url: string,
// //   data?: any,
// //   config?: AxiosRequestConfig
// // ): Promise<APIResponse<T>> => {
// //   try {
// //     const response = await client.post<APIResponse<T>>(url, data, config);
// //     return response.data;
// //   } catch (error: any) {
// //     throw new Error(error.message);
// //   }
// // };

// // //TODO: PUT 메서드
// // export const putData = async <T>(
// //   url: string,
// //   data?: any,
// //   config?: AxiosRequestConfig
// // ): Promise<APIResponse<T>> => {
// //   try {
// //     const response = await client.put<APIResponse<T>>(url, data, config);
// //     return response.data;
// //   } catch (error: any) {
// //     throw new Error(error.message);
// //   }
// // };

// // //TODO: Delete 메서드
// // export const deleteData = async <T>(
// //   url: string,
// //   config?: AxiosRequestConfig
// // ): Promise<APIResponse<T>> => {
// //   try {
// //     const response = await client.delete<APIResponse<T>>(url, config);
// //     return response.data;
// //   } catch (error: any) {
// //     throw new Error(error.message);
// //   }
// // };
