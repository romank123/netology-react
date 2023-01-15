import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CatalogMenu from './menu/CatalogMenu';
import CatalogSearch from './search/CatalogSearch';
import SectionCard from '../../components/section_card/SectionCard';
import ButtonOffset from './button_offset/ButtonOffset';
import Loader from '../../components/loader/Loader';
import Error from '../../components/error/Error';
import {
  catalogCategoryChange,
  catalogSearchChange,
  catalogOffsetChange,
} from '../../store/SliceCatalog';
import {
  fetchGetCatalogCategories,
  fetchGetCatalogContent,
} from '../../api/index';
import styles from './Catalog.module.css';
/** 
 * Страница каталога
 * Отображение товаров из каталога, фильтр по категориям и поиск товара
*/
export default function Catalog({ nosearch }) {
  const {
    content,
    categories,
    activeCategoryId,
    search,
    offset,
    loading,
    error,
  } = useSelector((state) => state.catalog);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGetCatalogCategories());
  }, [dispatch]);

  useEffect(() => {
    if (offset >= 0)
      dispatch(fetchGetCatalogContent(activeCategoryId, search, offset));
  }, [dispatch, activeCategoryId, search, offset]);

  // сброс state.content для SliceCatalog
  useEffect(() => {
    return () => dispatch(catalogCategoryChange(0));
  }, [dispatch]);

  const menuItems = [
    {
      id: 0,
      title: 'Все',
    },
    ...categories,
  ];

  const handleSelect = (categoryId) => {
    if (categoryId === activeCategoryId) return;
    if (categoryId === menuItems[0].id)
      return dispatch(catalogCategoryChange(0));
    dispatch(catalogCategoryChange(categoryId));
  };

  const handleOffset = () => {
    if(offset >= 0) dispatch(catalogOffsetChange());
  };

  const handleSearch = (searchString) => {
    dispatch(catalogSearchChange(searchString));
  };

  const catalogCards = content.map((cardProps) => (
    <SectionCard key={cardProps.id} {...cardProps} cardBottomMarginStyleProp={'catalog'} />
  ));

  const badSearchPropValue = 'Ничего не найдено. Попробуйте еще раз.';

  return (
    <section className={styles.catalog}>
      <h2 className="text-center">Каталог</h2>
      {(error && <Error errorText={error} />) || (
        <>
          {!loading && (
            <>
              {nosearch ? null : <CatalogSearch handleSearch={handleSearch} />}
              <CatalogMenu
                menuItems={menuItems}
                categoryId={activeCategoryId}
                handleSelect={handleSelect}
              />
            </>
          )}
          <div className="row">
            {catalogCards.length
              ? catalogCards
              : !loading && search && <Error errorText={badSearchPropValue} />}
          </div>
          {loading && <Loader />}
          {offset >= 0 && catalogCards.length >= 6 ? (
            <ButtonOffset handleOffset={handleOffset} />
          ) : null}
        </>
      )}
    </section>
  );
}
