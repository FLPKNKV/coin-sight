"use server"

// This file contains functions to fetch cryptocurrency data from the CoinGecko API

export async function fetchCryptoList() {
  try {
    const response = await fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1",
      { next: { revalidate: 3600 } }, // Cache for 1 hour
    )

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }

    const data = await response.json()
    return data.map((coin) => ({
      id: coin.id,
      symbol: coin.symbol,
      name: coin.name,
      image: coin.image,
      current_price: coin.current_price,
      market_cap: coin.market_cap,
    }))
  } catch (error) {
    console.error("Error fetching crypto list:", error)
  }
}

export async function fetchCryptoData(coinId, days) {
  try {
    // Fetch historical market data
    const historyResponse = await fetch(
      `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=${days}`,
      { next: { revalidate: 300 } }, // Cache for 5 minutes
    )

    if (!historyResponse.ok) {
      throw new Error(`API error: ${historyResponse.status}`)
    }

    const historyData = await historyResponse.json()

    // Fetch current coin data
    const coinResponse = await fetch(
      `https://api.coingecko.com/api/v3/coins/${coinId}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false`,
      { next: { revalidate: 60 } }, // Cache for 1 minute
    )

    if (!coinResponse.ok) {
      throw new Error(`API error: ${coinResponse.status}`)
    }

    const coinData = await coinResponse.json()

    // Process price data for the chart
    const priceData = historyData.prices

    // Determine data point interval based on time range
    const interval = Number.parseInt(days) > 30 ? 24 : Number.parseInt(days) > 7 ? 12 : 4

    // Format the data for the chart
    const chartData = priceData
      .filter((_, index) => index % interval === 0) // Reduce data points for better visualization
      .map(([timestamp, price]) => {
        const date = new Date(timestamp)
        let formattedDate

        if (days === "1") {
          formattedDate = date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        } else if (days === "7") {
          formattedDate = date.toLocaleDateString([], { weekday: "short", hour: "2-digit" })
        } else {
          formattedDate = date.toLocaleDateString([], { month: "short", day: "numeric" })
        }

        return {
          date: formattedDate,
          price: price,
        }
      })

    // Get price change percentage
    const priceChangePercentage = coinData.market_data.price_change_percentage_24h

    return {
      chartData,
      priceChangePercentage,
      currentPrice: coinData.market_data.current_price.usd,
    }
  } catch (error) {
    console.error("Error fetching crypto data:", error)

    // Return mock data if the API fails
    const mockData = generateMockData(days)
    return {
      chartData: mockData.chartData,
      priceChangePercentage: mockData.priceChangePercentage,
      currentPrice: mockData.currentPrice,
    }
  }
}

// Generate mock data for fallback when API fails
function generateMockData(days) {
  const chartData = []
  const now = new Date()
  const daysNum = Number.parseInt(days)
  const startPrice = 30000 + Math.random() * 10000
  let currentPrice = startPrice

  for (let i = daysNum; i >= 0; i--) {
    const date = new Date(now)
    date.setDate(date.getDate() - i)

    // Random price fluctuation
    currentPrice = currentPrice * (0.98 + Math.random() * 0.04)

    let formattedDate
    if (days === "1") {
      formattedDate = date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    } else if (days === "7") {
      formattedDate = date.toLocaleDateString([], { weekday: "short" })
    } else {
      formattedDate = date.toLocaleDateString([], { month: "short", day: "numeric" })
    }

    chartData.push({
      date: formattedDate,
      price: currentPrice,
    })
  }

  const priceChangePercentage = (chartData[chartData.length - 1].price / chartData[0].price - 1) * 100

  return {
    chartData,
    priceChangePercentage,
    currentPrice: chartData[chartData.length - 1].price,
  }
}

