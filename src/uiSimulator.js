import { loadConfig } from './configManager.js';
import { TicketAutomata } from './automata.js';

const config = loadConfig();
const machine = new TicketAutomata(config);

// Elemen DOM
const routeSelect = document.getElementById('routeSelect');
const ticketCount = document.getElementById('ticketCount');
const moneyInput = document.getElementById('moneyInput');
const payBtn = document.getElementById('payBtn');
const output = document.getElementById('output');

// Isi dropdown rute
routeSelect.innerHTML = <option value="">-- Pilih --</option> + 
  config.routes.map(r => <option value="${r}">${r}</option>).join('');

  payBtn.addEventListener("click", () => {
    const route = routeSelect.value;
    const count = Number(ticketCount.value);
    const money = Number(moneyInput.value);
    const output = document.getElementById("output");
  
    output.innerText = "";
  
    if (!route || !count || !money) {
      output.innerText = "❗ Semua field harus diisi!";
      return;
    }
  
    if (count > 5) {
      output.innerText = "❌ Maksimal jumlah tiket yang bisa dibeli adalah 5.";
      return;
    }
  
    try {
      output.innerText += machine.transition(route) + "\n";
      output.innerText += machine.transition(count) + "\n";
      output.innerText += machine.transition(money) + "\n";
      output.innerText += machine.transition("print") + "\n";
    } catch (err) {
      output.innerText = "⚠️ Error: " + err.message;
    }
  });