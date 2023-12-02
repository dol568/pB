// Create a solution that will tell us what poker set we have.
// The solution is to deal us 5 cards from the standard 52 card deck at random.
// Based on cards on our hand the program should tell us what is the best poker set.
// Reference: https://pl.wikipedia.org/wiki/Poker#Starsze%C5%84stwo_uk%C5%82ad%C3%B3w_kart

const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];

function createDeck() {

    const deck = [];

    for (const suit of suits) {
        for (const rank of ranks) {
            deck.push({suit, rank});
        }
    }
    return deck;
}

function shuffleDeck(deck) {

    for (let i = deck.length - 1; i > 0; i--) {
        let randomIndex = Math.floor(Math.random() * (i + 1));

        let temp = deck[i];
        deck[i] = deck[randomIndex];
        deck[randomIndex] = temp;
    }
    return deck;
}

function dealHand(deck) {

    const hand = [];

    for (let i = 0; i < 5; i++) {
        hand.push(deck.pop());
    }
    return hand;
}

function evaluatePokerHand(hand) {
    const lowStraight = ['2', '3', '4', '5', 'A'];
    hand.sort((a, b) => ranks.indexOf(a.rank) - ranks.indexOf(b.rank));

    const checkIfRoyalFlush = hand.every((card, index) => {
        return card.rank === ranks[index + 8] && card.suit === hand[0].suit;
    });

    const checkIfFlush = hand.every(card => card.suit === hand[0].suit);

    const checkIfHighStraightFlush = hand.every((card, index) => {
        return (index === 0 || ranks.indexOf(card.rank) === ranks.indexOf(hand[index - 1].rank) + 1);
    });

    const checkIfLowStraightFlush = () => {
        return hand.every((card, index) => card.rank === lowStraight[index]);
    }

    const checkIfStraightFlush = (checkIfHighStraightFlush || checkIfLowStraightFlush()) && checkIfFlush;

    const checkIfFourOfAKind = hand.some((card, index) => {
        return (index <= 1 && hand[index + 1].rank === card.rank && hand[index + 2].rank === card.rank
            && hand[index + 3].rank === card.rank);
    });

    const checkIfFullHouse =
        (hand[0].rank === hand[1].rank && hand[2].rank === hand[3].rank && hand[3].rank === hand[4].rank) ||
        (hand[0].rank === hand[1].rank && hand[1].rank === hand[2].rank && hand[3].rank === hand[4].rank);

    const checkIfHighStraight = hand.every((card, index) => {
        return (index === 0 || ranks.indexOf(card.rank) === ranks.indexOf(hand[index - 1].rank) + 1);
    }) && (hand.some(card => card.suit !== hand[0].suit));

    const checkIfLowStraight = () => {
        return hand.every((card, index) => card.rank === lowStraight[index])
            && (hand.some(card => card.suit !== hand[0].suit));
    }

    const checkIfStraight = checkIfHighStraight || checkIfLowStraight();

    const checkIfThreeOfAKind = hand.some((card, index) => {
        return (index <= 2 && hand[index + 1].rank === card.rank && hand[index + 2].rank === card.rank);
    });

    const checkIfTwoPair = (hand[0].rank === hand[1].rank && hand[2].rank === hand[3].rank)
        || (hand[0].rank === hand[1].rank && hand[3].rank === hand[4].rank)
        || (hand[1].rank === hand[2].rank && hand[3].rank === hand[4].rank);

    const checkIfOnePair = hand.some((card, index) => {
        return (index <= 3 && hand[index + 1].rank === card.rank);
    });

    if (checkIfRoyalFlush) return 'Royal Flush';
    if (checkIfStraightFlush) return 'Straight Flush';
    if (checkIfFourOfAKind) return 'Four Of A Kind (Quads)';
    if (checkIfFullHouse) return 'Full House';
    if (checkIfFlush) return 'Flush';
    if (checkIfStraight) return 'Straight';
    if (checkIfThreeOfAKind) return 'Three Of A Kind';
    if (checkIfTwoPair) return 'Two Pair';
    if (checkIfOnePair) return 'One Pair';
    return 'High Card';
}

(function game() {
    const deck = createDeck();
    shuffleDeck(deck);
    const hand = dealHand(deck);
    hand.forEach(card => console.log(card));
    console.log('\n' + evaluatePokerHand(hand));
})();

// [[{suit: 'Clubs', rank: 'A'}, {suit: 'Clubs', rank: 'Q'}, {suit: 'Clubs', rank: 'K'},
//         {suit: 'Clubs', rank: 'J'}, {suit: 'Clubs', rank: '10'}], //royalFlush
//     [{suit: 'Diamonds', rank: '8'}, {suit: 'Diamonds', rank: '9'}, {suit: 'Diamonds', rank: '7'},
//         {suit: 'Diamonds', rank: 'J'}, {suit: 'Diamonds', rank: '10'}], //straightFlush
//     [{suit: 'Spades', rank: '9'}, {suit: 'Diamonds', rank: '9'}, {suit: 'Diamonds', rank: '3'},
//         {suit: 'Hearts', rank: '9'}, {suit: 'Clubs', rank: '9'}], //fourOfAKind
//     [{suit: 'Spades', rank: '6'}, {suit: 'Diamonds', rank: '6'}, {suit: 'Spades', rank: '3'},
//         {suit: 'Hearts', rank: '6'}, {suit: 'Clubs', rank: '3'}], //fullHouse
//     [{suit: 'Hearts', rank: '2'}, {suit: 'Hearts', rank: '7'}, {suit: 'Hearts', rank: 'J'},
//         {suit: 'Hearts', rank: 'A'}, {suit: 'Hearts', rank: '4'}], //flush
//     [{suit: 'Spades', rank: '6'}, {suit: 'Hearts', rank: '7'}, {suit: 'Diamonds', rank: '3'},
//         {suit: 'Diamonds', rank: '5'}, {suit: 'Clubs', rank: '4'}], //straight
//     [{suit: 'Spades', rank: 'K'}, {suit: 'Spades', rank: 'J'}, {suit: 'Spades', rank: 'Q'},
//         {suit: 'Diamonds', rank: 'A'}, {suit: 'Spades', rank: '10'}], //highStraight
//     [{suit: 'Spades', rank: '3'}, {suit: 'Spades', rank: '2'}, {suit: 'Spades', rank: '4'},
//         {suit: 'Diamonds', rank: 'A'}, {suit: 'Spades', rank: '5'}], //lowStraight
//     [{suit: 'Hearts', rank: '8'}, {suit: 'Clubs', rank: '2'}, {suit: 'Diamonds', rank: '10'},
//         {suit: 'Clubs', rank: '8'}, {suit: 'Spades', rank: '8'}], //threeOfAKind
//     [{suit: 'Diamonds', rank: 'Q'}, {suit: 'Spades', rank: 'Q'}, {suit: 'Hearts', rank: '5'},
//         {suit: 'Clubs', rank: '2'}, {suit: 'Spades', rank: '5'}], //twoPair
//     [{suit: 'Diamonds', rank: 'K'}, {suit: 'Clubs', rank: 'K'}, {suit: 'Clubs', rank: '7'},
//         {suit: 'Spades', rank: '2'}, {suit: 'Hearts', rank: 'J'}], //onePair
//     [{suit: 'Diamonds', rank: 'Q'}, {suit: 'Spades', rank: '7'}, {suit: 'Hearts', rank: '5'},
//         {suit: 'Clubs', rank: '3'}, {suit: 'Spades', rank: '10'}], //highCard
// ].forEach(hand => console.log(evaluatePokerHand(hand)));


