import React, { FC, PropsWithChildren } from "react";
import { Badge } from "react-bootstrap";

interface IProps extends PropsWithChildren {
  customClassName?: string;
}

const TagsBadge: FC<IProps> = ({ children, customClassName }) => {
  return (
    <Badge
      bg="light"
      text="dark"
      data-testid="badge-test"
      className={customClassName}
    >
      {children}
    </Badge>
  );
};

export default TagsBadge;
