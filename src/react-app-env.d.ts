/// <reference types="react-scripts" />

type GlobalStats = {
    base: string;
    limit: number;
    offset: number;
    order: string;
    total: number;
    total24hVolume: number;
    totalExchanges: number;
    totalMarketCap: number;
    totalMarkets: number
}

type Currency = {
    change: number,
    id: number,
    iconUrl: string,
    marketCap: number,
    name: string,
    price: string,
    rank: number
}

type News = {
    datePublished: string,
    description: string,
    image: { thumbnail: { contentUrl: string } },
    name: string,
    provider: [{ image: { thumbnail: { contentUrl: string } }, name: string }],
    url: string
}

type CryptoDetails = {
    allTimeHigh: { price: string, timestamp: number }
    approvedSupply: boolean,
    change: number,
    circulatingSupply: number,
    iconUrl: string,
    id: number,
    description: string,
    links: { name: string, type: string, url: string }[]
    marketCap: number,
    name: string,
    numberOfExchanges: number,
    numberOfMarkets: number,
    price: string,
    rank: number,
    totalSupply: number,
    slug: string,
    volume: number
}

type CoinHistory = {
    change: number,
    history: { price: string, timestamp: number }[]
}

type Exchanges = {
    description: string,
    iconUrl: string,
    id: number,
    marketShare: number,
    name: string,
    numberOfMarkets: number,
    rank: number,
    volume: number
}