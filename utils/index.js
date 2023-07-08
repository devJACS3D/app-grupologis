import { Dimensions } from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const permisosImage = require("../assets/images/home/newsView/mano.png");
const incapacidadesImage = require("../assets/images/home/newsView/medico.png");
const vacacionesImage = require("../assets/images/home/newsView/vacacones.png");
const retirosImage = require("../assets/images/home/newsView/retiros.png");
const historiaLaboralImage = require("../assets/images/home/newsView/hlaboral.png");

const notificationType1 = require("../assets/images/components/notifications/state-1.png");
const notificationType2 = require("../assets/images/components/notifications/state-2.png");
const notificationType3 = require("../assets/images/components/notifications/state-3.png");
const notificationType4 = require("../assets/images/components/notifications/state-4.png");

const noticeImg = require("../assets/noticeImg.jpg");

const imgDownloadDocuments = require("../assets/images/home/banners/imgDownloadDocuments.png");

const imgBussines = require("../assets/images/auth/img-bussines-login.png");
const imgEmployee = require("../assets/images/auth/img-employee.png");
const loginImage = require("../assets/images/auth/login-img.png");
const employeeNimage = require("../assets/images/home/banners/imgEmployees.png");
const bannerTwo = require("../assets/images/home/banners/bannerTwo.png");
const bannerThree = require("../assets/images/home/banners/bannerTwo.png");
const bannerFour = require("../assets/images/home/banners/bannerFour.png");

export const getFontStyles = (
  size,
  ptPercentage = 0.6,
  lhPercentage = 0.75
) => {
  return {
    fontSize: size,
    lineHeight: size * lhPercentage,
    paddingTop: size - size * ptPercentage,
  };
};

export const fonts = {
  fontPrimaryLight: "Volks-Serial-Light",
};

export const colors = {
  light: "#ffff",
  white: "#FFFFFF",
  mainBackgroundColor: "#f0f0fd",
  generalBackgroundColor: "#F1F1FE",
  mainBlue: "#1A68FC",
  buttonsColor: "#999AF6",
  notificationsBackgroundColor: "#F1F1FE",
  formInputsColorBackground: "#F1F1FE",
  mainPink: "#D6007F",
  descriptionColors: "#808080",
  gray: "#CCCCCC",
  descarga: "#67C9B9",
  black: "#000000",
  lightGray: "#F7F7F7",
  darkGray: "#4E4848",
  yellow: "#FDA428",
  purpleIcons: "#9293F5",
  green: "#67C9B9",
  red: "#FF6B86",
  inputBackground: "#EBEBFF",
  stepGray: "#D9D9D9",
  boldRed: "#FF002E",
  boldGreen: "#00FF38",
  boldGray: "#989898",
  placeholderColor: "#989898",
  blueIndicator: "#1A68FC",
};

export const images = {
  loginImage: loginImage,
  colorLogo:
    "https://firebasestorage.googleapis.com/v0/b/grupologis-app.appspot.com/o/images%2FlogoColor.png?alt=media&token=cce21b6a-ad7d-4da4-9015-ec672632f72d",
  whiteLogo:
    "https://firebasestorage.googleapis.com/v0/b/grupologis-app.appspot.com/o/images%2FwhiteColor.png?alt=media&token=d506f814-bc0b-4f78-9b28-76460324332a",
  businessLoginImage: imgBussines,
  employeeLoginImage: imgEmployee,
  payrollFlyer:
    "https://firebasestorage.googleapis.com/v0/b/grupologis-app.appspot.com/o/images%2Ficons-sidebar-m-02.svg.png?alt=media&token=faad7c32-b792-4417-8cd8-bca82cf81f0e",
  certificadoImage3:
    "https://firebasestorage.googleapis.com/v0/b/grupologis-app.appspot.com/o/images%2Ficons-sidebar-m-03.svg.png?alt=media&token=0e81171e-bf75-48a7-b321-542940756328",
  certificadoImage4:
    "https://firebasestorage.googleapis.com/v0/b/grupologis-app.appspot.com/o/images%2FGrupo%2063.png?alt=media&token=0d6c5a70-2c24-42a3-aa79-46e8096b3ddc",
  employeeNimage: employeeNimage,
  bannerTwo: bannerTwo,
  bannerThree: bannerThree,
  bannerFour: bannerFour,
  checkImage:
    "https://firebasestorage.googleapis.com/v0/b/grupologis-app.appspot.com/o/images%2FcheckImage.png?alt=media&token=66e7b9e5-9079-4dc8-829a-ebff3d983334",
};

