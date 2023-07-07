// Importar Cypress
import { cy, visit, get, contains, screenshot } from 'cypress';

// Función principal
describe('Pruebas de automatización', () => {
  it('Realiza búsqueda en Google', () => {
    // Visitar el sitio de Google
    visit('https://www.google.com');

    // Buscar la palabra "automatización"
    get('input[name="q"]').type('automatización').type('{enter}');
  });

  it('Obtener el enlace de Wikipedia', () => {
    // Encontrar el enlace de Wikipedia en los resultados de búsqueda
    get('.g').contains('Wikipedia').should('be.visible').click();
  });

  it('Comprobar el año del primer proceso automático', () => {
    // Buscar el texto que contiene el año del primer proceso automático
    contains('h2', 'Historia').parent().find('ul li').each((li) => {
      const text = li.text();
      if (text.includes('proceso automático')) {
        const year = text.match(/\d{4}/)[0];
        expect(parseInt(year)).to.be.greaterThan(0);
      }
    });
  });

  it('Capturar screenshot de la página de Wikipedia', () => {
    // Tomar un screenshot de la página actual
    screenshot();
  });
});
