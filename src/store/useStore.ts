import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, Product, User } from '../types';

interface AppState {
  cart: CartItem[];
  wishlist: Product[];
  user: User | null;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  toggleWishlist: (product: Product) => void;
  setUser: (user: User | null) => void;
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      cart: [],
      wishlist: [],
      user: null,
      addToCart: (product, quantity = 1) =>
        set((state) => {
          const existingItem = state.cart.find((item) => item.id === product.id);
          if (existingItem) {
            return {
              cart: state.cart.map((item) =>
                item.id === product.id
                  ? { ...item, cantidad: item.cantidad + quantity }
                  : item
              ),
            };
          }
          return { cart: [...state.cart, { ...product, cantidad: quantity }] };
        }),
      removeFromCart: (productId) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== productId),
        })),
      updateCartQuantity: (productId, quantity) =>
        set((state) => ({
          cart: state.cart.map((item) =>
            item.id === productId ? { ...item, cantidad: Math.max(1, quantity) } : item
          ),
        })),
      clearCart: () => set({ cart: [] }),
      toggleWishlist: (product) =>
        set((state) => {
          const exists = state.wishlist.some((item) => item.id === product.id);
          if (exists) {
            return {
              wishlist: state.wishlist.filter((item) => item.id !== product.id),
            };
          }
          return { wishlist: [...state.wishlist, product] };
        }),
      setUser: (user) => set({ user }),
    }),
    {
      name: 'herraventas-storage',
    }
  )
);
