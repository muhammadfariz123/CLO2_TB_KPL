import assert from 'assert';
import { TicketAutomata } from '../automata.js';
import { loadConfig } from '../configManager.js';

describe('TicketAutomata Unit Tests', () => {
  const config = loadConfig();
  const automata = new TicketAutomata(config);

  it('Harus berpindah ke ROUTE_SELECTED', () => {
    const result = automata.transition('A-B');
    assert.strictEqual(result, 'State: ROUTE_SELECTED');
  });

  it('Harus berpindah ke TICKET_COUNT_SELECTED', () => {
    const result = automata.transition(1);
    assert.strictEqual(result, 'State: TICKET_COUNT_SELECTED');
  });

  it('Harus berpindah ke PAID', () => {
    const result = automata.transition(5000);
    assert.strictEqual(result, 'State: PAID');
  });

  it('Harus mencetak tiket', () => {
    const result = automata.transition('print');
    assert.strictEqual(result, 'Printed 1 ticket(s) for A-B');
  });
});