export const widthPercentageToPx = (percentage) => {
  return (windowWidth * percentage) / 100;
};

export const heightPercentageToPx = (percentage) => {
  return (windowHeight * percentage) / 100;
};

export const notificationInfo = [
  {
    id: "noti1",
    title: "Su solicitud de permiso ha sido enviada",
    description:
      "Recuerde estar pendiente a su correo para recibir la respuesta.",
    image: notificationType1,
  },
  {
    id: "noti2",
    title: "Su solicitud de permiso ha sido aprobada por empleador",
    description:
      "Recuerde estar pendiente a su correo para recibir la respuesta.",
    image: notificationType2,
  },
  {
    id: "noti3",
    title: "Su solicitud de permiso se está validando en Nómina",
    description:
      "Recuerde estar pendiente a su correo para recibir la respuesta.",
    image: notificationType3,
  },
  {
    id: "noti4",
    title: "Su solicitud de permiso ha sido completada con éxito",
    description:
      "Recuerde estar pendiente a su correo para recibir la respuesta.",
    image: notificationType4,
  },
];

export const notices = [
  {
    id: "noti1",
    title: "Titulo de dos lineas",
    description:
      "Recuerde estar pendiente a su correo para recibir la respuesta.",
    image: noticeImg,
  },
  {
    id: "noti2",
    title: "Titulo de dos lineas",
    description:
      "Recuerde estar pendiente a su correo para recibir la respuesta.",
    image: noticeImg,
  },
  {
    id: "noti3",
    title: "Titulo de dos lineas",
    description:
      "Recuerde estar pendiente a su correo para recibir la respuesta.",
    image: noticeImg,
  },
];

export const employeeDownloadables = [
  {
    id: "laboralCertificate",
    title: "Certificado laboral",
    description: "Descargar tu certificado laboral a un solo clic",
  },
  {
    id: "payrollFlyer",
    title: "Volante de nómina",
    description: "Descarga tu volante de nómina desde la App",
  },
  {
    id: "laboralCertificate2",
    title: "Ingreso y retención",
    description:
      "Descargar tu certificado laboral sin necesidad de pedirlo a Grupologis",
  },
  {
    id: "laboralCertificate3",
    title: "Hoja de vida laboral",
    description:
      "Descargar tu hoja de vida sin necesidad de pedirlo a Grupologis",
  },
  {
    id: "rincapacidad",
    title: "Registro de incapacidades",
    description: "Accede aquí al enlace para registrar tus incapacidades.",
  },
  {
    id: "adatos",
    title: "Actualizar mis de datos",
    description:
      "Mantén tus datos actualizados para que estás al día con noticias, cambios y novedades.",
  },
];
export const businessDownloadables = [
  {
    id: "humanResourcesIndicator",
    title: "Indicador de gestion humana",
    description: "Descarga tus indicadores de gestión humana desde la App",
  },
  {
    id: "generalPayroll",
    title: "Volante de nómina general",
    description: "Descarga tu volante de nómina desde la App",
  },
  // {
  //   id: "capacitations",
  //   title: "Capacitaciones",
  //   description: "Ahora puedes descargar tus capacitaciones desde la App",
  // },
  {
    id: "ausentism",
    title: "Ausentismos",
    description: "Ahora puedes descargar tus certificados desde la App",
  },
  {
    id: "hvida",
    title: "Hoja de vida",
    description: "Ahora puedes descargar las hojas de vida de tus empleados",
    //image: svg.
  },
  // {
  //   id: "ndiscip",
  //   title: "Reporte de novedades disciplinarias",
  //   description:
  //     "Accede aquí al enlace para registrar procesos disciplinarios.",
  // },
];
export const newsInfo = [
  {
    id: "permisos",
    title: "Permisos",
    image: permisosImage,
    description: "Solicita tus permisos y conoce el estado del tramite",
  },
  {
    id: "incapacidades",
    title: "Incapacidades",
    image: incapacidadesImage,
    description: "Solicita tus permisos y conoce el estado del tramite",
  },
  {
    id: "vacaciones",
    title: "Vacaciones",
    image: vacacionesImage,
    description: "Solicita tus permisos y conoce el estado del tramite",
  },
  {
    id: "retiros",
    title: "Retiros",
    image: retirosImage,
    description: "Solicita tus permisos y conoce el estado del tramite",
  },
  {
    id: "hlaboral",
    title: "Cambio historia laboral",
    image: historiaLaboralImage,
    description: "Solicita tus permisos y conoce el estado del tramite",
  },
];

