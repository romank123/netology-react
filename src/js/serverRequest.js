const URL = 'https://api-neto.herokuapp.com/bosa-noga/';

class serverRequestService {
  constructor(url) {
    // формируем строку запроса
    this.url = URL + url;
  }

  startRequest = (param, body) => {
    const promise = body ? fetch((this.url + param), {
      body: JSON.stringify(body),
      credentials: 'same-origin',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    }) : fetch(this.url + param);
    return promise.then(res => res.json());
  }

  doGETRequest = (param) => {
    return this.startRequest(param)
      .then(res => {
        if (res.status === 'ok') {
          return res;
        }
        throw new Error(`ошибка при GET запросе на ${this.url + param}`);
      })
  }

  doGETRequestForData = (param) => {
    return this.doGETRequest(param)
      .then(res => res.data);
  }

  doGETRequestForPages = (param) => {
    return this.doGETRequest(param)
      .then(res => res.pages);
  }

  doPOSTRequest = (param, body) => {
    return this.startRequest(param, body)
      .then(res => {
        if (res.status === 'ok') {
          if (!res.data.products) res.data.products = [body];
          return res.data;
        }
        throw new Error(`ошибка при POST запросе на ${this.url + param} с телом ${body}`);
      })
  }
}

const fetchCart = new serverRequestService('cart/');
const fetchProduct = new serverRequestService('products/');
const fetchData = new serverRequestService('');

// по каждому товару из массива products делаем запрос, чтобы получить поля price, title, images для отображения корзины
fetchProduct.getCartItemsDetails = (products, currentCartItemsDetails) => Promise.all(products.map(({ id }) => {
  const itemDetailed = currentCartItemsDetails.find((item) => item.id === id);
  if (itemDetailed) return itemDetailed;
  return fetchProduct.doGETRequestForData(id);
}));


export { fetchCart, fetchProduct, fetchData };
