import { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Video from './Video';
import Content from './Content';
import '../styles.scss';
import { ICourse } from '../../../interfaces/Course.interface';

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
      className="fs-grid-elem courses-list__card"
      onMouseEnter={() => handleHover(true)}
      onMouseLeave={() => handleHover(false)}
    >
      <Video isHovering={isHovering} videoPreview={meta.courseVideoPreview} />
      <Content data={data} />
    </Card>
  );
};

export default CourseCard;
