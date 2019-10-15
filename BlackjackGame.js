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
        this.bank = 1000;
        this.gameGrid = document.createElement("div");
        this.gameGrid.id = "gameGrid";
        document.getElementById(container).appendChild(this.gameGrid);
    }
    start() {
        let row1 = document.createElement("div");
        row1.id = "row1";
        this.gameGrid.appendChild(row1);
        let row2 = document.createElement("div");
        row2.id = "row2";
        this.gameGrid.appendChild(row2);
        let row3 = document.createElement("div");
        row3.id = "row3";
        this.gameGrid.appendChild(row3);
        this.displayRow4();

    }
    displayRow4() {
        let row4 = document.createElement("div");
        row4.id = "row4";
        this.gameGrid.appendChild(row4);
        //chips
        let chipsContainer = document.createElement("div");
        row4.appendChild(chipsContainer);
        let chipsValues = [10, 20, 50, 100, 500];
        for (let i = 0; i < chipsValues.length; i++) {
            let chipDiv = document.createElement("img");
            chipDiv.src = "img/chips/" + chipsValues[i] + ".png";
            chipDiv.onclick = () => {
                console.log(chipsValues[i]);
            };
            chipsContainer.appendChild(chipDiv);
        }
        //bank
        let bankContainer = document.createElement("div");
        row4.appendChild(bankContainer);
        let bankDiv = document.createElement("div");
        bankDiv.id = "bank";
        bankDiv.innerHTML = "€ " + this.bank;
        bankContainer.appendChild(bankDiv);
        let bankText = document.createElement("div");
        bankText.innerHTML = "BANKA";
        bankText.className = "bank-text";
        bankContainer.appendChild(bankText);
    }
}