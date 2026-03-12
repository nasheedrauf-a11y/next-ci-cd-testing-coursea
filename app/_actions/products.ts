"use server"

import { revalidatePath } from "next/cache"
import { getProducts, getProductById, createProduct, updateProduct, deleteProduct, getCategories } from "@/lib/data/products"
import { Product, ProductFormData } from "@/types/product"

export async function getAllProducts(): Promise<Product[]> {
  return await getProducts()
}

export async function getProduct(id: string): Promise<Product | null> {
  const product = await getProductById(id)
  return product || null
}

export async function addProduct(formData: ProductFormData): Promise<Product> {
  const product = await createProduct(formData)
  revalidatePath("/products")
  revalidatePath("/products/[id]")
  return product
}

export async function editProduct(id: string, formData: ProductFormData): Promise<Product | null> {
  const product = await updateProduct(id, formData)
  if (product) {
    revalidatePath("/products")
    revalidatePath("/products/[id]")
  }
  return product
}

export async function removeProduct(id: string): Promise<boolean> {
  const success = await deleteProduct(id)
  if (success) {
    revalidatePath("/products")
    revalidatePath("/products/[id]")
  }
  return success
}

export async function getAllCategories(): Promise<string[]> {
  return await getCategories()
}
