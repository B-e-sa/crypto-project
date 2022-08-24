import axios from 'axios'
import { useEffect, useState } from 'react'
import './Home.css'
import LeftBar from './LeftBar/LeftBar'

interface ICoin {
  market_cap_rank: "",
  id: "",
  image: "",
  name: "",
  symbol: ""
  current_price: number,
  market_cap: number,
  price_change_percentage_1h_in_currency: number,
  price_change_percentage_24h: number,
  price_change_percentage_7d_in_currency: number
}

const Home = () => {

  const [currency, setCurrency] = useState("usd")
  const [order, setOrder] = useState("market_cap_desc")
  const [page, setPage] = useState("1")
  const [coins, setCoins] = useState([])

  useEffect(() => {
    axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=${order}&per_page=100&page=${page}$sparkline=false&price_change_percentage=1h%2C7d`)
      .then((res) => {
        setCoins(res.data)
        console.log(res.data)
      })
  }, [order])

  const usdCurrencyConverter = (value: number): string => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumSignificantDigits: 10 }).format(value)
  }

  const changeOrder = () => {
    order === "market_cap_desc" ?
      setOrder("market_cap_asc")
      :
      setOrder("market_cap_desc")
  }

  return (
    <>
      <input type="text" />
      <table>
        <tbody>

          <tr>
            <th id='rank-header' onClick={changeOrder}> # </th>
            <th id='coin-header'>Coin</th>
            <th>Price</th>
            <th>1h</th>
            <th>24h</th>
            <th>7d</th>
            <th>Market Cap</th>
          </tr>

          {coins.map((coin: ICoin) =>
            <tr key={coin.id}>
              <td>{coin.market_cap_rank}</td>
              <td id='coin-container'>
                <img
                  src={coin.image}
                  alt={coin.name}
                  width="15px"
                  height="15px"
                />
                {coin.name}
                <span>{(coin.symbol).toUpperCase()}</span>
              </td>
              <td id='coin-price'>{usdCurrencyConverter(coin.current_price)}</td>
              <td>{coin.price_change_percentage_1h_in_currency && `${(coin.price_change_percentage_1h_in_currency).toFixed(1)}%`}</td>
              <td>{coin.price_change_percentage_24h && `${(coin.price_change_percentage_24h).toFixed(1)}%`}</td>
              <td>{coin.price_change_percentage_7d_in_currency && `${coin.price_change_percentage_7d_in_currency.toFixed(1)}%`}</td>
              <td>{usdCurrencyConverter(coin.market_cap)}</td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  )
}

export default Home