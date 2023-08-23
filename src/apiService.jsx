import axios from "axios";

const authService = {
  login: async (email, password) => {
    try {
      const response = await axios.post(
        "https://cryptolotteryapi.azurewebsites.net/api/user/login",
        {
          email,
          password,
        }
      );

      const token = response.data;
      localStorage.setItem("token", token);
      return token;
    } catch (error) {
      throw new Error(error.response.data);
    }
  },
};

const apiService = axios.create({
  baseURL: "https://cryptolotteryapi.azurewebsites.net/api/",
  headers: {
    "Content-Type": "application/json",
  },
});

apiService.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

const apiServicePublic = axios.create({
  baseURL: "https://cryptolotteryapi.azurewebsites.net/api/",
  headers: {
    "Content-Type": "application/json",
  },
});

// const apiService = { test
//     private: axios.create({
//         baseURL: 'https://cryptolotteryapi.azurewebsites.net/api/',
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     }),
//     public:
//         axios.create({
//             baseURL: 'https://cryptolotteryapi.azurewebsites.net/api/',
//             headers: {
//                 'Content-Type': 'application/json',
//             }
//         })
//     // Add more authentication-related methods (e.g., logout, register) as needed
// };

const downloadFile = async (endpoint) => {
  let fileName = "";
  await apiService.get(endpoint).then((response) => {
    const contentDispositionHeader = response.headers["content-disposition"];
    fileName = getFileNameFromHeader(contentDispositionHeader);
  });

  function getFileNameFromHeader(header) {
    const contentDisposition = header;
    const fileNameMatch = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/.exec(
      contentDisposition
    );
    if (fileNameMatch && fileNameMatch[1]) {
      const fileName = fileNameMatch[1].replace(/['"]/g, "");
      return fileName;
    }
    return null;
  }
  try {
    const response = await apiService.get(endpoint, {
      responseType: "blob",
    });
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();
  } catch (error) {
    console.error(error);
  }
};

export { apiService, authService, downloadFile };
