import {Component, h, render} from 'preact';
import CrossWords from './component/crosswords';
import tmi from 'tmi.js';
import {config} from "./config";
import data from "./data/crosswords.json"

class Main extends Component {

    constructor() {
        super();
        this.chat = this.chat.bind(this);
        this.setState({
            word: null,
            crossword: null
        });
        this.initCrossWord();
        let that = this;

        //tmi.js twitch client. https://docs.tmijs.org/
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

        //tmi.js twitch client. https://docs.tmijs.org/v1.2.1/Configuration.html
        this.state.client.connect();

        //tmi.js twitch client. https://docs.tmijs.org/v1.2.1/Events.html#message
        this.state.client.on("message", function (channel, userstate, message) {

            //Verify if is: chat; no: whisper, action;
            if (userstate["message-type"] === "chat") {
                that.chat(message, userstate);
            }
            return true;
        })
    }

    chat(message, userstate) {
        let username = userstate["username"];
        let displayName = userstate["display-name"];

        let [num, string, other] = message.split(" ");
        num--;

        if (!isNaN(num)) {
        //Check if message is like: {int} ...

            if (typeof string === "undefined") {
            //Check if message like: {int}

                if (typeof this.state.crossword[num] !== "undefined"){
                    let chat = " " + (num + 1) + ": " + this.state.crossword[num][1];
                    this.state.client.say(config.channel, displayName + chat);
                }

            } else if (typeof string === "string" && typeof other === "undefined") {
                //Check if message like: {int} {string}

                if (typeof this.state.crossword[num] !== "undefined"){
                    let chat;

                    if (this.state.crossword[num][0].toUpperCase() === string.toUpperCase()) {
                        //If is the good word.

                        if (this.state.crossword[num][4] === false) {
                            chat = " a trouvé le mot numéro " + (num+1) + ", bien joué.";
                            this.state.crossword[num][4] = true;
                        } else {
                            chat = " ce mot à déja été trouvé."
                        }

                        this.setState({word: string});
                    } else {
                        //If is bad word.

                        chat = " dommage, essaie encore.";
                    }
                    this.state.client.say(config.channel, displayName + chat);
                }

            }

        }else{
            return true;
        }
    }

    /*
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
    */

    render() {
        return <CrossWords crossword={this.state.crossword} word={this.state.word} />
    }

    initCrossWord() {
        this.setState({crossword: data.crosswords[0]})
    }
}

render(<Main />, document.body);