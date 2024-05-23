'use client';

export default function CategoryPLP({
  params,
}: {
  params: { category: string };
}) {
  return (
    <>
      <h1>{params.category} category PLP</h1>
    </>
  );
}
