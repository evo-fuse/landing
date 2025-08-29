import { forwardRef, type PropsWithChildren } from 'react';
import StyledButton, { type StyledButtonProps } from './StyledButton';

export interface ButtonProps extends StyledButtonProps {
  onClick: () => void;
}

const Button = forwardRef<HTMLButtonElement, PropsWithChildren<ButtonProps>>(
  ({ onClick, disable = false, ...rest }, ref) => (
    <StyledButton
      ref={ref}
      disable={disable}
      onClick={disable ? undefined : onClick}
      {...rest}
    />
  ),
);

export default Button;
