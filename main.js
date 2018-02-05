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
    ],
    ["AMALGAME", "Pratique pour certaine personne :troll:.", "3:1", [
            "3:2",
            "3:3",
            "3:4",
            "3:5",
            "3:6",
            "3:7",
            "3:8",
            "3:9"
        ]
    ]
];

render(<CrossWords crossword={crossword}/>, document.body);