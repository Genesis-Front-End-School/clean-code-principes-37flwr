import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import CourseCard from '../';

jest.mock('react-router-dom', () => ({
  useNavigate: () => jest.fn(),
}));

let initialProps = {
  containsLockedLessons: false,
  description: 'test-description',
  duration: 123,
  id: '1',
  launchDate: '',
  lessonsCount: 3,
  meta: {
    courseVideoPreview: {
      duration: 12,
      link: 'link-1',
      previewImageLink: 'preview-1',
    },
    skills: ['skill-1', 'skill-2'],
    slug: 'slug',
  },
  previewImageLink: 'preview-img-1',
  rating: 4,
  status: 'status',
  tags: ['tag-1', 'tag-2'],
  title: 'title-1',
};

describe('Course card component', () => {
  const mockSetState = jest.fn();
  beforeEach(() => {
    jest
      .spyOn(React, 'useState')
      .mockImplementationOnce(() => [false, mockSetState]);
  });

  it('should update hover state on mouse enter and leave', () => {
    render(<CourseCard data={initialProps} />);
    const courseCard = screen.getByTestId('course-card');

    fireEvent.mouseEnter(courseCard);
    expect(mockSetState).toHaveBeenCalledWith(true);

    fireEvent.mouseLeave(courseCard);
    expect(mockSetState).toHaveBeenCalledWith(false);
  });
});
