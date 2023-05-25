import { useState } from 'react';
import { Card } from 'react-bootstrap';

import Video from './Video';
import Content from './CardContent';

import { ICourse } from 'shared/interfaces/Course.interface';
import 'shared/styles/styles.scss';

interface ICourseCardProps {
  data: ICourse;
}

const CourseCard = ({ data }: ICourseCardProps) => {
  const { meta } = data;
  const [isHovering, setIsHovering] = useState(false);

  const handleHover = (isHover: boolean) => {
    setIsHovering(isHover);
  };

  return (
    <Card
      className="fs-grid-elem course-card"
      onMouseEnter={() => handleHover(true)}
      onMouseLeave={() => handleHover(false)}
      data-testid="course-card"
    >
      <Video isHovering={isHovering} videoPreview={meta.courseVideoPreview} />
      <Content data={data} />
    </Card>
  );
};

export default CourseCard;
