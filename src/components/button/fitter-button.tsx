import React from 'react';
import { Button } from '../ui/button';

type IProps = {
  size?: 'big' | 'normal';
  beforeIcon?: React.ReactNode;
  afterIcon?: React.ReactNode;
  children?: React.ReactNode;
};

export default function FillterButton({ size, beforeIcon, afterIcon, children }: IProps) {
  return (
    <Button className="size-gi-do">
      {beforeIcon && <span className="mr-2">{beforeIcon}</span>}
      {children}
      {afterIcon && <span className="ml-2">{afterIcon}</span>}
    </Button>
  );
}
