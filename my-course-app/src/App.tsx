interface HeaderProps {
  courseName: string;
}

interface ContentProps {
  name: string;
  exerciseCount: number;
}

interface TotalProps {
  total: number;
}

const App = () => {
  
  const Header = (props: HeaderProps) => {
    return <h1>{props.courseName}</h1>;
  };
  
  const Content = (props: ContentProps) => {
    return (
      <p>
        {props.name} {props.exerciseCount}
      </p>
    );
  };
  
  const Total = (props: TotalProps) => {
    return <p>Number of exercises {props.total}</p>;
  };
  
  
  const courseName = "Half Stack application development";
  const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14
    }
  ];

  const totalExercises = courseParts.reduce((sum, part) => sum + part.exerciseCount, 0);

  return (
    <div>
      <Header courseName={courseName} />
      {courseParts.map((part, index) => (
        <Content key={index} name={part.name} exerciseCount={part.exerciseCount} />
      ))}
      <Total total={totalExercises} />
    </div>
  );
};

export default App;