import React from 'react';
import styles from './Contacts.module.css';
/** 
 * Страница контактов
*/
export default function Contacts() {
  return (
    <section className={styles.contacts}>
      <h2 className="text-center">Контакты</h2>
      <p>
        Наш головной офис расположен в г.Москва, по адресу: Варшавское шоссе, д.
        17, бизнес-центр W Plaza.
      </p>
      <h5 className="text-center">Координаты для связи:</h5>
      <p>
        Телефон: <a href="tel:+7-987-456-32-10">+7 987 456 32 10</a>{' '}
        (ежедневно: с 09-00 до 21-00)
      </p>
      <p>
        Email:
        <a href="mailto:office@bosanoga.ru">office@bosanoga.ru</a>
      </p>
    </section>
  );
}
