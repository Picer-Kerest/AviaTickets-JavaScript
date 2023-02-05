describe('Form', () => {
    it('When visiting the home page, the form is visible', () => {
        //    cy - ссылка на фреймворк
        cy.visit('http://localhost:9000/');
        //    Посещаем страницу
        cy.get('[data-hook=mainForm]').should('be.visible');
        //    Получаем форму по селектору. Лучше не использовать классы
        //    Лучше использовать уникальный id
        //    Вторым элементом идёт timeout - время, в течение которого будет поиск элемента
        //    be.visible - ключевая фраза
    });

    it('When typing a value into origin city autocomplete, this autocomplete is visible and has typed value', () => {
        cy.visit('http://localhost:9000/');
        cy.get('[data-hook=autocompleteOrigin]').as('autocompleteOrigin');
        cy.get('@autocompleteOrigin').should('be.visible');
        cy.get('@autocompleteOrigin').type('Псков');
        cy.get('@autocompleteOrigin').should('have.value', 'Псков');
    });

    it('When typing a value into destination city autocomplete, this autocomplete is visible and has typed value', () => {
        cy.visit('http://localhost:9000/');
        cy.get('[data-hook=autocompleteDestination]').as('autocompleteDestination');
        cy.get('@autocompleteDestination').should('be.visible');
        cy.get('@autocompleteDestination').type('Москва');
        cy.get('@autocompleteDestination').should('have.value', 'Москва');
    });

    it('When clicking on the depart datepicker the datepicker modal should opens', () => {
        cy.visit('http://localhost:9000/');
        cy.get('[data-hook=datePickerDepartInput]').as('datePickerDepartInput');
        cy.get('[data-hook=datePickerDepartWrap] .datepicker-container').as('modalWindow');
        // datePickerDepartWrap для того, чтобы найти там контейнер с окном выбора даты
        // .datepicker-container - контейнер datepicker
        cy.get('@datePickerDepartInput').click();
        cy.get('@modalWindow').should('be.visible');
        //    Выпадающее окно должно быть видимо
        //    Выпадающее окно - окно с выбором даты

    });

    it('After selecting the departing date, it should be displayed in the input field in the right format', () => {
    //    Лучше выбрать сегодняшнюю дату, чтобы не запутаться.
    //    У datepicker есть класс для сегодняшней даты.
    //    is-today is-selected Если выбрана сегодняшняя дата.
        cy.visit('http://localhost:9000/');
        cy.get('[data-hook=datePickerDepartInput]').as('datePickerDepartInput');
        cy.get('[data-hook=datePickerDepartWrap] .datepicker-container').as('modalWindow');
        cy.get('@datePickerDepartInput').click();
        cy.get('@modalWindow').should('be.visible');
        cy.get('[data-hook=datePickerDepartWrap] .datepicker-container .is-today').as('today');

        // cy.get('[data-hook=datePickerDepartInput]').as('datePickerDepartInput')

        cy.get('@today').click();
        cy.get('@today').should('have.class', 'is-selected');
        cy.get('[data-hook=datePickerDepartWrap] .datepicker-container .btn-flat').as('modalButtons');
        // Получаем все кнопки разом
        cy.get('@modalButtons').contains('Ok').click();
    //    trigger("click") === click() if error
    //    Если в кнопке содержится Ок, то кликаем

        cy.get('@datePickerDepartInput').then(($input) => {
            const val = $input.val();
            // .val() - текущее значение атрибута
            expect(val).to.match(/^\d{4}-\d{2}$/);
        //    to.match Для регулярных выражений
        });
    });

    it('When selecting the currency from the header dropdown it should be changed and visible in the header', () => {
        cy.visit('http://localhost:9000/');
        cy.get('[data-hook=currencySelect] .dropdown-trigger').as('currencyValue');
    //    Делаем alias на нажатие валюты.
        cy.get('[data-hook=currencySelect] .dropdown-content li').as('currencyItem')
        // Делаем alias на выпадающий список li-элементов, то есть элементов с выбором валют.
        cy.get('@currencyValue').click();
        // Кликаем на валюту.
        cy.get('@currencyItem').contains('€ Euro').click();
    //    Меняем валюту.
        cy.get('@currencyValue').should('have.value', '€ Euro');
    });
});