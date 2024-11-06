import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useJsonQuery } from './utilities/fetch.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Banner from './components/Banner.jsx';
import CourseList from './components/CourseList.jsx';
import TermSelector from './components/TermSelector.jsx';
import CoursesModal from './components/CoursesModal.jsx'
import { checkForConflicts } from './utilities/conflicts.js';

const queryClient = new QueryClient();

const App = () => {
  const [data, isLoading, error] = useJsonQuery('https://courses.cs.northwestern.edu/394/guides/data/cs-courses.php');
  const [term, setTerm] = useState('Fall')
  const [selected, setSelected] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const schedule = data;

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  const modalContent = selected.length > 0 ? (
    <ul className="list-group">
      {selected.map((course, index) => (
        <li key={index} className="list-group-item p-3">
          <strong>{course.term} CS {course.number}</strong>: {course.title} - {course.meets}
        </li>
      ))}
    </ul>
  ) : (
    <div>
      <p>No courses selected.</p>
      <p>To select courses, please use the course selection interface.</p>
    </div>
  );

  


  return (
    <div className="container-fluid p-0">
      <CoursesModal courses={selected} open={isModalOpen} close={() => setIsModalOpen(false)}>
        <h4 className="fw-semibold mb-4">Your Selected Courses</h4>
        {modalContent}
      </CoursesModal>
      <Banner title={schedule.title}/>
      <div className="d-flex my-2 justify-content-between align-items-center px-3 py-2">
        <TermSelector selection={term} setSelection={setTerm} />
        <button onClick={() => setIsModalOpen(true)} className="btn btn-outline-primary btn-lg">
          My Schedule
        </button>
      </div>
      <CourseList courses={schedule.courses} term={term} selected={selected} setSelected={setSelected}/>
    </div>
  );
};

const Root = () => (
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
);

export default Root;