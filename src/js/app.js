import '../css/style.css';
import locations from "./store/locations";
import './plugins';
// Берётся файл index.js и применяется тоже он
import formUI from './views/form';
import ticketsUI from './views/tickets';
import currencyUI from './views/currency';

document.addEventListener('DOMContentLoaded', () => {
    initApp();
    const form = formUI.form;

    // Events
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        onFormSubmit();
    })

    // Handlers
    async function initApp() {
        await locations.init();
    //    ждём пока загрузятся города/страны/связки

        formUI.setAutocompleteData(locations.shortCities)
    }

    async function onFormSubmit() {
    //    Собрать данные из инпутов
        const origin = locations.getCityCodeByKey(formUI.originValue);
        const destination = locations.getCityCodeByKey(formUI.destinationValue);
        const depart_date = formUI.departDateValue;
        // Такое название, потому что нужно их отправить с таким же названием для будущего запроса
        const return_date = formUI.returnDateValue;
    //    Формат данных, которые нужно отправить: код_города, код_города, 2019-09, 2019-10
        const currency = currencyUI.currencyValue;

        await locations.fetchTickets({
            origin,
            destination,
            depart_date,
            return_date,
            currency,
        //    Ключ - значение
        });
    }

    ticketsUI.renderTickets(locations.lastSearch);
})