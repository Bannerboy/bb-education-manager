import React, { Fragment, useState } from 'react';

import { GlobalStyle } from './components/global/globalStyle';
import styled from "styled-components";
import CourseList from "./components/courseList/CourseList"
import FirebaseManager from "./components/firebase"
import InputField from "./components/InputField"

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column; 
  width: 100%;
  `
const firebaseManager = new FirebaseManager();


function App() {
  const [searchFieldText, setFieldText] = useState("")
 

  return (
    <Fragment>
      <GlobalStyle />
      <Wrapper>
        <InputField searchText={searchFieldText} searchTextCallback={setFieldText}/>
        <CourseList fireBase={firebaseManager} filterText={searchFieldText}/>
      </Wrapper>
    </Fragment>
  );
}

export default App;
