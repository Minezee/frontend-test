'use client';

import Script from "next/script";
import { useState } from "react";
import { useRouter } from "next/navigation";

// @Hooks
import { useCart } from "@/context/CartContext";
import { useCheckout } from "@/hooks/init";

// @Libraries
import { toast } from "react-toastify";

// @Helpers
import { formatPrice } from "@/utils/helpers/formatPrice";

// @Components
import CartCard from "@/components/UI/CartCard";

declare global {
  interface Window {
    snap: any;
  }
}

const CartPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter()
  const { state, dispatch } = useCart();
  const { mutateAsync: checkout } = useCheckout();
  const totalPrice = state.items.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleCheckout = () => {
    setIsLoading(true)
    const checkoutPayload = {
      amount: totalPrice.toFixed(0),
      customer: {
        email: "nauvalfahreza03@example.com",
        first_name: "Nauval",
        last_name: "Fahreza",
      },
    };

    checkout({
      payload: checkoutPayload
    }).then((res) => {
      console.log("Checkout Successful", res);
      setIsLoading(false);
      window.snap.pay(res.token, {
        onSuccess: () => {
          dispatch({ type: "REMOVE_ALL_CART" });
          router.push("/product");
          toast.success("Success checkout product");
        },
        onError: () => {
          toast.error("Failed checkout product");
          router.push("/cart");
        },
        onClose: () => {
          toast.info("Payment was canceled");
          router.push("/cart");
        },
      });
    }).catch((err) => {
      setIsLoading(false);
      toast.error("Something went wrong :(")
    });
  }

  return (
    <main>
      <Script
        src="https://app.sandbox.midtrans.com/snap/snap.js"
        data-client-key={process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY}
        strategy="lazyOnload"
      />
      <div className="grid grid-cols-1 gap-3 relative container py-5">
        {state.items.map((product) => (
          <CartCard product={product}/>
        ))}
      </div>

      {state.items.length < 1 &&
        <div className="h-[70vh] w-full flex items-center justify-center text-2xl font-bold text-primary">
          You cart is empty
        </div>}

      {/* @Total Price */}
      {state.items.length > 0
        &&
        <div className={`${state.items.length >= 5 ? "sticky" : "fixed"} bottom-0 right-0 left-0 bg-white/50 backdrop-blur-sm border-t border-gray-500 h-24 px-4 flex items-center justify-between`}>
          <div className="font-medium lg:font-bold text-sm lg:text-base">Total Price: <span className="font-medium">{formatPrice(totalPrice)}</span></div>
          <button onClick={handleCheckout} className="bg-gray-800 px-4 py-2 text-base lg:text-xl text-white rounded-lg">{!isLoading ? "Checkout" : "Please wait..."}</button>
        </div>
      }
    </main>
  );
};

export default CartPage;