export const employeeManagement = [
  {
    id: "novedai",
    title: "Orden de ingreso",
    description: "Ahora puedes generar una novedad de ingreso desde la App",
    // image: svg.
  },
  // {
  //   id: "maestroe",
  //   title: "Maestro empleado",
  //   description: "Ahora puedes descargar tu certificado de maestro empleado",
  //   // 2Enseguida pues en el avión por ahí abiertaimage: svg.
  // },
  {
    id: "capacit",
    title: "Capacitaciones",
    description: "Consulta las capacitaciones disponibles y sus estados.",
    // 2Enseguida pues en el avión por ahí abiertaimage: svg.
  },
  {
    id: "ndiscip",
    title: "Reporte de novedades disciplinarias",
    description:
      "Accede aquí al enlace para registrar procesos disciplinarios.",
  },
];

export const validDatesSup = (addYear) => {
  let actualDate = new Date();
  let currentYear = actualDate.getFullYear();
  let validYears = [];

  if (Array.isArray(addYear)) {
    validYears.push(...addYear);
  } else {
    validYears.push(addYear);
  }

  for (let i = currentYear; i <= currentYear + 10; i++) {
    validYears.push(i);
  }
  return {
    validYears,
    validMonths: [
      "Ene.",
      "Feb.",
      "Mar.",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Sept.",
      "Oct.",
      "Nov.",
      "Dic.",
    ],
  };
};

export const validDates = (addYear) => {
  let actualDate = new Date();
  let currentYear = actualDate.getFullYear();
  let validYears = [];

  if (Array.isArray(addYear)) {
    validYears.push(...addYear);
  } else {
    validYears.push(addYear);
  }

  for (let i = currentYear; i > currentYear - 10; i--) {
    validYears.push(i);
  }

  return {
    validYears,
    validMonths: [
      "Ene.",
      "Feb.",
      "Mar.",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Sept.",
      "Oct.",
      "Nov.",
      "Dic.",
    ],
  };
};

export const validCountry = () => {
  return {
    optionsCountry: [
      "Amazonas",
      "Antioquia",
      "Arauca",
      "San Andres y Providencia",
      "Atlántico",
      "Bogotá D.C.",
      "Bolívar",
      "Boyacá",
      "Caldas",
      "Caquetá",
      "Casanare",
      "Cauca",
      "Cesar",
      "Chocó",
      "Córdoba",
      "Cundinamarca",
      "Guainía",
      "Guaviare",
      "Huila",
    ],
  };
};

export const validCity = () => {
  return {
    optionsCity: [
      "Barranquilla",
      "Soledad",
      "Malambo",
      "Sabanalarga",
      "Puerto Colombia",
      "Galapa",
      "Baranoa",
      "Luruaco",
      "Santo Tomás",
      "Usiacurí",
    ],
  };
};

