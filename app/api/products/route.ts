import { NextRequest, NextResponse } from "next/server"
import { getProducts, createProduct } from "@/lib/data/products"
import { ProductFormData } from "@/types/product"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const category = searchParams.get("category")
    const search = searchParams.get("search")
    
    let products = await getProducts()
    
    if (category) {
      products = products.filter(p => p.category === category)
    }
    
    if (search) {
      const searchLower = search.toLowerCase()
      products = products.filter(p => 
        p.name.toLowerCase().includes(searchLower) ||
        p.description.toLowerCase().includes(searchLower)
      )
    }
    
    return NextResponse.json({ products, success: true })
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch products", success: false },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: ProductFormData = await request.json()
    
    const product = await createProduct(body)
    
    return NextResponse.json({ product, success: true }, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to create product", success: false },
      { status: 500 }
    )
  }
}
