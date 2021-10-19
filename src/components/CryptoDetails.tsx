import React, { useState } from 'react';
import HTMLReactParser from 'html-react-parser';
import { useParams } from 'react-router';
import millify from 'millify';
import { Col, Row, Typography, Select } from 'antd';
import { MoneyCollectOutlined, DollarCircleOutlined, FundOutlined, ExclamationCircleOutlined, StopOutlined, 
    TrophyOutlined, CheckOutlined, NumberOutlined, ThunderboltOutlined } from '@ant-design/icons';
import { useGetCryptoDetailsQuery, useGetCryptoHistoryQuery } from '../services/cryptoApi';
import LineChart from './LineChart';
import Loader from './Loader';


interface CryptoDetailsProps {
    
}

const { Title, Text } = Typography;
const { Option } = Select;
 
const CryptoDetails: React.FC<CryptoDetailsProps> = () => {

    const params: any = useParams();
    const { coinId } = params;
    const [timePeriod, setTimePeriod] = useState('7d');
    const { data, isFetching } = useGetCryptoDetailsQuery(coinId);
    const history = useGetCryptoHistoryQuery({ coinId, timePeriod })?.data?.data;
    const details: CryptoDetails = data?.data?.coin;
  
    const time = ['24h', '7d', '30d', '1y', '5y'];

    const stats = [
      { title: 'Price to USD', value: `$ ${details?.price && millify(Number(details?.price))}`, icon: <DollarCircleOutlined /> },
      { title: 'Rank', value: details?.rank, icon: <NumberOutlined /> },
      { title: '24h Volume', value: `$ ${details?.volume && millify(details?.volume || 0)}`, icon: <ThunderboltOutlined /> },
      { title: 'Market Cap', value: `$ ${details?.marketCap && millify(details?.marketCap || 0)}`, icon: <DollarCircleOutlined /> },
      { title: 'All-time-high(daily avg.)', value: `$ ${millify(Number(details?.allTimeHigh.price || 0))}`, icon: <TrophyOutlined /> },
    ];
  
    const genericStats = [
      { title: 'Number Of Markets', value: details?.numberOfMarkets, icon: <FundOutlined /> },
      { title: 'Number Of Exchanges', value: details?.numberOfExchanges, icon: <MoneyCollectOutlined /> },
      { title: 'Aprroved Supply', value: details?.approvedSupply ? <CheckOutlined /> : <StopOutlined />, icon: <ExclamationCircleOutlined /> },
      { title: 'Total Supply', value: `$ ${millify(details?.totalSupply || 0)}`, icon: <ExclamationCircleOutlined /> },
      { title: 'Circulating Supply', value: `$ ${millify(details?.circulatingSupply || 0)}`, icon: <ExclamationCircleOutlined /> },
    ];

    if(isFetching) return <Loader />

    return ( 
        <Col className='coin-detail-container'>
            <Col className='coin-heading-container'>
                <Title level={2} className='coint-name'>
                    {details?.name} ({details?.slug}) Price
                </Title>
                <p>{details?.name} live price in US Dollar (USD). View value statistics, market cap and supply.</p>
            </Col>
            <Select defaultValue='7d' className='select-timeperiod' placeholder='Select Time Period'
                onChange={value => setTimePeriod(value)}>
                {time.map(date => (
                    <Option key={date} value={date}>{date}</Option>
                ))}    
            </Select>
            <LineChart details={details} history={history}/>
            <Col className='stats-container'>
                <Col className='coin-value-statistics'>
                    <Col className='coin-value-statistics-heading'>
                        <Title level={3} className='coin-details-heading'>
                            {details?.name} Value Statistics
                        </Title>
                        <p>An overview showing the stats of {details?.name}</p>
                    </Col>
                    {stats.map(({ icon, title, value }, index) => (
                        <Col key={index} className='coin-stats'>
                            <Col className='coin-stats-name'>
                                <Text>{icon}</Text>
                                <Text>{title}</Text>
                            </Col>
                            <Text className='stats'>{value}</Text>
                        </Col>     
                    ))}
                </Col>
                <Col className='other-stats-info'>
                    <Col className='coin-value-statistics-heading'>
                        <Title level={3} className='coin-details-heading'>
                            Other Statistics
                        </Title>
                        <p>An overview showing the stats of all crypto currencies</p>
                    </Col>
                    {genericStats.map(({ icon, title, value }, index) => (
                        <Col key={index} className='coin-stats'>
                            <Col className='coin-stats-name'>
                                <Text>{icon}</Text>
                                <Text>{title}</Text>
                            </Col>
                            <Text className='stats'>{value}</Text>
                        </Col>     
                    ))}
                </Col>
            </Col>
            <Col className='coin-desc-link'>
                <Row className='coin-desc'>
                    <Title level={3} className='coin-details-heading'>
                        What is {details?.name}
                    </Title>
                    {HTMLReactParser(details?.description || '')}
                </Row>
                <Col className='coin-links'>
                    <Title level={3} className='coin-details-heading'>
                        {details?.name} Links
                    </Title>
                    {details?.links.map((link, index) => (
                        <Row key={index} className='coin-link'>
                            <Title level={5} className='link-name'>
                                {link.type}
                            </Title>
                            <a href={link.url} target='_blank' rel='noreferrer'>
                                {link.name}
                            </a>
                        </Row>
                    ))}
                </Col>
            </Col>
        </Col>
     );
}
 
export default CryptoDetails;
