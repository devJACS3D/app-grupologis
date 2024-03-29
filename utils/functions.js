import React, { useContext } from "react";
import { Alert, Linking, PermissionsAndroid, Platform } from "react-native";

import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import * as Permissions from "expo-permissions";
import * as Sharing from "expo-sharing";
import * as ImageManipulator from "expo-image-manipulator";

import WebViewContext from "../context/webView/WebViewContext";
import { get, getDes, post } from "./axiosInstance";
import { decode, encode } from "base-64";

const { StorageAccessFramework } = FileSystem;

export function validatePhone(phone) {
  phone = phone.toString();
  return phone.length != 10 ? false : /^\d+$/.test(phone);
}
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

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

export async function fetchPost(path, body, limit = "", encodUri = false) {
  const minSec = typeof limit == "number" ? limit : 20000;
  const token = await getToken(minSec);
  const carac = await characteres();
  if (token.status) {
    body += `&token=${token.data}`;
    if (encodUri) {
      body = encodeURIComponent(body); // encripta como url
    }
    const encodedBody = encode(body); // encripta utf8
    const data = `value=${carac[0]}${encodedBody}${carac[1]}`;
    console.log("body", data);
    return await post(path, data, minSec);
  } else {
    return { status: false, data: token.data };
  }
}

const openAppSettings = () => {
  Linking.openSettings();
};

function getMediaLibraryPermission(isConf = true) {
  const msg =
    "Se requiere permiso para acceder la biblioteca multimedia y asi poder guardar los documentos que usted descargue desde la aplicación";
  Alert.alert(
    "Permiso denegado",
    Platform.OS === "ios"
      ? `${msg}, dandole el permiso a las fotos`
      : `${msg}.`,
    [
      {
        text: "Aceptar",
        onPress: () => console.log("Botón Aceptar presionado"),
      },
      isConf && { text: "Ir a Configuración", onPress: openAppSettings },
    ]
  );
}

const checkStoragePermissionVerPost11 = async () => {
  try {
    const { status } = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);
    if (status !== "granted") {
      getMediaLibraryPermission();
      return false;
    } else {
      return true;
    }
  } catch (err) {
    console.warn(err);
  }
};

export const downloadArchivoAndroid = async (base64, mime, name) => {
  try {
    name = name.replaceAll(" ", "_");
    name = reemplazarTildes(name);
    if (decodeURIComponent(escape(name))) {
      name = decodeURIComponent(escape(name));
    }
    name = reemplazarTildes(name);

    const version = parseInt(Platform.Version, 10);
    const downloadsDir = `${FileSystem.documentDirectory}Archivosapp/`;

    let fileUri = downloadsDir + name;

    // Crear la carpeta de Archivosapp si no existe
    await FileSystem.makeDirectoryAsync(downloadsDir, {
      intermediates: true,
    });

    if (version >= 30) {
      await FileSystem.writeAsStringAsync(fileUri, base64, {
        encoding: FileSystem.EncodingType.Base64,
      });

      const fileExtension = name
        .substring(name.lastIndexOf(".") + 1)
        .toLowerCase();

      const uti = getUTIFromExtension(fileExtension);
      mime =
        mime == "application/octet-stream"
          ? getMimeFromExtension(fileExtension)
          : mime;

      await Sharing.shareAsync(fileUri, {
        mimeType: mime,
        UTI: uti,
      });
    } else {
      // pedimos los permisos correspondente a la version
      await checkStoragePermissionVerPost11();

      await FileSystem.writeAsStringAsync(fileUri, base64, {
        encoding: FileSystem.EncodingType.Base64,
      });

      await MediaLibrary.createAssetAsync(fileUri, {
        MimeType: mime,
        filename: name,
      });
    }

    return true;
  } catch (error) {
    console.log(error);
    if (error.code == "ERR_PERMISSIONS") {
      getMediaLibraryPermission();
    }
    return false;
  }
};

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

    // pedimos el permiso para guardar el archivo
    // await checkStoragePermissionVerPost11();

    const fileExtension = name
      .substring(name.lastIndexOf(".") + 1)
      .toLowerCase();

    const uti = getUTIFromExtension(fileExtension);
    mime =
      mime == "application/octet-stream"
        ? getMimeFromExtension(fileExtension)
        : mime;

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

export const reduceImageQuality = async (base64) => {
  try {
    const manipResult = await ImageManipulator.manipulateAsync(base64, [], {
      compress: 0.2,
      format: ImageManipulator.SaveFormat.JPEG,
    });
    return manipResult.uri;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const htmlChatBot = `
<html>
  <body>
    <p>Hola</p>
    <script type="text/javascript" src="https://static.zdassets.com/ekr/snippet.js?key=e1180f20-f981-4a7b-bbc7-6a42560dd999"></script>

    <script type="text/javascript">
      window.zESettings = {
        webWidget: {
          chat: {
            zIndex: 10000
          }
        }
      };

      function openChat() {
        setTimeout(function() {
          zE("messenger", "open");
          alert('llego')
        }, 5000); // 5 segundos
      }

      openChat();
    </script>
      
  </body>
</html>
      `;
