import React, { useState } from "react";
import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { ApolloQueryResult } from "@apollo/client";
import { useAuthState } from "@saleor/sdk";
import {
  useAddProductToCheckoutMutation,
  ProductPathsQuery,
  ProductPathsDocument,
  useCheckoutByTokenQuery,
  CheckoutError,
  useCreateCheckoutMutation,
  ProductBySlugDocument,
  ProductBySlugQuery,
} from "../../saleor/api";
import apolloClient from "../../lib/graphql";

import { ProductPageSeo } from "../../components/seo/ProductPageSeo";
import RichText from "../../components/RichText";
import BaseTemplate from "../../components/BaseTemplate";
import VariantSelector from "../../components/VariantSelector";
import { useLocalStorage } from "react-use";
import { CHECKOUT_TOKEN } from "../../lib/const";
import Custom404 from "pages/404";
import { RadioGroup } from "@headlessui/react";
import { StarIcon } from "@heroicons/react/solid";
import { ProductSlider, ProductView } from "components/product";

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
const reviews = { href: '#', average: 4, totalCount: 117 }

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ')
}


const ProductPage: React.VFC<InferGetStaticPropsType<typeof getStaticProps>> =
  ({ productSSG }) => {
    const [product, setProduct] = useState(productSSG?.data?.product)
    
    return (
    <BaseTemplate>
      <ProductPageSeo product={productSSG.data} />
      <main className="bg-white">
        
          {/* Image gallery */}
          <ProductView product={product}  />
          {/* Product info */}
        </main>
        </BaseTemplate>
  )
}

export default ProductPage;

export async function getStaticPaths() {
  const result: ApolloQueryResult<ProductPathsQuery | undefined> =
    await apolloClient.query({
      query: ProductPathsDocument,
      variables: {},
    });
  const paths =
    result.data?.products?.edges.map(({ node }) => ({
      params: { slug: node.slug },
    })) || [];

  return {
    paths,
    fallback: "blocking",
  };
}

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const productSlug = context.params?.slug?.toString();
  console.log(productSlug)
  const data: ApolloQueryResult<ProductBySlugQuery | undefined> =
    await apolloClient.query({
      query: ProductBySlugDocument,
      variables: {
        slug: productSlug,
      },
    });
  return {
    props: {
      productSSG: data,
    },
    revalidate: 60, // value in seconds, how often ISR will trigger on the server
  };
};

  //     return (
  //       <BaseTemplate>
  //         <ProductPageSeo product={product} />

  //         <main className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-7xl mx-auto pt-8 px-8">
  //           <div className="w-full aspect-w-1 aspect-h-1 ">
  //             {!!productImage && (
  //               <Image
  //                 src={productImage.url}
  //                 alt="Product cover image"
  //                 layout="fill"
  //                 objectFit="cover"
  //                 className="w-full h-full object-center object-cover"
  //               />
  //             )}
  //           </div>

  //           <div className="space-y-8">
  //             <div>
  //               <h1 className="text-4xl font-bold tracking-tight text-gray-800">
  //                 {product?.name}
  //               </h1>
  //               <Link href={`/category/${product?.category?.slug}`} passHref>
  //                 <p className="text-lg mt-2 font-medium text-gray-500 cursor-pointer">
  //                   {product?.category?.name}
  //                 </p>
  //               </Link>
  //             </div>

  //             <p className="text-2xl text-gray-900">{price}</p>

  //             {product?.description && (
  //               <div className="text-base text-gray-700 space-y-6">
  //                 <RichText jsonStringData={product.description} />
  //               </div>
  //             )}
  //             <VariantSelector
  //               product={product}
  //               selectedVariantID={selectedVariantID}
  //             />
  //             {selectedVariant && selectedVariant?.quantityAvailable > 0 ? (
  //               <button
  //                 onClick={onAddToCart}
  //                 type="submit"
  //                 disabled={loadingAddToCheckout}
  //                 className="max-w-xs w-full bg-blue-500 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-white hover:bg-blue-600 focus:outline-none"
  //               >
  //                 {loadingAddToCheckout ? "Adding..." : "Add to cart"}
  //               </button>
  //             ) : (
  //               <p className="text-lg- text-yellow-600">Sold out!</p>
  //             )}
  //             {!!addToCartError && <p>{addToCartError}</p>}
  //           </div>
  //         </main>
  //       </BaseTemplate>
  //     );
  //   };

  