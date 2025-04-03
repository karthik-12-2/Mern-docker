import { create } from 'zustand';
import axios from 'axios';

export const useProductStore = create((set) => ({
      products: [],
      setProducts: (products) => set({products}),
      createProduct: async (newProduct) => {
            if(!newProduct.name || !newProduct.image || !newProduct.price){
                  return {success: false, message: "Please fill in all fields"}
            }
            const res = await axios.post('/api/products', newProduct);
            set((state) => ({products: [...state.products, res.data.data]}))
            return {success: true, message: "Product created Successfully"};
      },

      fetchProducts: async () => {
            const res = await axios.get('/api/products')
            set({products: res.data.data})
      },

      deleteProducts: async (productId) => {
            const res = await axios.delete(`/api/products/${productId}`)
            console.log(res.data)
            if(!res.data.success) return {success: false, message: res.data.message}
            set(state => ({products: state.products.filter(product => product._id !== productId)}))
            return {success: true, message: res.data.message};
      }
}))