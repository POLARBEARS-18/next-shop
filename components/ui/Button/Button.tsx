import { ButtonHTMLAttributes, ComponentType, FC, HTMLAttributes, ReactNode } from 'react'
import cn from 'classnames'
import s from './Button.module.css'
import { LoadingDots } from '../LoadingDots/LoadingDots'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode | ReactNode[]
  onClick: () => void
  isLoading?: boolean
  Component?: string | ComponentType<HTMLAttributes<HTMLElement>>
  href?: string
}

const Button: FC<Props> = ({ children, className, isLoading = false, Component = 'button', ...rest }) => {
  const rootClassName = cn(s.root, className, {
    [s.loading]: isLoading,
  })
  return (
    <Component className={rootClassName} {...rest}>
      {children}
      {isLoading && (
        <i className="flex m-0 pl-2">
          <LoadingDots />
        </i>
      )}
    </Component>
  )
}

export default Button
