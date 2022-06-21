import React, { Children } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

class Panel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            jsonNodes: [{
                id: 1,
                name: 'Node1',
                nodes: [
                    {
                        id: 2,
                        name: 'Node2',
                        nodes: [
                            {
                                id: 5,
                                name: 'Node5',
                                nodes: null,
                            }],
                    }, {
                        id: 4,
                        name: 'Node4',
                        nodes: null,
                    }],
            },
            {
                id: 3,
                name: 'Node3',
                nodes: null,
            }],
            selectedItem: null
        };
    }

    handleClick(action) {
        var jsonNodes = this.state.jsonNodes.slice();
        switch (action) {
            case 'add':
                this.addSelectedNode(jsonNodes);
                break;
            case 'remove':
                this.deleteSelectedNode(jsonNodes);
                this.state.selectedItem = null;
                break;
            case 'edit':
                const newText = prompt('Enter new name', `Node`);
                this.editSelectedNode(jsonNodes, newText);
                break;
            case 'reset':
                jsonNodes = [];
                this.state.selectedItem = null;
                break;
        }
        this.setState({
            jsonNodes: jsonNodes
        });
    }

    addSelectedNode(nodes) {
        var arrIds = [];
        this.getArrayIds(nodes, arrIds)

        if (this.state.selectedItem == null){
            nodes = this.pushNode(nodes, arrIds);
            return;
        }

        for (var element of nodes) {
            if (element.id == this.state.selectedItem) {
                element.nodes = this.pushNode(element.nodes, arrIds);
            }
            if (element.nodes) {
                this.addSelectedNode(element.nodes);
            }
        }
    }

    deleteSelectedNode(nodes) {
        for (var element of nodes) {
            if (element.id == this.state.selectedItem) {
                const index = nodes.indexOf(element);
                nodes.splice(index, 1);
                return;
            }

            if (element.nodes) {
                this.deleteSelectedNode(element.nodes);
            }
        }
    }

    editSelectedNode(nodes, name) {
        for (var element of nodes) {
            if (element.id == this.state.selectedItem)
                element.name = name;

            if (element.nodes) {
                this.editSelectedNode(element.nodes, name);
            }
        }
    }

    pushNode(nodes, arrIds) {
        const newId = this.generateId(arrIds);
        const locNodes = nodes ?? [];
        locNodes.push({
            id: newId,
            name: `Node${newId}`,
            node: null
        });
        nodes = locNodes;
        return nodes;
    }

    getSelectedNode(nodes) {
        for (const element of nodes) {
            if (element.id == this.state.selectedItem)
                return element;

            if (element.nodes) {
                const node = this.getSelectedNode(element.nodes);
                if (node) return node;
            }
        }
        return null
    }

    showNodes(nodes) {
        if (nodes.length == 0) return null;
        const result = nodes?.map(element => {
            return <li key={element.id} onClick={(event) => { this.state.selectedItem = element.id; event.stopPropagation(); }}>
                {element.name}
                {element.nodes == null ? null : this.showNodes(element.nodes)}
            </li>
        });

        return <ul style={{ marginLeft: 5 }}> {result} </ul>
    }

    getArrayIds(nodes, outArr) {
        for (const node of nodes) {
            outArr.push(node.id);
            if (node.nodes) {
                this.getArrayIds(node.nodes, outArr);
            }
        }
    }

    generateId(arrIds) {
        const newId = Math.floor((Math.random() * 60) + 1);
        return arrIds.indexOf(newId) == -1 ? newId : this.generateId(arrIds);
    }

    render() {
        return (
            <table>
                <thead>
                    <tr className="topRow">
                        <th colSpan={4}>
                            Tree
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td colSpan={4}>
                            <ul className="mainUl" onClick={(event) => { this.state.selectedItem = null; event.stopPropagation(); }}>
                                {this.showNodes(this.state.jsonNodes)}
                            </ul>
                        </td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr className="underRow">
                        <td className="underRowData">
                            <button onClick={() => this.handleClick('add')}> Add </button>
                        </td>
                        <td className="underRowData">
                            <button onClick={() => this.handleClick('remove')}> Remove </button>
                        </td>
                        <td className="underRowData">
                            <button onClick={() => this.handleClick('edit')}> Edit </button>
                        </td>
                        <td className="underRowData">
                            <button onClick={() => this.handleClick('reset')}> Reset </button>
                        </td>
                    </tr>
                </tfoot>
            </table>
        );
    }
}


const root = ReactDOM.createRoot(document.getElementById("mainBox"));
root.render(<Panel />);