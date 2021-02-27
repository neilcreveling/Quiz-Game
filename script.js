// create global variables
var timeLeft; // time left
var timeInterval; // timer interval
var quizCurrent; // current question
var answerChoice; // the 4 answer choices
var finalScore; // score at the end of the game
var currentLeaderboard; // current leaderboard
var initials; // name entry value

// questions and answers added as an array, so they can be handled easily using js methods later on
var quizQuestionsAnswers = [
    {
        question: "<h2 data-state='correct'>About how many breeds of cats are there?</h2>",
        answers: [
            "<button type='button' data-value='0' data-state='incorrect'>15</button>",
            "<button type='button' data-value='1' data-state='incorrect'>35</button>",
            "<button type='button' data-value='2' data-state='correct'>70</button>",
            "<button type='button' data-value='3' data-state='incorrect'>100</button>"
        ]
    },
    {
        question: "<h2 data-state='correct'>Are cats the first, second, third, or fourth most popular pet in the U.S.?</h2>",
        answers: [
            "<button type='button' data-value='0' data-state='incorrect'>first</button>",
            "<button type='button' data-value='1' data-state='correct'>second</button>",
            "<button type='button' data-value='2' data-state='incorrect'>third</button>",
            "<button type='button' data-value='3' data-state='incorrect'>fourth</button>"
        ]
    },
    {
        question: "<h2 data-state='correct'>About how many cats are alive on earth?</h2>",
        answers: [
            "<button type='button' data-value='0' data-state='incorrect'>100 - 200 million</button>",
            "<button type='button' data-value='1' data-state='incorrect'>200 - 300 million</button>",
            "<button type='button' data-value='2' data-state='correct'>300 - 400 million</button>",
            "<button type='button' data-value='3' data-state='incorrect'>over 400 million</button>"
        ]
    },
    {
        question: "<h2 data-state='correct'>When were the first instances of domesticated cats?</h2>",
        answers: [
            "<button type='button' data-value='0' data-state='correct'>7,500 BC</button>",
            "<button type='button' data-value='1' data-state='incorrect'>5,000 BC</button>",
            "<button type='button' data-value='2' data-state='incorrect'>2,500 BC</button>",
            "<button type='button' data-value='3' data-state='incorrect'>1,000 BC</button>"
        ]
    },
    {
        question: "<h2 data-state='correct'>How heavy was the heaviest known cat?</h2>",
        answers: [
            "<button type='button' data-value='0' data-state='incorrect'>25 pounds</button>",
            "<button type='button' data-value='1' data-state='incorrect'>40 pounds</button>",
            "<button type='button' data-value='2' data-state='correct'>50 pounds</button>",
            "<button type='button' data-value='3' data-state='incorrect'>65 pounds</button>"
        ]
    }
]