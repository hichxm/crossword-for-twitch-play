import {Component, h, render} from 'preact';
import CrossWords from './component/crosswords';
import tmi from 'tmi.js';

let crossword = [
    ["SALUT", "Marque de politesse lors d'une premiere rencontre.", "1:3", [
            "2:3",
            "3:3",
            "4:3",
            "5:3",
            "6:3"
        ]
    ],
    ["TEST", "Pratique pour les developpeurs.", "6:2", [
            "6:3",
            "6:4",
            "6:5",
            "6:6"
        ]
    ],
    ["AMALGAME", "Pratique pour certaine personne :troll:.", "3:2", [
            "3:3",
            "3:4",
            "3:5",
            "3:6",
            "3:7",
            "3:8",
            "3:9",
            "3:10"
        ]
    ],
    ["MANGER", "Pratique pour vivre.", "8:10", [
            "7:10",
            "6:10",
            "5:10",
            "4:10",
            "3:10",
            "2:10"
        ]
    ],
    ["LISTE", "Pratique pour se rappeler des courses.", "2:6", [
            "3:6",
            "4:6",
            "5:6",
            "6:6",
            "7:6"
        ]
    ]
];

class Main extends Component {

    constructor() {
        super();
        this.setState({
            word: null
        });
    }

    componentDidMount() {
        let that = this;
        setTimeout(function () {
            that.setState({word: "amalgame"});
        }, 500);        setTimeout(function () {
            that.setState({word: "salut"});
        }, 1000);
        setTimeout(function () {
            that.setState({word: "test"});
        }, 1500);
        setTimeout(function () {
            that.setState({word: "manger"});
        }, 2000);
        setTimeout(function () {
            that.setState({word: "liste"});
        }, 2500);
    }

    render() {
        return <CrossWords crossword={crossword} word={this.state.word} />
    }
}

render(<Main />, document.body);