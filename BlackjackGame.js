class BlackjackGame {
    constructor(container) {
        let cardsTypes = ["club", "diamond", "heart", "spade"];
        let cardsValues = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
        this.cards = [];
        for (let i = 0; i < cardsTypes.length; i++) {
            for (let j = 0; j < cardsValues.length; j++) {
                this.cards.push({
                    "type": cardsTypes[i],
                    "value": cardsValues[j]
                });
            }
        }
        this.chipsValues = [10, 20, 50, 100, 500];
        this.bank = 1000;
        this.bet = 0;
        this.gameGrid = document.createElement("div");
        this.gameGrid.id = "gameGrid";
        document.getElementById(container).appendChild(this.gameGrid);
        this.chipHolderDiv = document.createElement("div");
        this.chipHolderDiv.id = "chip-holder";
    }
    start() {
        let row1 = document.createElement("div");
        row1.id = "row1";
        this.gameGrid.appendChild(row1);
        this.displayRow2();
        let row3 = document.createElement("div");
        row3.id = "row3";
        this.gameGrid.appendChild(row3);
        this.displayRow4();
        this.calculateBet();
    }
    displayRow2() {
        let row2 = document.createElement("div");
        row2.id = "row2";
        this.gameGrid.appendChild(row2);
        //left
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



        //right
        let rightDiv = document.createElement("div");
        rightDiv.className = "right-div";
        row2.appendChild(rightDiv);

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
        bankText.innerHTML = "BANKA";
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
    getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

}