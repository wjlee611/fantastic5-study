import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atoms";

interface IHistorical {
  time_open: number;
  time_close: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  market_cap: number;
}
interface ChartProps {
  coinId: string;
}

function secToTime(sec: number) {
  return new Date(sec * 1000).toDateString();
}

function Chart({ coinId }: ChartProps) {
  const isDark = useRecoilValue(isDarkAtom);

  const { isLoading, data } = useQuery<IHistorical[]>(["ohlcv", coinId], () =>
    fetchCoinHistory(coinId)
  );
  return (
    <div>
      {isLoading ? (
        "Loading chart..."
      ) : (
        <ApexChart
          type="candlestick"
          series={[
            {
              name: "Price",
              data: data?.map((price) => {
                return {
                  x: new Date(price.time_close * 1000),
                  y: [
                    Number(price.open),
                    Number(price.high),
                    Number(price.low),
                    Number(price.close),
                  ],
                };
              }) as any,
            },
          ]}
          options={{
            theme: {
              mode: isDark ? "dark" : "light",
            },
            chart: {
              height: 500,
              width: 500,
              type: "candlestick",
              toolbar: {
                tools: {
                  download: false,
                  pan: false,
                },
              },
              background: "transpose",
            },
            xaxis: {
              categories: data?.map((price) => secToTime(price.time_close)),
              type: "datetime",
            },
            tooltip: {
              y: {
                formatter: (value) => `$${value.toFixed(3)}`,
              },
            },
          }}
        />
      )}
    </div>
  );
}

export default Chart;
