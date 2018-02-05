import { h, Component } from "preact";

export default class crosswords extends Component {

    constructor(props) {
        super(props);
        this.addingWord = this.addingWord.bind(this);
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
            ],
            words: null
        };
        this.initialise();
    }

    componentWillReceiveProps(nextProps) {
        this.setState({word: nextProps.word});
        this.addingWord(nextProps.word);
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
        tpl.forEach(function (rows, y) {
            let col = [];
            rows.forEach(function (char, x) {
                if (char === " ") {
                    col.push(<td class="blank" id={x + "_" + y}>{char}</td>);
                } else if (!isNaN(char)) {
                    col.push(<td class="number" id={x + "_" + y}>{char}</td>);
                } else {
                    col.push(<td class="letter" id={x + "_" + y} style="color: #777779">{char}</td>);
                }
            });
            row.push(<tr>{col}</tr>);
        });
        return row;
    }

    addingWord(word) {
        let crossword = this.state.words;
        crossword.forEach(function (element) {
           if (element[0].toUpperCase() === word.toUpperCase()) {
               let letters_positions = element[3];
               letters_positions.forEach(function(letters_position) {
                   let [y, x] = letters_position.split(":");
                   y--; x--;
                   document.getElementById(x + "_" + y).style.color = "white";
               });
           }
        });
    }

    initialise() {
        let template = this.state.template;
        let crossword = this.props.crossword;
        this.setState({words: crossword});

        crossword.forEach(function (element, index) {
            let number = element[2];
            let [y, x] = number.split(":");
            template[y-1][x-1] = index + 1;

            let word = element[0].split("");
            let letters_positions = element[3];
            letters_positions.forEach(function(letters_position, k) {
                let [y, x] = letters_position.split(":");
                template[y-1][x-1] = word[k];
            });
        });
    }


}