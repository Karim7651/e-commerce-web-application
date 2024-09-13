import { Suspense } from 'react';
import ProductList from './ProductList';
import SkeletonList from './SkeletonList';

export default function ProductListWithSuspense({filters}) {
  return (
    <Suspense fallback={<SkeletonList/>}>
      <ProductList filters={filters}/>
    </Suspense>
  );
}