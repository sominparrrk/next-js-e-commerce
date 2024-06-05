import React from 'react';
import styles from './ProductsGrid.module.css';
import Image from 'next/image';
import { Products } from '@/types/products';
import formatPrice from '@/utils/formatPrice';

export default function ProductGrid({ products }: Products) {
  return (
    <div className={styles.grid}>
      {products?.map((product) => {
        const { id, image, title, category, price, description, rating } =
          product;
        return (
          <div key={id} className={styles.card}>
            <div className={styles.imageContainer}>
              <Image
                src={image}
                alt={title}
                style={{ objectFit: 'contain', padding: '12px' }}
                sizes='(max-width: 768px) 100vw, 33vw'
                fill
                priority
              />
            </div>
            <div className={styles.details}>
              <p className={styles.category}>{category}</p>
              <h3 className={styles.title}>{title}</h3>
              <p className={styles.price}>£{formatPrice(price)}</p>
              <p className={styles.description}>{description}</p>
              <p className={styles.rating}>
                Rating: {rating.rate} ({rating.count} reviews)
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
