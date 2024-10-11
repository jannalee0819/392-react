import CourseCard from './CourseCard';

const CourseList = ({courses, term}) => (
  <div className="card-list mx-4 mb-5" style={{'display': 'grid', gridTemplateColumns: 'repeat(auto-fit, 14rem)', 'gap': '1.2rem'}}>
    {Object.entries(courses)
      .filter(([key, value]) => value.term === term) 
      .map(([key, value]) => (
        <CourseCard key={key} course={value} />
      ))
    }
  </div>
);

export default CourseList;