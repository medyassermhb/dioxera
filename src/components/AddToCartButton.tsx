"use client";

import { useAppStore } from "@/lib/store";
import { dictionary } from "@/lib/dictionary";
import { ShoppingBag, CheckCircle2 } from "lucide-react";
import { useState } from "react";

export default function AddToCartButton({ product }: { product: any }) {
  const { addItem, language } = useAppStore();
  const t = dictionary[language];
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <button 
      onClick={handleAdd}
      className={`w-full py-4 mt-6 rounded-full font-black text-lg flex items-center justify-center gap-2 transition-all shadow-lg active:scale-95 ${
        added 
          ? "bg-green-500 text-white" 
          : "bg-brand-dark text-white hover:bg-brand-primary hover:text-brand-dark"
      }`}
    >
      {added ? (
        <> {t.cart.added} <CheckCircle2 size={20} /></>
      ) : (
        <> {t.cart.addToCart} <ShoppingBag size={20} /></>
      )}
    </button>
  );
}