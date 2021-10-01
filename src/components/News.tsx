import React, { useState } from 'react';
import moment from 'moment';
import { Typography, Select, Row, Col, Card, Avatar } from 'antd';
import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi';
import { useGetCryptosQuery } from '../services/cryptoApi';

interface NewsProps {
    simplified?: boolean
}

const { Text, Title } = Typography;
const { Option } = Select;
 
const News: React.FC<NewsProps> = ({ simplified }) => {

    const count = simplified ? 6 : 12;
    const demoImg = 'https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News';
    const [newsCategory, setNewsCategory] = useState<any>('Cryptocurrency');
    const { data: cryptoNews, isFetching } = useGetCryptoNewsQuery({ category: newsCategory, count });
    const { data: cryptosList } = useGetCryptosQuery(100);

    if(isFetching) return <div>'Loading...'</div>

    return ( 
        <Row gutter={[24, 24]}>
            {!simplified && (
                <Col span={24}>
                    <Select showSearch className='select-news' placeholder='Select a crypto' optionFilterProp='children'
                        value={newsCategory}
                        onChange={value => setNewsCategory(value)} 
                        filterOption={(input, option) => option?.children.toLowerCase().indexOf(input.toLocaleLowerCase()) >= 0}>
                            <Option value='Cryptocurrency'>Cryptocurrency</Option>
                            {cryptosList?.data?.coins.map((currency: Currency) => (
                                <Option key={currency.id} value={currency.name}>{currency.name}</Option>
                            ))}
                    </Select>
                </Col>
            )}
            {cryptoNews?.value?.map((news: News, index: number) => (
                <Col key={index} xs={24} sm={12} lg={8} xl={6}>
                    <Card hoverable className='news-card'>
                        <a href={news.url} target='_blank' rel='noreferrer'>
                            <div className='news-image-container'>
                                <Title className='news-title' level={4}>{news.name}</Title>
                                <img style={{ maxWidth: 200, maxHeight: 100 }} src={news.image?.thumbnail?.contentUrl || demoImg} alt="news" />
                            </div>
                            <p>
                                {news.description.length > 100 
                                    ? `${news.description.substring(0, 100)}...` 
                                    : news.description
                                }
                            </p>
                            <div className="provider-container">
                                <div>
                                    <Avatar src={news.provider[0]?.image?.thumbnail?.contentUrl || demoImg} alt=''/>
                                    <Text className='provider-name'>{news.provider[0]?.name}</Text>
                                </div>
                                <Text>{moment(news.datePublished).startOf('minute').fromNow()}</Text>
                            </div>
                        </a>
                    </Card>
                </Col>
            ))}
        </Row>
     );
}
 
export default News;
