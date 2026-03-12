"use client"

import { Product } from "@/types/product"
import { Button } from "@/components/ui/Button"
import Link from "next/link"

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="rounded-lg border p-6 transition-shadow hover:shadow-md">
      <div className="mb-4 aspect-square w-full overflow-hidden rounded-md bg-gray-100">
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-gray-400">
            No Image
          </div>
        )}
      </div>
      <h3 className="mb-2 text-lg font-semibold">{product.name}</h3>
      <p className="mb-4 text-sm text-gray-600 line-clamp-2">
        {product.description}
      </p>
      <div className="mb-4 flex items-center justify-between">
        <span className="text-lg font-bold text-blue-600">
          ${product.price.toFixed(2)}
        </span>
        <span className="text-sm text-gray-500">
          Stock: {product.stock}
        </span>
      </div>
      <div className="mb-4">
        <span className="inline-block rounded-full bg-gray-100 px-3 py-1 text-xs font-medium">
          {product.category}
        </span>
      </div>
      <div className="flex gap-2">
        <Link href={`/products/${product.id}`} className="flex-1">
          <Button variant="outline" size="sm" className="w-full">
            View
          </Button>
        </Link>
        <Link href={`/products/${product.id}/edit`} className="flex-1">
          <Button size="sm" className="w-full">
            Edit
          </Button>
        </Link>
      </div>
    </div>
  )
}
