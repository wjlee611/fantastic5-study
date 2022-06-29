const BASE_URL = `https://api.coinpaprika.com/v1`;

export function fetchCoins() {
  return fetch(`${BASE_URL}/coins`).then((response) => response.json());
}

export async function fetchCoinInfo(coinId: string) {
  const response = await fetch(`${BASE_URL}/coins/${coinId}`);
  const json = await response.json();
  return json;
}

export async function fetchCoinTickers(coinId: string) {
  return await (await fetch(`${BASE_URL}/tickers/${coinId}`)).json();
}

export function fetchCoinHistory(coinId: string) {
  // const endDate = Math.floor(Date.now() / 1000);
  // const startDate = endDate - 60 * 60 * 24 * 7 * 3;  //3weeks data
  return fetch(
    `https://ohlcv-api.nomadcoders.workers.dev?coinId=${coinId}`
  ).then((response) => response.json());
}
