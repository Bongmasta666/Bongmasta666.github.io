class Player {
    constructor(){
        this.turns_left = 13;
        this.overall = 0;
        this.hasBonus = false;
        this.upper_scores = {
            "ones": -1,
            "twos": -1,
            "threes": -1,
            "fours": -1,
            "fives": -1,
            "sixes": -1,
            "total": 0
        };

        this.lower_total = 0;
        this.lower_scores = {
            "trips": -1,
            "quads": -1,
            "fullh": -1,
            "small": -1,
            "large": -1,
            "yahtzee": -1,
            "scratch": -1,
            "total": 0
        };
    }

    setScore(section, id, value){
        section[id] = value;
        section["total"] += value;
        this.overall += value;
    }
}
