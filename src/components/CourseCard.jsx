import { useState } from 'react';

export default function CourseCard ({course, list, setList}){

  const [active, setActive] = useState(false);

  function onClick(){
    setActive(!active)
    if (list.includes(course)){
      setList((prevList) => prevList.filter((item) => item !== course));
    } else {
      setList((prevList) => [...prevList, course])
    }
    
  }

  return (
    <div className={active ? "card m-1 p-2 w-100 h-100 border-1 border-primary hover-shadow position-relative" : "card m-1 p-2 w-100 h-100 hover-shadow position-relative"} onClick={() => onClick()}>
      <div className="card-body">
        {active &&<span className="position-absolute top-0 start-50 translate-middle fw-semibold bg-primary text-white small rounded py-1 px-2">Selected</span>}
        <h5 className="card-title fw-bold">{course.term} CS {course.number}</h5>
        <p className="card-text" style={{'minHeight': '80px'}}>{course.title}</p>
        <hr />
        <p className="card-text">{course.meets}</p>
      </div>
    </div>
  );
  
} 
