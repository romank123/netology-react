import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import LinksList from '../LinksList/LinksList';
import { catalogRequest } from '../../redux/catalog/actions';
import SearchForm from '../SearchForm/SearchForm';
import CartIcon from '../CartIcon/CartIcon';

export default function Header() {
  const [showSearchForm, setShowSearchForm] = useState(false);
  const dispatch = useDispatch();

  const history = useHistory();

  const { headerLinks } = useSelector((state) => state.globalSettings);
  const categories = useSelector((state) => state.categories);

  const hideSearch = () => setShowSearchForm(false);
  const toggleSearch = () => setShowSearchForm(!showSearchForm);

  const handleSearchSubmit = (searchString) => {
    const category = categories.find((o) => o.selected);
    dispatch(catalogRequest({
      categoryId: category ? category.id : null,
      q: searchString.trim(),
    }));
    hideSearch();
    history.push('/catalog');
  };

  return (
    <header className="container">
      <div className="row">
        <div className="col">
          <nav className="navbar navbar-expand-sm navbar-light bg-light">
            <Link to="/" className="navbar-brand">
              <img src="/img/header-logo.png" alt="Bosa Noga" />
            </Link>

            <div className="collapase navbar-collapse" id="navbarMain">
              <LinksList
                className="navbar-nav mr-auto"
                links={headerLinks}
                activateLink
              />

              <div>
                <div className="header-controls-pics">
                  <div
                    data-id="search-expander"
                    className="header-controls-pic header-controls-search"
                    onClick={toggleSearch}
                    onKeyPress={toggleSearch}
                    role="button"
                    tabIndex={0}
                    label="search"
                  />
                  <CartIcon />
                </div>
                <SearchForm
                  data-id="search-form"
                  className={`header-controls-search-form form-inline ${showSearchForm ? '' : 'invisible'}`}
                  onSubmit={handleSearchSubmit}
                />
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
