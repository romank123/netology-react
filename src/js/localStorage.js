class LocalStorageService {
  constructor(localStorageFieldName) {
    // строковое название сохраняемого содержимого
    this.field = localStorageFieldName;
    // значение по умолчанию (присваивается, если данная поле еще не записано в localStorage)
    this.defaultValue = [];
    this.updateSubscribers = [];
  }

  getValue = () => {
    try {
      if (!localStorage[this.field]) return this.defaultValue;
      return JSON.parse(localStorage[this.field]);
    } catch(error) {
      console.log(error);
      return this.defaultValue;
    };
  }

  setValue = (value) => {
    localStorage[this.field] = JSON.stringify(value);
    this.notify();
  }

  isVerified = (item) => {
    const arr = this.getValue();
    if (!Array.isArray(arr) || !item || !item.id) return false;
    return true;
  }

  // проверяет, содержится ли в данном массиве объект item
  containItem = (item) => {
    if (!this.isVerified(item)) return;

    const arr = this.getValue();

    const itemFound = arr.find(({ id }) => id === item.id);
    if (itemFound) {
      return true;
    } else {
      return false;
    }
  }

  // если в данном массиве содержится объект item - исключает его из массива. Иначе включает в массив.
  toggleItem = (item) => {
    if (!this.isVerified(item)) return;

    const arr = this.getValue();
    const itemFound = arr.find(({ id }) => id === item.id);
    if (!itemFound) {
      arr.push(item);
    } else {
      arr.splice(arr.indexOf(itemFound), 1);
    }
    this.setValue(arr);
  }

  pushItem = (item) => {
    if (!this.isVerified(item)) return;

    const arr = this.getValue();
    const itemFound = arr.find(({ id }) => id === item.id);
    if (!itemFound) {
      arr.push(item);
      this.setValue(arr);
    }
  }

  sortBy = (event) => {
    const param = event.currentTarget.value;
    const arr = this.getValue();
    if (!arr.length || !arr[0][param]) return;
    arr.sort((item1, item2) => {
      if (item1[param] > item2[param]) return 1;
      return -1;
    });
    this.setValue(arr);
  }

  subscribe = (func) => {
    if (typeof func === 'function') this.updateSubscribers.push(func);
    return (() => {
      this.unsubscribe(func);
    });
  }

  unsubscribe = (func) => {
    const idx = this.updateSubscribers.indexOf(func);
    if (idx >= 0) this.updateSubscribers.splice(idx, 1);
  }

  notify = () => {
    this.updateSubscribers.forEach(func => {
      func();
    });
  }
}

// сервис работы с id корзины
const lsCartId = new LocalStorageService('cartId');
lsCartId.defaultValue = '';

// сервис работы с массивом избранных товаров
const lsFavourite = new LocalStorageService('favouriteItems');

// сервис для работы с массивом подробных данных об объектах корзины (содержит в т.ч. поля price, title, images для отображения в корзине и на странице заказа)
const lsCartItemsDetails = new LocalStorageService('cartItemsAllDetails');

export { lsCartId, lsFavourite, lsCartItemsDetails };
