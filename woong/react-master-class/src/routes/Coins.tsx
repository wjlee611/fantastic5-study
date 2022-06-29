import { Helmet } from "react-helmet";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { fetchCoins } from "../api";
import { isDarkAtom } from "../atoms";

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;
const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CoinsList = styled.ul``;
const Coin = styled.li`
  background-color: ${(props) => props.theme.cardBgColor};
  color: ${(props) => props.theme.textColor};
  padding: 20px;
  border: 1px solid white;
  border-radius: 15px;
  margin-bottom: 10px;
  transition: color 0.2s ease-out;
  display: flex;
  align-items: center;
  &:hover {
    color: ${(props) => props.theme.accentColor};
  }
  div {
    margin-top: 4px;
  }
`;

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;
const Loader = styled.span`
  text-align: center;
  display: block;
`;
const Img = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 20px;
`;

interface ICoin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}
function Coins() {
  const setIsDark = useSetRecoilState(isDarkAtom);
  const toggleDarkAtom = () => setIsDark((prev) => !prev);
  const { isLoading, data } = useQuery<ICoin[]>("allCoins", fetchCoins);
  // const [coins, setCoins] = useState<CoinInterface[]>([]);
  // const [loading, setLoading] = useState(true);
  // useEffect(() => {
  //   (async () => {
  //     const response = await fetch("https://api.coinpaprika.com/v1/coins");
  //     const json = await response.json();
  //     setCoins(json.slice(0, 100));
  //     setLoading(false);
  //   })();
  // }, []);

  return (
    <Container>
      <Helmet>
        <title>코인 Top 100</title>
      </Helmet>
      <Header>
        <Title>코인 Top 100</Title>
        <button onClick={toggleDarkAtom}>Toggle Mode</button>
      </Header>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <CoinsList>
          {data?.slice(0, 100).map((coin) => (
            <Link
              to={{
                pathname: `/${coin.id}`,
                state: { name: coin.name },
              }}
            >
              <Coin key={coin.id}>
                <Img
                  src={`https://cryptocurrencyliveprices.com/img/${coin.id}.png`}
                />
                <div>{coin.name} &rarr;</div>
              </Coin>
            </Link>
          ))}
        </CoinsList>
      )}
    </Container>
  );
}

export default Coins;
