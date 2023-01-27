import {
    getAutocompleteInstance,
    getDatePickersInstance,
} from '../plugins/materialize';

class FormUI {
    constructor(AutocompleteInstance, DatePickersInstance) {
        /*
        _form - вся форма
        origin - инпут origin
        destination - инпут destination
        depart - инпут depart дата
        return - инпут return дата
        * */
        this._form = document.forms['locationControls'];
        this.origin = document.getElementById('autocomplete-origin');
        this.destination = document.getElementById('autocomplete-destination');
        this.depart = document.getElementById('datepicker-depart');
        this.return = document.getElementById('datepicker-return');

        // instance'ы из Materialize
        // originAutocomplete - instance из Materialize. Чтобы использовать методы из Materialize
        this.originAutocomplete = AutocompleteInstance(this.origin);
        this.destinationAutocomplete = AutocompleteInstance(this.destination);
        this.departDatePicker = DatePickersInstance(this.depart);
        this.returnDatePicker = DatePickersInstance(this.return);

    }

    get form() {
        return this._form;
    }

    get originValue() {
        return this.origin.value;
    //    Будет значение, которое туда записалось
    }

    get destinationValue() {
        return this.destination.value;
        //    Будет значение, которое туда записалось
    }

    get departDateValue() {
        return this.departDatePicker.toString();
        //    Применяется на экземпляре Materialize.
        //    Возвращает строковое представление выбранной даты
    }

    get returnDateValue() {
        return this.returnDatePicker.toString();
        //    Применяется на экземпляре Materialize.
        //    Возвращает строковое представление выбранной даты
    }

    setAutocompleteData(data) {
        // По умолчанию в autocomplete нет данных.
        // Здесь мы добавляем данные в autocomplete
        // Добавлется пара {'City, Country': null}. Null - аватарка
        this.originAutocomplete.updateData(data);
        this.destinationAutocomplete.updateData(data);
    }
}


const formUI = new FormUI(getAutocompleteInstance, getDatePickersInstance);

export default formUI;