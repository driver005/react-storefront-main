//import type { Product } from '@commerce/types/product'
export type SelectedOptions = Record<string, string | null>
import { Dispatch, SetStateAction } from 'react'

export function getProductVariant(product: any, opts: SelectedOptions) {
  console.log("test")
  const variant = product.variants.find((variant: any) => {
    return Object.entries(opts).every(([key, value]) =>
      variant.options.find((option: any) => {
        if (
          option.__typename === 'MultipleChoiceOption' &&
          option.displayName.toLowerCase() === key.toLowerCase()
        ) {
          return option.values.find((v: any) => v.label.toLowerCase() === value)
        }
      })
    )
  })
  return variant
}

export function selectDefaultOptionFromProduct(
  product: any,
  updater: Dispatch<SetStateAction<SelectedOptions>>
) {
  console.log(product)
  // Selects the default option
  product.variants[0].options?.forEach((v: any) => {
    updater((choices) => ({
      ...choices,
      [v.displayName.toLowerCase()]: v.values[0].label.toLowerCase(),
    }))
  })
}
