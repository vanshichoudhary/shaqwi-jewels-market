
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://sacfgyzpsefjfyspipok.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNhY2ZneXpwc2VmamZ5c3BpcG9rIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk2Mjk0ODUsImV4cCI6MjA2NTIwNTQ4NX0.PgiXUJxT6KKDFhwAm-qz7pZplIJlkrQFKvcq-dHZacU'

export const supabase = createClient(supabaseUrl, supabaseKey)

// Product type definition
export interface Product {
  id?: string
  name: string
  price: number
  category: string
  image_url: string
  description: string
  created_at?: string
  in_stock?: boolean
}

// Product database operations
export const productService = {
  // Fetch all products
  async getAllProducts() {
    const { data, error } = await supabase
      .from('product')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) {
      console.error('Error fetching products:', error)
      throw error
    }
    
    return data
  },

  // Add new product
  async addProduct(product: Omit<Product, 'id' | 'created_at'>) {
    const { data, error } = await supabase
      .from('product')
      .insert([product])
      .select()
    
    if (error) {
      console.error('Error adding product:', error)
      throw error
    }
    
    return data
  },

  // Delete product
  async deleteProduct(id: string) {
    const { error } = await supabase
      .from('product')
      .delete()
      .eq('id', id)
    
    if (error) {
      console.error('Error deleting product:', error)
      throw error
    }
    
    return true
  },

  // Get products by category
  async getProductsByCategory(category: string) {
    const { data, error } = await supabase
      .from('product')
      .select('*')
      .eq('category', category)
      .order('created_at', { ascending: false })
    
    if (error) {
      console.error('Error fetching products by category:', error)
      throw error
    }
    
    return data
  }
}
