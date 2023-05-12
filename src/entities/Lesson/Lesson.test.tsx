import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import Lesson from 'entities/Lesson';

import { mockCourseWithLessons } from 'shared/mocks/course';

describe('Lesson component', () => {
  const mockHandleClick = jest.fn();

  it('should have lesson active classname', () => {
    render(
      <Lesson
        data={mockCourseWithLessons.lessons[0]}
        activeLesson="1"
        handleClick={mockHandleClick}
      />
    );

    expect(screen.getByTestId('lesson')).toHaveClass('lesson--active');
  });

  it('should not have lesson active classname', () => {
    render(
      <Lesson
        data={mockCourseWithLessons.lessons[0]}
        activeLesson="2"
        handleClick={mockHandleClick}
      />
    );

    expect(screen.getByTestId('lesson')).not.toHaveClass('lesson--active');
  });

  it('should have lesson locked classname', () => {
    render(
      <Lesson
        data={{ ...mockCourseWithLessons.lessons[0], status: 'locked' }}
        activeLesson="2"
        handleClick={mockHandleClick}
      />
    );

    expect(screen.getByTestId('lesson')).toHaveClass('lesson--locked');
  });

  it('should call handleClick with status unlocked', () => {
    render(
      <Lesson
        data={mockCourseWithLessons.lessons[0]}
        activeLesson="2"
        handleClick={mockHandleClick}
      />
    );

    fireEvent.click(screen.getByTestId('change-lesson-btn'));

    expect(mockHandleClick).toHaveBeenCalled();
  });

  it('should not call handleClick with status locked', () => {
    render(
      <Lesson
        data={{ ...mockCourseWithLessons.lessons[0], status: 'locked' }}
        activeLesson="2"
        handleClick={mockHandleClick}
      />
    );

    fireEvent.click(screen.getByTestId('change-lesson-btn'));

    expect(mockHandleClick).not.toHaveBeenCalled();
  });
});
