const fixture = require('../../scripts/fixture.js');
const startServer = require('../../server/src/index.js');
const BookModels = require('../../server/src/models/book.js');

let BASE_URL;
let server;

before(async (browser, done) => {
    server = await startServer();

    BASE_URL = `http://localhost:${server.address().port}`;
    done();
});

beforeEach(async (browser, done) => {
    await BookModels.Book.sync({ force: true });
    await fixture.initBooks();
    done();
});

after(() => {
    server.close();
});

describe('Home Test', () => {
    test('Deberia tener de titulo Bookli', browser => {
        browser
            .url(BASE_URL)
            .waitForElementVisible('body')
            .assert.titleContains('Bookli');
    });

    test('Deberia mostrar el logo de Bookli', browser => {
        browser
            .url(BASE_URL)
            .waitForElementVisible('body')
            .waitForElementVisible('.brand__logo')
            .assert.attributeContains(
                '.brand__logo',
                'src',
                '/assets/logo.svg'
            );
    });

    test('Deberia mostrar la lista de libros', browser => {
        browser
            .url(BASE_URL)
            .waitForElementVisible('body')
            .waitForElementVisible('.booklist .book')
            .assert.elementPresent('.booklist .book');
    });

    test('Deberia poder encontrar un libro por titulo', browser => {
        browser
            .url(BASE_URL)
            .waitForElementVisible('body')
            .waitForElementVisible('.booklist .book')
            .click('.search__input')
            .keys('Operaci')
            .pause(400)
            .expect.elements('.booklist .book')
            .count.to.equal(1);
    });

    test('Deberia mostrar un mensaje cuando no se encuentra un libro', browser => {
        browser
            .url(BASE_URL)
            .waitForElementVisible('body')
            .waitForElementVisible('.booklist .book')
            .click('.search__input')
            .keys('No existe')
            .pause(400);

        browser.expect.elements('.booklist .book').count.to.equal(0);
        browser.expect
            .element('.booklist.booklist--empty p')
            .text.to.equal(
                'Hmmm... Parece que no tenemos el libro que buscas.\nProba con otra busqueda.'
            );
    });
});

describe('Detail view', () => {
    test('Deberia mostrar boton para agregar a lista de lectura', browser => {
        browser
            .url(BASE_URL + '/detail/1')
            .waitForElementVisible('body')
            .waitForElementVisible('.book__actions [data-ref=addToList]');

        browser.expect
            .element('.book__actions [data-ref=addToList]')
            .text.to.equal('Empezar a leer');
    });

    test('Deberia mostrar boton para remover libro de la lista de lectura si el libro es parte de la lista de lectura', browser => {
        browser
            .url(BASE_URL + '/detail/1')
            .waitForElementVisible('body')
            .waitForElementVisible('.book__actions [data-ref=addToList]');

        browser
            .click('.book__actions [data-ref=addToList]')
            .pause(1000)
            .waitForElementVisible('.book__actions [data-ref=removeFromList]');

        browser.expect
            .element('.book__actions [data-ref=removeFromList]')
            .text.to.equal('Dejar de leer');
    });

    test('Deberia poder remover libro de la lista de lectura', browser => {
        browser
            .url(BASE_URL + '/detail/1')
            .waitForElementVisible('body')
            .waitForElementVisible('.book__actions [data-ref=addToList]');

        browser
            .click('.book__actions [data-ref=addToList]')
            .pause(400)
            .waitForElementVisible('.book__actions [data-ref=removeFromList]');

        browser.expect
            .element('.book__actions [data-ref=removeFromList]')
            .text.to.equal('Dejar de leer');

        browser
            .click('.book__actions [data-ref=removeFromList]')
            .pause(400)
            .waitForElementVisible('.book__actions [data-ref=addToList]');

        browser.expect
            .element('.book__actions [data-ref=addToList]')
            .text.to.equal('Empezar a leer');
    });

    test('Deberia poder finalizar un libro de la lista de lectura', browser => {
        browser
            .url(BASE_URL + '/detail/1')
            .waitForElementVisible('body')
            .waitForElementVisible('.book__actions [data-ref=addToList]');

        browser
            .click('.book__actions [data-ref=addToList]')
            .pause(400)
            .waitForElementVisible('.book__actions [data-ref=removeFromList]');

        browser.expect
            .element('.book__actions [data-ref=addToFinish]')
            .text.to.equal('Lo termine!');

        browser
            .click('.book__actions [data-ref=addToFinish]')
            .pause(400)
            .waitForElementVisible(
                '.book__actions [data-ref=removeFromFinish]'
            );

        browser.expect
            .element('.book__actions [data-ref=removeFromFinish]')
            .text.to.equal('Volver a leer');
    });
});

