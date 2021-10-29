import { RadioGroup } from '@headlessui/react'
import classNames from 'classnames'
import React, { FC } from 'react'

interface ProductSizeProps {
    product: any;
    selectedSize?: any;
    setSelectedSize?: any;
} 

const ProductSize: FC<ProductSizeProps> = ({product, selectedSize, setSelectedSize}) => {
    return (
        <>
        {product != null && product[0].name != "" ? (
            <div className="mt-0">
                <div className="flex items-center justify-between">
                <label className="uppercase font-medium text-sm tracking-wide">Size</label>
                <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                    Size guide
                </a>
                </div>

                <RadioGroup value={selectedSize} onChange={setSelectedSize} className="mt-4">
                <RadioGroup.Label className="sr-only">Choose a size</RadioGroup.Label>
                <div className="grid auto-cols-fr grid-flow-col gap-4 sm:grid-rows-2 lg:grid-rows-none lg:grid-flow-col">
                    {product.map((size: any) => {
                        return(
                        <RadioGroup.Option
                            key={size.name}
                            value={size}
                            //disabled={size.quantityAvailable > 0}
                            className={({ active }) =>
                            classNames(
                                size.quantityAvailable > 0
                                ? 'bg-white shadow-sm text-gray-900 cursor-pointer'
                                : 'bg-gray-50 text-gray-200 cursor-not-allowed',
                                active ? 'ring-2 ring-indigo-500' : '',
                                'group relative border rounded-md py-3 px-4 flex items-center justify-center text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-3'
                            )
                            }
                        >
                            {({ active, checked }) => (
                            <>
                                <RadioGroup.Label as="p">{size.name}</RadioGroup.Label>
                                {size.quantityAvailable > 0 ? (
                                <div
                                    className={classNames(
                                    active ? 'border' : 'border-2',
                                    checked ? 'border-indigo-500' : 'border-transparent',
                                    'absolute -inset-px rounded-md pointer-events-none'
                                    )}
                                    aria-hidden="true"
                                />
                                ) : (
                                <div
                                    aria-hidden="true"
                                    className="absolute -inset-px rounded-md border-2 border-gray-200 pointer-events-none"
                                >
                                    <svg
                                    className="absolute inset-0 w-full h-full text-gray-200 stroke-2"
                                    viewBox="0 0 100 100"
                                    preserveAspectRatio="none"
                                    stroke="currentColor"
                                    >
                                    <line x1={0} y1={100} x2={100} y2={0} vectorEffect="non-scaling-stroke" />
                                    </svg>
                                </div>
                                )}
                            </>
                        )}
                    </RadioGroup.Option>
                    )})}
                </div>
                </RadioGroup>
            </div>
        ) : (
            <p className="text-lg- text-yellow-600">Sold out!</p>
        )}
        </>    
    )
}

export default ProductSize
