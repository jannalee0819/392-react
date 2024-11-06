import{ React, useState, useEffect} from 'react';
import CourseCard from './CourseCard';
import { checkForConflicts } from '../utilities/conflicts';

const CourseList = ({courses, term, selected, setSelected}) => {

  const [conflicts, setConflicts] = useState([]);

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(14rem, 1fr))',
    gap: '1.5rem',
    maxWidth: '99vw',
    justifyContent: 'center',
    marginBottom: '2rem',
  };

  useEffect(() => {
    const newConflicts = Object.values(courses).filter(course =>
      checkForConflicts(course, selected)
    );
    setConflicts(newConflicts);
  }, [selected]);


  return (
      <div className="container-fluid p-6" style={gridStyle}>
        { term == "All" ? Object.entries(courses)
          .map(([key, value]) => (
            <CourseCard key={key} course={value} selected={selected} setSelected={setSelected} conflicts={conflicts}/>
          )) 
          : 
          Object.entries(courses)
          .filter(([key, value]) => value.term === term) 
          .map(([key, value]) => (
            <CourseCard key={key} course={value} selected={selected} setSelected={setSelected} conflicts={conflicts}/>
          ))
        }
      </div>
  );
};

export default CourseList;