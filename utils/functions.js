import React, { useContext } from "react";
import { Alert, Linking, PermissionsAndroid, Platform } from "react-native";

import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import * as Permissions from "expo-permissions";
import * as Sharing from "expo-sharing";

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

export async function fetchPost(path, body, limit = "") {
  const minSec = typeof limit == "number" ? limit : 20000;
  const token = await getToken(minSec);
  const carac = await characteres();
  if (token.status) {
    body += `&token=${token.data}`;
    const encodedBody = encode(body);
    const data = `value=${carac[0]}${encodedBody}${carac[1]}`;
    console.log("data", data);
    return await post(path, data, minSec);
  } else {
    return { status: false, data: token.data };
  }
}

const openAppSettings = () => {
  Linking.openSettings();
};

function getMediaLibraryPermission(isConf = true) {
  Alert.alert(
    "Permiso denegado",
    "Se requiere permiso para acceder la biblioteca multimedia y asi poder guardar los documentos que usted descargue desde la aplicación",
    [
      {
        text: "Aceptar",
        onPress: () => console.log("Botón Aceptar presionado"),
      },
      isConf && { text: "Ir a Configuración", onPress: openAppSettings },
    ]
  );
}

const showRestartAlert = () => {
  Alert.alert(
    "Reiniciar la aplicación",
    "Es necesario reiniciar la aplicación para que los cambios de permisos surtan efecto.",
    [
      {
        text: "Aceptar",
        onPress: () => {},
      },
    ],
    { cancelable: false }
  );
};

// const checkStoragePermissionVerSup11 = async (uri) => {
//   // pedimos el permiso para acceder a un directorio especifico
//   const permi = await StorageAccessFramework.requestDirectoryPermissionsAsync(
//     uri
//   );
//   if (!permi.granted) {
//     getMediaLibraryPermission(false);
//     return null;
//   }
//   return permi.directoryUri;
// };

const checkStoragePermissionVerSup11 = async (uri) => {
  // pedimos el permiso para acceder a un directorio especifico
  // const permi = await StorageAccessFramework.requestDirectoryPermissionsAsync(
  //   uri
  // );
  // if (!permi.granted) {
  //   getMediaLibraryPermission(false);
  //   return null;
  // }

  // return permi.directoryUri;

  const { status } = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.ACTION_CREATE_DOCUMENT,
    {
      title: "Permission to create documents",
      message: "This permission is required to create documents.",
    }
  );
  console.log("permiso", status);
  if (status != "granted") {
    getMediaLibraryPermission(false);
    return false;
  }
  return true;
};

// const convertContentUriToFileUri = async (contentUri, name) => {
//   try {
//     console.log("entro 1");
//     const fileInfo = await FileSystem.getInfoAsync(contentUri);
//     console.log("fileInfo", fileInfo);
//   } catch (error) {
//     console.error(error);
//     return null;
//   }
// };

const checkStoragePermissionVerPost11 = async () => {
  if (Platform.OS === "android") {
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
  }
};

export const downloadArchivoAndroid = async (base64, mime, name) => {
  try {
    const version = parseInt(Platform.Version, 10);
    const downloadsDir = `${FileSystem.documentDirectory}Archivosapp/`;

    let fileUri = downloadsDir + name;

    // Crear la carpeta de Archivosapp si no existe
    await FileSystem.makeDirectoryAsync(downloadsDir, {
      intermediates: true,
    });

    let infoFile;
    if (version >= 30) {
      // await checkStoragePermissionVerSup11(downloadsDir);
      // fileUri = await convertContentUriToFileUri(direct, name);
      // console.log("fileUri", fileUri);
      // fileUri = direct + "/" + name;

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

      infoFile = {
        file: fileUri,
        mime: mime,
        uti: uti,
        status: true,
      };
    } else {
      // pedimos los permisos correspondente a la version
      await checkStoragePermissionVerPost11();

      await FileSystem.writeAsStringAsync(fileUri, base64, {
        encoding: FileSystem.EncodingType.Base64,
      });

      console.log("fileUri", fileUri);
      console.log("mime", mime);

      await MediaLibrary.createAssetAsync(fileUri, {
        MimeType: mime,
        filename: name,
      });

      infoFile = true;
    }

    // const fileExists = await FileSystem.getInfoAsync(destinationUri);
    // if (fileExists.exists) {
    //   console.log("El archivo existe:", destinationUri);
    // } else {
    //   console.log("El archivo no existe:", destinationUri);
    // }

    // await MediaLibrary.saveToLibraryAsync(fileUri);

    // await FileSystem.copyAsync({
    //   from: fileUri,
    //   to: destinationUri,
    // });

    // await MediaLibrary.create;
    return infoFile;
  } catch (error) {
    console.error(error);
    return false;
  }
};

// async function saveFileToDownloads() {
//   const fileUri = FileSystem.documentDirectory + "archivo.pdf"; // Ruta y nombre del archivo a guardar
//   const content = "Contenido del archivo PDF"; // Contenido del archivo que deseas guardar

//   try {
//     await FileSystem.writeAsStringAsync(fileUri, content);
//     const downloadsUri = FileSystem.documentDirectory + "Descargas/"; // Ruta a la carpeta de descargas
//     const newFileUri = downloadsUri + "archivo.pdf"; // Ruta y nombre del archivo en la carpeta de descargas

//     await FileSystem.moveAsync({ from: fileUri, to: newFileUri });
//     console.log("Archivo guardado en Descargas exitosamente");
//   } catch (error) {
//     console.log("Error al guardar el archivo:", error);
//   }
// }

// export const downloadArchivoAndroid = async (base64, mime, name) => {
//   let permReq;
//   try {
//     name = name.replaceAll(" ", "_");
//     name = reemplazarTildes(name);
//     if (decodeURIComponent(escape(name))) {
//       name = decodeURIComponent(escape(name));
//     }
//     name = reemplazarTildes(name);
//     const fileUri = FileSystem.cacheDirectory + name;

//     const data = `data:${mime};base64,${base64}`;
//     const base64Code = data.split(`data:${mime};base64,`)[1];

//     // Verificar los permisos antes de descargar el archivo
//     permReq = await checkStoragePermission();

//     await FileSystem.writeAsStringAsync(fileUri, base64Code, {
//       encoding: FileSystem.EncodingType.Base64,
//     });
//     await MediaLibrary.saveToLibraryAsync(fileUri);

//     return true;
//   } catch (error) {
//     console.log(error);
//     if (error.code == "ERR_PERMISSIONS") {
//       if (permReq) {
//         // reiniciar aplicacion
//         showRestartAlert();
//       } else {
//         getMediaLibraryPermission();
//       }
//     }
//     return false;
//   }
// };

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
