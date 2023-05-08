export interface ICourseWithLessons extends Omit<ICourse, 'lessonsCount'> {
  lessons: Array<ILesson>;
}

export interface ICourse {
  containsLockedLessons: boolean;
  description: string;
  duration: number;
  id: string;
  launchDate: string;
  lessonsCount: number;
  meta: IMeta;
  previewImageLink: string;
  rating: number;
  status: string;
  tags: Array<string>;
  title: string;
}

export interface ILesson extends ICourseVideoPreview {
  id: string;
  meta?: IMeta;
  order: number;
  status: 'unlocked' | 'locked';
  title: string;
  type: 'video';
}

export interface IMeta {
  courseVideoPreview: ICourseVideoPreview;
  skills: Array<string>;
  slug: string;
}

export interface ICourseVideoPreview {
  duration: number;
  link: string;
  previewImageLink: string;
}
