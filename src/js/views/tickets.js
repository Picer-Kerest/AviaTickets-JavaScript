import currencyUI from './currency';

class TicketsUI {
    constructor(currency) {
        this.container = document.querySelector('.tickets-sections .row');
        this.currencySymbol = currency.getCurrencySymbol.bind(currency);
    //    .bind для того чтобы this указывал на currency, а не на tickets
    //    Биндим на экземпляр currency = currencyUI
    }

    renderTickets(tickets) {
    //    Вывод билетов
        this.clearContainer();

        if (!tickets.length) {
            this.showEmptyMsg();
            return;
        }

        let fragment = '';
        const currency = this.currencySymbol();
        tickets.forEach(ticket => {
            const template = TicketsUI.tickerTemplate(ticket, currency);
            fragment += template;
        })

        this.container.insertAdjacentHTML('afterbegin', fragment);
    }

    clearContainer() {
        // Отчистка контейнера
        this.container.innerHTML = '';
    }

    showEmptyMsg() {
    //    Вывод если билетов нет
        const template = TicketsUI.emptyMsgTemplate();
        this.container.insertAdjacentHTML('afterbegin', template);
    }

    static emptyMsgTemplate() {
    //    Выводит шаблон для пустого сообщения
        return `
        <div class="tickets-empty-res-msg">
            По вашему запросу билетов не найдено.
        </div>
        `
    }

    static tickerTemplate(ticket, currency) {
        //    Генерирует шаблон одного билета
        return `
        <div class="col s12 m6">
          <div class="card ticket-card">
        <div class="ticket-airline d-flex align-items-center">
          <img
        src="${ticket.airline_logo}"
        class="ticket-airline-img"
          />
          <span class="ticket-airline-name"
        >{ticket.airline_name}</span
          >
        </div>
        <div class="ticket-destination d-flex align-items-center">
          <div class="d-flex align-items-center mr-auto">
        <span class="ticket-city">${ticket.origin_name}</span>
        <i class="medium material-icons">flight_takeoff</i>
          </div>
          <div class="d-flex align-items-center">
        <i class="medium material-icons">flight_land</i>
        <span class="ticket-city">${ticket.destination_name}</span>
          </div>
        </div>
        <div class="ticket-time-price d-flex align-items-center">
          <span class="ticket-time-departure">${ticket.departure_at}</span>
          <span class="ticket-price ml-auto">${currency}${ticket.price}</span>
        </div>
        <div class="ticket-additional-info">
          <span class="ticket-transfers">Пересадок: ${ticket.transfers}</span>
          <span class="ticket-flight-number">Номер рейса: ${ticket.flight_number}</span>
        </div>
          </div>
        </div>
        `;
    }
}


const ticketsUI = new TicketsUI(currencyUI);

export default ticketsUI;