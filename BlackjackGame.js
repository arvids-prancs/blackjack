class BlackjackGame {
    constructor(container) {
        this.cardsTypes = ["club", "diamond", "heart", "spade"];
        this.cardsValues = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
        //this.cardsValues = ["K", "A"];
        this.cardsPoints = [2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10, 11];
        //this.cardsPoints = [10, 11];
        this.cards = [];
        this.cardsIdx = [];
        for (let leni = this.cardsTypes.length, i = 0; i < leni; i++) {
            for (let lenj = this.cardsValues.length, j = 0; j < lenj; j++) {
                this.cards.push({
                    "type": this.cardsTypes[i],
                    "value": this.cardsValues[j],
                    "points": this.cardsPoints[j]
                });
                this.cardsIdx.push(j + i * lenj);
            }
        }
        console.log(this.cards);
        console.log(this.cardsIdx);
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
        this.chipsContainer;

        this.rightButtonsHolder;
        this.leftButtonsHolder;
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
        //deal button
        this.dealButton = document.createElement("div");
        this.dealButton.className = "button-div";
        this.dealButton.innerHTML = "Deal";
        this.dealButton.onclick = () => {
            if (this.bet > 0) {
                this.dealDealerCards();
                this.dealPlayerCards();
                this.rightButtonsHolder.removeChild(this.dealButton);
                this.rightButtonsHolder.appendChild(this.standButton);
                this.leftButtonsHolder.appendChild(this.hitButton);
                this.emptyDom(this.chipsContainer);
            }
        };
        //dealer
        this.dealerCardsHolder;
        this.dealerPointsHolder;
        this.dealerPoints = 0;
        //player
        this.playerCardsHolder;
        this.playerPointsHolder;
        this.playerPoints = 0;
        this.playerPointsTotal = 0;
        this.playerCardsCount = 0;
        this.playerAces = [];
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

        //left
        this.leftButtonsHolder = document.createElement("div");
        this.leftButtonsHolder.className = "left-div";
        row2.appendChild(this.leftButtonsHolder);

        //center       
        let centerDiv = document.createElement("div");
        centerDiv.className = "center-div";
        row2.appendChild(centerDiv);
        //chipHolderDiv
        centerDiv.appendChild(this.chipHolderDiv);
        //bet
        let betDiv = document.createElement("div");
        betDiv.id = "bet";
        centerDiv.appendChild(betDiv);

        //right       
        this.rightButtonsHolder = document.createElement("div");
        this.rightButtonsHolder.className = "right-div";
        row2.appendChild(this.rightButtonsHolder);
        this.rightButtonsHolder.appendChild(this.dealButton);
    }
    displayDealButton() {
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
                this.emptyDom(this.chipsContainer);
            }
        };
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
        this.chipsContainer = document.createElement("div");
        row4.appendChild(this.chipsContainer);
        this.displayChips();
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
            this.calculateBetAndBank(this.chipsValues[chipbet]);
            let chip = document.createElement("img");
            chip.src = "img/chips/" + this.chipsValues[chipbet] + ".png";
            chip.style = "top:" + this.getRndInteger(-2, 2) + "px;left:" + this.getRndInteger(-2, 2) + "px;"
            chip.onclick = () => {
                this.calculateBetAndBank(-this.chipsValues[chipbet]);
                this.chipHolderDiv.removeChild(chip);
            };
            this.chipHolderDiv.appendChild(chip);
        }
    }
    displayChips() {
        for (let i = 0; i < this.chipsValues.length; i++) {
            let chipDiv = document.createElement("img");
            chipDiv.src = "img/chips/" + this.chipsValues[i] + ".png";
            chipDiv.onclick = () => {
                this.calculateBet(i);
            };
            this.chipsContainer.appendChild(chipDiv);
        }
    }
    calculateBetAndBank(value) {
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
        this.playerCardsCount++;
        if (this.playerPoints <= 21) {
            let card = this.getCard();
            let playerCard = document.createElement("img");
            playerCard.src = card.src;
            this.playerCardsHolder.appendChild(playerCard);
            if (card.value === "A") {
                this.playerAces++;
            }
            this.playerPointsTotal += card.points;
            this.playerPoints = this.playerPointsTotal;
            if (this.playerAces > 0) {
                let acesCount = this.playerAces;
                while (acesCount > 0 && this.playerPoints > 21) {
                    this.playerPoints -= 10;
                    acesCount--;                   
                }
            }
            document.getElementById("player-points").innerHTML = this.playerPoints;
            if (this.playerCardsCount === 2 && this.playerPoints === 21) {
                this.displayResult("blackjack");
            } else if (this.playerPoints > 21) {
                this.displayResult("lost");
            } else if (this.playerPoints === 21) {
                this.displayResult("won");
            }
        }
    }
    displayResult(win) {
        //setTimeout(() => {
            let resultDiv = document.createElement("div");
            resultDiv.id = "result";
            this.gameGrid.appendChild(resultDiv);
            let resultText = document.createElement("div");
            if (win === "won") {
                resultText.innerHTML = "You won";
                resultDiv.className = "won";
            } else if (win === "lost") {
                resultText.innerHTML = "You lost";
            } else if (win === "blackjack") {
                resultText.innerHTML = "Blackjack";
                resultDiv.className = "blackjack";
            }
            resultDiv.appendChild(resultText);
            setTimeout(() => {
                this.gameGrid.removeChild(resultDiv);
                this.reset();
            }, 2 * 1000);
        //}, 1 * 1000);
    }
    reset() {
        this.cardsIdx = [];
        for (let leni = this.cardsTypes.length, i = 0; i < leni; i++) {
            for (let lenj = this.cardsValues.length, j = 0; j < lenj; j++) {
                this.cardsIdx.push(j + i * lenj);
            }
        }
        console.log(this.cardsIdx);
        this.playerPoints = 0;
        this.dealerPoints = 0;
        this.playerCardsCount = 0;
        this.playerAces = 0;
        this.playerPointsTotal=0;
        this.bet = 0;
        this.emptyDom(this.dealerPointsHolder);
        this.emptyDom(this.dealerCardsHolder);
        this.emptyDom(this.playerPointsHolder);
        this.emptyDom(this.playerCardsHolder);
        this.emptyDom(this.chipHolderDiv);
        document.getElementById("bet").innerHTML = "€ " + 0;
        this.rightButtonsHolder.removeChild(this.standButton);
        this.leftButtonsHolder.removeChild(this.hitButton);
        this.rightButtonsHolder.appendChild(this.dealButton);
        this.displayChips();
        this.calculateBet();
    }
    //helpers
    getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    emptyDom(dom) {
        while (dom.lastChild) {
            dom.removeChild(dom.lastChild);
        }
    }

}