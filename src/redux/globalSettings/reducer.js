import { CHANGE_GLOBAL_SETTINGS } from './types';

const initialState = {
  headerLinks: [
    { name: 'Главная', route: '/' },
    { name: 'Каталог', route: '/catalog' },
    { name: 'О магазине', route: '/about' },
    { name: 'Контакты', route: '/contacts' },
  ],
  footerLinks: [
    { name: 'О магазине', route: '/about' },
    { name: 'Каталог', route: '/catalog' },
    { name: 'Контакты', route: '/contacts' },
  ],
  banner: {
    name: 'К весне готовы!',
    src: '/img/banner.jpg',
  },
  searchString: '',
};

export default function globalSettingsReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_GLOBAL_SETTINGS:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
