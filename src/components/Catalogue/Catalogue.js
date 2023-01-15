import '../../css/normalize.css';
import '../../css/font-awesome.min.css';
import '../../css/style.css';
import '../../css/style-catalogue.css';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import CatalogueSitePath from '../CatalogueSitePath/CatalogueSitePath.js';
import CatalogueSidebarSizes from '../CatalogueSidebarSizes/CatalogueSidebarSizes.js';
import CatalogueSidebarTypes from '../CatalogueSidebarTypes/CatalogueSidebarTypes.js';
import CatalogueSidebarHeelSizes from '../CatalogueSidebarHeelSizes/CatalogueSidebarHeelSizes.js';
import CatalogueSidebarColors from '../CatalogueSidebarColors/CatalogueSidebarColors.js';
import CatalogueSidebarReason from '../CatalogueSidebarReason/CatalogueSidebarReason.js';
import CatalogueSidebarSeason from '../CatalogueSidebarSeason/CatalogueSidebarSeason.js';
import CatalogueSidebarBrand from '../CatalogueSidebarBrand/CatalogueSidebarBrand.js';
import CatalogueSidebarPrices from '../CatalogueSidebarPrices/CatalogueSidebarPrices.js';
import CatalogueProducts from '../CatalogueProducts/CatalogueProducts.js';
import ProductsOverlooked from '../ProductsOverlooked/ProductsOverlooked.js';

// максимальная возможноая цена товара в магазине (для слайдера цен)
const MAXPRICE = 60000;

