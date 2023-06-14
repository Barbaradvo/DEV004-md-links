import { existsSync } from "node:fs";
import {
  docIsAbsolute,
  docIsFile,
  readMD,
  extraerLinks,
  validarLinks,
} from "./api.js";
import { extname } from "node:path";

export const mdLinks = (route, options) => {
  return new Promise((resolve, reject) => {
    // Identifica si la ruta existe.
    if (existsSync(route)) {
      // const path = require('path');
      const docAbsolute = docIsAbsolute(route);
      console.log(docAbsolute, "ruta resuelta");
      if (
        docIsFile(docAbsolute) ===
        "Por el momento solo leemos abosulutos, vuelve en unos meses"
      ) {
        reject(docIsFile(docAbsolute));
      } else {
        // resolve(docAbsolute)
        if (extname(docAbsolute) === ".md") {
          console.log("Archivo md Localizado");

          // enviar docabsolute  ala fn que leea el doc
        }
        readMD(docAbsolute).then((res) => {
          // console.log(res);
          const array3props = extraerLinks(res, docAbsolute);
          // console.table(array3props);
          validarLinks(array3props).then((algo) => {
            resolve(algo); // resolve 
          });
        });
      }
    } else {
      reject("la ruta no existe");
    }
  });
};

//mdLinks('carpetaconlinks.md').then((res)=>{
// console.log(res, '-----');
//}).catch((err)=>{
//  console.log(err, '');
//})
// expresion se resuelve como valor 
// statement no restorna valor .

mdLinks("README.md")
  .catch((err) => {
    console.log(err);
  })
  .then(console.log);

// si este archivo termina en .md es md)

//path1 = path.extname("hello.txt");
// console.log(path1)

// path2 = path.extname("readme.md");
// console.log(path2)

// // File with no extension
// // Returns empty string
// path3 = path.extname("fileDump")
// console.log(path3)

// // Extension name of the current script
// path6 = path.extname(__filename)
// console.log(path6)

// si no existe la ruta rechaza la promesa.

// mdLinks('C:/Users/barba/OneDrive/Documents/GitHub/DEV004-md-links/PRUEBA.MD');
// mdLinks('barbie.md').then((res)=>{
//   console.log(res, '-----');
// }).catch((err)=>{
//   console.log(err, '%%%%%');
// })

// mdLinks().then((res)=>{
//     console.log(res, '-----');
//   }).catch((err)=>{
//     console.log(err, '%%%%%');
//   })

//isAbsolute / statSync /path.resolve

// path.resolve( [...paths] )
// for(let link of links) {}