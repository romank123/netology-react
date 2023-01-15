import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import Preloader from '../Preloader/Preloader';
import {
  catalogItemSetQuantity,
  catalogItemSelectSize,
  catalogItemRequest,
} from '../../redux/catalogItem/actions';
import { cartAddItem } from '../../redux/cart/actions';
import Sizes from '../Sizes/Sizes';
import Quantity from '../Quantity/Quantity';

export default function CatalogItem({ id }) {
  const {
    loading,
    error,
    item,
    quantity,
    selectedSize,
  } = useSelector((state) => state.catalogItem);

  const dispatch = useDispatch();

  const handleIncrease = () => dispatch(catalogItemSetQuantity(quantity + 1));
  const handleDecrease = () => {
    dispatch(catalogItemSetQuantity(quantity > 1 ? quantity - 1 : 1));
  };

  const handleSizeClick = (index) => dispatch(catalogItemSelectSize(index));

  const handleAddToCart = () => dispatch(cartAddItem({
    item: { ...item, size: item.sizes[selectedSize].size },
    quantity,
  }));

  useEffect(() => {
    dispatch(catalogItemRequest(id));
    dispatch(catalogItemSetQuantity(1));
    return () => {};
  }, [dispatch, id]);

  return (
    <section className="catalog-item">
      {(loading || error) && <Preloader />}
      {(!loading && !error && item) && (
        <>
          <h2 className="text-center">{item.title}</h2>
          <div className="row">
            <div className="col-5">
              <img
                src={item.images[0] || ''}
                className="img-fluid"
                alt=""
              />
            </div>
            <div className="col-7">
              <table className="table table-bordered">
                <tbody>
                  {CatalogItem.properties.map((o) => (
                    <tr key={o.name}>
                      <td>{o.description}</td>
                      <td>{item[o.name] || ''}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="text-center">
                <Sizes
                  items={item.sizes.filter((o) => o.avalible)}
                  onClick={handleSizeClick}
                  selected={selectedSize}
                />
                <Quantity
                  title="Количество: "
                  value={quantity}
                  onIncrease={handleIncrease}
                  onDecrease={handleDecrease}
                />
              </div>
              <button type="button" className="btn btn-danger btn-block btn-lg" onClick={handleAddToCart}>В корзину</button>
            </div>
          </div>
        </>
      )}
    </section>
  );
}

CatalogItem.properties = [
  { name: 'sku', description: 'Артикул' },
  { name: 'manufacturer', description: 'Производитель' },
  { name: 'color', description: 'Цвет' },
  { name: 'material', description: 'Материалы' },
  { name: 'season', description: 'Сезон' },
  { name: 'reason', description: 'Повод' },
];

CatalogItem.propTypes = {
  id: PropTypes.string.isRequired,
};
