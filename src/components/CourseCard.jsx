

const CourseCard = ({course}) => (
  <div className="card m-1 p-2">
    <div className="card-body">
      <h5 className="card-title font-weight-bold">{course.term} CS {course.number}</h5>
      <p className="card-text" style={{'minHeight': '80px'}}>{course.title}</p>
      <hr />
      <p className="card-text">{course.meets}</p>
    </div>
  </div>
);

export default CourseCard;