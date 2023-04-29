import { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Video from './Video';
import Content from './Content';
import '../styles.scss';
import { ICourse } from '../../../interfaces/Course.interface';

interface IProps {
  data: ICourse;
}

const CourseCard = ({ data }: IProps) => {
  const { meta } = data;
  const [isHovering, setIsHovering] = useState<boolean>(false);

  const handleHover = (bool: boolean) => {
    setIsHovering(bool);
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
