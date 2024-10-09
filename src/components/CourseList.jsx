import CourseCard from './CourseCard';

const CourseList = ({courses}) => (
  <div className="card-list m-4" style={{'display': 'grid', gridTemplateColumns: 'repeat(auto-fit, 14rem)', 'gap': '1.2rem'}}>
    {Object.entries(courses).map(([key, value]) =>
        <CourseCard key={key} course={value} />)}
  </div>
);