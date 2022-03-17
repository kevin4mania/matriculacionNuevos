// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  //APIS
  //URL_SERVICIOS:'http://192.168.1.119:10021/testApiMatVehNuevos',
  URL_SERVICIOS:'http://172.20.68.76:9080/apiMatVehNuevos',
  URL_SERVICIOS_CORREO : 'http://172.20.68.122:8080/micro_matriculacionMail-0.0.1/mailMatriculacion/sendBasic',
  URL_REPORTE:'http://192.168.1.119:10021/reporte_nuevos',
  // URL_SERVICIOS_DOCUMENTOS: 'http://186.47.204.228:10061/testapi_documentos',
  URL_SERVICIOS_DOCUMENTOS: 'http://172.20.68.52:9080/api_documentos',
  //rango de paginacion
  rango : 10,


  //ID DE APLICACION DE LA BD
  idAplicacion: '43',
  //URL DE APLICACION
  url:'http://localhost:4200/',
  //NOMBRE DE APLICACION
  nombreAplicaion:'matriculacionNuevos',
  //VERSION DE APP
  versionApp: 'v2.1',
  
  production: false,
  FILES_NOMBRE_TABLA:'MATFVH',
  FILES_NOMBRE_ESQUEMA:'XPAMTDRAV01',

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
