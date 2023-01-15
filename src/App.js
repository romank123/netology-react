import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Catalog from './pages/Catalog/Catalog';
import Main from './pages/Main/Main';
import Page404 from './pages/404/Page404';
import About from './pages/About/About';
import Contacts from './pages/Contacts/Contacts';
import Cart from './pages/Cart/Cart';
import PageHeader from './components/header/PageHeader';
import PageMain from './components/main/PageMain';
import PageFooter from './components/footer/PageFooter';
import Banner from './components/banner/Banner';
import Product from './pages/Product/Product';
import useStorage from './hooks/useStorage';
import { setCartItems, setCartOwner } from './store/SliceCart';

export default function App() {
  const [cart, setCart] = useStorage(localStorage, 'cart', true);
  const [owner, setOwner] = useStorage(localStorage, 'owner', true);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCartItems(cart));
    dispatch(setCartOwner(owner));
  }, [dispatch, cart, owner]);

  return (
    <Router>
      <PageHeader />
      <PageMain>
        <Banner />
        <Routes>
          <Route
            path="/cart"
            element={<Cart setCart={setCart} setOwner={setOwner} />}
          />
          <Route path="/catalog/:id" element={<Product setCart={setCart} />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/about" element={<About />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/404" element={<Page404 />} />
          <Route path="/lad-project" element={<Main />} />
          <Route path="/" element={<Main />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </PageMain>
      <PageFooter />
    </Router>
  );
}
