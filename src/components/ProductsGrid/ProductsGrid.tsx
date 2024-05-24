import React from 'react';
import styles from './ProductsGrid.module.css';
import Image from 'next/image';
import { Products } from '@/types/products';
import formatPrice from '@/utils/formatPrice';

export default function ProductGrid({ products }: Products) {
  return (
    <div className={styles.grid}>
      {products?.map((product) => (
        <div key={product.id} className={styles.card}>
          <div className={styles.imageContainer}>
            <Image
              src={product.image}
              alt={product.title}
              style={{ objectFit: 'contain', padding: '12px' }}
              sizes='(max-width: 768px) 100vw, 33vw'
              fill
              priority
            />
          </div>
          <div className={styles.details}>
            <p className={styles.category}>{product.category}</p>
            <h3 className={styles.title}>{product.title}</h3>
            <p className={styles.price}>£{formatPrice(product.price)}</p>
            <p className={styles.description}>{product.description}</p>
            <p className={styles.rating}>
              Rating: {product.rating.rate} ({product.rating.count} reviews)
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
