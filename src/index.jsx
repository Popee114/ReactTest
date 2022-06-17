import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

class Panel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            arrayNodes: [],
            selectedItem: null
        };
    }

    handleClick(i, action) {
        const arrayNodes = this.state.arrayNodes.slice();
        switch (action) {
            case 'add':
                arrayNodes[i] = (<p key={i} onClick={() => {
                    this.state.selectedItem = i;
                    console.log(this.state.selectedItem);
                }}> Node{i} </p>);
                break;
            case 'remove':
                arrayNodes = arrayNodes[i].splice();
                break;
            case 'edit':
                break;
            case 'reset':
                arrayNodes.splice(0, arrayNodes.length);
                break;
        }
        this.setState({
            arrayNodes: arrayNodes
        });
    }

    showNodes = () => this.state.arrayNodes;

    editArrayNodes(action) {
        var lengthArr = this.state.arrayNodes.length;
        var nextNum = lengthArr == 0 ? ++lengthArr : lengthArr; 
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
                            <div className="name" onClick={() => {
                                this.state.selectedItem = 0;
                                console.log(this.state.selectedItem);
                            }}>
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
                            <button> Remove </button>
                        </td>
                        <td className="underRowData">
                            <button> Edit </button>
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