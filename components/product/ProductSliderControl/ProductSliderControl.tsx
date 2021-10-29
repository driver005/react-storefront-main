import { FC, MouseEventHandler, memo } from 'react'
import cn from 'classnames'
import s from './ProductSliderControl.module.css'
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/solid'
import Button from '@components/ui/Button'

interface ProductSliderControl {
  onPrev: MouseEventHandler<HTMLButtonElement>
  onNext: MouseEventHandler<HTMLButtonElement>
  backgroundColor?: string
}

const ProductSliderControl: FC<ProductSliderControl> = ({
  onPrev,
  onNext,
  backgroundColor = 'bg-purple-700',
}) => (
  <div className={cn(s.control, backgroundColor)}>
    <Button
      className={cn(s.leftControl)}
      onClick={onPrev}
      aria-label="Previous Product Image"
    >
      <ArrowLeftIcon width="24" height="24" />
    </Button>
    <Button
      className={cn(s.rightControl)}
      onClick={onNext}
      aria-label="Next Product Image"
    >
      <ArrowRightIcon width="24" height="24" />
    </Button>
  </div>
)

export default memo(ProductSliderControl)
