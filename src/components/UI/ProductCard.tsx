import Image from 'next/image'
import Link from 'next/link';

// @Interface
import { ProductProps } from '@/types/product'

// @Components
import StarRating from './StarRating'

// @Context
import { useCart } from '@/context/CartContext';
import { toast } from 'react-toastify';
import { useAuth } from '@/context/AuthContext';
import { formatPrice } from '@/utils/helpers/formatPrice';

const ProductCard = ({ product }: { product: ProductProps }) => {
  const { token } = useAuth()
  const { dispatch } = useCart();

  const handleAddToCart = async (product: ProductProps) => {
    if (token) {
      toast.dismiss();
      toast.success("Product successfully added to cart!");
      dispatch({ type: "ADD_TO_CART", payload: product });
    } else {
      toast.dismiss();
      toast.error("Please login to add products.");
    }
  };

  return (
    <div className='flex flex-col h-full justify-between'>
      <Link href={`/product/${product.id}`}>
        <div className="w-full aspect-square flex items-center justify-center bg-[#F5F6F6] p-5 rounded-xl group">
          <Image src={product.image} width={282} height={282} alt={product.title} className="scale-95 h-full w-auto mix-blend-multiply contrast-100 group-hover:scale-110 transition-all duration-300" />
        </div>
        <div className="flex flex-col">
          <h2 className=" font-semibold lg:font-bold text-sm lg:text-base line-clamp-2 mt-2 lg:mt-4 mb-1 lg:mb-2">{product.title}</h2>
          <div className="flex items-start mb-1">
            <span className="lg:font-bold text-sm lg:text-base">{formatPrice(product.price)}</span>
          </div>
          <p className="line-clamp-1 mb-2 text-xs lg:text-base">{product.description}</p>
          <div className="flex flex-row gap-1">
            <StarRating rating={product.rating.rate} />
            <span className="text-sm text-gray-500">({product.rating.count})</span>
          </div>
        </div>
      </Link>
      <button
        className="w-fit rounded-full border border-black px-2 lg:px-4 py-1 lg:py-2 text-xs lg:text-sm mt-3 hover:bg-primary hover:text-white transition-all duration-500"
        onClick={() => handleAddToCart(product)}
      >
        Add to Cart
      </button>
    </div>
  )
}

export default ProductCard