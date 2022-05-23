import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useStore } from "../store";
import styled from "styled-components";

interface TreeListProps {
    data: any[];
}

const TreeListDiv = styled.div`
    grid-area: tree;
    height: 500px;
    width: 350px;
    overflow-y: scroll;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-top: 20px;
    border: 1px solid red;
`

const InfoCard = styled.div`
    height: 100px;
    display: flex;
    border: 1px solid teal;
    width: max;
    h1, h2{ 
        padding-left: 10px;
        margin: 0;
    }
`
const InfoCardH1Id = styled.h1`
    font-size: 15px;
`
const InfoCardH2Login = styled.h2`
    font-size: 15px;
`

const TreeList = observer(() => {
    const { store } = useStore()

    const cardClick = (card: any) => {
        store.actualGist = card;
        console.log(store.actualGist, "actGi")
    }

    return (
        <></>
        // <TreeListDiv>
        //     {store.fetchData.map((res, idx) => {
        //         return (
        //             <InfoCard key={res.id} onClick={() => cardClick(res)}>
        //                 <InfoCardH1Id>Owner id: {res.owner.id}</InfoCardH1Id>
        //                 <InfoCardH2Login>Login: {res.owner.login}</InfoCardH2Login>
        //             </InfoCard>
        //         )
        //     })}
        // </TreeListDiv>
    )
});

export default TreeList;