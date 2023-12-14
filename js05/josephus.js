class Josephus {
    constructor(soldiers) {
        this.soldiers = new Array(soldiers).fill().map((_, index) => index + 1);
    }

    eliminate() {
        let currentIndex = 0;
        while (this.soldiers.length > 1) {
            const nextIndex = (currentIndex + 1) % this.soldiers.length;

            console.log(`${this.soldiers[currentIndex]} Kills ${this.soldiers[nextIndex]}`);

            this.soldiers.splice(nextIndex, 1);

            currentIndex = (nextIndex) % this.soldiers.length;
        }
        console.log(`${this.soldiers[0]} Remains alive`);
    }
}

const josephusGame = new Josephus(7);
josephusGame.eliminate();