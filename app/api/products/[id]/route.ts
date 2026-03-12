import { NextRequest, NextResponse } from "next/server"
import { getProductById, updateProduct, deleteProduct } from "@/lib/data/products"
import { ProductFormData } from "@/types/product"

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const product = await getProductById(id)
    
    if (!product) {
      return NextResponse.json(
        { message: "Product not found", success: false },
        { status: 404 }
      )
    }
    
    return NextResponse.json({ product, success: true })
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch product", success: false },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body: ProductFormData = await request.json()
    const product = await updateProduct(id, body)
    
    if (!product) {
      return NextResponse.json(
        { message: "Product not found", success: false },
        { status: 404 }
      )
    }
    
    return NextResponse.json({ product, success: true })
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to update product", success: false },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const success = await deleteProduct(id)
    
    if (!success) {
      return NextResponse.json(
        { message: "Product not found", success: false },
        { status: 404 }
      )
    }
    
    return NextResponse.json({ message: "Product deleted", success: true })
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to delete product", success: false },
      { status: 500 }
    )
  }
}
