import { useIsFocused, useNavigation } from "@react-navigation/core";
import axios from "axios";
import { useEffect } from "react";

const domain = "https://appgrupologis.com/";
const urlApi = `${domain}prod2023/app/managers/`;
// const urlApi = `${domain}prod/app/managers/`;
const urlSer = `${domain}services_app/Routes/`;

let cancelToken = axios.CancelToken.source();
const abortControllers = [];
// guardamos los servicios

// const axiosInstance = axios.create({
//   baseURL: "https://apps.grupologis.co/WsMovilApp/",
// });

// export default axiosInstance;

// Función para crear una solicitud y guardar el controlador de aborto
const getCreateRequest = async (url, signal) => {
  try {
    const response = await axios.get(url, { signal });
    return { status: true, data: response.data };
  } catch (error) {
    if (error.name === "CanceledError") {
      return { status: false, data: "limitExe" };
    } else {
      console.error(error);
      return { status: false, data: null };
    }
  }
};

const postCreateRequest = async (url, data, signal) => {
  try {
    const response = await axios.post(url, data, { signal });
    return { status: true, data: response.data };
  } catch (error) {
    if (error.name === "CanceledError") {
      return { status: false, data: "limitExe" };
    } else {
      console.error(error);
      return { status: false, data: null };
    }
  }
};

export const cancelarSolicitudesApi = async () => {
  abortControllers.forEach((controller) => {
    controller.abort();
  });
};

export const get = async (path, limit = "") => {
  const minSec = typeof limit == "number" ? limit : 20000;
  const controller = new AbortController();
  const signal = controller.signal;
  let isAborted = false;
  // Guarda el controlador en la matriz por si queremos cancelarlo
  abortControllers.push(controller);
  setTimeout(() => {
    controller.abort();
    isAborted = true;
  }, minSec); // 20 segundos = 20000

  const url = `${urlApi}${path}`;
  const result = await getCreateRequest(url, signal);

  if (isAborted) {
    return result; // Retorna el resultado sin mostrar la alerta si se abortó la solicitud
  } else if (result.status === false && result.data === "limitExe") {
    return { status: false, data: "abortUs" };
  }
  return result;
};

export const getDes = async (url) => {
  try {
    await axios.get(url);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const post = async (path, data, limit = "") => {
  const minSec = typeof limit == "number" ? limit : 20000;
  const controller = new AbortController();
  const signal = controller.signal;
  let isAborted = false;
  // Guarda el controlador en la matriz por si queremos cancelarlo
  abortControllers.push(controller);
  setTimeout(() => {
    controller.abort();
  }, minSec); // 20 segundos = 20000

  const url = `${urlApi}${path}`;
  const result = await postCreateRequest(url, data, signal);
  if (isAborted) {
    return result; // Retorna el resultado sin mostrar la alerta si se abortó la solicitud
  } else if (result.status === false && result.data === "limitExe") {
    return { status: false, data: "abortUs" };
  }

  return result;
};

export const getSer = async (path, limit = "") => {
  const minSec = typeof limit == "number" ? limit : 20000;
  const controller = new AbortController();
  const signal = controller.signal;
  let isAborted = false;
  // Guarda el controlador en la matriz por si queremos cancelarlo
  abortControllers.push(controller);
  setTimeout(() => {
    controller.abort();
  }, minSec); // 20 segundos = 20000

  const url = `${urlSer}${path}`;
  const result = await getCreateRequest(url, signal);
  if (isAborted) {
    return result; // Retorna el resultado sin mostrar la alerta si se abortó la solicitud
  } else if (result.status === false && result.data === "limitExe") {
    return { status: false, data: "abortUs" };
  }

  return result;
};

export const postSer = async (path, body, limit = "") => {
  const minSec = typeof limit == "number" ? limit : 20000;
  const controller = new AbortController();
  const signal = controller.signal;
  let isAborted = false;
  // Guarda el controlador en la matriz por si queremos cancelarlo
  abortControllers.push(controller);
  setTimeout(() => {
    controller.abort();
  }, minSec); // 20 segundos = 20000

  const url = `${urlSer}${path}`;
  const result = await postCreateRequest(url, body, signal);
  if (isAborted) {
    return result; // Retorna el resultado sin mostrar la alerta si se abortó la solicitud
  } else if (result.status === false && result.data === "limitExe") {
    return { status: false, data: "abortUs" };
  }

  return result;
};
