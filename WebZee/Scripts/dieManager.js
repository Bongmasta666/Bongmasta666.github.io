class DieManager {
    constructor(){
        this.dieGroup = {};
        this.current_tally = [0,0,0,0,0,0];
        this.rolls_left = 3;
        
        for (let d = 0; d < 5; d++){
            let id = "dimg_0" + (d+1);
            let ele = document.getElementById(id);
            this.dieGroup[id] = new Die(id , ele);
        }
    }

    rollDie(){
        if (this.rolls_left > 0){
            let x = 0;
            for (x in this.dieGroup){
                if (this.dieGroup[x].canRoll) {
                    this.dieGroup[x].roll();
                }      
            }
            this.rolls_left -= 1;
            document.getElementById("rlab").innerText = "Rolls Left: " + DM.rolls_left
        }
    }

    tallyDie(){
        let x = 0;
        this.current_tally = [0,0,0,0,0,0];
        for (x in this.dieGroup){
            this.current_tally[this.dieGroup[x].value-1] += 1;
        }           
    }

    getFaceTotal(face){
        return this.current_tally[face-1] * face;
    }

    getSumTotal(){
        let total = 0;
        for (let i = 1; i < 7; i++){
            total += this.getFaceTotal(i);
        }
        return total;
    }

    holdDie(element){
        if (this.rolls_left < 3){
            switch (element.id){
                case "dbtn_01":
                    this.dieGroup["dimg_01"].toggleHold();
                    break;
                case "dbtn_02":
                    this.dieGroup["dimg_02"].toggleHold();
                    break;
                case "dbtn_03":
                    this.dieGroup["dimg_03"].toggleHold(); 
                    break;
                case "dbtn_04":
                    this.dieGroup["dimg_04"].toggleHold(); 
                    break;
                case "dbtn_05":
                    this.dieGroup["dimg_05"].toggleHold(); 
                    break;
            }
        }
    }

    resetDie(face){
        let d = "";
        for (d in this.dieGroup){
                this.dieGroup[d].value = face;
                this.dieGroup[d].canRoll = true;
                document.getElementById(d).src = this.dieGroup[d].getFaceId();
            }
        this.rolls_left = 3;
        document.getElementById("rlab").innerText = "Rolls Left: " + DM.rolls_left
    }
}