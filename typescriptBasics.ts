const message: string = 'hello world';
console.log(message);
let x = 2;

type numOrNumarray = number | number[];
let num: numOrNumarray = 1;
let ary: numOrNumarray = [1, 2, 3];

enum list {tomato=0, onion=1, salt=2, potato=3};
console.log(list.potato);

interface Profile {
    name: string,
    id: number
}

let getId = function(profile1: Profile){
    return profile1.id;
}

console.log(getId({name: 'Venkata', id:1}));

class Car {
    private color: string;

    constructor(color: string){
        this.color = color;
    }

    getColor(){
        return this.color;
    }
}

const redCar = new Car('red');
// redCar.color; // it throws error as you cant access private
console.log(redCar.getColor());

// similarly getters and setters also can be writtern
class Car {
    // private color: string;

    constructor(private _color?: string){
    }

    get Color(){
        return this._color;
    }
}

const redCar = new Car('red');
console.log(redCar.Color); //red

// protected

class Car2{
    private color: string;
    public maxSpeed: number;
    protected price: number;
}

class Toyota extends Car2{
    constructor(maxSpeed, color, price){
        super();
        this.maxSpeed = maxSpeed;
        this.color = color; // private cannot be inherited
        this.price = price;
    }
}
