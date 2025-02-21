import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { ProductProp } from "@/lib/type";

export interface ItemsProps extends ProductProp {
  quantity: number;
}

interface CartStoreProps {
  items: ItemsProps[];
  addItem: (product: ProductProp, count: number) => void;
  removeItem: (productId: string) => void;
  updateItemQuantity: (props: { id: string; quantity: number }) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartStoreProps>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product, count) => {
        const { items } = get();
        const existingItem = items.find((item) => item.id === product.id);

        if (existingItem) {
          // Increase quantity if item exists
          set({
            items: items.map((item) =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          });
        } else {
          // Add new item with quantity 1
          set({ items: [...items, { ...product, quantity: count }] });
        }
      },

      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((product) => product.id !== id),
        })),

      updateItemQuantity: ({
        id,
        quantity,
      }: {
        id: string;
        quantity: number;
      }) => {
        if (quantity <= 0) {
          set((state) => ({
            items: state.items.filter((product) => product.id !== id),
          }));
        } else {
          set((state) => ({
            items: state.items.map((item) =>
              item.id === id ? { ...item, quantity } : item
            ),
          }));
        }
      },

      clearCart: () => set({ items: [] }),
    }),
    {
      name: "veges-cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
