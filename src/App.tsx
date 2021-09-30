import { Layout, Space, Typography } from "antd";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import { Homepage, Navbar, Exchanges, CryptoCurrencies, CryptoDetails, News  } from './components/components';

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <div className="navbar">
          <Navbar />
        </div>
        <div className="main">
          <Layout>
            <div className="routes">
              <Switch>
                <Route exact path='/'>
                  <Homepage />
                </Route>
                <Route exact path='/exchanges'>
                  <Exchanges/>
                </Route>
                <Route exact path='/cryptocurrencies'>
                  <CryptoCurrencies />
                </Route>
                <Route exact path='/crypto/:coinId'>
                  <CryptoDetails />
                </Route>
                <Route exact path='/news'>
                  <News />
                </Route>
              </Switch>
            </div>
          </Layout>
          <div className="footer">
            <Typography.Title level={5} style={{ color: 'white' }}>
              Cryptoverse <br />
              All rights reserved
            </Typography.Title>
            <Space>
              <Link to='/'>Home</Link>
              <Link to='/exchanges'>Exchanges</Link>
              <Link to='/news'>News</Link>
            </Space>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
