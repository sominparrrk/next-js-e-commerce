import { getAllProducts } from "@/service/products";
import { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const sort = request.nextUrl.searchParams.get('sort') ?? 'asc';
  const products = await getAllProducts(sort);

  return NextResponse.json(products);
}
