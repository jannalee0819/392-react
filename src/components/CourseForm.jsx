import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Banner from './Banner.jsx';

export default function CourseForm ({ courses }){
  const { term, number } = useParams();
  
  const course = Object.values(courses).find(
    course => course.term === term && course.number === number
  );

  const [formData, setFormData] = useState({
    title: course?.title || '',
    meets: course?.meets || ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="container d-flex-column justify-content-center align-items-center">
        <Banner title={course ? `Edit Course CS ${course.number}` : 'Add Course'} />
        <form className="mx-4 w-50" onSubmit={handleSubmit}>
            <div className="mb-3">
            <label htmlFor="title" className="form-label">Course Title</label>
            <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter course title"
            />
            </div>

            <div className="mb-3">
            <label htmlFor="meets" className="form-label">Meeting Times</label>
            <input
                type="text"
                className="form-control"
                id="meets"
                name="meets"
                value={formData.meets}
                onChange={handleChange}
                placeholder="Enter meeting times (e.g., MWF 10:00-10:50)"
            />
            </div>

            <div className="mt-4">
            <Link 
                to="/"
                className="btn btn-secondary me-2"
            >
                Cancel
            </Link>
            <Link 
                to="/"
                className="btn btn-primary me-2"
                onClick={handleSubmit}
            >
                Submit
            </Link>
            </div>
        </form>
    </div>
  );
};
