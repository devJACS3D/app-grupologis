import { get, getDes, post } from "./axiosInstance";
import { decode, encode } from "base-64";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import * as Permissions from "expo-permissions";
import * as Sharing from "expo-sharing";
import React, { useContext } from "react";
import WebViewContext from "../context/webView/WebViewContext";

export function validatePhone(phone) {
  phone = phone.toString();
  return phone.length != 10 ? false : /^\d+$/.test(phone);
}

async function getToken(limit = "") {
  const path = "usuario/GetToken.php";
  const respToken = await get(path, limit);
  const { data, status } = respToken;
  if (status) {
    return { status: true, data: data.substring(5, data.length - 5) };
  } else {
    return { status: false, data };
  }
}

const getUTIFromExtension = (extension) => {
  switch (extension) {
    case "pdf":
      return "com.adobe.pdf";
    case "xls":
      return "com.microsoft.excel.xls";
    // Agrega más casos aquí para otras extensiones y UTIs correspondientes
    default:
      return null; // Retorna null si no se encuentra el UTI para la extensión
  }
};

const getMimeFromExtension = (ext) => {
  switch (ext) {
    case "pdf":
      return "application/pdf";
    case "xls":
      return "application/vnd.ms-excel";

    default:
      return null;
  }
};

function reemplazarTildes(nombreArchivo) {
  const tildes = {
    á: "a",
    Á: "A",
    é: "e",
    É: "E",
    í: "i",
    Í: "I",
    ó: "o",
    Ó: "O",
    ú: "u",
    Ú: "U",
    ñ: "n",
    Ñ: "N",
    "/": "_",
    "\\": "_",
    "<": "_",
    ">": "_",
    "|": "_",
    "?": "_",
    "*": "_",
    '"': "_",
    "'": "_",
    "`": "_",
    "%": "_",
    "#": "_",
    "&": "_",
    $: "_",
    "!": "_",
    "@": "_",
    "+": "_",
    "=": "_",
    "^": "_",
    "[": "_",
    "]": "_",
    "(": "_",
    ")": "_",
    // Agrega más caracteres y sus reemplazos según tus necesidades
  };

  return nombreArchivo.replace(
    /[\u0080-\u024F]/g,
    (caracter) => tildes[caracter] || caracter
  );
}

const characteres = () => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const init = Array.from({ length: 5 }, () =>
    characters.charAt(Math.floor(Math.random() * characters.length))
  ).join("");
  const fin = Array.from({ length: 5 }, () =>
    characters.charAt(Math.floor(Math.random() * characters.length))
  ).join("");

  return [init, fin];
};

export async function fetchPost(path, body, limit = "") {
  const minSec = typeof limit == "number" ? limit : 20000;
  const token = await getToken(minSec);
  const carac = await characteres();
  if (token.status) {
    body += `&token=${token.data}`;
    const encodedBody = encode(body);
    const data = `value=${carac[0]}${encodedBody}${carac[1]}`;

    return await post(path, data, minSec);
  } else {
    return { status: false, data: token.data };
  }
}

export const downloadArchivoAndroid = async (base64, mime, name) => {
  try {
    name = name.replaceAll(" ", "_");
    name = reemplazarTildes(name);
    if (decodeURIComponent(escape(name))) {
      name = decodeURIComponent(escape(name));
    }
    name = reemplazarTildes(name);
    const fileUri = FileSystem.cacheDirectory + name;

    const data = `data:${mime};base64,${base64}`;
    const base64Code = data.split(`data:${mime};base64,`)[1];

    await FileSystem.writeAsStringAsync(fileUri, base64Code, {
      encoding: FileSystem.EncodingType.Base64,
    });
    await MediaLibrary.saveToLibraryAsync(fileUri);

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

// export const downloadArchivoAndroid = async (base64, mime, name) => {
//   try {
//     console.log("android");
//     const fileUri = FileSystem.cacheDirectory + name;

//     const data = `data:${mime};base64,${base64}`;
//     const base64Code = data.split(`data:${mime};base64,`)[1];

//     await FileSystem.writeAsStringAsync(fileUri, base64Code, {
//       encoding: FileSystem.EncodingType.Base64,
//     });

//     const uti =
//       mime === "application/pdf" ? "com.adobe.pdf" : "com.microsoft.excel.xls";
//     await Sharing.shareAsync(fileUri, {
//       mimeType: mime,
//       UTI: uti,
//     });

//     return true;
//   } catch (error) {
//     console.log(error);
//     return false;
//   }
// };

export const downloadArchivoIOS = async (base64, mime, name) => {
  try {
    name = name.replaceAll(" ", "_");
    name = reemplazarTildes(name);
    if (decodeURIComponent(escape(name))) {
      name = decodeURIComponent(escape(name));
    }
    name = reemplazarTildes(name);
    const downloadsDirectory = `${FileSystem.documentDirectory}Archivosapp/`;
    const fileUri = `${downloadsDirectory}${name}`;
    const base64Code = base64;

    // crea el directorio de descargas si no existe
    await FileSystem.makeDirectoryAsync(downloadsDirectory, {
      intermediates: true,
    });

    // escribe los datos en el archivo
    await FileSystem.writeAsStringAsync(fileUri, base64Code, {
      encoding: FileSystem.EncodingType.Base64,
    });

    const { status: mediaLibraryStatus } = await Permissions.getAsync(
      Permissions.MEDIA_LIBRARY
    );
    if (mediaLibraryStatus !== "granted") {
      console.log(
        "No se otorgó permiso para acceder a la biblioteca de medios"
      );
      alert("No se otorgó permiso para acceder a la biblioteca de medios");
      return false;
    }
    const fileExtension = name
      .substring(name.lastIndexOf(".") + 1)
      .toLowerCase();

    const uti = getUTIFromExtension(fileExtension);
    mime =
      mime == "application/octet-stream"
        ? getMimeFromExtension(fileExtension)
        : mime;
    // Leer el contenido del archivo guardado
    // const fileContent = await FileSystem.readAsStringAsync(fileUri, {
    //   encoding: FileSystem.EncodingType.Base64,
    // });

    const infoFile = {
      file: fileUri,
      mime: mime,
      uti: uti,
      status: true,
    };

    return infoFile;
    // return fileUriLocal;
  } catch (error) {
    console.log(error);
    return { status: false };
  }
};

/* 
codigo para compartir 
export const downloadArchivoIOS = async (base64, mime, name) => {
  try {
    name = name.replaceAll(" ", "_");
    name = decodeURIComponent(escape(name));
    name = reemplazarTildes(name);
    const downloadsDirectory = `${FileSystem.documentDirectory}Archivosapp/`;
    const fileUri = `${downloadsDirectory}${name}`;
    const base64Code = base64;

    // crea el directorio de descargas si no existe
    await FileSystem.makeDirectoryAsync(downloadsDirectory, {
      intermediates: true,
    });

    // escribe los datos en el archivo
    await FileSystem.writeAsStringAsync(fileUri, base64Code, {
      encoding: FileSystem.EncodingType.Base64,
    });

    const { status } = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);
    if (status !== "granted") {
      alert("No se otorgó permiso para acceder a la biblioteca de medios");
      return false;
    }

    const fileUriLocal = `${FileSystem.documentDirectory}Archivosapp/${name}`;

    // codigo para compartir archivo
    const fileExtension = name
      .substring(name.lastIndexOf(".") + 1)
      .toLowerCase();
    await Sharing.shareAsync(fileUriLocal, {
      mimeType: mime,
      UTI: getUTIFromExtension(fileExtension),
    });

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
*/
