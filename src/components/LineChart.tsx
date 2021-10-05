import React from 'react';
import { Col, Row, Typography } from 'antd';
import millify from 'millify';
import { Line } from 'react-chartjs-2';

interface LineChartProps {
    details: CryptoDetails,
    history: CoinHistory
}

const { Title } = Typography;
 
const LineChart: React.FC<LineChartProps> = ({ details, history }) => {

    const coinPrice = history?.history.map(item => item.price);
    const timestamp = history?.history.map(item => new Date(item.timestamp).toLocaleDateString());

    const data: any = {
        labels: timestamp,
        datasets: [{
            label: 'Price in USD',
            data: coinPrice,
            fill: false,
            backgroundColor: '#0071bd',
            borderColor: '#0071bd'
        }]
    };

    const options: any = {
        scales: {
            yAxes: [{
                ticks: { beginAtZero: true }
            }]
        }
    }

    return ( 
        <>
        <Row className="chart-header">
            <Title className='chart-title'>{details?.name} Price Chart</Title>
            <Col className='price-container'>
                <Title level={5} className='price-change'>{history?.change}%</Title>
                <Title level={5} className='current-price'>Current {details?.name} Price: $ {millify(Number(details?.price))}</Title>
            </Col>
        </Row>
        <Line data={data} options={options}/>
        </>
    );
}
 
export default LineChart;
