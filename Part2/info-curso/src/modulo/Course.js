const Header = ({ text }) => <h1>{text}</h1>;

const Total = ({ sum }) => <b>Number of exercises {sum}</b>;

const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
    
  </p>
);

const Content = ({ parts }) =>
  parts.map((part) => <Part key={part.id} part={part} />);

const Course = ({ course }) => {
  const total = course.parts
    .map((part) => part.exercises)
    .reduce((prev, cur) => prev + cur);

  return (
    <div>
      <Header text={course.name} />
      <Content parts={course.parts} />
      <Total sum={total} />
    </div>
  );
};

export default Course;