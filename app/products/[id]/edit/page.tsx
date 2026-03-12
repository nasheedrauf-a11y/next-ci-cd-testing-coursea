import { Metadata } from "next"
import { notFound } from "next/navigation"
import { getProduct } from "@/app/_actions/products"
import ProductForm from "@/components/features/products/ProductForm"
import { editProduct } from "@/app/_actions/products"
import Link from "next/link"
import { redirect } from "next/navigation"

interface EditProductPageProps {
  params: { id: string }
}

export async function generateMetadata({ params }: EditProductPageProps): Promise<Metadata> {
  const product = await getProduct(params.id)
  if (!product) return { title: "Product Not Found" }
  
  return {
    title: `Edit ${product.name}`,
    description: product.description,
  }
}

export default async function EditProductPage({ params }: EditProductPageProps) {
  const product = await getProduct(params.id)
  
  if (!product) {
    notFound()
  }

  async function handleSubmit(data: any) {
    "use server"
    const updated = await editProduct(params.id, data)
    if (updated) {
      redirect(`/products/${params.id}`)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-2xl">
        <div className="mb-6">
          <Link
            href={`/products/${params.id}`}
            className="mb-2 block text-sm text-blue-600 hover:underline"
          >
            ← Back to Product
          </Link>
          <h1 className="text-3xl font-bold">Edit Product</h1>
          <p className="mt-2 text-gray-600">Update the product details below</p>
        </div>
        <div className="rounded-lg border p-6">
          <ProductForm
            initialData={product}
            onSubmit={handleSubmit}
            submitButtonText="Update Product"
          />
        </div>
      </div>
    </div>
  )
}
