import React, { useState } from 'react';
import HTMLReactParser from 'html-react-parser';
import { useParams } from 'react-router';
import millify from 'millify';
import { Col, Row, Typography, Select } from 'antd';
import { MoneyCollectOutlined, DollarCircleOutlined, FundOutlined, ExclamationCircleOutlined, StopOutlined, 
    TrophyOutlined, CheckOutlined, NumberOutlined, ThunderboltOutlined } from '@ant-design/icons';
import { useGetCryptoDetailsQuery } from '../services/cryptoApi';


interface CryptoDetailsProps {
    
}

const { Title, Text } = Typography;
const { Option } = Select;
 
const CryptoDetails: React.FC<CryptoDetailsProps> = () => {

    const params: any = useParams();
    const { coinId } = params;
    const [timePeriod, setTimePeriod] = useState('7d');
    const { data, isFetching } = useGetCryptoDetailsQuery(coinId);
    const details: CryptoDetails = data?.data?.coin;
  
    const time = ['3h', '24h', '7d', '30d', '1y', '3m', '3y', '5y'];

    const stats = [
      { title: 'Price to USD', value: `$ ${details.price && millify(Number(details.price))}`, icon: <DollarCircleOutlined /> },
      { title: 'Rank', value: details.rank, icon: <NumberOutlined /> },
      { title: '24h Volume', value: `$ ${details.volume && millify(details.volume)}`, icon: <ThunderboltOutlined /> },
      { title: 'Market Cap', value: `$ ${details.marketCap && millify(details.marketCap)}`, icon: <DollarCircleOutlined /> },
      { title: 'All-time-high(daily avg.)', value: `$ ${millify(Number(details.allTimeHigh.price))}`, icon: <TrophyOutlined /> },
    ];
  
    const genericStats = [
      { title: 'Number Of Markets', value: details.numberOfMarkets, icon: <FundOutlined /> },
      { title: 'Number Of Exchanges', value: details.numberOfExchanges, icon: <MoneyCollectOutlined /> },
      { title: 'Aprroved Supply', value: details.approvedSupply ? <CheckOutlined /> : <StopOutlined />, icon: <ExclamationCircleOutlined /> },
      { title: 'Total Supply', value: `$ ${millify(details.totalSupply)}`, icon: <ExclamationCircleOutlined /> },
      { title: 'Circulating Supply', value: `$ ${millify(details.circulatingSupply)}`, icon: <ExclamationCircleOutlined /> },
    ];

    return ( 
        <Col className='coin-detail-container'>
            <Col className='coin-heading-container'>
                <Title level={2} className='coint-name'>
                    {details.name} ({details.slug}) Price
                </Title>
                <p>{details.name} live price in US Dollar (USD). View value statistics, market cap and supply.</p>
            </Col>
            <Select defaultValue='7d'>

            </Select>
        </Col>
     );
}
 
export default CryptoDetails;
