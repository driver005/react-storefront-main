import RichText from '@components/RichText'
import { Collapse } from '@components/ui'
import React, { FC } from 'react'


interface ProductDescriptionProps {
    description: any;
    title: string;
}

const ProductDescription: FC<ProductDescriptionProps> = ({ description, title }) => {
    return (
        <>
        {description && (
            <>
            <div className="mt-6">
                <Collapse title={title}>
                    <RichText jsonStringData={description} />
                </Collapse>
            </div>
            {/* <div className="mt-8">
                <h3 className="text-sm font-medium text-gray-900">Highlights</h3>
                <div className="mt-4">
                    <ul role="list" className="pl-4 list-disc text-sm space-y-2">
                        {highlights.map((highlight: any) => (
                            <li key={highlight} className="text-gray-400">
                                <span className="text-gray-600">{highlight}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div> */}
            </>
        )}
        </>
    )
}

export default ProductDescription
