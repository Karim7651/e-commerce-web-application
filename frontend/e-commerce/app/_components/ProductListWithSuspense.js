import { Suspense } from 'react';
import ProductList from './ProductList'; // New component for the main content
import SkeletonList from './SkeletonList';

export default function ProductListWithSuspense() {
    console.log("SUSPENSING")
  return (
    <Suspense fallback={<SkeletonList/>}>
      <ProductList />
    </Suspense>
  );
}