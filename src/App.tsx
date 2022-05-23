import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import './App.css';
import DetailInfo from './components/detail-info';
import Tree from './components/sortable-tree';
import { useStore } from './store';

const AppDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const GridDiv = styled.div`
  margin: 20px;
  display: grid;
  height: 90vh;
  width: 80%;
  border: 2px solid teal;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  grid-template-areas: 
  "tree info"
  "tree info"
  ". buttons"
;
`



const App: React.FC = observer(() => {
  const { store } = useStore();

  return (
    <AppDiv>
      <GridDiv>
        <Tree />
        <DetailInfo />
      </GridDiv>
    </AppDiv>
  );
})

export default App;
