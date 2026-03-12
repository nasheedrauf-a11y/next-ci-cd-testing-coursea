import { NextResponse } from "next/server"
import { getCategories } from "@/lib/data/products"

export async function GET() {
  try {
    const categories = await getCategories()
    return NextResponse.json({ categories, success: true })
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch categories", success: false },
      { status: 500 }
    )
  }
}
