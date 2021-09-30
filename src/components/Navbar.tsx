import React from 'react';
import { Avatar, Typography, Menu } from 'antd';
import icon from '../images/cryptocurrency.png';
import { Link } from 'react-router-dom';
import { BulbOutlined, FundOutlined, HomeOutlined, MoneyCollectOutlined } from '@ant-design/icons';

interface NavbarProps {
    
}
 
const Navbar: React.FC<NavbarProps> = () => {
    return ( 
        <div className='nav-container'>
            <div className="logo-container">
                <Avatar src={icon} size='large' alt='icon'/>
                <Typography.Title level={2} className='logo'>
                    <Link to='/'>Cryptoverse</Link>
                </Typography.Title>
            </div>
            <Menu theme='dark'>
                <Menu.Item key={1} icon={<HomeOutlined/>}>
                    <Link to='/'>Home</Link>
                </Menu.Item>
                <Menu.Item key={2} icon={<FundOutlined/>}>
                    <Link to='/cryptocurrencies'>Cryptocurrencies</Link>
                </Menu.Item>
                <Menu.Item key={3} icon={<MoneyCollectOutlined/>}>
                    <Link to='/exchanges'>Exchanges</Link>
                </Menu.Item>
                <Menu.Item key={4} icon={<BulbOutlined/>}>
                    <Link to='/news'>News</Link>
                </Menu.Item>
            </Menu>
        </div>
    );
}
 
export default Navbar;