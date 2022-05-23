import React, { Component, useEffect, useState } from 'react';
import SortableTree, { getTreeFromFlatData, TreeNode, } from 'react-sortable-tree';
import 'react-sortable-tree/style.css';
import styled from 'styled-components';
import { useStore } from '../store';

const TreeDiv = styled.div`
  grid-area: tree;
`;

const Tree = () => {
    const [data, setData] = useState<TreeNode[]>([]);
    const { store } = useStore();

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
    //  async function getGists() {
    //     const response = await fetch("./view.json");
    //     const res = await response.json();
    //     const columns = res.entityLabelPages[0];
    //     const mapping = columns.labels.map((title: string[], idx: number) => {
    //         return {
    //             id: columns.entityLongIds[idx],
    //             parentId: columns.parentEntityLongIds[idx],
    //             title
    //         }
    //     })
    //     let per = getTreeFromFlatData({ flatData: mapping, rootKey: -1 });
    //     console.log(per, "resp")
    //     setData(getTreeFromFlatData({ flatData: mapping, rootKey: -1 }))
    // }
    useEffect(() => {
        getGists()
    }, [])
    return (
        <TreeDiv style={{ height: 600, width: 400 }}>
            <SortableTree
                treeData={data}
                onChange={treeData => setData(treeData)}
                generateNodeProps={(row) => {
                    // console.log(row)
                    return {
                        title: row.node.title,
                        subtitle: (
                            <div style={{ lineHeight: "2em" }}>{row.node.subtitle}</div>
                        ),
                        buttons: [
                            <button
                                type="button"
                                className="btn btn-outline-success"
                                style={{
                                    verticalAlign: "middle"
                                }}
                                onClick={() => {
                                    store.actualGist = row.node;
                                    console.log(store.actualGist)
                                }}
                            >
                                ℹ
                            </button>
                        ]
                    };
                }}
            />
        </TreeDiv>
    )
}

export default Tree;