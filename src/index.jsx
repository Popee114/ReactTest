import React from 'react';
import ReactDOM from 'react-dom';
import 'main.css';

function AddNode(props) {
    return (
        <p> Node{this.props.value} </p>
    );
}

class TreeNodes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: [{}]
        };
    }

    render() {
        return (
            <div onClick={() => {
                console.log('Было нажатие на среднюю панель');
            }}></div>
        );
    }
}

class Panel extends React.Component {
    render() {
        return (
            <table>
                <tr class="topRow">
                    <th colspan="4">
                        Tree
                    </th>
                </tr>
                <tr>
                    <td>
                    </td>
                </tr>
                <tr class="underRow">
                    <td class="underRowData">
                        <button> Add </button>
                    </td>
                    <td class="underRowData">
                        <button> Remove </button>
                    </td>
                    <td class="underRowData">
                        <button> Edit </button>
                    </td>
                    <td class="underRowData">
                        <button> Reset </button>
                    </td>
                </tr>
            </table>
        );
    }
}


const root = ReactDOM.createRoot(document.getElementById("mainBox"));
root.render(<Panel />);