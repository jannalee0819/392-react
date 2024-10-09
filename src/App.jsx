import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useJsonQuery } from './utilities/fetch.js';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Banner from './components/Banner.jsx';
import CourseList from './components/CourseList.jsx';



const queryClient = new QueryClient();

const App = () => {
  const [data, isLoading, error] = useJsonQuery('https://courses.cs.northwestern.edu/394/guides/data/cs-courses.php'); // Move the hook here

  const schedule = data || {
    "title": "CS Courses for 2018-2019",
    "courses": {
      "F101": {
        "term": "Fall",
        "number": "101",
        "meets": "MWF 11:00-11:50",
        "title": "Computer Science: Concepts, Philosophy, and Connections"
      },
      "F110": {
        "term": "Fall",
        "number": "110",
        "meets": "MWF 10:00-10:50",
        "title": "Intro Programming for non-majors"
      },
      "S313": {
        "term": "Spring",
        "number": "313",
        "meets": "TuTh 15:30-16:50",
        "title": "Tangible Interaction Design and Learning"
      },
      "S314": {
        "term": "Spring",
        "number": "314",
        "meets": "TuTh 9:30-10:50",
        "title": "Tech & Human Interaction"
      }
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  return (
    <div className='row g-4 align-items-center'>
      <Banner title={schedule.title}/>
      <CourseList courses={schedule.courses}/>
    </div>
  );
};

const Root = () => (
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
);

export default Root;
