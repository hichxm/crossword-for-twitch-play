import {Component, h, render} from 'preact';
import CrossWords from './component/crosswords';
import tmi from 'tmi.js';
import {config} from "./config";

let crossword = [
    ["SALUT", "Marque de politesse lors d'une premiere rencontre.", "1:3", [
            "2:3",
            "3:3",
            "4:3",
            "5:3",
            "6:3"
        ],
        false
    ],
    ["TEST", "Pratique pour les developpeurs.", "6:2", [
            "6:3",
            "6:4",
            "6:5",
            "6:6"
        ],
        false
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
        ],
        false
    ],
    ["MANGER", "Pratique pour vivre.", "8:10", [
            "7:10",
            "6:10",
            "5:10",
            "4:10",
            "3:10",
            "2:10"
        ],
        false
    ],
    ["LISTE", "Pratique pour se rappeler des courses.", "2:6", [
            "3:6",
            "4:6",
            "5:6",
            "6:6",
            "7:6"
        ],
        false
    ]
];

class Main extends Component {

    constructor() {
        super();
        this.chat = this.chat.bind(this);
        this.crossword = null;
        this.initCrossWord();
        this.setState({
            word: null
        });
        let that = this;
        let client = new tmi.client({
            options: {
                debug: false
            },
            connection: {
                reconnect: true
            },
            identity: {
                username: config.username,
                password: config.password
            },
            channels: [config.channel]
        });
        this.setState({client: client});
        this.state.client.connect();
        this.state.client.on("message", function (channel, userstate, message) {
            if (userstate["message-type"] === "chat") {
                that.chat(message, userstate);
            }
            return true;
        })
    }

    chat(message, userstate) {
        let username = userstate["username"];
        let displayName = userstate["display-name"];

        let [num, string] = message.split(" ");
        num--;

        if (!isNaN(num)) {

            if (typeof string === "undefined") {
                if (typeof crossword[num] !== "undefined"){
                    let chat = " " + (num+1) + ": " + crossword[num][1];
                    this.state.client.say(config.channel, displayName + chat);
                }
            } else if (typeof string === "string") {
                if (typeof crossword[num] !== "undefined"){
                    let chat;
                    if (crossword[num][0].toUpperCase() === string.toUpperCase()) {
                        if (crossword[num][4] === false) {
                            chat = " a trouvé le mot numéro " + (num+1) + ", bien joué.";
                            this.crossword[num][4] = true;
                        } else {
                            chat = " ce mot à déja été trouvé."
                        }
                        this.setState({word: string});
                    } else {
                        chat = " dommage, essaie encore.";
                    }
                    this.state.client.say(config.channel, displayName + chat);
                }
            }

        }else{
            return true;
        }
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

    initCrossWord() {
        this.crossword = crossword;
    }
}

render(<Main />, document.body);