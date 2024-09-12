import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

// 15a
// const today = dayjs();
// const newDate = today.add(5, 'days');
// console.log(newDate.format('<MMMM> <DD>'));


// 15b
// const today = dayjs();
// const newDate = today.add(1, 'month');
// console.log(newDate.format('<MMMM> <DD>'));


// 15c
// const today = dayjs();
// const newDate = today.subtract(1, 'month');
// console.log(newDate.format('<MMMM> <DD>'));


// 15d
// const today = dayjs();
// console.log(today.format('dddd'));


// 15e
// function isWeekend(date) {
//     if(date === 'Saturday' || date === 'Sunday') {
//         console.log('It is a weekend');
//     } else {
//         console.log('It is not a weekend');
//     }
// }
// isWeekend('Sunday');



// 15h





// 17a, b, c
class Car {
    #brand;
    #model;
    #speed = 0;
    isTrunkOpen = false;

    constructor(car) {
        this.#brand = car.brand;
        this.#model = car.model;
        this.#speed = car.speed;
    }

    displayInfo() {
        const trunkStatus = this.isTrunkOpen ? 'open' : 'closed';

        console.log(
            `Brand: ${this.#brand}, Model: ${this.#model}, Speed: ${this.speed} km/h, Trunk: ${this.trunkStatus}
            `
        );
    }

    go() {        
        if(this.speed > 200) {
            this.speed = 200;
        } 

        if(!this.isTrunkOpen) { 
            this.speed += 5;
        }
    }
    
    brake() {
        this.speed -= 5;
        
        if(this.speed < 0) {
            this.speed = 0;
        } 
    }

    openTrunk() {
        if(this.speed === 0) {
            this.isTrunkOpen = true;
        }
    }

    closeTrunk() {
        this.isTrunkOpen = false;
    }
}

const car1 = new Car({
    brand: 'Toyota',
    model: 'Corolla',
    speed: 150
});;
const car2 = new Car({
    brand: 'Tesla',
    model: 'Model 3',
    speed: 180
});
// console.log(car1);
// console.log(car2);
// car1.displayInfo();
// car1.go();
// car1.go();
// car1.brake();
// car1.displayInfo();

// car2.displayInfo();
// car2.go();
// car2.brake();
// car2.brake();
// car2.displayInfo();

//17d
// car1.openTrunk();
// car1.displayInfo();


// 17e
class Racecar extends Car {
    acceleration;

    constructor(car) {
        super(car);
        this.acceleration = car.acceleration;
    }

    go() {
        this.speed += this.acceleration;

        if(this.speed > 300) {
            this.speed = 300;
        } 
    }

    openTrunk() {
        console.log('Race cars do not have a trunk');
    }

    closeTrunk() {
        console.log('Race cars do not have a trunk');
    }
}
const racecar1 = new Racecar({
    brand: 'Seat',
    model: 'Ibiza',
    acceleration: 20
});
console.log(racecar1);
racecar1.displayInfo();
racecar1.go();
racecar1.displayInfo();
