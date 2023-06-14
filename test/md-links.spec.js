import { mdLinks } from '../index.js';
import { extraerLinks } from '../api.js';


describe ('extraerLinks', () => {
  
  it('Deberia traer los tres links', () => {
    expect(extraerLinks()).toBe(typeof Promise);
  });

  it('Debe rechazar cuando no tiene la info', () => {
    return extraerLinks('[motor de JavaScript V8 de Chrome](https://developers.google.com/v8/').catch((error) => {
expect (error).toBe("no hay links")
    })
  });
})

describe('mdLinks', () => {

 // it('should...', () => {
   // console.log('FIX ME!');
  //});

  it.skip('Deberia devolver una promesa', () => {
    expect(mdLinks()).toBe(typeof Promise); 
  });  //catch 
  it('Debe rechazar cuando el path no existe', () => {
  return mdLinks('[motor de JavaScript V8 de Chrome](https://developers.google.com/v8/').catch((error) => {
    expect(error).toBe('la ruta no existe');
  })

  });
});
