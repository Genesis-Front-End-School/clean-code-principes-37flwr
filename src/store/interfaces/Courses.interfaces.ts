export interface ICoursesState {
  Courses: Array<ICourse>;
}
export interface ICourse extends IActiveLesson {
  progress: Array<IProgress>;
}
export interface IProgress {
  courseId: string;
  lessonId: string;
  timing: number;
}

export interface IActiveLesson {
  courseId: string;
  activeLessonId: string;
}

export type IUpdateCourses = Array<ICourse>;
