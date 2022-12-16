import { ComponentType, FC, HTMLAttributes, ReactNode } from 'react'

interface ContainerProps {
  children: ReactNode | ReactNode[]
  el?: ComponentType<HTMLAttributes<HTMLElement>>
}

const Container: FC<ContainerProps> = ({ children, el: Component = 'div' }) => (
  <Component className="px-6 mx-auto max-w-8xl">{children}</Component>
)

export default Container
