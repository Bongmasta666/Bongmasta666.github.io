class ScoreManager {

    displayUppers(){
        let index = 1;
        for (let x in PLYR.upper_scores){
            if (PLYR.upper_scores[x] === -1){
                document.getElementById("sbox_" + x).innerHTML = DM.getFaceTotal(index);
            }
            index += 1;
        }
    }

    displayLowers(){
        let sum = DM.getSumTotal();
        let high = Math.max(...DM.current_tally);
        if (high >= 4){
            switch (high){
                case 5:
                    if (PLYR.lower_scores["yahtzee"] > -1) {
                        let value = PLYR.lower_scores["yahtzee"] + 100;
                        document.getElementById("sbox_yahtzee").style.color = "blue"
                        document.getElementById("sbox_yahtzee").innerText = value;
                    } else document.getElementById("sbox_yahtzee").innerText = 50;
                    if (PLYR.lower_scores["quads"] == -1){
                        document.getElementById("sbox_quads").innerText = sum;
                    }
                    if (PLYR.lower_scores["trips"] == -1){
                        document.getElementById("sbox_trips").innerText = sum;
                    }
                    break;
                case 4:
                    if (PLYR.lower_scores["quads"] == -1){
                        document.getElementById("sbox_quads").innerText = sum;
                    }
                    if (PLYR.lower_scores["trips"] == -1){
                        document.getElementById("sbox_trips").innerText = sum;
                    }
                    break;
            }
        } else if (high == 3){
            if (PLYR.lower_scores["trips"] == -1){
                document.getElementById("sbox_trips").innerText = sum;
            }
            if (DM.current_tally.includes(2) && PLYR.lower_scores["fullh"] == -1) {
                document.getElementById("sbox_fullh").innerText = 25;
            } 
        } else {
            let count = 0;
            for (let n in DM.current_tally){
                if (DM.current_tally[n] > 0){
                    count += 1;
                } else if (DM.current_tally[n] === 0 ) {
                    if (count < 4) count = 0;
                    else if (count === 4 && n != 5) count -= 1;
                }
            }
            console.log(count)
            switch (count) {
                case 4:
                    document.getElementById("sbox_small").innerText = 30;
                    break;
                case 5:
                    document.getElementById("sbox_small").innerText = 30;
                    document.getElementById("sbox_large").innerText = 40;
                    break;
            }
        }
    
        if (PLYR.lower_scores["scratch"] == -1){
            document.getElementById("sbox_scratch").innerText = DM.getSumTotal();
        }
    }

    setScore(element){
        let name =  String(element.name).replace("sbtn_", "");
        let value = Number(document.getElementById("sbox_" +name).innerText);

        if (element.id == "yahtzee"){
            if (PLYR.lower_scores["yahtzee"] > 0){
                value = PLYR.lower_scores["yahtzee"] + 100;
            }
        } else element.disabled = true;

        if (element.id === "upper"){
            PLYR.setScore(PLYR.upper_scores, name, value);
        } else PLYR.setScore(PLYR.lower_scores, name, value);

        if (PLYR.hasBonus != true && PLYR.upper_scores["total"] > 62){
            PLYR.overall += 35;
            PLYR.hasBonus = true;
            document.getElementById("sbox_bonus").innerText = "35";
        }

        console.log(PLYR.lower_scores["yahtzee"])
        document.getElementById("sbox_"+name).style.color = "red";
        document.getElementById("sbox_upper").innerText = PLYR.upper_scores["total"];
        document.getElementById("sbox_lower").innerText = PLYR.lower_scores["total"];
        document.getElementById("sbox_final").innerText = PLYR.overall;
        this.resetScoreLabels(PLYR.upper_scores);
        this.resetScoreLabels(PLYR.lower_scores);
        DM.resetDie(6);
    }

    resetScoreLabels(section){
        for (let e in section){
            if (section[e] == -1){
                document.getElementById("sbox_"+e).innerText = 0;
            } 
        }
    }
}
