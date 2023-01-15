import React from 'react';
import FooterMenu from './menu/FooterMenu';
import styles from './PageFooter.module.css';
/** 
 * Компонент для футера страницы
*/
export default function PageFooter() {
  return (
    <footer className={`container bg-light ${styles.footer}`}>   
      <div className="row">
        <div className="col">
          <section>
            <h5>Информация</h5>
            <FooterMenu />
          </section>
        </div>
        <div className="col">
          <section>
            <h5>Принимаем к оплате:</h5>
            <div className={styles.pay}>
              <div className={`${styles['pay-systems']} ${styles.paypal}`} />
              <div className={`${styles['pay-systems']} ${styles['master-card']}`} />
              <div className={`${styles['pay-systems']} ${styles.visa}`} />
              <div className={`${styles['pay-systems']} ${styles.yandex}`} />
              <div className={`${styles['pay-systems']} ${styles.webmoney}`} />
              <div className={`${styles['pay-systems']} ${styles.qiwi}`} />
            </div>
          </section>
          <section>
            <div className={styles.copyright}>
              2009-2019 © BosaNoga.ru — модный интернет-магазин обуви и
              аксессуаров. Все права защищены.
              <br />
              Доставка по всей России!
            </div>
          </section>
        </div>
        <div className="col text-right">
          <section className="">
            <h5>Контакты:</h5>
            <a className={styles.phone} href="tel:+7-495-790-35-03">
              +7 987 654 32 10
            </a>
            <span className="">
              Ежедневно: с 09-00 до 21-00
            </span>
            <a
              className={styles.email}
              href="mailto:office@bosanoga.ru"
            >
              office@bosanoga.ru
            </a>
            <div className={styles.socials}>
              <div className={`${styles.social} ${styles.twitter}`} />
              <div className={`${styles.social} ${styles.vk}`} />
            </div>
          </section>
        </div>
      </div>
    </footer>
  );
}
