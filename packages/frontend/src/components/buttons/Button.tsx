import {
  Button as ShadcnButton,
  ButtonProps as ShadcnButtonProps
} from '@/components/ui/button';

interface ButtonProps extends ShadcnButtonProps {
  onClick?: () => void;
}

const Button = ({
  onClick,
  children,
  size,
  variant,
  className
}: ButtonProps) => {
  return (
    <ShadcnButton
      className={className}
      variant={variant}
      size={size}
      onClick={onClick}
    >
      {children}
    </ShadcnButton>
  );
};

export default Button;
