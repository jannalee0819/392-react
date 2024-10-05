import CourseCard from './CourseCard';

const CourseList = ({courses}) => (
  <div className="card-list" style={{'display': 'grid', gridTemplateColumns: 'repeat(auto-fill, 14rem)'}}>
    {Object.entries(courses).map(([key, value]) =>
        <CourseCard key={key} course={value} />)}
  </div>
);


export default CourseList;