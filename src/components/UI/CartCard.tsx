'use client'
import { FaMinus, FaPlus } from 'react-icons/fa'
import { FaTrashCan } from 'react-icons/fa6'
import Image from 'next/image'
import { formatPrice } from '@/utils/helpers/formatPrice'
import { useCart } from '@/context/CartContext'
import Link from 'next/link'

interface CartProductProps {
  id: number;
  title: string;
  price: number;
  quantity: number;
  image: string;
}

const CartCard = ({ product }: { product: CartProductProps }) => {
  const { state, dispatch } = useCart();
  const handleRemoveFromCart = (id: number) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: id });
  };

  const handleIncrement = (id: number) => {
    const product = state.items.find((item) => item.id === id);
    if (product) {
      dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity: product.quantity + 1 } });
    }
  };

  const handleDecrement = (id: number) => {
    const product = state.items.find((item) => item.id === id);
    if (product && product.quantity > 1) {
      dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity: product.quantity - 1 } });
    } else {
      dispatch({ type: "REMOVE_FROM_CART", payload: id });
    }
  };

  return (
    <>
      <div key={product.id} className="hidden lg:flex justify-between items-center border px-4 py-2 rounded-md">
        <Link href={`/product/${product.id}`} className="flex items-center gap-4">
          <div className="max-w-20 min-w-20 aspect-square flex items-center justify-center bg-[#F5F6F6] p-1 rounded-sm">
            <Image src={product.image} width={282} height={282} alt={product.title} className="scale-95 h-full w-auto mix-blend-multiply contrast-100" />
          </div>
          <h2 className="font-bold text-base hidden lg:block">{product.title}</h2>
        </Link>
        <div className="flex flex-col lg:flex-row items-center gap-10">
          <span className="text-gray-400 text-sm">{formatPrice(product.price)}</span>
          <div className="flex flex-row items-center gap-1 border border-gray-400 w-fit px-1 text-sm">
            <button onClick={() => handleDecrement(product.id)}>
              <FaMinus />
            </button>
            <div className="w-5 text-center text-base">{product.quantity}</div>
            <button onClick={() => handleIncrement(product.id)}>
              <FaPlus />
            </button>
          </div>
          <span className="font-medium min-w-32 text-center">{formatPrice(product.price * product.quantity)}</span>
          <button
            onClick={() => handleRemoveFromCart(product.id)}
            className="bg-red-500 text-white p-2 rounded-md"
          >
            <FaTrashCan />
          </button>
        </div>
      </div>

      <div className='flex flex-row lg:hidden w-full gap-4 pb-4 border-b border-gray-300'>
        <Link href={`/product/${product.id}`} className="max-w-[80px] min-w-[80px] aspect-square flex items-center justify-center bg-[#F5F6F6] p-1 rounded-sm">
          <Image src={product.image} width={282} height={282} alt={product.title} className="h-full w-auto mix-blend-multiply contrast-100" />
        </Link>
        <div className='flex flex-col justify-between gap-2 w-full'>
          <h2 className="text-sm line-clamp-2">{product.title}</h2>
          <div className='flex flex-row justify-between w-full'>
            <span className="text-gray-600 text-sm">{formatPrice(product.price)}</span>
            <div className="flex flex-row items-center gap-1 border border-gray-400 w-fit px-1 text-[8px]">
              <button onClick={() => handleDecrement(product.id)}>
                <FaMinus />
              </button>
              <div className="w-5 text-center text-sm">{product.quantity}</div>
              <button onClick={() => handleIncrement(product.id)}>
                <FaPlus />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CartCard