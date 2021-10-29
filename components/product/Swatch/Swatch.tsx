import cn from 'classnames'
import React from 'react'
import s from './Swatch.module.css'
import { CheckIcon } from '@heroicons/react/solid'
import { isDark } from '@lib/colors'
import Button, { ButtonProps } from '@components/ui/Button'
import { RadioGroup } from '@headlessui/react'
interface SwatchProps {
  active?: boolean
  children?: any
  className?: string
  variant?: 'size' | 'color' | string
  color?: string
  opt?: any
  label?: string | null
}

const Swatch: React.FC<Omit<ButtonProps, 'variant'> & SwatchProps> = React.memo(
  ({
    active,
    className = '',
    color = '',
    label = null,
    variant = 'size',
    opt,
    ...props
  }) => {
    variant = variant?.toLowerCase()

    if (label) {
      label = label?.toLowerCase()
    }

    const swatchClassName = cn(
      s.swatch,
      {
        [s.color]: color,
        [s.active]: active ? active : '',
        //[s.size]: variant === 'size',
        [s.dark]: color ? isDark(color) : false,
        [s.textLabel]: !color && label && label.length > 3,
      },
      className
    )
    
    return (
      <RadioGroup.Option
        aria-label="Variant Swatch"
        className={swatchClassName}
        value={opt}
        {...(label && color && { title: label })}
        style={color ? { backgroundColor: color } : {}}
        {...props}
      >
        {color && active && (
          <span>
            <CheckIcon width="24" height="24" />
          </span>
        )}
        {!color ? label : null}
      </RadioGroup.Option>
    )
  }
)

export default Swatch
