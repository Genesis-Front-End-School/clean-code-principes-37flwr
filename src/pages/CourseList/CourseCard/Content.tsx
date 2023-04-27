import React from 'react';
import { Badge, Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import StarRatings from 'react-star-ratings';
import { Course } from '../Course.type';

type Props = {
  data: Course;
};

const Content = ({ data }: Props) => {
  const { id, description, title, lessonsCount, tags, rating } = data;
  const navigate = useNavigate();

  return (
    <Card.Body className="d-grid gap-2">
      <Card.Title>{title}</Card.Title>
      <Card.Text>{description}</Card.Text>
      <div className="courses-list__card__details">
        <div className="courses-list__card__details--container">
          <StarRatings
            rating={rating}
            starDimension="20px"
            starSpacing="2px"
            starRatedColor="rgb(230, 67, 47)"
          />
          <Badge className="courses-list__card__details__badge" bg="info">
            {lessonsCount} lessons
          </Badge>
        </div>
        <div className="courses-list__card__details__tags--container">
          {tags.map((tag) => (
            <Badge bg="light" text="dark" key={tag}>
              {tag}
            </Badge>
          ))}
        </div>
      </div>
      <Button variant="primary" size="lg" onClick={() => navigate(id)}>
        Details
      </Button>
    </Card.Body>
  );
};

export default Content;
