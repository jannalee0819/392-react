import React from 'react';
import CourseCard from './CourseCard';

const CourseList = ({courses, term, list, setList}) => {

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(14rem, 1fr))',
    gap: '1.5rem',
    maxWidth: '99vw',
    justifyContent: 'center',
    marginBottom: '2rem',
  };

  return (
      <div className="container-fluid p-6" style={gridStyle}>
        {Object.entries(courses)
          .filter(([key, value]) => value.term === term) 
          .map(([key, value]) => (
            <CourseCard key={key} course={value} list={list} setList={setList}/>
          ))
        }
      </div>
  );
};

export default CourseList;