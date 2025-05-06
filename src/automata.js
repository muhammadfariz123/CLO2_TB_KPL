export class TicketAutomata {
    constructor(config) {
      this.config = config;
      this.reset();
    }
  
    reset() {
      this.state = 'START';
      this.route = null;
      this.ticketCount = 0;
      this.totalPrice = 0;
    }
  
    transition(input) {
      switch (this.state) {
        case 'START':
          if (this.config.routes.includes(input)) {
            this.route = input;
            this.totalPrice = 0;
            this.state = 'ROUTE_SELECTED';
            return `Rute dipilih: ${input}\nState: ${this.state}`;
          }
          return '❌ Rute tidak valid.';
  
        case 'ROUTE_SELECTED':
          if (typeof input === 'number' && input > 0 && input <= this.config.maxTickets) {
            this.ticketCount = input;
            this.totalPrice = this.config.routesPrices[this.route] * input;
            this.state = 'TICKET_COUNT_SELECTED';
            return `Jumlah tiket: ${input}\nTotal Harga: Rp${this.totalPrice}\nState: ${this.state}`;
          }
          return `❌ Jumlah tiket tidak valid (max ${this.config.maxTickets}).`;
  
        case 'TICKET_COUNT_SELECTED':
          if (typeof input === 'number' && input >= this.totalPrice) {
            const change = input - this.totalPrice;
            this.state = 'PAID';
            return `💵 Pembayaran diterima: Rp${input}\n${
              change > 0 ? `Kembalian: Rp${change}` : 'Tidak ada kembalian'
            }\nState: ${this.state}`;
          }
          return `❌ Uang tidak cukup. Total: Rp${this.totalPrice}`;
  
        case 'PAID':
          if (input === 'print') {
            const result = `🧾 Tiket dicetak:\n- Rute: ${this.route}\n- Jumlah: ${this.ticketCount} tiket\nTerima kasih!`;
            this.reset();
            return result;
          }
          return "🔁 Masukkan 'print' untuk mencetak tiket.";
  
        default:
          return '⚠️ State tidak dikenali.';
      }
    }
  }
  