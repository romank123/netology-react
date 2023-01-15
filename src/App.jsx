import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Header from './components/Header/Header';
import Banner from './components/Banner/Banner';
import Footer from './components/Footer/Footer';

import CatalogItemPage from './pages/CatalogItemPage';
import CatalogPage from './pages/CatalogPage';
import CartPage from './pages/CartPage';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ContactsPage from './pages/ContactsPage';
import Page404 from './pages/Page404';

const links = [
  { name: 'Главная', route: '/', active: false },
  { name: 'Каталог', route: '/catalog', active: false },
  { name: 'О магазине', route: '/about', active: true },
  { name: 'Контакты', route: '/contacts', active: false },
];

const footerLinks = [
  { name: 'О магазине', route: '/about' },
  { name: 'Каталог', route: '/catalog' },
  { name: 'Контакты', route: '/contacts' },
];

const banner = {
  name: 'К весне готовы!',
  src: '/img/banner.jpg',
};

function App() {
  return (
    <>
      <Router>
        <Header links={links} />
        <main className="container">
          <div className="row">
            <div className="col">
              <Banner name={banner.name} src={banner.src} />
              <Switch>
                <Route exact path="/catalog" component={CatalogPage} />
                <Route exact path="/catalog/:id([0-9]+)?" component={CatalogItemPage} />
                <Route exact path="/about" component={AboutPage} />
                <Route exact path="/contacts" component={ContactsPage} />
                <Route exact path="/cart" component={CartPage} />
                <Route exact path="/" component={HomePage} />
                <Route component={Page404} />
              </Switch>
            </div>
          </div>
        </main>
        <Footer links={footerLinks} />
      </Router>
    </>
  );
}

export default App;
