import { Metadata } from "next"
import ProductForm from "@/components/features/products/ProductForm"
import { addProduct } from "@/app/_actions/products"
import { redirect } from "next/navigation"

export const metadata: Metadata = {
  title: "Add Product",
  description: "Add a new product to your inventory",
}

export default function AddProductPage() {
  async function handleSubmit(data: any) {
    "use server"
    await addProduct(data)
    redirect("/products")
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-2xl">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Add New Product</h1>
          <p className="mt-2 text-gray-600">Fill in the details below to add a product</p>
        </div>
        <div className="rounded-lg border p-6">
          <ProductForm onSubmit={handleSubmit} submitButtonText="Create Product" />
        </div>
      </div>
    </div>
  )
}
