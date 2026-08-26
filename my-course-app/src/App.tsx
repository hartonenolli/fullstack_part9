interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartDescription extends CoursePartBase {
  description: string;
}

interface CoursePartBasic extends CoursePartDescription {
  kind: "basic"
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group"
}

interface CoursePartBackground extends CoursePartDescription {
  backgroundMaterial: string;
  kind: "background"
}

interface CoursePartSpecial extends CoursePartDescription {
  requirements: string[];
  kind: "special"
}

type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartSpecial;

interface HeaderProps {
  courseName: string;
}

interface ContentProps {
  courseParts: CoursePart[];
}

interface TotalProps {
  total: number;
}

export const Header = (props: HeaderProps) => {
  return <h1>{props.courseName}</h1>;
};

export const Content = (props: ContentProps) => {
  return (
    <div>
      {props.courseParts.map((part, index) => (
        <Part key={index} {...part} />
      ))}
    </div>
  );
};

export const Total = (props: TotalProps) => {
  return <p>Number of exercises {props.total}</p>;
};

export const Part = (props: CoursePart) => {
  switch (props.kind) {
      case "basic":
        return (
          <div>
            <p><strong>{props.name} {props.exerciseCount}</strong></p>
            <p>{props.description}</p>
          </div>
        );
      case "group":
        return (
          <div>
            <p><strong>{props.name} {props.exerciseCount}</strong></p>
            <p>Group projects: {props.groupProjectCount}</p>
          </div>
        );
      case "background":
        return (
          <div>
            <p><strong>{props.name} {props.exerciseCount}</strong></p>
            <p>{props.description}</p>
            <a href={props.backgroundMaterial}>Background Material</a>
          </div>
        );
      case "special":
        return (
          <div>
            <p><strong>{props.name} {props.exerciseCount}</strong></p>
            <p>{props.description}</p>
            <p>Requirements: {props.requirements.join(", ")}</p>
          </div>
        );
      default:
        return null;
    }
  };
  
  
const App = () => {
  const courseName = "Half Stack application development";
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part",
      kind: "basic"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      kind: "group"
    },
    {
      name: "Basics of type Narrowing",
      exerciseCount: 7,
      description: "How to go from unknown to string",
      kind: "basic"
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      backgroundMaterial: "https://type-level-typescript.com/template-literal-types",
      kind: "background"
    },
    {
      name: "TypeScript in frontend",
      exerciseCount: 10,
      description: "a hard part",
      kind: "basic",
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      kind: "special"
    },
  ];

  const totalExercises = courseParts.reduce((sum, part) => sum + part.exerciseCount, 0);

  return (
    <div>
      <Header courseName={courseName} />
      <Content courseParts={courseParts} />
      <Total total={totalExercises} />
    </div>
  );
};

export default App;