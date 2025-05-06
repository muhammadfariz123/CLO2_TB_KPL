export function loadConfig() {
    const configData = localStorage.getItem('ticketMachineConfig');
    if (configData) return JSON.parse(configData);
  
    // Simulasi load dari file
    const config = {
      routes: ['A-B', 'B-C', 'C-D'],
      routesPrices: {
        'A-B': 5000,
        'B-C': 7000,
        'C-D': 9000
      },
      maxTickets: 5
    };
  
    localStorage.setItem('ticketMachineConfig', JSON.stringify(config));
    return config;
  }