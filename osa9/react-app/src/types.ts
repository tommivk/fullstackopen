interface CoursePartBase {
    name: string;
    exerciseCount: number;
}
interface CoursePartDescription extends CoursePartBase {
    description: string;
}

interface CoursePartOne extends CoursePartDescription {
    name: "Fundamentals";
    // description: string;
}

interface CoursePartTwo extends CoursePartBase {
    name: "Using props to pass data";
    groupProjectCount: number;
}

interface CoursePartThree extends CoursePartDescription {
    name: "Deeper type usage";
    // description: string;
    exerciseSubmissionLink: string;
}

interface CoursePartFour {
    name: "New part";
    exerciseCount: number;
    description: string;
    url: string;
}

export type CoursePart = CoursePartOne | CoursePartTwo | CoursePartThree | CoursePartFour;
