import { ButtonHTMLAttributes, ReactElement } from 'react';

import css from './CleanButton.scss';

interface CleanButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {

}

export function CleanButton({ type = 'button', className, children, ...attrs }: CleanButtonProps): ReactElement {
  const cssClasses = [css.cleanButton, className].join(' ');

  return <button type={type} className={cssClasses} {...attrs}>{children}</button>;
}
