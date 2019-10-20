class BlackjackGame {
    constructor(container) {
        let cardsTypes = ["club", "diamond", "heart", "spade"];
        let cardsValues = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
        let cardsPoints = [2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10, 11];
        this.cards = [];
        this.cardsIdx = [];
        let idx = 0;
        for (let i = 0; i < cardsTypes.length; i++) {
            for (let j = 0; j < cardsValues.length; j++) {
                this.cards.push({
                    "type": cardsTypes[i],
                    "value": cardsValues[j],
                    "points": cardsPoints[j]
                });
                this.cardsIdx.push(idx++);
            }
        }
        this.chipsValues = [10, 20, 50, 100, 500];
        this.bank = 1000;
        this.bet = 0;
        //gameGrid
        this.gameGrid = document.createElement("div");
        this.gameGrid.id = "gameGrid";
        document.getElementById(container).appendChild(this.gameGrid);
        //chipHolder
        this.chipHolderDiv = document.createElement("div");
        this.chipHolderDiv.id = "chip-holder";
        //hit button
        this.hitButton = document.createElement("div");
        this.hitButton.className = "button-div green";
        this.hitButton.innerHTML = "Hit";
        this.hitButton.onclick = () => {
            this.addPlayerCard();
        };
        //stand button
        this.standButton = document.createElement("div");
        this.standButton.className = "button-div green";
        this.standButton.innerHTML = "Stand";
        this.standButton.onclick = () => {
            console.log("stand");
        };
        //dealer
        this.dealerCardsHolder;
        this.dealerPointsHolder;
        this.dealerPoints = 0;
        this.dealerCardsCount = 0;
        //player
        this.playerCardsHolder;
        this.playerPointsHolder;
        this.playerPoints = 0;
    }
    start() {
        this.displayRow1();
        this.displayRow2();
        this.displayRow3();
        this.displayRow4();
        this.calculateBet();
    }
    displayRow1() {
        let row1 = document.createElement("div");
        row1.id = "row1";
        row1.className = "row_1_3";
        this.gameGrid.appendChild(row1);
        //left
        this.dealerPointsHolder = document.createElement("div");
        this.dealerPointsHolder.className = "left-div";
        row1.appendChild(this.dealerPointsHolder);
        //right
        this.dealerCardsHolder = document.createElement("div");
        this.dealerCardsHolder.className = "right-div";
        row1.appendChild(this.dealerCardsHolder);
    }
    displayRow2() {
        let row2 = document.createElement("div");
        row2.id = "row2";
        this.gameGrid.appendChild(row2);
        //
        //left
        //
        let leftDiv = document.createElement("div");
        leftDiv.className = "left-div";
        row2.appendChild(leftDiv);
        //
        //center
        //
        let centerDiv = document.createElement("div");
        centerDiv.className = "center-div";
        row2.appendChild(centerDiv);
        //chipHolderDiv
        centerDiv.appendChild(this.chipHolderDiv);
        //bet
        let betDiv = document.createElement("div");
        betDiv.id = "bet";
        centerDiv.appendChild(betDiv);
        //
        //right
        //
        let rightDiv = document.createElement("div");
        rightDiv.className = "right-div";
        row2.appendChild(rightDiv);
        let dealButton = document.createElement("div");
        dealButton.className = "button-div";
        dealButton.innerHTML = "Deal";
        dealButton.onclick = () => {
            if (this.bet > 0) {
                this.dealDealerCards();
                this.dealPlayerCards();
                rightDiv.removeChild(dealButton);
                rightDiv.appendChild(this.standButton);
                leftDiv.appendChild(this.hitButton);
            }
        };
        rightDiv.appendChild(dealButton);
    }
    displayRow3() {
        let row3 = document.createElement("div");
        row3.id = "row3";
        row3.className = "row_1_3";
        this.gameGrid.appendChild(row3);
        //left
        this.playerPointsHolder = document.createElement("div");
        this.playerPointsHolder.className = "left-div";
        row3.appendChild(this.playerPointsHolder);
        //right     
        this.playerCardsHolder = document.createElement("div");
        this.playerCardsHolder.className = "right-div";
        row3.appendChild(this.playerCardsHolder);
    }
    displayRow4() {
        let row4 = document.createElement("div");
        row4.id = "row4";
        this.gameGrid.appendChild(row4);
        //chips
        let chipsContainer = document.createElement("div");
        row4.appendChild(chipsContainer);

        for (let i = 0; i < this.chipsValues.length; i++) {
            let chipDiv = document.createElement("img");
            chipDiv.src = "img/chips/" + this.chipsValues[i] + ".png";
            chipDiv.onclick = () => {
                this.calculateBet(i);
            };
            chipsContainer.appendChild(chipDiv);
        }
        //bank
        let bankContainer = document.createElement("div");
        row4.appendChild(bankContainer);
        let bankDiv = document.createElement("div");
        bankDiv.id = "bank";
        bankContainer.appendChild(bankDiv);
        let bankText = document.createElement("div");
        bankText.innerHTML = "BANK";
        bankText.className = "bank-text";
        bankContainer.appendChild(bankText);
    }
    calculateBet(chipbet = 2) {
        if (this.bank - this.chipsValues[chipbet] >= 0) {
            this.displayBetAndBank(this.chipsValues[chipbet]);
            let chip = document.createElement("img");
            chip.src = "img/chips/" + this.chipsValues[chipbet] + ".png";
            chip.style = "top:" + this.getRndInteger(-2, 2) + "px;left:" + this.getRndInteger(-2, 2) + "px;"
            chip.onclick = () => {
                this.displayBetAndBank(-this.chipsValues[chipbet]);
                this.chipHolderDiv.removeChild(chip);
            };
            this.chipHolderDiv.appendChild(chip);
        }
    }
    displayBetAndBank(value) {
        this.bet += value;
        this.bank -= value;
        document.getElementById("bet").innerHTML = "€ " + this.bet;
        document.getElementById("bank").innerHTML = "€ " + this.bank;
    }
    dealDealerCards() {
        //text
        let dealerText = document.createElement("div");
        dealerText.className = "player-text";
        dealerText.innerHTML = "Dealer";
        this.dealerPointsHolder.appendChild(dealerText);
        //points
        let dealerPoints = document.createElement("div");
        dealerPoints.id = "dealer-points";
        dealerPoints.className = "player-points";
        this.dealerPointsHolder.appendChild(dealerPoints);
        //card
        this.addDealerCard();
    }
    dealPlayerCards() {
        //text
        let playerText = document.createElement("div");
        playerText.className = "player-text";
        playerText.innerHTML = "Player";
        this.playerPointsHolder.appendChild(playerText);
        //points        
        let playerPoints = document.createElement("div");
        playerPoints.id = "player-points";
        playerPoints.className = "player-points";
        this.playerPointsHolder.appendChild(playerPoints);
        //cards
        for (let i = 0; i < 2; i++) {
            this.addPlayerCard();
        }
    }
    getCard() {
        let rndIdx = this.getRndInteger(0, this.cardsIdx.length - 1);
        let card = this.cards[this.cardsIdx[rndIdx]];
        this.cardsIdx.splice(rndIdx, 1);
        card.src = "img/cards/Playing_card_" + card.type + "_" + card.value + ".png";
        return card;
    }
    addDealerCard() {
        let card = this.getCard();
        let dealerCard = document.createElement("img");
        dealerCard.src = card.src;
        this.dealerCardsHolder.appendChild(dealerCard);
        this.dealerPoints += card.points;
        document.getElementById("dealer-points").innerHTML = this.dealerPoints;
    }
    addPlayerCard() {
        if (this.playerPoints < 21) {
            let card = this.getCard();
            let playerCard = document.createElement("img");
            playerCard.src = card.src;
            this.playerCardsHolder.appendChild(playerCard);
            this.playerPoints += card.points;
            document.getElementById("player-points").innerHTML = this.playerPoints;
            if (this.playerPoints > 21) {
                this.displayResult("lost");
            } else if (this.playerPoints == 21) {
                this.displayResult("blackjack");
            }
        }

    }
    displayResult(win = false) {
        let resultDiv = document.createElement("div");
        resultDiv.id = "result";
        this.gameGrid.appendChild(resultDiv);
        let resultText = document.createElement("div");
        if (win === "won") {
            resultText.innerHTML = "You won";
        } else if (win === "lost") {
            resultText.innerHTML = "You lost";
        }
        resultDiv.appendChild(resultText);
        setTimeout(() => {
            this.gameGrid.removeChild(resultDiv);
        }, 1 * 1000);
    }
    getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

}