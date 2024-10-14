import CourseCard from './CourseCard';

const CourseList = ({courses, term, list, setList}) => (
  <div className="card-list mx-5 mb-5" style={{'display': 'grid', gridTemplateColumns: 'repeat(auto-fit, 14rem)', 'gap': '1.5rem'}}>
    {Object.entries(courses)
      .filter(([key, value]) => value.term === term) 
      .map(([key, value]) => (
        <CourseCard key={key} course={value} list={list} setList={setList}/>
      ))
    }
  </div>
);

export default CourseList;