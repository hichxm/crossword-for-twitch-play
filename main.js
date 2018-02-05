import {h, render} from 'preact';
import CrossWords from './component/crosswords'

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
    ]
];

render(<CrossWords crossword={crossword}/>, document.body);