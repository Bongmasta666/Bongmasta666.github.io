class Die {
    constructor(id, ele){
        this.id = id;
        this.value = 6;
        this.canRoll = true;
        this.element = ele;
    }

    roll(){
        this.value = getRandomInt(1, 6);
        this.element.src = this.getFaceId();
    }

    toggleHold(){
        this.canRoll = !this.canRoll;
        this.element.src = this.getFaceId();
    }

    getFaceId(){
        let path = "./Dice/die_0" + this.value + "_";
        if (this.canRoll) path += "white.png";
        else path += "red.png";
        return path;
    }
}

function getRandomInt(min, max){
    return Math.floor(Math.random() * (max-min +1)) +1;
}
