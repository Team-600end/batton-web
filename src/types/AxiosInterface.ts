import axios, {
  AxiosInstance,
} from "axios";
import { getCookie, setCookie } from "@src/state/tokenState";

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
    console.log("======")
    console.log(response);
    return response;
  },
  async function (err) {
    const originalConfig = err.config;
    if (err.response && err.response.status == 401) {
      try {
        const refreshToken = await getCookie("refreshToken");
        axios.defaults.headers.common["refreshToken"] = refreshToken;
        refreshAccessToken();

        return instanceImageAuth.request(originalConfig);
      } catch (err: any) {
        console.log("error", err.response);
        // navigate("/");
      }
      return Promise.reject(err);
    } else if (err.response && err.response.status == 403) {
      console.log("거부 확인");
      // window.location.href = "*";
    }
    return Promise.reject(err);
  }
);

// Axios instance with Auth
export const instanceImageAuth: AxiosInstance = axios.create({
  baseURL: "/api",
  withCredentials: true,
});

// .common[]
instanceImageAuth.interceptors.request.use(
  function (config) {
    config.headers['Content-Type'] = 'multipart/form-data';
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
instanceImageAuth.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (err) {
    const originalConfig = err.config;
    console.log(err);
    if (err.response && err.response.data.status === "TokenExpired") {
      try {
        const refreshToken = await getCookie("refreshToken");
        axios.defaults.headers.common["refreshToken"] = refreshToken;
        refreshAccessToken();

        return instanceImageAuth.request(originalConfig);
      } catch (err: any) {
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

  window.location.reload();
};