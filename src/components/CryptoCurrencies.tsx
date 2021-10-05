import React, { useEffect, useState } from 'react';
import millify from 'millify';
import { useGetCryptosQuery } from '../services/cryptoApi';
import { Card, Col, Input, Row } from 'antd';
import { Link } from 'react-router-dom';
import Loader from './Loader';

interface CryptoCurrenciesProps {
    simplified?: boolean
}
 
const CryptoCurrencies: React.FC<CryptoCurrenciesProps> = ({ simplified }) => {

    const count = simplified ? 10 : 100;
    const { data: cryptosList, isFetching } = useGetCryptosQuery(count);
    const cryptos: Currency[] = cryptosList?.data?.coins;
    const [filteredCryptos, setFilteredCryptos] = useState(cryptosList?.data?.coins);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const filteredData = cryptos?.filter((currency: Currency) => {
            return currency.name.toLowerCase().includes(searchTerm)
        });
        setFilteredCryptos(filteredData)
    },[searchTerm, cryptos]);

    if(isFetching) return <Loader />

    return ( 
        <>
        {!simplified && <div className='search-crypto'>
            <Input placeholder='Search Crypto Currency' value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}/>
        </div>}
        <Row gutter={[32, 32]} className='crypto-card-container'>
            {filteredCryptos?.map((currency: Currency) => (
                <Col key={currency.id} xs={24} sm={12} lg={6} className='crypto-card'>
                    <Link to={`/crypto/${currency.id}`}>
                        <Card 
                            title={`${currency.rank}. ${currency.name}`} 
                            extra={<img className='crypto-image' alt={currency.name} src={currency.iconUrl} />}
                            hoverable
                        >
                            <p>Price: {millify(Number(currency.price))}</p>
                            <p>Market Cap: {millify(Number(currency.marketCap))}</p>
                            <p>Dailty Change: {millify(Number(currency.change))}%</p>
                        </Card>
                    </Link>
                </Col>
            ))}
        </Row>
        </>
     );
}
 
export default CryptoCurrencies;
