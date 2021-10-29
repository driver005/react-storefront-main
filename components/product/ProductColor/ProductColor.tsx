import { memo } from 'react'
import { Swatch } from '@components/product'
// import type { ProductOption } from '@commerce/types/product'
import { SelectedOptions } from '../helpers'
import { RadioGroup } from '@headlessui/react'

interface ProductColorProps {
  color: any
  selectedColor: any
  setSelectedColor: React.Dispatch<React.SetStateAction<SelectedOptions>>
}

const ProductColor: React.FC<ProductColorProps> = ({
  color,
  selectedColor,
  setSelectedColor,
}) => {
 
  const handelChange = (value: any, name: any) => {
    setSelectedColor((selectedColor) => {
      return {
        ...selectedColor,
        [name.toLowerCase()]: value.hexColors,
      }
    })
  }
  
  return (
    <div>
        <RadioGroup key={color.displayName} value={selectedColor} onChange={(e) => handelChange(e, color.displayName)} className="mt-4">
        <div className="pb-4" >
          <RadioGroup.Label className="uppercase font-medium text-sm tracking-wide">
            {color.displayName}
          </RadioGroup.Label>
          <div className="flex flex-row py-4">
            {color.values.map((v: any, i: number) => {
              const active = selectedColor[color.displayName.toLowerCase()]

              return (
                <Swatch
                  key={`${color.id}-${i}`}
                  opt={v}
                  active={v.hexColors === active}
                  variant={color.displayName}
                  color={v.hexColors ? v.hexColors[0] : ''}
                  label={v.label}
                />
              )
            })}
          </div>
        </div>
        </RadioGroup>
      
    </div>
  )
}

export default memo(ProductColor)
