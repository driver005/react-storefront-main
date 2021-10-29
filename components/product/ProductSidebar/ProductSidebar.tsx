import s from './ProductSidebar.module.css'
//import { useAddItem } from '@framework/cart'
import { FC, useEffect, useState } from 'react'
import { ProductColor, ProductDescription, ProductSize } from '@components/product'
//import type { Product } from '@commerce/types/product'
//import { Button, Text, Rating, Collapse, useUI } from '@components/ui'
import {
  getProductVariant,
  selectDefaultOptionFromProduct,
  SelectedOptions,
} from '../helpers'
import { Collapse } from '@components/ui'
import { Button } from '@components/ui'
import { useLocalStorage } from 'react-use'
import { CHECKOUT_TOKEN } from '@lib/const'
import { useAddProductToCheckoutMutation, useCheckoutByTokenQuery, useCreateCheckoutMutation } from 'saleor/api'
import { useAuthState } from '@saleor/sdk'
import { CheckoutError } from '@saleor/sdk/dist/apollo/types'
import { useRouter } from 'next/router'
import Rating from '@components/ui/Rating'


interface ProductSidebarProps {
  product: any
  className?: string
  variantId: string;
}

const productinfo = {
  name: 'Basic Tee 6-Pack',
  price: '$192',
  href: '#',
  breadcrumbs: [
    { id: 1, name: 'Men', href: '#' },
    { id: 2, name: 'Clothing', href: '#' },
  ],
  images: [
    {
      src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-secondary-product-shot.jpg',
      alt: 'Two each of gray, white, and black shirts laying flat.',
    },
    {
      src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg',
      alt: 'Model wearing plain black basic tee.',
    },
    {
      src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg',
      alt: 'Model wearing plain gray basic tee.',
    },
    {
      src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-featured-product-shot.jpg',
      alt: 'Model wearing plain white basic tee.',
    },
  ],
  options: [
    {
      id: "option-color",
      displayName: "Color",
      values: [
        {
          label: "color",
          hexColors: ["#222"]
        }
      ]
    },
    {
      id: "option-size",
      displayName: "Size",
      values: [
        {
          label: "S"
        },
        {
          label: "M"
        },
        {
          label: "L"
        }
      ]
    }
  
  ],
  variants: [
        {
          id: "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzU0NDczMjUwMjQ0MjAss=",
          options: [
            {
              __typename: "MultipleChoiceOption",
              id: "asd",
              displayName: "Size",
              values: [
                {
                  label: "XL"
                }
              ]
            }
          ]
        }
      ],
  sizes: [
    { name: 'XXS', inStock: false },
    { name: 'XS', inStock: true },
    { name: 'S', inStock: true },
    { name: 'M', inStock: true },
    { name: 'L', inStock: true },
    { name: 'XL', inStock: true },
    { name: '2XL', inStock: true },
    { name: '3XL', inStock: true },
  ],
  description:
    'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.',
  highlights: [
    'Hand cut and sewn locally',
    'Dyed with our proprietary colors',
    'Pre-washed & pre-shrunk',
    'Ultra-soft 100% cotton',
  ],
  details:
    'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.',
}


const ProductSidebar: FC<ProductSidebarProps> = ({ product, className, variantId }) => {
    const router = useRouter();
  //const addItem = useAddItem()
  //const { openSidebar } = useUI()
  const [checkoutToken, setCheckoutToken] = useLocalStorage(CHECKOUT_TOKEN);
  const [createCheckout] = useCreateCheckoutMutation();
  const { user } = useAuthState();

  const { data: checkoutData } = useCheckoutByTokenQuery({
    variables: { checkoutToken },
    skip: !checkoutToken || !process.browser,
  });
  const [addProductToCheckout] = useAddProductToCheckoutMutation();
  const [loadingAddToCheckout, setLoadingAddToCheckout] = useState(false);
  const [addToCartError, setAddToCartError] = useState("");
  const [loading, setLoading] = useState(false)
  const [selectedColor, setSelectedOptions] = useState({})
  const [selectedSize, setSelectedSize] = useState(product?.variants![0])

  useEffect(() => {
    selectDefaultOptionFromProduct(productinfo, setSelectedOptions)
  }, [product])
 
  const variant = getProductVariant(productinfo, selectedColor)
  const onAddToCart = async () => {
    // Clear previous error messages
    setAddToCartError("");

    // Block add to checkout button
    setLoadingAddToCheckout(true);
    const errors: CheckoutError[] = [];

    if (!!checkoutData?.checkout && selectedSize) {
      // If checkout is already existing, add products
      const { data: addToCartData } = await addProductToCheckout({
        variables: {
          checkoutToken: checkoutToken,
          variantId: selectedSize.id,
        },
      });
      addToCartData?.checkoutLinesAdd?.errors.forEach((e: any) => {
        if (!!e) {
          errors.push(e);
        }
      });
    } else {
      // Theres no checkout, we have to create one
      const { data: createCheckoutData } = await createCheckout({
        variables: {
          email: user?.email || "anonymous@example.com",
          lines: [
            {
              quantity: 1,
              variantId: variantId,
            },
          ],
        },
      });
      createCheckoutData?.checkoutCreate?.errors.forEach((e: any) => {
        if (!!e) {
          errors.push(e);
        }
      });
      if (createCheckoutData?.checkoutCreate?.checkout?.token) {
        setCheckoutToken(createCheckoutData?.checkoutCreate?.checkout?.token);
      }
    }
    // Enable button
    setLoadingAddToCheckout(false);

    if (errors.length === 0) {
      // Product successfully added, redirect to cart page
      router.push("/cart");
      return;
    }

    // Display error message
    const errorMessages =
      errors.map((e) => {
        return e.message || "";
      }) || [];
    setAddToCartError(errorMessages.join("\n"));
  };

  return (
    <div className={className}>
      <ProductColor
        color={productinfo.options[0]}
        selectedColor={selectedColor}
        setSelectedColor={setSelectedOptions}
      />
      <ProductSize
        product={product.variants}
        selectedSize={selectedSize}
        setSelectedSize={setSelectedSize}
      />
      <div className="flex flex-row justify-between items-center">
        {/* <Rating value={4} /> */}
      </div>
      <div>
        <div className="mt-10">
          <div className="flex flex-row justify-between items-center">
            <Rating value={3} />
            <div className="text-accent-6 pr-1 font-medium text-sm">36 reviews</div>
          </div>
          <Button
            onClick={onAddToCart}
            disabled={loadingAddToCheckout}  
            className="w-full bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
            {loadingAddToCheckout ? "Adding..." : "Add to cart"}
          </Button>
          {!!addToCartError && <p>{addToCartError}</p>}  
        </div>
          {/* <Button
            aria-label="Add to Cart"
            type="button"
            className={s.button}
            onClick={addToCart}
            loading={loading}
            disabled={variant?.availableForSale === false}
          >
            {variant?.availableForSale === false
              ? 'Not Available'
              : 'Add To Cart'}
          </Button> */}
        
      </div>
      <div className="mt-6">
        <ProductDescription
          description={product.description}
          title={"Details"}
        />
      </div>
    </div>
  )
}

export default ProductSidebar
