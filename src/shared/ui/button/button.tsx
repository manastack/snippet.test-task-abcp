import { ButtonHTMLAttributes, FC, PropsWithChildren } from 'react'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string
}

const Button: FC<PropsWithChildren<Props>> = ({
  children,
  className = '',
  ...buttonProps
}) => <button {...{ ...buttonProps, className }}>{children}</button>

export default Button
