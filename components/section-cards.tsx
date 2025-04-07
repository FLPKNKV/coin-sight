"use client"

import { TrendingDownIcon, TrendingUpIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"

export function SectionCards() {
  const cardData = [
    {
      title: "Total Revenue",
      value: "$1,250.00",
      change: "+12.5%",
      trending: "up",
      message: "Trending up this month",
      description: "Visitors for the last 6 months",
    },
    {
      title: "New Customers",
      value: "1,234",
      change: "-20%",
      trending: "down",
      message: "Down 20% this period",
      description: "Acquisition needs attention",
    },
    {
      title: "Active Accounts",
      value: "45,678",
      change: "+12.5%",
      trending: "up",
      message: "Strong user retention",
      description: "Engagement exceed targets",
    },
    {
      title: "Growth Rate",
      value: "4.5%",
      change: "+4.5%",
      trending: "up",
      message: "Steady performance",
      description: "Meets growth projections",
    },
    {
      title: "Conversion Rate",
      value: "3.2%",
      change: "+0.8%",
      trending: "up",
      message: "Improving steadily",
      description: "Better than last quarter",
    },
    {
      title: "Churn Rate",
      value: "1.8%",
      change: "-0.5%",
      trending: "up",
      message: "Retention improving",
      description: "Customer satisfaction up",
    },
  ]

  return (
    <div className="px-4 lg:px-6">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {cardData.map((card, index) => (
            <CarouselItem key={index} className="pl-2 md:pl-4 sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
              <Card className="@container/card">
                <CardHeader className="relative">
                  <CardDescription>{card.title}</CardDescription>
                  <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
                    {card.value}
                  </CardTitle>
                  <div className="absolute right-4 top-4">
                    <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
                      {card.trending === "up" ? (
                        <TrendingUpIcon className="size-3" />
                      ) : (
                        <TrendingDownIcon className="size-3" />
                      )}
                      {card.change}
                    </Badge>
                  </div>
                </CardHeader>
                <CardFooter className="flex-col items-start gap-1 text-sm">
                  <div className="line-clamp-1 flex gap-2 font-medium">
                    {card.message}
                    {card.trending === "up" ? (
                      <TrendingUpIcon className="size-4" />
                    ) : (
                      <TrendingDownIcon className="size-4" />
                    )}
                  </div>
                  <div className="text-muted-foreground">{card.description}</div>
                </CardFooter>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="flex justify-end gap-2 mt-4">
          <CarouselPrevious className="relative inset-0 translate-y-0" />
          <CarouselNext className="relative inset-0 translate-y-0" />
        </div>
      </Carousel>
    </div>
  )
}

