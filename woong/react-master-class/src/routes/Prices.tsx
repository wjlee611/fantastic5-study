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

function Price({ coinId }: ChartProps) {
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
          type="line"
          series={[
            {
              name: "Price",
              data: data?.map((price) => Number(price.close)) as number[],
            },
          ]}
          options={{
            theme: {
              mode: isDark ? "dark" : "light",
            },
            chart: {
              height: 500,
              width: 500,
              toolbar: {
                tools: {
                  download: false,
                  pan: false,
                },
              },
              background: "transpose",
            },
            grid: {
              show: false,
            },
            stroke: {
              curve: "smooth",
              width: 3,
            },
            yaxis: {
              show: false,
            },
            xaxis: {
              axisBorder: {
                show: false,
              },
              axisTicks: {
                show: false,
              },
              labels: {
                show: false,
              },
              categories: data?.map((price) => secToTime(price.time_close)),
              type: "datetime",
            },
            fill: {
              type: "gradient",
              gradient: {
                type: "vertical",
                gradientToColors: ["#54BAB9"],
                stops: [0, 100],
              },
            },
            colors: ["#F15412"],
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

export default Price;
