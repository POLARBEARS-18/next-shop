import { Product } from '../../framework/common/types/product'

type AvailableChoices = 'color' | 'size' | string

export type Choices = {
  [P in AvailableChoices]: string
}

export const getVariant = (product: Product, choices: Choices) =>
  product.variants.find((v) =>
    v.options.every((variantOption) => {
      const optionName = variantOption.displayName.toLocaleLowerCase()
      if (optionName in choices) {
        if (choices[optionName] === variantOption.values[0].label) {
          return true
        }
      }

      return false
    })
  )
