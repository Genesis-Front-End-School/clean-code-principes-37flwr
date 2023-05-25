import React from "react";
import { Badge } from "react-bootstrap";
import cn from "classnames";
import "./styles.scss";

const LessonsBadge = ({
  lessonsCount,
  customClassName,
}: {
  lessonsCount: number;
  customClassName?: string;
}) => {
  return (
    <Badge className={cn("lessons-badge", customClassName)} bg="info">
      {lessonsCount} lessons
    </Badge>
  );
};

export default LessonsBadge;
