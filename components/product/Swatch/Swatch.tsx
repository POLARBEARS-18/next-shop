import { FC } from 'react'
import cn from 'classnames'
import s from './Swatch.module.css'
import Check from '../../icons/Check'
import { isDark } from '../../../lib/colort'

interface Props {
  size?: 'sm' | 'md' | 'lg'
  color?: string
  label?: string
  active?: boolean
  variant?: 'size' | 'color' | string
  onClick: () => void
}

const Swatch: FC<Props> = ({ color, label, variant, active, size = 'md', ...rest }) => {
  label = label?.toLowerCase()
  variant = variant?.toLocaleLowerCase()

  const rootClassName = cn(s.root, {
    [s.active]: active,
    [s.color]: color,
    [s.size]: variant === 'size',
    [s.dark]: color && isDark(color),
    [s.sm]: size === 'sm',
  })

  return (
    <button type="button" {...rest} style={color ? { backgroundColor: color } : {}} className={rootClassName}>
      {variant === 'color' && active && (
        <span>
          <Check />
        </span>
      )}
      {variant === 'size' ? label : null}
    </button>
  )
}

export default Swatch
