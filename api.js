import { isAbsolute, resolve } from "node:path";
import { statSync, readFile } from "node:fs";

// la ruta es absoluta

export const docIsAbsolute = (route) => {
  // console.log(isAbsolute('README.md'), '+++++++++'); //true
  if (isAbsolute(route) === false) {
    return resolve(route);
  } else {
    return route;
  }

  //isAbsolute(doc);
};

export const docIsFile = (route) => {
  let stats = statSync(route);

  // Use isFile() method to log the result to screen
  //console.log('is file ? ' + stats.isFile());
  if (stats.isFile(route) === false) {
    return "Por el momento solo leemos archivos, vuelve en unos meses";
  } else {
    return route;
  }
  // llamas funcion
  //export const existMd = (doc) => {

  //  if(path.extname(doc) === ".md"){
  //    console.log ("aqui hay un md");
  //     }
  //
};

// valide si doc es md

// dice que doc no esta definido
//const doc = "README.md"

export const readMD = (route) => {
  return new Promise((resolve, reject) => {
    readFile(route, "utf8", (err, data) => {
      if (err) {
        reject(err);
        console.log(err);
      } else {
        resolve(data);
      }
    });
  });
};
// Revela contenido
// console.log(readMD(doc) );
//readMD("README.md").then((res) => {
//    console.log(res);
//}).catch((err) => {
//  console.log(err);
// })

export const extraerLinks = (data, route) => {
  // console.log(data, route, '****');
  let regex = /(?=\[(!\[.+?\]\(.+?\)|.+?)]\((https:\/\/[^\)]+)\))/gi;
  let links = [...data.matchAll(regex)].map((m) => ({
    text: m[1],
    link: m[2],
    href: route,
  }));
  // console.log(links);
  return links;
};

export const validarLinks = (linksvalidados) => {
  const linksRetornados = linksvalidados.map((newlinks) => {
    return fetch(newlinks.link)
      .then((res) => {
        newlinks.status = res.status;
        if (res.status <= 299) {
          newlinks.mensaje = "ok";
        } else if (newlinks.status === "rejected") {
          newlinks.mensaje = "Fail";
        }
        return newlinks;
      })
      .catch((err) => {
        newlinks.mensaje = "Fail";
        newlinks.status = err.status || "Revisa tu link";
        return newlinks;
      });
  });
  // console.log(linksRetornados);
  return Promise.all(linksRetornados);
};

// console.logs para ver que te esta arrojando en cada linea
