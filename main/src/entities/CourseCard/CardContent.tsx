import React from 'react';
import { Card } from 'react-bootstrap';
import {
  LessonsBadge,
  StarRating,
  PrimaryButton,
  TagsBadge,
} from 'component-lib';
import { useNavigate } from 'react-router-dom';
import { ICourse } from 'shared/interfaces/Course.interface';
import './styles.scss';

interface IContentProps {
  data: ICourse;
}

const CardContent = ({ data }: IContentProps) => {
  const { id, description, title, lessonsCount, tags, rating } = data;
  const navigate = useNavigate();

  return (
    <Card.Body className="d-grid gap-2">
      <Card.Title className="card-content__title">{title}</Card.Title>
      <Card.Text className="card-content__text">{description}</Card.Text>
      <div className="card-content__details">
        <div className="card-content__details--container">
          <StarRating rating={rating} />
          <LessonsBadge
            lessonsCount={lessonsCount}
            customClassName="card-content__details__badge"
          />
        </div>
        <div className="card-content__details__tags--container">
          {tags.map((tag) => (
            <TagsBadge key={tag}>{tag}</TagsBadge>
          ))}
        </div>
      </div>
      <PrimaryButton onClick={() => navigate(id)}>Details</PrimaryButton>
    </Card.Body>
  );
};

export default CardContent;
