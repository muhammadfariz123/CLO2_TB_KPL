import { TicketAutomata } from '../automata.js';
import { loadConfig } from '../configManager.js';

console.log("=== Performance Test: TicketAutomata ===");
console.time('PerformanceTest');

const config = loadConfig();
const automata = new TicketAutomata(config);

automata.transition('A-B');
automata.transition(3);
automata.transition(15000);
automata.transition('print');

console.timeEnd('PerformanceTest');
