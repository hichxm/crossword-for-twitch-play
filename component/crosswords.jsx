import { h, Component } from "preact";

export default class crosswords extends Component {

    constructor(props) {
        super(props);
        this.state = {
            template: [
                         /*1    2    3    4    5    6    7    8    9   10   11   12   13*/
                /* 1  */ [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
                /* 2  */ [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
                /* 3  */ [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
                /* 4  */ [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
                /* 5  */ [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
                /* 6  */ [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
                /* 7  */ [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
                /* 8  */ [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
                /* 9  */ [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
                /* 10 */ [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
                /* 11 */ [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
                /* 12 */ [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
                /* 13 */ [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
                /* 14 */ [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
                /* 15 */ [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
                /* 16 */ [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
                /* 17 */ [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
                /* 18 */ [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
                /* 19 */ [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
                /* 20 */ [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
            ]
        };
        this.initialise();
        console.log(this.state);
    }

    render() {
        return (
            <table>
                <tbody>
                    {this.renderTemplate()}
                </tbody>
            </table>
        )
    }

    renderTemplate() {
        let tpl = this.state.template;
        let row = [];
        tpl.forEach(function (rows) {
            let col = [];
            rows.forEach(function (char, index) {
                if (char === " ") {
                    col.push(<td className="">{char}</td>);
                } else if (!isNaN(char)) {
                    col.push(<td className="number">{char}</td>);
                } else {
                    col.push(<td className="letter" style="color: #777779">{char}</td>);
                }
            });
            row.push(<tr>{col}</tr>);
        });
        return row;
    }

    initialise() {
        let template = this.state.template;
        let crossword = this.props.crossword;
        crossword.forEach(function (element, index) {
            let number = element[2];
            let [y, x] = number.split(":");
            template[y-1][x-1] = index + 1;
        });
    }


}