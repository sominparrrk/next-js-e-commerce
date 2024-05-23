const basicAPIPath = process.env.NEXT_PUBLIC_BASIC_API_PATH;

export async function getCategories() {
  const res = await fetch(`${basicAPIPath}/categories`);

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export async function getAllProducts(sort: string) {
  const res = await fetch(`${basicAPIPath}?sort=${sort}`);

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}
