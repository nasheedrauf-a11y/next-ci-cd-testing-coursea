"use client"

import { useState, useEffect } from "react"
import { ProductFormData } from "@/types/product"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { getAllCategories } from "@/app/_actions/products"

interface ProductFormProps {
  initialData?: ProductFormData
  onSubmit: (data: ProductFormData) => Promise<void>
  isLoading?: boolean
  submitButtonText?: string
}

export default function ProductForm({
  initialData,
  onSubmit,
  isLoading = false,
  submitButtonText = "Save Product",
}: ProductFormProps) {
  const [formData, setFormData] = useState<ProductFormData>(
    initialData || {
      name: "",
      description: "",
      price: 0,
      category: "",
      stock: 0,
      imageUrl: "",
    }
  )
  const [categories, setCategories] = useState<string[]>([])
  const [loadingCategories, setLoadingCategories] = useState(true)

  useEffect(() => {
    loadCategories()
  }, [])

  async function loadCategories() {
    setLoadingCategories(true)
    try {
      const cats = await getAllCategories()
      setCategories(cats)
    } catch (error) {
      console.error("Failed to load categories:", error)
    } finally {
      setLoadingCategories(false)
    }
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === "price" || name === "stock" ? Number(value) : value,
    }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    await onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="mb-2 block text-sm font-medium">
          Product Name *
        </label>
        <Input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          placeholder="Enter product name"
        />
      </div>

      <div>
        <label htmlFor="description" className="mb-2 block text-sm font-medium">
          Description *
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          rows={4}
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:border-transparent"
          placeholder="Enter product description"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="price" className="mb-2 block text-sm font-medium">
            Price ($) *
          </label>
          <Input
            id="price"
            name="price"
            type="number"
            step="0.01"
            min="0"
            value={formData.price}
            onChange={handleChange}
            required
            placeholder="0.00"
          />
        </div>

        <div>
          <label htmlFor="stock" className="mb-2 block text-sm font-medium">
            Stock Quantity *
          </label>
          <Input
            id="stock"
            name="stock"
            type="number"
            min="0"
            value={formData.stock}
            onChange={handleChange}
            required
            placeholder="0"
          />
        </div>
      </div>

      <div>
        <label htmlFor="category" className="mb-2 block text-sm font-medium">
          Category *
        </label>
        {loadingCategories ? (
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="h-10 w-full rounded-md border border-gray-300 px-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            <option value="">Select a category</option>
          </select>
        ) : (
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="h-10 w-full rounded-md border border-gray-300 px-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            <option value="">Select a category</option>
            {categories.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
            <option value="Custom">Add new category...</option>
          </select>
        )}
        {formData.category === "Custom" && (
          <div className="mt-2">
            <Input
              placeholder="Enter new category name"
              onChange={(e) => {
                setFormData(prev => ({ ...prev, category: e.target.value }))
              }}
            />
          </div>
        )}
      </div>

      <div>
        <label htmlFor="imageUrl" className="mb-2 block text-sm font-medium">
          Image URL
        </label>
        <Input
          id="imageUrl"
          name="imageUrl"
          type="url"
          value={formData.imageUrl}
          onChange={handleChange}
          placeholder="https://example.com/image.jpg"
        />
      </div>

      <div className="flex gap-3">
        <Button type="submit" disabled={isLoading} className="flex-1">
          {isLoading ? "Saving..." : submitButtonText}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => window.history.back()}
          disabled={isLoading}
        >
          Cancel
        </Button>
      </div>
    </form>
  )
}
