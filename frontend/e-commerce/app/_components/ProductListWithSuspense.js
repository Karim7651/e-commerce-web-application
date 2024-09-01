import { Suspense } from 'react';
import ProductList from './ProductList';
import SkeletonList from './SkeletonList';

export default function ProductListWithSuspense() {
  return (
    <Suspense fallback={<SkeletonList/>}>
      <ProductList />
    </Suspense>
  );
}