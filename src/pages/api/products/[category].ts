import { getProductsByCategory } from '@/service/products';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { category } = req.query;
  const sort = (req.query.sort as 'asc' | 'desc') ?? 'asc';

  if (typeof category !== 'string') {
    res.status(400).json({ error: 'Invalid category' });
    return;
  }

  try {
    const products = await getProductsByCategory(category, sort);
    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
