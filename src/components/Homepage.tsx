import React from 'react';
import millify from 'millify'; 
import { Col, Row, Statistic, Typography } from 'antd';
import { useGetCryptosQuery } from '../services/cryptoApi';
import { Link } from 'react-router-dom';
import CryptoCurrencies from './CryptoCurrencies';
import News from './News';

interface HomepageProps {
    
}

const { Title } = Typography;
 
const Homepage: React.FC<HomepageProps> = () => {

    const { data, isFetching } = useGetCryptosQuery({});
    const globalStats: GlobalStats = data?.data?.stats;

    if(isFetching) return <div>'Loading...'</div>

    return ( 
        <>
        <Title level={2} className='heading'>Global Crypto Status</Title>
        <Row>
            <Col span={12}>
                <Statistic title='Total Crypto currencies' value={globalStats.totalExchanges}/>
            </Col>
            <Col span={12}>
                <Statistic title='Total Exchanges' value={millify(globalStats.totalExchanges)}/>
            </Col>
            <Col span={12}>
                <Statistic title='Total Market Cap' value={millify(globalStats.totalMarketCap)}/>
            </Col>
            <Col span={12}>
                <Statistic title='Total 24h Volume' value={millify(globalStats.total24hVolume)}/>
            </Col>
            <Col span={12}>
                <Statistic title='Totel Markets' value={millify(globalStats.totalMarkets)}/>
            </Col>
        </Row>
        <div className='home-heading-container'>
            <Title level={2}  className='home-title'>Top 10 Crypto Currencies</Title>
            <Title level={3}  className='show-more'>
                <Link to='/cryptocurrencies'>Show more</Link>
            </Title>
        </div>
        <CryptoCurrencies simplified/>
        <div className='home-heading-container'>
            <Title level={2}  className='home-title'>Latest Crypto News</Title>
            <Title level={3}  className='show-more'>
                <Link to='/news'>Show more</Link>
            </Title>
        </div>
        <News simplified/>
        </>
     );
}
 
export default Homepage;
