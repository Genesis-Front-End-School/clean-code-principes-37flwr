export interface ReduxCoursesState {
  courses: Array<ReduxCourse>;
  loading: boolean;
}

export interface ReduxCourse {
  courseId: string;
  activeLessonId: string;
  progress: Array<Lesson>;
}

export interface Lesson {
  lessonId: string;
  timing: number;
}
