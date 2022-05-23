import { observer } from 'mobx-react-lite';
import React, { Component, FC, useEffect, useState } from 'react';
import SortableTree, { getTreeFromFlatData, TreeNode, removeNode, removeNodeAtPath, GetNodeKeyFunction } from 'react-sortable-tree';
import 'react-sortable-tree/style.css';
import styled from 'styled-components';
import { useStore } from '../store';

const TreeDiv = styled.div`
  grid-area: tree;
`;

const ActionButton = styled.button`
  width: 80px;
  height: 35px;
  background-color: aliceblue;
`
const ButtonsDiv = styled.div`
margin-top: 20px;
position: relative;
left: 130%;
grid-area: buttons;
  width: 300px;
  height: 50px;
  display: flex;
  justify-content: space-between;
`


const Tree: FC = observer(() => {
    const [data, setData] = useState<TreeNode[]>([]);
    const { store } = useStore();

    const getNodeKey = ({ node: { id } }: any) => id;

    const removeNode = (rowInfo: any) => {
        let { treeIndex, path, node } = rowInfo;
        console.log(path)
        setData(
            removeNodeAtPath({
                treeData: data,
                path,
                getNodeKey: ({ treeIndex }) => {
                    console.log(treeIndex, 'nmb')
                    return treeIndex;
                },
                ignoreCollapsed: true,

            })
        );
        store.actualGist = {};
    };

    function updateTreeData(treeData: any) {
        setData(treeData);
    }
    async function getGists() {
        const response = await fetch("./view.json");
        const res = await response.json();
        const columns = res.entityLabelPages[0];
        const mapping = columns.labels.map((title: string[], idx: number) => {
            return {
                id: columns.entityLongIds[idx],
                parentId: columns.parentEntityLongIds[idx],
                title
            }
        })
        let per = getTreeFromFlatData({ flatData: mapping, rootKey: -1 });
        console.log(per, "resp")
        setData(getTreeFromFlatData({ flatData: mapping, rootKey: -1 }))
    }

    useEffect(() => {
        getGists()
    }, [])
    return (
        <TreeDiv style={{ height: 600, width: 400 }}>
            {/* <SortableTree
                treeData={data}
                onChange={treeData => setData(treeData)}
                generateNodeProps={(row) => {
                    // console.log(row)
                    store.gistForDel = row;
                    return {
                        title: row.node.title,
                        subtitle: (
                            <div style={{ lineHeight: "2em" }}>{row.node.subtitle}</div>
                        ),
                        buttons: [
                            <button
                                type="button"
                                onClick={() => {
                                    store.gistForDel = row;
                                    store.actualGist = row.node;
                                    removeNode(data)
                                    console.log(store.actualGist, store.gistForDel)
                                }}
                            >
                                ℹ
                            </button>
                        ]
                    };
                }}
            /> */}

            <SortableTree
                treeData={data}
                onChange={(treeData) => updateTreeData(treeData)}
                generateNodeProps={(rowInfo) => ({
                    buttons: [
                        <div>
                            <button onClick={(event) => {
                                console.log(rowInfo, 'inf')
                                store.actualGist = rowInfo.node;
                                store.gistForDel = rowInfo;
                            }}>
                                Select
                            </button>
                        </div>
                    ],
                    style: {
                        height: "50px"
                    }
                })}
            />
            <ButtonsDiv>
                <ActionButton onClick={() => removeNode(store.gistForDel)}>Delete</ActionButton>
                <ActionButton onClick={() => getGists()}>Refresh</ActionButton>
                <ActionButton onClick={() => console.log(data)}>Apply</ActionButton>
            </ButtonsDiv>
        </TreeDiv>

    )
})

export default Tree;