export type Course = {
  containsLockedLessons: boolean;
  description: string;
  duration: number;
  id: string;
  launchDate: string;
  lessonsCount: number;
  meta: Meta;
  previewImageLink: string;
  rating: number;
  status: string;
  tags: Array<string>;
  title: string;
};

export type Meta = {
  courseVideoPreview: CourseVideoPreview;
  skills: Array<string>;
  slug: string;
};

export type CourseVideoPreview = {
  duration: number;
  link: string;
  previewImageLink: string;
};
