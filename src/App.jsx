import React, { useState } from 'react';
 import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
// import { useJsonQuery } from './utilities/fetch.js';
import fetchAll from './utilities/fetchDb.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Banner from './components/Banner.jsx';
import CourseList from './components/CourseList.jsx';
import TermSelector from './components/TermSelector.jsx';
import CoursesModal from './components/CoursesModal.jsx'
import CourseForm from './components/CourseForm.jsx';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

const queryClient = new QueryClient();

const App = () => {

  const [term, setTerm] = useState('Fall');
  const [selected, setSelected] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Replace your existing useJsonQuery with this
  const { data: schedule, isLoading, error } = useQuery({
    queryKey: ['courses'],
    queryFn: fetchAll
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data: {error.message}</div>;
  if (!schedule) return <div>No data found</div>;

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
      <Routes>
        <Route path="/" element={
          <>
          <Banner title={schedule.title} />
            <CoursesModal courses={selected} open={isModalOpen} close={() => setIsModalOpen(false)}>
              <h4 className="fw-semibold mb-4">Your Selected Courses</h4>
              {modalContent}
            </CoursesModal>
            <div className="d-flex my-2 justify-content-between align-items-center px-3 py-2">
              <TermSelector selection={term} setSelection={setTerm} />
              <button onClick={() => setIsModalOpen(true)} className="btn btn-outline-primary btn-md">
                My Schedule
              </button>
            </div>
            <CourseList 
              courses={schedule.courses} 
              term={term} 
              selected={selected} 
              setSelected={setSelected}
            />
          </>
        } />
        <Route path="/course/:term/:number" element={
          <CourseForm 
            courses={schedule.courses}
          />
        } />
      </Routes>
    </div>
  );
};

const Root = () => (
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </BrowserRouter>
);

export default Root;