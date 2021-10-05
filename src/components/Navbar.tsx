import React, { useState, useEffect } from 'react';
import { Avatar, Typography, Menu, Button } from 'antd';
import icon from '../images/cryptocurrency.png';
import { Link } from 'react-router-dom';
import { BulbOutlined, FundOutlined, HomeOutlined, MenuOutlined, MoneyCollectOutlined } from '@ant-design/icons';

interface NavbarProps {
    
}
 
const Navbar: React.FC<NavbarProps> = () => {
    
    const [activeMenu, setActiveMenu] = useState(true);
    const [screenSize, setScreenSize] = useState(0);

    useEffect(() => {
        const handleResize = () => setScreenSize(window.innerWidth);
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    },[]);

    useEffect(() => {
        if(screenSize < 768){
            setActiveMenu(false);
        }
        else{
            setActiveMenu(true);
        }
    },[screenSize]);

    return ( 
        <div className='nav-container'>
            <div className="logo-container">
                <Avatar src={icon} size='large' alt='icon'/>
                <Typography.Title level={2} className='logo'>
                    <Link to='/'>Cryptoverse</Link>
                </Typography.Title>
            </div>
            <Button className='menu-control-container' onClick={() => setActiveMenu(prev => !prev)}>
                <MenuOutlined />
            </Button>
            {activeMenu && (
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
            )}
        </div>
    );
}
 
export default Navbar;