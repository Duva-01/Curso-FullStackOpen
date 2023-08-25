interface CoursePartBase {
    name: string;
    exerciseCount: number;
    type: string;
  }
  
  interface CoursePartDescribable extends CoursePartBase {
    description: string;
  }
  
  interface CourseNormalPart extends CoursePartDescribable {
    type: 'normal';
  }
  
  interface CourseProjectPart extends CoursePartBase {
    type: 'groupProject';
    groupProjectCount: number;
  }
  
  interface CourseSpecialPart extends CoursePartDescribable {
    type: 'special';
    requirements: string[];
  }
  
  interface CourseSubmissionPart extends CoursePartDescribable {
    type: 'submission';
    exerciseSubmissionLink: string;
  }
  
  export type CoursePart =
    | CourseNormalPart
    | CourseProjectPart
    | CourseSpecialPart
    | CourseSubmissionPart;