import api, { Api } from '../apiService'
import config from '../../config/apiConfig'
import axios from 'axios'
import locationsInstance, {Locations} from "../../store/locations";
import {formatDate} from "../../helpers/date";

jest.mock('axios');

const cities = [{ country_code: 'UKR', name: 'Kharkiv', code: 'KH' }];

describe('Api service tests', () => {
    it('Check that api is instance of Api class', () => {
        expect(api).toBeInstanceOf(Api);
    });

    it('Success Api instance create', () => {
        const instance = new Api(config);
        expect(instance.url).toEqual(config.url);
    });

    it('Success fetch cities', async () => {
    //    У нас есть axios и get-запросы. Чтобы протестировать это
    //    Нужно сделать разовую имплементацию
    //    Фейковый ответ иначе говоря, в нашем случае get метода
    //    Делаем async для await
        axios.get.mockImplementationOnce(() => Promise.resolve({ data: cities }));
    //    Поле data, потому что return response.data в функции countries()
    //    mockImplementationOnce вызываем, потому что выше сделали mock
        await expect(api.cities()).resolves.toEqual(cities);
        expect(axios.get).toHaveBeenCalledWith(`${config.url}/cities`);
    //        Проверка на то, с какими аргументами был вызван метод get
    });

    it('Fetch cities failure', async () => {
        // Тест на ошибку
        const errMsg = 'Api Error';
        axios.get.mockImplementationOnce(() => Promise.reject(new Error(errMsg)));
        await expect(api.cities()).rejects.toThrow(errMsg);
    });
})

