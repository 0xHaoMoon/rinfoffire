export class Game{
    public players: string[] = [];
    public stack: string[] = [];
    public playedCard: string[] = [];
    public currentPlayer: number = 0;

    constructor(){
        for (let i = 1; i < 14; i++) {
            this.stack.push('spade_'+ i);
            this.stack.push('hearts_'+ i);
            this.stack.push('clubs_'+ i);
            this.stack.push('diamonds_'+ i);
        }
        shuffle(this.stack)
    }
}

function shuffle<T>(array: T[]): T[] {
    let currentIndex = array.length - 1;
    while (currentIndex > 0) {
      const randomIndex = Math.floor(Math.random() * (currentIndex + 1));
      const temp = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temp;
      currentIndex--;
    }
    return array;
  }