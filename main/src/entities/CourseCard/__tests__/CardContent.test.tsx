import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import Content from 'entities/CourseCard/CardContent';

const mockUseNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  useNavigate: () => mockUseNavigate,
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

describe('Content component', () => {
  it('should render component correctly', () => {
    render(<Content data={initialProps} />);

    expect(screen.getAllByTestId('badge-test')).toHaveLength(
      initialProps.tags.length
    );
    expect(screen.getByText(initialProps.title)).toBeInTheDocument();
    expect(screen.getByText(initialProps.description)).toBeInTheDocument();
    expect(
      screen.getByText(`${initialProps.lessonsCount} lessons`)
    ).toBeInTheDocument();
  });

  it('should navigate on button click', () => {
    render(<Content data={initialProps} />);

    fireEvent.click(screen.getByTestId('content-btn'));

    expect(mockUseNavigate).toHaveBeenCalledTimes(1);
    expect(mockUseNavigate).toHaveBeenCalledWith(initialProps.id);
  });
});
