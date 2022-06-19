import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

class Panel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            jsonNodes: [{
                'Node1': [{
                    'Node2': [{}]
                }],
                'Node3': [{}]
            }],
            arrayNodes: [],
            selectedItem: null,
            divMarginLeft: { marginLeft: "5px" }
        };
    }

    stopPropagation = (event) => event.stopPropagation();

    handleClick(i, action) {
        const arrayNodes = this.state.arrayNodes.slice();
        switch (action) {
            case 'add':
                if (i == 0) {
                    arrayNodes[1] = `Node${i + 1}`;
                    arrayNodes.splice(0, 1);
                }
                else arrayNodes[i] = `Node${i + 1}`;
                break;
            case 'remove':
                if (this.state.selectedItem != null) {
                    arrayNodes.splice(this.state.selectedItem, 1);
                    this.state.selectedItem = null;
                }
                break;
            case 'edit':
                const newText = prompt('Enter new name', `Node${i + 1}`);
                arrayNodes[this.state.selectedItem] = newText;
                break;
            case 'reset':
                arrayNodes.splice(0, arrayNodes.length);
                this.state.selectedItem = null;
                break;
        }
        this.setState({
            arrayNodes: arrayNodes
        });
    }

    showNodes = () =>
        this.state.arrayNodes.map((el, index) => {
            return (
                <div style={{marginLeft: 5 * this.state.arrayNodes.indexOf(el)}} key={index} onClick={this.stopPropagation}>
                    <p key={index}> {el} </p>
                </div>)
        });

    editArrayNodes(action) {
        var nextNum = this.state.arrayNodes.length;
        this.state.arrayNodes = this.handleClick(nextNum, action);;
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
                        <td className="treeData" colSpan={4}>
                            <div className="name" onClick={() => this.state.selectedItem = null}>
                                {this.showNodes()}
                            </div>
                        </td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr className="underRow">
                        <td className="underRowData">
                            <button onClick={() => this.editArrayNodes('add')}> Add </button>
                        </td>
                        <td className="underRowData">
                            <button onClick={() => this.editArrayNodes('remove')}> Remove </button>
                        </td>
                        <td className="underRowData">
                            <button onClick={() => this.editArrayNodes('edit')}> Edit </button>
                        </td>
                        <td className="underRowData">
                            <button onClick={() => this.editArrayNodes('reset')}> Reset </button>
                        </td>
                    </tr>
                </tfoot>
            </table>
        );
    }
}


const root = ReactDOM.createRoot(document.getElementById("mainBox"));
root.render(<Panel />);