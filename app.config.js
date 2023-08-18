export default {
  expo: {
    // Otras opciones de configuración de Expo aquí
    ios: {
      icon: "./assets/icon-120.png",
      bundleIdentifier: "mglio.com",
      supportsTablet: true,
      // Reemplace esto con su identificador de paquete
      infoPlist: {
        CFBundleIconName: "icon-120", // Asegúrate de que "icon-120" sea el nombre correcto de tu icono
        NSPhotoLibraryUsageDescription:
          "Se requiere permiso para acceder la biblioteca multimedia para poder seleccionar las imagenes y establecerlas como perfil",
      },
    },
    android: {
      permissions: [
        "READ_EXTERNAL_STORAGE",
        "WRITE_EXTERNAL_STORAGE",
        "ACCESS_MEDIA_LOCATION",
        "MEDIA_LIBRARY",
        "INTERNET",
        "ACCESS_NETWORK_STATE",
      ],
      package: "app.react2023.grupologis", // Asegúrate de que tu nombre de paquete sigue la convención de Android
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
      versionCode: 2,
      // ... Resto de tu configuración Android ...
    },

    extra: {
      eas: {
        projectId: "00c0fd79-69a5-4fc0-9d1e-c64f5d218927",
      },
    },
  },
};
