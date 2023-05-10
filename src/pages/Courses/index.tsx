import React from 'react';
import CoursesList from 'widgets/CoursesList';
import './styles.scss';

const Courses = () => (
  <div className="page-layout courses-page" data-testid="courses-page">
    <CoursesList />
  </div>
);

export default Courses;
