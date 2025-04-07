"use client"

import { useEffect, useState } from "react"
import { TrendingUp, TrendingDown, RefreshCcw } from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Button } from "@/components/ui/button"
import { fetchCryptoData, fetchCryptoList } from "@/lib/crypto-service"

export function Coin() {
  const [selectedCoin, setSelectedCoin] = useState("bitcoin")
  const [chartData, setChartData] = useState([])
  const [coinList, setCoinList] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [priceChange, setPriceChange] = useState({ percentage: 0, isPositive: true })
  const [currentPrice, setCurrentPrice] = useState(0)
  const [timeRange, setTimeRange] = useState("30")
  const [selectedCoinData, setSelectedCoinData] = useState(null)
 
  const chartConfig = {
    price: {
      label: `${selectedCoinData?.name || selectedCoin} Price`,
      color: priceChange.isPositive ? "hsl(var(--chart-1))" : "hsl(var(--destructive))",
    },
  }

  useEffect(() => {
    const loadCoinList = async () => {
      try {
        const coins = await fetchCryptoList()
        setCoinList(coins)
        const initialCoin = coins.find((coin) => coin.id === selectedCoin)
        if (initialCoin) {
          setSelectedCoinData(initialCoin)
        }
      } catch (error) {
        console.error("Failed to fetch coin list:", error)
      }
    }

    loadCoinList()
  }, [])

  useEffect(() => {
    const loadCryptoData = async () => {
      setIsLoading(true)
      try {
        const data = await fetchCryptoData(selectedCoin, timeRange)
        setChartData(data.chartData)
        setPriceChange({
          percentage: data.priceChangePercentage,
          isPositive: data.priceChangePercentage >= 0,
        })
        setCurrentPrice(data.currentPrice)
        setIsLoading(false)
      } catch (error) {
        console.error("Failed to fetch crypto data:", error)
        setIsLoading(false)
      }
    }

    loadCryptoData()
  }, [selectedCoin, timeRange])

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: value > 100 ? 0 : value > 1 ? 2 : 4,
    }).format(value)
  }

  const handleRefresh = async () => {
    setIsLoading(true)
    try {
      const data = await fetchCryptoData(selectedCoin, timeRange)
      setChartData(data.chartData)
      setPriceChange({
        percentage: data.priceChangePercentage,
        isPositive: data.priceChangePercentage >= 0,
      })
      setCurrentPrice(data.currentPrice)
    } catch (error) {
      console.error("Failed to refresh data:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCoinChange = (coinId) => {
    setSelectedCoin(coinId)
    const coin = coinList.find((c) => c.id === coinId)
    if (coin) {
      setSelectedCoinData(coin)
    }
  }

  return (
    <div className="w-full flex flex-col bg-background">
      {/* Header */}
      <div className="p-4 border-b">
        <div className="w-full flex justify-between items-center">
          {/* Left side - Coin info */}
          <div className="flex items-center gap-3">
            {selectedCoinData?.image && (
              <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 bg-muted flex items-center justify-center">
                <img
                  src={selectedCoinData.image || "/placeholder.svg"}
                  alt={selectedCoinData.name}
                  className="w-8 h-8 object-contain"
                />
              </div>
            )}
            <div>
              <h1 className="text-2xl font-bold flex items-center gap-2">
                {selectedCoinData?.name || "Cryptocurrency"}
                <span className="text-sm font-normal text-muted-foreground">
                  {selectedCoinData?.symbol?.toUpperCase()}
                </span>
              </h1>
              <p className="text-muted-foreground">Track cryptocurrency price movements</p>
            </div>
          </div>

          {/* Right side - Controls */}
          <div className="flex items-center gap-2">
            <Select value={selectedCoin} onValueChange={handleCoinChange}>
              <SelectTrigger className="w-[130px]">
                <SelectValue>
                  {selectedCoinData && (
                    <div className="flex items-center gap-2">
                      <img
                        src={selectedCoinData.image || "/placeholder.svg"}
                        alt={selectedCoinData.name}
                        className="w-5 h-5 object-contain"
                      />
                      <span>{selectedCoinData.name}</span>
                    </div>
                  )}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {coinList.map((coin) => (
                  <SelectItem key={coin.id} value={coin.id} className="flex items-center gap-2 py-2">
                    <div className="flex items-center gap-2 w-full">
                      <div className="w-6 h-6 rounded-full overflow-hidden flex-shrink-0 bg-muted flex items-center justify-center">
                        <img
                          src={coin.image || "/placeholder.svg"}
                          alt={coin.name}
                          className="w-5 h-5 object-contain"
                        />
                      </div>
                      <div className="flex flex-col">
                        <span>{coin.name}</span>
                        <span className="text-xs text-muted-foreground">{coin.symbol.toUpperCase()}</span>
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[110px]">
                <SelectValue placeholder="Time Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">24 Hours</SelectItem>
                <SelectItem value="7">7 Days</SelectItem>
                <SelectItem value="30">30 Days</SelectItem>
                <SelectItem value="90">90 Days</SelectItem>
                <SelectItem value="365">1 Year</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon" onClick={handleRefresh} disabled={isLoading}>
              <RefreshCcw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
            </Button>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="w-full p-4">
        {isLoading ? (
          <div className="flex h-[300px] items-center justify-center">
            <RefreshCcw className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <div className="h-[300px] w-full">
            <ChartContainer config={chartConfig} className="h-full w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  accessibilityLayer
                  data={chartData}
                  margin={{
                    left: 20,
                    right: 20,
                    top: 20,
                    bottom: 20,
                  }}
                >
                  <CartesianGrid vertical={false} strokeDasharray="3 3" />
                  <XAxis
                    dataKey="date"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    tickFormatter={(value) => value}
                  />
                  <YAxis
                    tickFormatter={(value) => formatCurrency(value).split(".")[0]}
                    axisLine={false}
                    tickLine={false}
                    tickMargin={8}
                  />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent formatter={(value) => formatCurrency(value)} indicator="line" />}
                  />
                  <Area
                    dataKey="price"
                    type="monotone"
                    fill={`var(--color-price)`}
                    fillOpacity={0.4}
                    stroke={`var(--color-price)`}
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-4 border-t">
        <div className="w-full flex justify-between items-center">
          {/* Left side - Trending info */}
          <div className="grid gap-1">
            <div className="flex items-center gap-2 font-medium leading-none">
              {priceChange.isPositive ? (
                <>
                  Trending up by {Math.abs(priceChange.percentage).toFixed(2)}%
                  <TrendingUp className="h-4 w-4 text-green-500" />
                </>
              ) : (
                <>
                  Trending down by {Math.abs(priceChange.percentage).toFixed(2)}%
                  <TrendingDown className="h-4 w-4 text-red-500" />
                </>
              )}
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              Current price: {formatCurrency(currentPrice)}
            </div>
          </div>

          {/* Right side - Last updated */}
          <div className="text-sm text-muted-foreground">Last updated: {new Date().toLocaleTimeString()}</div>
        </div>
      </div>
    </div>
  )
}

