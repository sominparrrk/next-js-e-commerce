import { getProductsByCategory } from "@/service/products";
import { NextRequest, NextResponse } from "next/server";

type Params = {
  category: string
}

export async function GET(request: NextRequest, context: { params: Params }) {
  const sort = request.nextUrl.searchParams.get('sort') ?? 'asc';
  const products = await getProductsByCategory(context.params.category, sort);

  return NextResponse.json(products);
}
