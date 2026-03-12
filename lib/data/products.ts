import { Product } from "@/types/product"

let products: Product[] = [
  {
    id: "1",
    name: "Wireless Headphones",
    description: "High-quality wireless headphones with noise cancellation",
    price: 199.99,
    category: "Electronics",
    stock: 50,
    imageUrl: "/products/headphones.jpg",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    name: "Smart Watch",
    description: "Feature-rich smartwatch with fitness tracking",
    price: 299.99,
    category: "Electronics",
    stock: 30,
    imageUrl: "/products/smartwatch.jpg",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "3",
    name: "Running Shoes",
    description: "Comfortable running shoes for athletes",
    price: 89.99,
    category: "Sports",
    stock: 100,
    imageUrl: "/products/shoes.jpg",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "4",
    name: "Yoga Mat",
    description: "Premium yoga mat for all types of exercises",
    price: 39.99,
    category: "Sports",
    stock: 75,
    imageUrl: "/products/yoga-mat.jpg",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "5",
    name: "Coffee Maker",
    description: "Automatic coffee maker with programmable timer",
    price: 149.99,
    category: "Home",
    stock: 25,
    imageUrl: "/products/coffee-maker.jpg",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]

export async function getProducts(): Promise<Product[]> {
  return products
}

export async function getProductById(id: string): Promise<Product | undefined> {
  return products.find(p => p.id === id)
}

export async function createProduct(product: Omit<Product, "id" | "createdAt" | "updatedAt">): Promise<Product> {
  const newProduct: Product = {
    ...product,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
  products.push(newProduct)
  return newProduct
}

export async function updateProduct(id: string, updates: Partial<Product>): Promise<Product | null> {
  const index = products.findIndex(p => p.id === id)
  if (index === -1) return null
  
  products[index] = {
    ...products[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  }
  return products[index]
}

export async function deleteProduct(id: string): Promise<boolean> {
  const index = products.findIndex(p => p.id === id)
  if (index === -1) return false
  
  products.splice(index, 1)
  return true
}

export async function getCategories(): Promise<string[]> {
  return [...new Set(products.map(p => p.category))]
}