class Catalogue extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // фильтры
      fCategoryId: '',
      fSizes: [],
      fHeelSizes: [],
      fType: '',
      fColor: '',
      fReason: '',
      fSeason: '',
      fBrand: '',
      fMinPrice: 0,
      fMaxPrice: MAXPRICE,
      fSearch: '',
      fDiscounted: false,
      // доступна сортировка по popularity, price
      fSortBy: 'popularity',
      // строка для поискового запроса (без page)
      searchString: ''
    };
  }

  static get propTypes() {
    return {
      // favourite: PropTypes.array.isRequired
    }
  }

  componentWillMount() {
    this.updateFilters(this.props);
  }

  componentDidMount() {
    this.getSearchString(this.props, this.state);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.location.search === nextProps.location.search) return;
    // если поисковый запрос в url изменился, обнуляем все фильтры и выставляем новые исходя из поискового запроса в адресной строке
    this.setDefaultFilters();
    this.updateFilters(nextProps);
  }

  componentWillUpdate(nextProps, nextState) {
    this.getSearchString(nextProps, nextState);
  }

  // Выставляем фильтры исходя из поискового запроса в адресной строке
  updateFilters = (nextProps) => {
    const queries = nextProps.location.query;
    Object.keys(queries).forEach(query => {
      switch(query) {
        case 'categoryId':
          this.setState({ fCategoryId: queries[query] });
          break;
        case 'reason':
          this.setState({ fReason: queries[query] });
          break;
        case 'type':
          this.setState({ fType: queries[query] });
          break;
        case 'season':
          this.setState({ fSeason: queries[query] });
          break;
        case 'brand':
          this.setState({ fBrand: queries[query] });
          break;
        case 'search':
          this.setState({ fSearch: queries[query] });
          break;
        default:
          break;
      }
    });
  }

  // формирование строки поискового запроса на сервер без учета номера страницы
  getSearchString = (nextProps, nextState) => {
    const sizeSearch = nextState.fSizes.reduce((search, size) => {
      return search + `size[]=${size}&`;
    }, '');
    const heelSizeSearch = nextState.fHeelSizes.reduce((search, heelSize) => {
      return search + `heelSize[]=${heelSize}&`;
    }, '');

    const categoryIdSearch = nextState.fCategoryId ? `categoryId=${nextState.fCategoryId}&` : '';
    const fTypeSearch = nextState.fType ? `type=${nextState.fType}&` : '';
    const fColorSearch = nextState.fColor ? `color=${nextState.fColor}&` : '';
    const fReasonSearch = nextState.fReason ? `reason=${nextState.fReason}&` : '';
    const fSeasonSearch = nextState.fSeason ? `season=${nextState.fSeason}&` : '';
    const fBrandSearch = nextState.fBrand ? `brand=${nextState.fBrand}&` : '';
    const fMinPriceSearch = nextState.fMinPrice ? `minPrice=${nextState.fMinPrice}&` : '';
    const fMaxPriceSearch = nextState.fMaxPrice ? `maxPrice=${nextState.fMaxPrice}&` : '';
    const fSearchSearch = nextState.fSearch ? `search=${nextState.fSearch}&` : '';

    const fSortBySearch = nextState.fSortBy ? `sortBy=${nextState.fSortBy}&` : '';
    const fDiscountedSearch = nextState.fDiscounted ? `discounted=${nextState.fDiscounted}&` : '';
    

    // const searchString = 'https://api-neto.herokuapp.com/bosa-noga/products?' + categoryIdSearch + sizeSearch + 
    const searchString = 'products?' + categoryIdSearch + sizeSearch + 
    heelSizeSearch + fTypeSearch + fColorSearch + fReasonSearch + fSeasonSearch +
    fBrandSearch + fMinPriceSearch + fMaxPriceSearch + fSearchSearch + fSortBySearch + fDiscountedSearch;
    if (this.state.searchString !== searchString) {
      this.setState({ searchString });
    }
  }

  setDefaultFilters = (event) => {
    if (event) event.preventDefault();
    this.setState({ fCategoryId: '' });
    this.setState({ fHeelSizes: [] });
    this.setState({ fSizes: [] });
    this.setState({ fType: '' });
    this.setState({ fColor: '' });
    this.setState({ fReason: '' });
    this.setState({ fSeason: '' });
    this.setState({ fBrand: '' });
    this.setState({ fMinPrice: 0 });
    this.setState({ fMaxPrice: MAXPRICE });
    this.setState({ fSearch: '' });
    this.setState({ fDiscounted: false });
    this.setState({ fSortBy: 'popularity' });
  }

  toggleArrayFilter = (event) => {
    const { value, name } = event.currentTarget;
    const filter = this.state[name];
    const index = filter.indexOf(+value);
    if (index === -1) {
      filter.push(+value);
    } else {
      filter.splice(index, 1);
    }
    this.setState({ [name]: filter });
  }

  setFilter = ({ name, value }) => (event) => {
    if (event) event.preventDefault();
    // если выбрали фильтр, который уже был выбран, ничего не делаем
    if (this.state[name] === value) return;
    this.setState({ [name]: value });
  }

  setSortByFilter = (event) => {
    const { value } = event.currentTarget;
    this.setState({ fSortBy: value });
  }

  render() {
    return (
      <div>
        <CatalogueSitePath {...this.props} {...this.state} />
        <main className="product-catalogue">

          {/* <!-- Сайдбар --> */}
          <section className="sidebar">
            <CatalogueSidebarTypes filters={this.props.filters} fType={this.state.fType} setFilter={this.setFilter} />
            <div className="separator-150 separator-150-1"></div>
            <CatalogueSidebarPrices filters={this.props.filters} fMinPrice={this.state.fMinPrice} fMaxPrice={this.state.fMaxPrice} setFilter={this.setFilter} />
            <div className="separator-150 separator-150-2"></div>
            <CatalogueSidebarColors filters={this.props.filters} fColor={this.state.fColor} setFilter={this.setFilter} />
            <div className="separator-150 separator-150-3"></div>
            <CatalogueSidebarSizes filters={this.props.filters} fSizes={this.state.fSizes} toggleArrayFilter={this.toggleArrayFilter} />
            <div className="separator-150 separator-150-4"></div>  
            <CatalogueSidebarHeelSizes filters={this.props.filters} fHeelSizes={this.state.fHeelSizes} toggleArrayFilter={this.toggleArrayFilter} />
            <div className="separator-150 separator-150-5"></div> 
            <CatalogueSidebarReason filters={this.props.filters} fReason={this.state.fReason} setFilter={this.setFilter} />
            <div className="separator-150 separator-150-6"></div>  
            <CatalogueSidebarSeason filters={this.props.filters} fSeason={this.state.fSeason} setFilter={this.setFilter} />
            <div className="separator-150 separator-150-7"></div>  
            <section className="sidebar__division">
              <CatalogueSidebarBrand filters={this.props.filters} fBrand={this.state.fBrand} setFilter={this.setFilter} />
              <label>
                <input 
                  checked={this.state.fDiscounted} 
                  onChange={() => this.setState({ fDiscounted: !this.state.fDiscounted })} 
                  type="checkbox" 
                  className="checkbox" 
                  name="checkbox-disc" 
                />
                <span className="checkbox-discount"></span> <span className="text-discount">Со скидкой</span>
              </label>
              <div className="separator-240"></div>
            </section>
            <section className="sidebar__division">    
              <div className="drop-down">
                <a onClick={this.setDefaultFilters} ><span className="drop-down-icon"></span>Сбросить</a>
              </div>
            </section>
          </section>

          <CatalogueProducts {...this.props} {...this.state} setSortByFilter={this.setSortByFilter} />
          {/* разграничение для отделения от плавающего компонента */}
          <div style={{clear: 'both'}}></div>
        </main>
        <ProductsOverlooked {...this.props} {...this.state} />
      </div>
    );
  }
}

export default Catalogue;
