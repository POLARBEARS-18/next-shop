import { ButtonHTMLAttributes, FC, ReactNode } from 'react'
import cn from 'classnames'
import s from './Button.module.css'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode | ReactNode[]
  onClick: () => void
}

const Button: FC<Props> = ({ children, className, onClick }) => {
  const a = 'a'
  return (
    <button type="button" onClick={onClick} className={cn(s.root, className)}>
      {children}
    </button>
  )
}

export default Button
