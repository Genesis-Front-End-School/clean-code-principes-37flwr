import React from 'react';
import { render, screen } from '@testing-library/react';

import Details from '../Details';

import { mockCourseWithLessons } from '../../../mocks/course';

describe('Details component', () => {
  const activeLessonId = '278e5a0e-8df1-4646-9984-10289d52dc2d';
  const handleChange = jest.fn();

  it('should render lessons', () => {
    render(
      <Details
        courseDetails={mockCourseWithLessons}
        activeLessonId={activeLessonId}
        handleChange={handleChange}
      />
    );

    expect(screen.getAllByTestId('lesson')).toHaveLength(
      mockCourseWithLessons.lessons.length
    );
  });

  it('should not render lessons if no lessons provided', () => {
    render(
      <Details
        courseDetails={{ ...mockCourseWithLessons, lessons: [] }}
        activeLessonId={activeLessonId}
        handleChange={handleChange}
      />
    );

    expect(screen.queryByTestId('lesson')).not.toBeInTheDocument();
  });
});
