interface WebsocketJson {
  event: string;
  stats?: WebsocketStats;
  status?: string;
  console?: string;
}

interface WebsocketStats {
  memory_gigabytes: number;          // Memory in bytes (float64)
  memory_gigabytes_limit: number;    // Memory limit in bytes (float64)
  cpu_load: number;              // CPU load (float64)
  rx_kilobytes: number;              // RX bytes (int)
  rt_kilobytes: number;              // RT bytes (int)
  state: string;
  timestamp: number;             // Unix timestamp (int)
}