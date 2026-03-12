import { Metadata } from "next"
import { notFound } from "next/navigation"
import { getProduct, removeProduct } from "@/app/_actions/products"
import { Button } from "@/components/ui/Button"
import Link from "next/link"

interface ProductPageProps {
  params: { id: string }
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const product = await getProduct(params.id)
  if (!product) return { title: "Product Not Found" }
  
  return {
    title: product.name,
    description: product.description,
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProduct(params.id)
  
  if (!product) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl">
        <div className="mb-6 flex items-center justify-between">
          <Link href="/products" className="text-sm text-blue-600 hover:underline">
            ← Back to Products
          </Link>
          <div className="flex gap-2">
            <Link href={`/products/${product.id}/edit`}>
              <Button size="sm">Edit Product</Button>
            </Link>
            <form action={async () => {
              "use server"
              await removeProduct(params.id)
            }}>
              <Button type="submit" size="sm" variant="outline" className="text-red-600 hover:text-red-700 hover:border-red-300">
                Delete
              </Button>
            </form>
          </div>
        </div>

        <div className="rounded-lg border p-8">
          <div className="mb-8 aspect-video w-full overflow-hidden rounded-lg bg-gray-100">
            {product.imageUrl ? (
              <img
                src={product.imageUrl}
                alt={product.name}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-gray-400">
                No Image Available
              </div>
            )}
          </div>

          <div className="mb-4">
            <span className="inline-block rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800">
              {product.category}
            </span>
          </div>

          <h1 className="mb-4 text-3xl font-bold">{product.name}</h1>

          <p className="mb-6 text-lg text-gray-600">{product.description}</p>

          <div className="mb-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg bg-gray-50 p-4">
              <p className="mb-1 text-sm text-gray-600">Price</p>
              <p className="text-2xl font-bold text-blue-600">
                ${product.price.toFixed(2)}
              </p>
            </div>
            <div className="rounded-lg bg-gray-50 p-4">
              <p className="mb-1 text-sm text-gray-600">Stock</p>
              <p className="text-2xl font-bold">
                {product.stock} units
              </p>
            </div>
          </div>

          <div className="text-sm text-gray-500">
            <p>Created: {new Date(product.createdAt).toLocaleDateString()}</p>
            <p>Last updated: {new Date(product.updatedAt).toLocaleDateString()}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
