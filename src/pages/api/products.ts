import { getAllProducts } from '@/service/products';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const sort = (req.query.sort as 'asc' | 'desc') ?? 'asc';

  try {
    const products = await getAllProducts(sort);
    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