export const listAsuntoPQR = [
  { label: "TERMINACION DE CONTRATO", value: "TERMINACION DE CONTRATO" },
  { label: "CONTRATACION", value: "CONTRATACION" },
  { label: "ENVIO DE FACTURA", value: "ENVIO DE FACTURA" },
  { label: "SOPORTE DE FACTURA", value: "SOPORTE DE FACTURA" },
  {
    label: "INCONVENIENTES NOTAS CREDITO",
    value: "INCONVENIENTES NOTAS CREDITO",
  },
  { label: "SOLICITUD DE INFORMACION", value: "SOLICITUD DE INFORMACION" },
  {
    label: "ACTUALIZACION DE INFORMACION",
    value: "ACTUALIZACION DE INFORMACION",
  },
  { label: "PROCESOS DISCIPLINARIOS", value: "PROCESOS DISCIPLINARIOS" },
  { label: "INCONFORMIDAD PAGOS", value: "INCONFORMIDAD PAGOS" },
  {
    label: "PLANILLAS DE SEGURIDAD SOCIAL",
    value: "PLANILLAS DE SEGURIDAD SOCIAL",
  },
  {
    label: "INCONVENIENTES SEGURIDAD SOCIAL",
    value: "INCONVENIENTES SEGURIDAD SOCIAL",
  },
  { label: "SOPORTE DE AFILIACIONES", value: "SOPORTE DE AFILIACIONES" },
  { label: "FELICITACIONES", value: "FELICITACIONES" },
  { label: "COPIA DE CONTRATO", value: "COPIA DE CONTRATO" },
  { label: "PROCESO SELECCION ", value: "PROCESO SELECCION " },
  {
    label: "INCONFORMIDAD PROCESOS DE SELECCIÓN",
    value: "INCONFORMIDAD PROCESOS DE SELECCIÓN",
  },
  {
    label: "RETROALIMENTACION PROCESO DE CONTRATACION",
    value: "RETROALIMENTACION PROCESO DE CONTRATACION",
  },
  { label: "NOVEDADES NOMINA", value: "NOVEDADES NOMINA" },
  { label: "LIQUIDACIONES", value: "LIQUIDACIONES" },
  { label: "FALLAS APLICATIVOS", value: "FALLAS APLICATIVOS" },
  { label: "RETRASOS EXAMENES MEDICOS", value: "RETRASOS EXAMENES MEDICOS" },
  { label: "DEVOLUCION DE FACTURA", value: "DEVOLUCION DE FACTURA" },
  { label: "CAMBIO DE FACTURA", value: "CAMBIO DE FACTURA" },
  {
    label: "CONFIRMACION CERTIFICADO LABORAL",
    value: "CONFIRMACION CERTIFICADO LABORAL",
  },
  { label: "INASISTENCIA DE PERSONAL", value: "INASISTENCIA DE PERSONAL" },
  { label: "INFORMACION COVID 19", value: "INFORMACION COVID 19" },
  { label: "INFORMACION CESANTIAS", value: "INFORMACION CESANTIAS" },
  { label: "SEGUIMIENTO SST", value: "SEGUIMIENTO SST" },
  { label: "BIENESTAR", value: "BIENESTAR" },
  { label: "OTROS", value: "OTROS" },
  {
    label: "NOVEDADES DE NOMINA NO REPORTADA",
    value: "NOVEDADES DE NOMINA NO REPORTADA",
  },
  {
    label: "RETROALIMENTACION PROCESO DE SELECCION",
    value: "RETROALIMENTACION PROCESO DE SELECCION",
  },
  {
    label: "INCONVENIENTES CON AFILIACIONES",
    value: "INCONVENIENTES CON AFILIACIONES",
  },
  {
    label: "INCONFORMIDAD CON LA ATENCION O SERVICIO",
    value: "INCONFORMIDAD CON LA ATENCION O SERVICIO",
  },
  { label: "INCLUIR OTRO SI", value: "INCLUIR OTRO SI" },
  { label: "INCONFORMIDAD SST", value: "INCONFORMIDAD SST" },
  { label: "CUENTA BANCARIA N", value: "CUENTA BANCARIA N" },
];
