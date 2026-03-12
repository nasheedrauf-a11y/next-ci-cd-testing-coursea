export interface Product {
  id: string
  name: string
  description: string
  price: number
  category: string
  stock: number
  imageUrl?: string
  createdAt: string
  updatedAt: string
}

export interface ProductFormData {
  name: string
  description: string
  price: number
  category: string
  stock: number
  imageUrl?: string
}

export interface ProductFilters {
  category?: string
  search?: string
}
