import { FC, memo } from 'react'
import rangeMap from '@lib/range-map'
import { StarIcon } from '@heroicons/react/solid'
import cn from 'classnames'

export interface RatingProps {
  value: number
}

const Quantity: FC<RatingProps> = ({ value = 5 }) => (
  <div className="flex flex-row py-6 text-accent-9">
    {rangeMap(5, (i) => (
      <span
        key={`star_${i}`}
        className={cn('inline-block ml-1 ')}
      >
        <StarIcon width="24" height="24" />
      </span>
    ))}
  </div>
)

export default memo(Quantity)
