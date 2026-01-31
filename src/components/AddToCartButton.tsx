"use client";

import { useCart } from "@/lib/store";
import { ShoppingBag, CheckCircle2 } from "lucide-react";
import { useState } from "react";

export default function AddToCartButton({ product }: { product: any }) {
  const { addItem } = useCart();
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
        <>ADDED <CheckCircle2 size={20} /></>
      ) : (
        <>ADD TO CART <ShoppingBag size={20} /></>
      )}
    </button>
  );
}