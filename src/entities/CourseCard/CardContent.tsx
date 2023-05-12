import React from 'react';
import { Badge, Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import StarRatings from 'react-star-ratings';
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
          <StarRatings
            rating={rating}
            starDimension="20px"
            starSpacing="2px"
            starRatedColor="rgb(230, 67, 47)"
          />
          <Badge className="card-content__details__badge" bg="info">
            {lessonsCount} lessons
          </Badge>
        </div>
        <div className="card-content__details__tags--container">
          {tags.map((tag) => (
            <Badge
              bg="light"
              text="dark"
              key={tag}
              data-testid="badge-test"
              className="card-content__details__tags__item"
            >
              {tag}
            </Badge>
          ))}
        </div>
      </div>
      <Button
        variant="primary"
        size="lg"
        onClick={() => navigate(id)}
        data-testid="content-btn"
        className="card-content__btn"
      >
        Details
      </Button>
    </Card.Body>
  );
};

export default CardContent;
