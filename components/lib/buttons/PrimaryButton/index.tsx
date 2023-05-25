import React, { FC, PropsWithChildren } from "react";
import { Button } from "react-bootstrap";
import cn from "classnames";

interface IProps extends PropsWithChildren {
  onClick: () => void;
  customClassName?: string;
  dataTestId?: string;
}

const PrimaryButton = ({
  onClick,
  customClassName,
  dataTestId,
  children,
}: IProps) => {
  return (
    <Button
      variant="primary"
      size="lg"
      onClick={onClick}
      data-testid={dataTestId || "content-btn"}
      className={cn(customClassName, "primary-btn")}
    >
      {children}
    </Button>
  );
};

export default PrimaryButton;
