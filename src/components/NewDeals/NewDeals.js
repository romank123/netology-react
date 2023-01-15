import '../../css/normalize.css';
import '../../css/font-awesome.min.css';
import '../../css/style.css';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import NewDealsSlider from '../NewDealsSlider/NewDealsSlider.js';
import NewDealsProductInfo from '../NewDealsProductInfo/NewDealsProductInfo.js';
import NewDealsMenuPoint from '../NewDealsMenuPoint/NewDealsMenuPoint.js';
import withFetcher from '../withFetcher/withFetcher.js';
import { lsFavourite } from '../../js/localStorage';

class NewDealsInitial extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [], // обувь на слайдере "Новинки" (с учетом выбранной категории)
      currCategoryID: 0 // id категории обуви, отображаемой на слайдах
    };
  }

  static get propTypes() {
    return {
      // все новинки (по всем категориям), полученные с сервера
      itemsAll: PropTypes.array.isRequired,
      categories: PropTypes.array
    }
  }

  static get defaultProps() {
    return {
      itemsAll: []
    }
  }

  // если items еще пустой, и категория отображаемой обуви не выбрана, и в nextProps.itemsAll не null, помещаем в items всю обувь класса "Новинки"
  componentWillReceiveProps(nextProps) {
    if (this.state.items.length || this.state.currCategoryID || !nextProps.itemsAll) return;
    this.setState({ items: nextProps.itemsAll });
  }

  // создание ссылок на категории новинок
  createMenuPoints(categories) {
    if (!categories || !categories.length) return null;
    const menuPoints = categories
      .map(({ id, title }) => (
        <NewDealsMenuPoint key={id} id={id} onClick={this.setCategory(id)} title={title} currCategoryID={this.state.currCategoryID} />
      ));
    return menuPoints;
  }

  setCategory = (id) => (event) => { 
    event.preventDefault();
    if (!this.props.itemsAll) return;
    const items = this.props.itemsAll.filter(({ categoryId }) => categoryId === id);
    const currCategoryID = id;
    this.setState({ items, currCategoryID });
  }

  render() {
    return (
      <section className="new-deals wave-bottom">
        <h2 className="h2">Новинки</h2>
        <div className="new-deals__menu">
          <ul className="new-deals__menu-items" >
            {this.createMenuPoints(this.props.categories)}
          </ul>
        </div>
        <NewDealsSlider {...this.props} {...this.state} favourite={lsFavourite.getValue()} />
        <NewDealsProductInfo {...this.props} {...this.state} />
      </section>
    );
  }
}

// добавляем запрос данных с сервера с помощью HOC
const NewDeals = withFetcher({
  // url: 'https://api-neto.herokuapp.com/bosa-noga/featured',
  url: 'featured',
  collName: 'itemsAll'
})(NewDealsInitial);

export default NewDeals;
