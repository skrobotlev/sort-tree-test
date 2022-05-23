import React from "react";
import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
import { FC, useEffect } from "react";
import styled from "styled-components";
import { useStore } from "../store";

interface DetailInfoI {
    id?: any;
}

const DetailInfoDiv = styled.div`
    grid-area: info;
    display: flex;
    margin-top: 10px;
    flex-direction: column;
    width: 400px;
    border: 1px solid teal;
    height: 80vh;
    h1, h2 {
        margin-left: 10px;

    }
    `;

const DetailInfoField = styled.h1`
    font-size: 15px;
`;

const DetailInfo: FC<DetailInfoI> = observer(({ id }) => {
    const { store } = useStore()

    return (
        <DetailInfoDiv>
            <h2>Choice gist</h2>
            <DetailInfoField>Title:{store.actualGist.title}</DetailInfoField>
            <DetailInfoField>Id:{store.actualGist.id}</DetailInfoField>
            <DetailInfoField>Parent id:{store.actualGist.parentId}</DetailInfoField>
        </DetailInfoDiv>
    )
});

export default DetailInfo;