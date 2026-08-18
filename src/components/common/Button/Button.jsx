import React from 'react';
import './Button.css';

export const Button = ({
  children,
  variant = 'primary', // primary, secondary, outline, danger, ghost
  size = 'md', // sm, md, lg
  type = 'button',
  disabled = false,
  fullWidth = false,
  icon: Icon,
  iconPosition = 'left',
  onClick,
  className = '',
  ...props
}) => {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`btn btn-${variant} btn-${size} ${fullWidth ? 'btn-full' : ''} ${className}`}
      {...props}
    >
      {Icon && iconPosition === 'left' && <Icon className="btn-icon btn-icon-left" size={18} />}
      <span>{children}</span>
      {Icon && iconPosition === 'right' && <Icon className="btn-icon btn-icon-right" size={18} />}
    </button>
  );
};

export default Button;
