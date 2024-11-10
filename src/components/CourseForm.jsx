import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import Banner from './Banner.jsx';
import { useFormData } from '../utilities/useFormData';
import { updateCourse } from '../utilities/fetchDb';

const validateCourseData = (id, value) => {
  switch (id) {
    case 'title':
      return value.length < 2 
        ? 'Course title must be at least two characters long'
        : '';
    case 'meets':
      if (!value) return '';
      
      const meetingPattern = /^([MTuWThF]+) (\d{1,2}:\d{2})-(\d{1,2}:\d{2})$/;
      
      if (!meetingPattern.test(value)) {
        return 'Must contain days and start-end time, e.g., MWF 12:00-13:20';
      }
      return '';
    default:
      return '';
  }
};

export default function CourseForm({ courses }) {
  const { term, number } = useParams();
  const navigate = useNavigate();
  const [submitError, setSubmitError] = useState(null);
  const queryClient = useQueryClient();
  
  const [courseId, course] = Object.entries(courses).find(
    ([_, course]) => course.term === term && course.number === number
  ) || [];

  const [state, change] = useFormData(
    validateCourseData,
    {
      title: course?.title || '',
      meets: course?.meets || ''
    }
  );

  const hasChanges = () => {
    return state.values.title !== course?.title || 
           state.values.meets !== course?.meets;
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    
    if (state.errors || !hasChanges()) {
      return;
    }

    try {
      setSubmitError(null);
      
      if (!courseId) {
        throw new Error('Course not found');
      }

      const updates = {
        title: state.values.title,
        meets: state.values.meets
      };

      // Update Firebase
      await updateCourse(courseId, updates);
      
      // Update React Query cache directly
      queryClient.setQueryData(['courses'], (oldData) => ({
        ...oldData,
        courses: {
          ...oldData.courses,
          [courseId]: {
            ...oldData.courses[courseId],
            ...updates
          }
        }
      }));

      navigate('/');
      
    } catch (error) {
      setSubmitError(error.message);
      console.error('Failed to save course:', error);
    }
  };

  return (
    <div className="container d-flex-column justify-content-center align-items-center">
      <Banner title={course ? `Edit Course CS ${course.number}` : 'Add Course'} />
      <form onSubmit={handleSubmit} noValidate>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Course Title
          </label>
          <input
            id="title"
            name="title"
            className={`form-control ${state.errors?.title ? 'is-invalid' : ''}`}
            value={state.values.title}
            onChange={change}
          />
          {state.errors?.title && (
            <div className="invalid-feedback">
              {state.errors.title}
            </div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="meets" className="form-label">
            Meeting Times
          </label>
          <input
            id="meets"
            name="meets"
            className={`form-control ${state.errors?.meets ? 'is-invalid' : ''}`}
            value={state.values.meets}
            onChange={change}
          />
          {state.errors?.meets && (
            <div className="invalid-feedback">
              {state.errors.meets}
            </div>
          )}
        </div>

        {submitError && (
          <div className="alert alert-danger mb-3">
            Failed to save changes: {submitError}
          </div>
        )}

        <div className="d-flex gap-2">
          <Link to="/" className="btn btn-outline-secondary">
            Cancel
          </Link>
          <button 
            type="submit"
            className="btn btn-primary"
            disabled={!!state.errors || !hasChanges()}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}