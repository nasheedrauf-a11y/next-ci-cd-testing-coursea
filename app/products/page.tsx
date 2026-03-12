import { Metadata } from "next"
import ProductList from "@/components/features/products/ProductList"

export const metadata: Metadata = {
  title: "Products",
  description: "Manage your product inventory",
}

export default function ProductsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Products</h1>
        <p className="mt-2 text-gray-600">Manage your product inventory</p>
      </div>
      <ProductList />
    </div>
  )
}
