import axios from "axios";
defaultConfig = {
  baseURL: "http://127.0.0.1:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
};
const axiosPublic = axios.create(defaultConfig);

const refreshToken = async () => {
  const JWT = JSON.parse(localStorage.getItem("JWT"));

  try {
    const response = await axiosPublic.post("/token/refresh", {
      refreshToken: session?.refresh,
    });
    const { JWT } = response.data;
    if (!JWT?.access) {
      // https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Operators/Optional_chaining
      localStorage.removeItem("JWT");
    }
    localStorage.setItem("JWT", JSON.stringify(JWT));
    return JWT;
  } catch (error) {
    localStorage.removeItem(JWT);
  }
};
// https://dev.to/franciscomendes10866/how-to-use-axios-interceptors-b7d

const axiosAuth = axios.create(defaultConfig);
axiosAuth.interceptors.request.use(
  async (config) => {
    const JWT = JSON.parse(localStorage.getItem("JWT"));
    if (JWT?.access) {
      config.headers = {
        ...config.headers,
        authorization: `Barear ${JwT?.access}`,
      };
    }

    return config;
  },
  (error) => Promise.reject(error)
);

axiosAuth.interceptors.response.use(
  (response) => response,
  async (error) => {
    const config = error?.config;
    if(error?.response?.status ===401 && !config?.sent){
      config.sent=true;
      const r
    }
  }
);
