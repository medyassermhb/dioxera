// src/lib/store.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image?: string;
  quantity: number;
}

export type Language = 'en' | 'fr';

interface AppStore {
  // Cart State
  items: CartItem[];
  isCartOpen: boolean; // Renamed from isOpen to be more specific
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  
  // Cart Actions
  toggleCart: () => void;
  openCart: () => void;   // Restored
  closeCart: () => void;  // Restored

  // Language State
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
}

export const useAppStore = create<AppStore>()(
  persist(
    (set) => ({
      // --- Cart Logic ---
      items: [],
      isCartOpen: false,
      
      addItem: (item) =>
        set((state) => {
          const existing = state.items.find((i) => i.id === item.id);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
              ),
              isCartOpen: true, 
            };
          }
          return { 
            items: [...state.items, { ...item, quantity: 1 }],
            isCartOpen: true 
          };
        }),

      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((i) => i.id !== id),
        })),

      clearCart: () => set({ items: [] }),
      
      toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),
      openCart: () => set({ isCartOpen: true }),
      closeCart: () => set({ isCartOpen: false }),

      // --- Language Logic ---
      language: 'en',
      setLanguage: (lang) => set({ language: lang }),
      toggleLanguage: () => set((state) => ({ 
        language: state.language === 'en' ? 'fr' : 'en' 
      })),
    }),
    {
      name: 'dioxera-storage',
      skipHydration: true,
    }
  )
);