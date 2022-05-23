import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import getGists from './api/getGists';
import './App.css';
import DetailInfo from './components/detail-info';
import Tree from './components/sortable-tree';
import TreeList from './components/tree-list';
import { useStore } from './store';

const AppDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const GridDiv = styled.div`
  margin: 20px;
  display: grid;
  height: 80vh;
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

const ActionButton = styled.button`
  width: 80px;
  height: 35px;
  background-color: aliceblue;
`
const ButtonsDiv = styled.div`
grid-area: buttons;
  width: 300px;
  height: 50px;
  display: flex;
  justify-content: space-between;
`

const App: React.FC = observer(() => {
  const { store } = useStore();

  return (
    <AppDiv>

      <GridDiv>
        <Tree />
        <DetailInfo />
        <ButtonsDiv>
          <ActionButton onClick={() => store.deleteItem()}>Delete</ActionButton>
          <ActionButton onClick={() => getGists(store)}>Refresh</ActionButton>
        </ButtonsDiv>
      </GridDiv>
    </AppDiv>
  );
})

export default App;
