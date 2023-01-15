/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  orderSetPhone,
  orderSetAddress,
  orderSubmitRequest,
  orderReset,
} from '../../redux/order/actions';
import Preloader from '../Preloader/Preloader';
import { cartClear } from '../../redux/cart/actions';

export default function Order() {
  const {
    loading,
    error,
    success,
    phone,
    address,
  } = useSelector((state) => state.order);
  const cart = useSelector((state) => state.cart);

  const [agreementChecked, changeArgeementChecked] = useState(false);

  const dispatch = useDispatch();

  const handleArgeementClick = (evt) => changeArgeementChecked(evt.target.checked);
  const handlePhoneChange = (evt) => dispatch(orderSetPhone(evt.target.value));
  const handleAddressChange = (evt) => dispatch(orderSetAddress(evt.target.value));

  const handleSubmit = (evt) => {
    evt.preventDefault();
    dispatch(orderSubmitRequest({
      owner: {
        phone,
        address,
      },
      items: cart.map((o) => ({
        id: o.item.id,
        price: o.item.price,
        count: o.quantity,
      })),
    }));
  };

  useEffect(() => (() => dispatch(orderReset())), []); // ComponentWillUnmount

  useEffect(() => {
    if (success) dispatch(cartClear());
    return () => {};
  }, [success]);

  return (
    <>
      {loading && <Preloader />}
      {(!loading && !error && success) && (
        <h3 className="text-center">Заказ оформлен!</h3>
      )}
      {(!loading && !error && !success && cart.length > 0) && (
        <section className="order">
          <h2 className="text-center">Оформить заказ</h2>
          <div className="card" style={{ maxWidth: '30rem', margin: '0 auto' }}>
            <form className="card-body" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="phone">Телефон</label>
                <input
                  className="form-control"
                  id="phone"
                  placeholder="Ваш телефон"
                  onChange={handlePhoneChange}
                  value={phone}
                />
              </div>
              <div className="form-group">
                <label htmlFor="address">Адрес доставки</label>
                <input
                  className="form-control"
                  id="address"
                  placeholder="Адрес доставки"
                  onChange={handleAddressChange}
                  value={address}
                />
              </div>
              <div className="form-group form-check">
                <input type="checkbox" className="form-check-input" id="agreement" onChange={handleArgeementClick} />
                <label className="form-check-label" htmlFor="agreement">Согласен с правилами доставки</label>
              </div>
              <button
                type="submit"
                className="btn btn-outline-secondary"
                disabled={!agreementChecked}
              >
                Оформить
              </button>
            </form>
          </div>
        </section>
      )}
      {error && <h3 className="text-center">{`Ошибка: ${error.message}`}</h3>}
    </>
  );
}
