import React, { Fragment } from 'react';
import { GlobalStyle } from './components/global/globalStyle';
import CourseList from "./components/courseList/CourseList"
import CourseEntry from "./components/courseList/CourseEntry"

function App() {
  return (
    <Fragment>
      <GlobalStyle />
      <div className="App">
        <CourseList>
          <CourseEntry></CourseEntry>
          <CourseEntry></CourseEntry>
          <CourseEntry></CourseEntry>
          <CourseEntry></CourseEntry>
          <CourseEntry></CourseEntry>
          <CourseEntry></CourseEntry>
          <CourseEntry></CourseEntry>
        </CourseList>
      </div>
    </Fragment>
  );
}

export default App;