describe('features', () => {

    test('feature/#1: Acceso del icono a la pantalla principal', browser => {
      browser
          .url(BASE_URL)
          .waitForElementVisible('body')
          .assert.attributeContains(
              '.brand > a:nth-child(1)',
              'href',
              '/'
          );
    });

    test('feature/#2: Opacidad 0.8 de la portada del libro al pasar sobre el', browser => {
      browser
          .url(BASE_URL)
          .waitForElementVisible('body');
      browser.expect.element('a.book-link:nth-child(2) > div:nth-child(1) > div:nth-child(1)').to.have.css('opacity').which.equals('1');
      browser.moveToElement('a.book-link:nth-child(2) > div:nth-child(1) > div:nth-child(1)',10,10);
      browser.expect.element('a.book-link:nth-child(2) > div:nth-child(1) > div:nth-child(1)').to.have.css('opacity').which.equals('0.8');
    });
    
    test('feature/#3: Hacer click en el boton atras y volver', browser => {
      browser
          .url(BASE_URL + '/detail/1')
          .waitForElementVisible('body')
          .waitForElementVisible('.book__actions [data-ref=back]')
          .click('.book__actions [data-ref=back]')
          .pause(400);
        browser.assert.urlEquals(BASE_URL + '/');
    });

    test('feature/#4: Deberia poder agregar la calificacion a un libro en estado FINALIZADO ', browser => {
        browser
            .url(BASE_URL + '/detail/1')
            .waitForElementVisible('body')
            .waitForElementVisible('.book__actions [data-ref=addToList]');
        browser
            .click('.book__actions [data-ref=addToList]')
            .pause(400)
            .waitForElementVisible('.book__actions [data-ref=addToFinish]');
        browser
            .click('.book__actions [data-ref=addToFinish]')
            .pause(400)
            .waitForElementVisible('.rate'); 
        browser.waitForElementVisible('#astar2');
        browser 
            .click("#astar2")
            .pause(400);
        browser.expect
            .element('#rate')
            .text.to.equal('Este libro Podria ser peor');
    });
});

describe('Bugs', () => {
    test('bug/#2: Al hacer click en "Volver a leer", aparecen los botones "Dejar de leer" y "Lo termine!"', browser => {
        browser
            .url(BASE_URL + '/detail/1')
            .waitForElementVisible('body')
            .waitForElementVisible('.book__actions [data-ref=addToList]');
        browser
            .click('.book__actions [data-ref=addToList]')
            .pause(400)
            .waitForElementVisible('.book__actions [data-ref=addToFinish]');
        browser
            .click('.book__actions [data-ref=addToFinish]')
            .pause(400)
            .waitForElementVisible('.book__actions [data-ref=removeFromFinish]')
            .click('.book__actions [data-ref=removeFromFinish]')
            .pause(400);
        browser.expect.element('.book__actions [data-ref=removeFromList]').text.to.equal('Dejar de leer');
        browser.expect.element('.book__actions [data-ref=addToFinish]').text.to.equal('Lo termine!');
    });

    test('bug/#4: En la UI, en el detalle de un libro aparezca el país.', browser => {
        browser
            .url(BASE_URL + '/detail/1')
            .waitForElementVisible('body')
            .waitForElementVisible('#book__country');
        browser.expect.element('#book__country').text.to.equal('Pais 1');
    });

 test ('bug/#1: placeholder del libro no es vacío', browser => {
        browser
            .url(BASE_URL + '/')
            .waitForElementVisible('body')
            .waitForElementVisible('.search [data-ref=search]');

        browser.assert.domPropertyEquals('.search [data-ref=search]','placeholder','Título a buscar');
    });
});

