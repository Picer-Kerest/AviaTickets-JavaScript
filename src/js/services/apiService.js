import axios from 'axios';
import config from "../config/apiConfig";


class Api {
    constructor(config) {
        this.url = config.url;
    }
    async countries() {
        try {
            const response = await axios.get(`${this.url}/countries`);
            // Здесь используются промисы
            return response.data;
        } catch (err) {
            console.log(err);
            return Promise.reject(err)
        }
    }
    async cities() {
        try {
            const response = await axios.get(`${this.url}/cities`);
            // Здесь используются промисы
            return response.data;
        } catch (err) {
            console.log(err);
            return Promise.reject(err)
        }
    }
    async airlines() {
        // Получаем авиакомпании
        try {
            const response = await axios.get(`${this.url}/airlines`);
            // Здесь используются промисы
            return response.data;
        } catch (err) {
            console.log(err);
            return Promise.reject(err)
        }
    }
    async prices(params) {
        // Получаем билеты по переданным параметрам
        try {
            const response = await axios.get(`${this.url}/prices/cheap`, {
                params,
            //    Ключ params - значение то, что мы передадим.
            //    params это то, что мы передадим в строку через ?
            //    В качестве параметров у нас params. Это объект.
            //    Внутри этого объекта 4 ключа, они будут подставлены в адресную строку
            });
            // Здесь используются промисы
            return response.data;
        } catch (err) {
            console.log(err);
            return Promise.reject(err)
        }
    }

}

const api = new Api(config);

export default api;