import api from '../services/apiService';
import { formatDate } from '../helpers/date';

class Locations {
    constructor(api, helpers) {
        this.api = api;
        this.countries = null;
        this.cities = null;
        this.shortCities = {};
        this.lastSearch = {};
        this.airlines = {};
        this.formatDate = helpers.formatDate;
    //    Ссылка на функцию
    }
    async init() {
        const response = await Promise.all([
            this.api.countries(),
            this.api.cities(),
            this.api.airlines(),
        ]);

        const [countries, cities, airlines] = response;
        this.countries = this.serializeCountries(countries);
        this.cities = this.serializeCities(cities);
        this.shortCities = this.createShortCities(this.cities);
        this.airlines = this.serializeAirlines(airlines);
        return response;
    }

    getCityCodeByKey(key) {
        const city = Object.values(this.cities).find((item) => item.full_name === key);
        //    arr.find(function(item, index, array)
        return city.code;
    //    Мы берём значения городов. Проходимся по массиву словарей.
    //    Принимаем элемент и сравниваем, совпадает ли код, то есть 'City name, Country name'
    //    Возвращаем код города
    }

    getCityNameByCode(code) {
        // Получаем имя города по коду
        return this.cities[code].name;
    }

    getAirlineNameByCode(code) {
        // Получаем имя авиакомпании
        // code передаётся из результатов поиска билетов.
        return this.airlines[code] ? this.airlines[code].name : '';
    //    Если есть this.airlines[code], то возвращаем this.airlines[code].name.
    //    this.airlines[code] - экземпляр.
    //    Иначе возвращаем пустую строку
    }

    getAirlineLogoByCode(code) {
        // Получаем logo авиакомпании
        // code передаётся из результатов поиска билетов.
        return this.airlines[code] ? this.airlines[code].logo : '';
    }

    createShortCities(cities) {
        // Список для автокомплита. То есть для формы.
        // На входе будет объект объектов. И таких тысячи: {'City name, Country name': Объект города}
        // Object.entries => [key, value]
        // на выходе: 'City name, Country name': null
        return Object.entries(cities).reduce((acc, [key, city]) => {
            acc[city.full_name] = null;
            return acc;
        }, {})
    }

    serializeAirlines(airlines) {
        // Список авиакомпаний.
        // { Код компании: экземляр }
        return airlines.reduce((acc, item) => {
             item.logo = `http://pics.avs.io/200/200/${item.code}.png`;
        //    Добавляем в каждый элемент ключ logo
            item.name = item.name || item.name_translations.en;
            acc[item.code] = item;
            return acc;
        }, {})
    }

    serializeCountries(countries) {
    //    {     Country_code: {...}     }
        return countries.reduce((acc, country) => {
            acc[country.code] = country;
            // Код страны: объект страны
            return acc;
        }, {});
    }

    serializeCities(cities) {
        // {city_code: ключи экземляра города, полное имя, название страны}
        return cities.reduce((acc, city) => {
            const country_name = this.getCountryNameByCode(city.country_code);
            city.name = city.name || city.name_translations.en;
            const city_name = city.name || city.name_translations.en;
            // city_name равен имени города, если же его нет, тогда он равен name_translations.en
            const full_name = `${city_name}, ${country_name}`;
            acc[city.code] = {
                ...city,
                country_name,
                full_name,
            };
            return acc;
        }, {});
    }

    getCountryNameByCode(code) {
        //    {     Country_code: {...}     }
        // Возвращает название страны
        return this.countries[code].name;
    }

    // getCitiesByCountryCode(code) {
    //     return this.cities.filter(city => city.country_code === code);
    // }

    async fetchTickets(params) {
        const response = await this.api.prices(params);
        this.lastSearch = this.serializeTickets(response.data);
    }

    serializeTickets(tickets) {
        return Object.values(tickets).map(ticket => {
            return {
                ...ticket,
                origin_name: this.getCityNameByCode(ticket.origin),
                destination_name: this.getCityNameByCode(ticket.destination),
                airline_logo: this.getAirlineLogoByCode(ticket.airline),
                airline_name: this.getAirlineNameByCode(ticket.airline),
                departure_at: this.formatDate(ticket.departure_at, 'd MMMM yyyy HH:mm'),
                return_at: this.formatDate(ticket.return_at, 'd MMMM yyyy HH:mm'),
            //    https://date-fns.org/v2.29.3/docs/format
            //    Разделители можно ставить любые. Пробел, дефис, двоеточие
            };
        });
    }
}

const locations = new Locations(api, { formatDate });

export default locations;