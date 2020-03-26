import React, { Fragment } from 'react';

import { GlobalStyle } from './components/global/globalStyle';
import styled from "styled-components";
import CourseList from "./components/courseList/CourseList"
import CourseEntry from "./components/courseList/CourseEntry"
import FirebaseManager from "./components/firebase"

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`



function App() {
  const firebaseManager = new FirebaseManager();

  return (
    <Fragment>
      <GlobalStyle />
      <Wrapper>
        <CourseList>
          <CourseEntry />
        </CourseList>
      </Wrapper>
    </Fragment>
  );
}

export default App;
