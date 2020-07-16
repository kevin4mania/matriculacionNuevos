// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  //APIS
  URL_SERVICIOS_SEGURIDAD : 'http://192.168.1.119:10021/micro_seguridades/usuario',
  URL_SERVICIOS:'',
  URL_SERVICIOS_CORREO : 'http://172.20.68.122:8080/micro_sendMail-0.0.1/mail/sendBasic',

  //rango de paginacion
  rango : 10,


  //ID DE APLICACION DE LA BD
  idAplicacion: '43',
  //NOMBRE DE APLICACION
  nombreAplicaion:'matriculacionNuevos',

  production: false

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
