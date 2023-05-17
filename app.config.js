export default ({
    expo: {
      // Otras opciones de configuración de Expo aquí
      ios: {
        icon: "./assets/icon-120.png",
        bundleIdentifier: "mglio.com",
        supportsTablet: true,
         // Reemplace esto con su identificador de paquete
        infoPlist: {
          CFBundleIconName: "icon-120",  // Asegúrate de que "icon-120" sea el nombre correcto de tu icono
        },
      },
      android: {
        package: "io.cordova.grupologis",  // Asegúrate de que tu nombre de paquete sigue la convención de Android
        // ... Resto de tu configuración Android ...
      },

      extra: {
        eas: {
          projectId: "00c0fd79-69a5-4fc0-9d1e-c64f5d218927"
        }
      }
    }
  });
  