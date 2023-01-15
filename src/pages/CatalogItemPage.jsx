import React from 'react';
// import PropTypes from 'prop-types';
import { useRouteMatch } from 'react-router';
import CatalogItem from '../components/CatalogItem/CatalogItem';

export default function CatalogItemPage() {
  const match = useRouteMatch();

  return <CatalogItem id={match.params.id} />;
}
