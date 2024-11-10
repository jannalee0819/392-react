import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../utilities/auth';

export default function CourseCard ({course, selected, setSelected, conflicts}){

  const [active, setActive] = useState(selected.includes(course));
  const [conflict, setConflict] = useState(conflicts.includes(course));
  const {user} = useAuth();

  useEffect(() => {
    if (!selected.includes(course)){
      setConflict(conflicts.includes(course))
    } 
  }, [conflicts, selected, course]);

  

  function onClick(){
    if (conflict) return;

    setActive(!active)
    if (selected.includes(course)){
      setSelected((prevSelected) => prevSelected.filter((item) => item !== course));
    } else {
      setSelected((prevSelected) => [...prevSelected, course])
    }
    
  }

  return (
    <div className={active ? "card m-1 p-2 w-100 h-100 border-1 border-primary hover-shadow position-relative" : conflict ? "card m-1 p-2 w-100 h-100 bg-light position-relative" : "card m-1 p-2 w-100 h-100 hover-shadow position-relative"} onClick={() => onClick()}>
      <div className="position-absolute top-0 end-0 p-2">
        {user && (<Link 
          to={`/course/${course.term}/${course.number}`}
          className="btn btn-link p-0"
          onClick={(e) => {
            e.stopPropagation(); 
          }}
        >
          <i className="bi bi-pencil-square"></i>
        </Link>)}
      </div>
      <div className="card-body">
        {active &&<span className="position-absolute top-0 start-50 translate-middle fw-semibold bg-primary text-white small rounded py-1 px-2">Selected</span>}
        <h5 className={conflict ? "card-title text-secondary fw-bold" : "card-title fw-bold"}>{course.term} CS {course.number}</h5>
        <p className={conflict ? "card-text text-secondary" : "card-text"} style={{'minHeight': '80px'}}>{course.title}</p>
        <hr />
        <p className={conflict ? "card-text text-secondary" : "card-text"}>{course.meets}</p>
      </div>
    </div>
  );
  
} 
