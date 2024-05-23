import { getCategories } from "@/service/products";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const categories = await getCategories();
  return NextResponse.json(categories);
}
