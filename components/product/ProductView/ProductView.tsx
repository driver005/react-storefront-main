import cn from 'classnames'
import Image from 'next/image'
import { NextSeo } from 'next-seo'
import s from './ProductView.module.css'
import { FC, useState } from 'react'
//import type { Product, ProductQuery } from '@commerce/types/product'
//import usePrice from '@framework/product/use-price'
//import { WishlistButton } from '@components/wishlist'
import { ProductSlider, ProductCard } from '@components/product'
import { Container } from '@components/ui'
import ProductSidebar from '../ProductSidebar'
import ProductTag from '../ProductTag'
import RichText from '@components/RichText'
import { StarIcon } from '@heroicons/react/outline'
import classNames from 'classnames'
import { RadioGroup } from '@headlessui/react'
import { useRouter } from 'next/router'
import { useLocalStorage } from 'react-use'
import { CHECKOUT_TOKEN } from '@lib/const'
import { useAddProductToCheckoutMutation, useCheckoutByTokenQuery, useCreateCheckoutMutation } from 'saleor/api'
import Custom404 from 'pages/404'
import { CheckoutError } from '@saleor/sdk/dist/apollo/types'
import { useAuthState } from '@saleor/sdk'
interface ProductViewProps {
  product: any
  productData?: any
  relatedProducts?: any[]
}

const reviews = { href: '#', average: 4, totalCount: 117 }

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
  colors: [
    { name: 'White', class: 'bg-white', selectedClass: 'ring-gray-400' },
    { name: 'Gray', class: 'bg-gray-200', selectedClass: 'ring-gray-400' },
    { name: 'Black', class: 'bg-gray-900', selectedClass: 'ring-gray-900' },
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

const ProductView: FC<ProductViewProps> = ({ product, productData, relatedProducts }) => {
  const router = useRouter();

  if (!product?.id) {
    return <Custom404 />;
  }
  
  // We have to check if code is run on the browser
  // before we can use the router
  const queryVariant = process.browser
    ? router.query.variant?.toString()
    : undefined;
  const selectedVariantID = queryVariant || product?.variants![0]!.id!;

  // setSelectedVariant({product?.variants?.find(
  //   (v) => v?.id === selectedVariantID
  // )})

  const color = 'bg-purple-700';
  const AlbumColor = 'bg-purple-900';
  return (
    <>
      <Container className="max-w-none w-full" clean>
        <div className={cn(s.root, 'fit')}>
          <div className={cn(s.main, 'fit')}>
            <ProductTag
              name={product.name}
              price={`${product.pricing?.priceRange?.start?.gross.localizedAmount}`}
              fontSize={32}
            />
            {product.media && (
              <div className={cn(s.sliderContainer, color)}>
                <ProductSlider key={product.id} AlbumbackgroundColor={AlbumColor} ButtonbackgroundColor={color}>
                  {product.media.map((image: any, i: any) => (
                    <div key={image.url} className={s.imageContainer}>
                      <Image
                        className={s.img}
                        src={image.url!}
                        alt={image.alt || 'Product Image'}
                        width={600}
                        height={600}
                        priority={i === 0}
                        quality="85"
                      />
                    </div>
                  ))}
                </ProductSlider>
              </div>
            )}
            
            {/* {product.variants && (
              <WishlistButton
                className={s.wishlistButton}
                productId={product.id}
                variant={product.variants[0]}
              />
            )} */}
          </div>
        
          <ProductSidebar key={product.id} product={product} className={s.sidebar} variantId={selectedVariantID} />
        </div>
        {/* <hr className="mt-7 border-accent-2" /> */}
        {/* <section className="py-12 px-6 mb-10">
          <Text variant="sectionHeading">Related Products</Text>
          <div className={s.relatedProductsGrid}>
            {relatedProducts.map((p) => (
              <div
                key={p.path}
                className="animated fadeIn bg-accent-0 border border-accent-2"
              >
                <ProductCard
                  noNameTag
                  product={p}
                  key={p.path}
                  variant="simple"
                  className="animated fadeIn"
                  imgProps={{
                    width: 300,
                    height: 300,
                  }}
                />
              </div>
            ))}
          </div>
        </section> */}
      </Container>
      <NextSeo
        title={product.name}
        description={product.description}
        openGraph={{
          type: 'website',
          title: product.name,
          description: product.description,
          images: [
            {
              url: product.thumbnail?.url!,
              width: 800,
              height: 600,
              alt: product.name,
            },
          ],
        }}
      />
    </>
  )
}

export default ProductView
