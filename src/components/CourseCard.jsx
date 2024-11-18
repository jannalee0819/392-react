import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../utilities/auth';
import { isAdmin } from '../utilities/profile';

export default function CourseCard({course, selected, setSelected, conflicts}) {
  const [active, setActive] = useState(selected.includes(course));
  const [conflict, setConflict] = useState(conflicts.includes(course));
  const [isUserAdmin, setIsUserAdmin] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (!selected.includes(course)) {
      setConflict(conflicts.includes(course));
    }
  }, [conflicts, selected, course]);

  useEffect(() => {
    const checkAdminStatus = async () => {
      if (user) {
        const adminStatus = await isAdmin(user.uid);
        setIsUserAdmin(adminStatus);
        console.log(isUserAdmin)
      } else {
        setIsUserAdmin(false);
        console.log(isUserAdmin)
      }
    };
    checkAdminStatus();
  }, [user]);

  function onClick() {
    if (conflict) return;

    setActive(!active);
    if (selected.includes(course)) {
      setSelected((prevSelected) => prevSelected.filter((item) => item !== course));
    } else {
      setSelected((prevSelected) => [...prevSelected, course]);
    }
  }

  return (
    <div 
      className={`card m-1 p-2 w-100 h-100 ${
        active ? "border-1 border-primary hover-shadow" : 
        conflict ? "bg-light" : "hover-shadow"
      } position-relative`} 
      onClick={() => onClick()}
    >
      <div className="position-absolute top-0 end-0 p-2">
        {isUserAdmin && (
          <Link 
            to={`/course/${course.term}/${course.number}`}
            className="btn btn-link p-0"
            onClick={(e) => {
              e.stopPropagation(); 
            }}
          >
            <i className="bi bi-pencil-square"></i>
          </Link>
        )}
      </div>
      <div className="card-body">
        {active && (
          <span className="position-absolute top-0 start-50 translate-middle fw-semibold bg-primary text-white small rounded py-1 px-2">
            Selected
          </span>
        )}
        <h5 className={`card-title fw-bold ${conflict ? "text-secondary" : ""}`}>
          {course.term} CS {course.number}
        </h5>
        <p className={`card-text ${conflict ? "text-secondary" : ""}`} style={{'minHeight': '80px'}}>
          {course.title}
        </p>
        <hr />
        <p className={`card-text ${conflict ? "text-secondary" : ""}`}>
          {course.meets}
        </p>
      </div>
    </div>
  );
}