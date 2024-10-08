
const CourseCard = ({course}) => (
  <div className="card m-1 p-2 w-100 h-100 hover-shadow">
    <div className="card-body">
      <h5 className="card-title fw-bold">{course.term} CS {course.number}</h5>
      <p className="card-text" style={{'minHeight': '80px'}}>{course.title}</p>
      <hr />
      <p className="card-text">{course.meets}</p>
    </div>
  </div>
);

export default CourseCard;