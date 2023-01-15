import React from 'react';
import TopSales from '../components/TopSales/TopSales';
import Catalog from '../components/Catalog/Catalog';

export default function HomePage() {
  return (
    <>
      <TopSales />
      <Catalog showSearchField={false} />
    </>
  );
}
