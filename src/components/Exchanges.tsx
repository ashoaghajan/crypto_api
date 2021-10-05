import React from 'react';
import { useGetExchangesQuery } from '../services/cryptoApi';
import { Table } from 'antd';
import millify from 'millify';
import Loader from './Loader';
import HTMLReactParser from 'html-react-parser';

interface ExchangesProps {
    
}
 
const Exchanges: React.FC<ExchangesProps> = () => {

    const { data, isFetching } = useGetExchangesQuery({});
    const exchanges: Exchanges[] = data?.data?.exchanges;

    const dataSource = exchanges?.map((exchange, index) => ({
        key: exchange.id,
        exchanges: (
            <>  
                {index + 1}.
                <img className='crypto-image' style={{ width: 30, margin: '0 8px' }} alt={exchange.name} src={exchange.iconUrl} /> 
                {exchange.name}
            </>
        ),
        '24h_trade_volume': `$${millify(exchange.volume)}`,
        markets: millify(exchange.numberOfMarkets),
        change: `${millify(exchange.marketShare)}%`,
        description: HTMLReactParser(exchange.description || '')  
    }))
      
      const columns = [
        {
          title: 'Exchanges',
          dataIndex: 'exchanges',
          key: 'exchanges'
        },
        {
          title: '24h Trade Volume',
          dataIndex: '24h_trade_volume',
          key: '24h_trade_volume',
        },
        {
          title: 'Markets',
          dataIndex: 'markets',
          key: 'markets',
        },
        {
            title: 'Change',
            dataIndex: 'change',
            key: 'change',
        }
      ];
      
      
    if(isFetching) return <Loader />

    return ( 
        <Table dataSource={dataSource} columns={columns} 
          expandable={{
            expandedRowRender: exchange => exchange.description
          }}
        />
    );
}
 
export default Exchanges;
