
class Stopper {
    stopper;
    stopperId;
    display;
    startBtn;
    stopBtn;
    resetBtn;

    stopperId = null;

    constructor(o) {
        this.stopper = o.stopper;
        this.stopperId = o.stopperId;
        this.display = o.display;
        this.startBtn = o.startBtn;
        this.stopBtn = o.stopBtn;
        this.resetBtn = o.resetBtn;
       
    }


    static createElement(tagName = "div", css = "", content = ""){
        let element = document.createElement(tagName);
        element.className = css;
        element.innerHTML = content;
    
        return element;
    }
    
    static twoDigitsNumberToString(num){
        return num < 10 ? "0"+num : ""+num;
    }
    
    //twoDNTS = twoDigitsNumberToString;
    
    static createStopper(selector){
    
       this.stopper = this.createElement("div", "stopper");
       this.display = this.createElement("div", "display", "00:00:00:00");
       this.startBtn = this.createElement("button", "start-btn btn", "START");
       this.stopBtn = this.createElement("button", "stop-btn btn", "STOP");
       this.resetBtn = this.createElement("button", "reset-btn btn", "RESET");

       this.stopper.appendChild(this.display);
       this.stopper.appendChild(this.startBtn);
       this. stopper.appendChild(this.stopBtn);
       this.stopper.appendChild(this.resetBtn);
    
        const ct = document.querySelector(selector);
        if(ct)
            ct.appendChild(this.stopper);
        //változók deklarálása
        let ora = 0, perc = 0, masodperc = 0, tizedmasodperc = 0;
        let stopperId = null;
    
        this.startBtn.onclick = function () {//ha kétszer kattintok a startra akkor a második interval felülírjuk az elsőt
            if(this.stopperId == null) {
                stopperId = setInterval(function() {
                    tizedmasodperc++;
                    if(tizedmasodperc == 100){
                        masodperc++; //second
                        tizedmasodperc = 0; //  tenth of a second
                    }
    
                    if(masodperc == 60){
                        perc++;
                        masodperc = 0;
                    }
    
                    if(perc == 60){
                        ora++; //hour
                        perc = 0; //minute
                    }
    
                    document.querySelector(".display").textContent = `${Stopper.twoDigitsNumberToString(ora)}:${Stopper.twoDigitsNumberToString(perc)}:${Stopper.twoDigitsNumberToString(masodperc)}:${Stopper.twoDigitsNumberToString(tizedmasodperc)}`;
    
    
                }, 9);
    
            }
        }
    
        this.stopBtn.onclick = function(){
            clearInterval(stopperId);
            stopperId = null;
        }
    
        this.resetBtn.onclick = function(){
            ora = perc = masodperc = tizedmasodperc = 0;
            document.querySelector(".stop-btn").click();
            document.querySelector(".display").textContent = "00:00:00:00";
        }
    
    }
}

Stopper.createStopper("#content");