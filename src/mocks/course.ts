import { ICourseWithLessons } from '../interfaces/Course.interface';

export const mockCourse = {
  data: {
    containsLockedLessons: false,
    description:
      'Reignite your inner drive by managing factors that dampen your motivation.',
    duration: 1401,
    id: '352be3c6-848b-4c19-9e7d-54fe68fef183',
    launchDate: '2023-03-06T16:50:06.000Z',
    lessons: [
      {
        duration: 255,
        id: '278e5a0e-8df1-4646-9984-10289d52dc2d',
        link: 'https://wisey.app/videos/lack-of-motivation-how-to-overcome-it/lesson-1/AppleHLS1/lesson-1.m3u8',
        meta: undefined,
        order: 1,
        previewImageLink:
          'https://wisey.app/assets/images/web/lessons-covers/lack-of-motivation-how-to-overcome-it/lesson-1',
        status: 'unlocked',
        title: 'Why we lack motivation',
        type: 'video',
      },
    ],
    meta: {
      courseVideoPreview: {
        duration: 27,
        link: 'https://wisey.app/videos/lack-of-motivation-how-to-overcome-it/preview/AppleHLS1/preview.m3u8',
        previewImageLink:
          'https://wisey.app/assets/images/web/course-covers/lack-of-motivation-how-to-overcome-it/preview',
      },
      skills: [
        'Aligning your goals with your motives',
        'Overcoming decision paralysis',
      ],
      slug: 'lack-of-motivation-how-to-overcome-it',
    },
    previewImageLink:
      'https://wisey.app/assets/images/web/course-covers/lack-of-motivation-how-to-overcome-it',
    rating: 3.5,
    status: 'launched',
    tags: ['productivity'],
    title: 'Lack of Motivation & How to Overcome It',
  },
};

export const mockCourseWithLessons: ICourseWithLessons = {
  containsLockedLessons: false,
  description: 'test description',
  duration: 123,
  id: 'the-best-id',
  launchDate: '',
  lessons: [
    {
      id: '1',
      order: 1,
      status: 'unlocked',
      title: 'title-1',
      type: 'video',
      duration: 32,
      link: 'link-1',
      previewImageLink: 'link-img-1',
    },
    {
      id: '2',
      order: 2,
      status: 'unlocked',
      title: 'title-2',
      type: 'video',
      duration: 33,
      link: 'link-2',
      previewImageLink: 'link-img-2',
    },
  ],
  meta: {
    courseVideoPreview: {
      duration: 20,
      link: 'preview-link',
      previewImageLink: 'preview-img-link',
    },
    skills: ['skill-1', 'skill-2'],
    slug: 'sluuuug',
  },
  previewImageLink: 'preview-img-link',
  rating: 4,
  status: 'unlocked',
  tags: ['tag-1', 'tag-2'],
  title: 'test-title',
};

export const mockInitialState = {
  courses: [
    {
      courseId: '352be3c6-848b-4c19-9e7d-54fe68fef183',
      activeLessonId: '278e5a0e-8df1-4646-9984-10289d52dc2d',
      progress: [
        {
          lessonId: '278e5a0e-8df1-4646-9984-10289d52dc2d',
          timing: 4.116125,
        },
        {
          lessonId: 'ec7df2b9-2fe2-49b7-81e2-5b5df86997e3',
          timing: 15,
        },
      ],
    },
  ],
};
