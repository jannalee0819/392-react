import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useJsonQuery } from './utilities/fetch.js';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Banner from './components/Banner.jsx';
import CourseList from './components/CourseList.jsx';
import TermSelector from './components/TermSelector.jsx';



const queryClient = new QueryClient();

const App = () => {
  const [data, isLoading, error] = useJsonQuery('https://courses.cs.northwestern.edu/394/guides/data/cs-courses.php');
  const [term, setTerm] = useState('Fall')
  const [list, setList] = useState([]);
  const schedule = data;

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  return (
    <div className='row g-4 align-items-center'>
      <Banner title={schedule.title}/>
      <TermSelector selection={term} setSelection={setTerm} />
      <div>
        <ul>
          {list.map((course, index) => (
            <li key={index}>{course.title}</li>
          ))}
        </ul>
      </div>
      <CourseList courses={schedule.courses} term={term} list={list} setList={setList}/>
    </div>
  );
};

const Root = () => (
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
);

export default Root;
