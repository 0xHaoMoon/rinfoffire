import { Component, OnInit, inject } from '@angular/core';
import { Game } from 'src/models/game';
import {MatDialog} from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})

export class GameComponent implements OnInit{
  pickCardAnimation = false;
  currentCard: string = '';
  game!: Game;

  private firestore: Firestore = inject(Firestore);
  games$: Observable<any[]>;
  
constructor(public dialog: MatDialog){
  const aCollection = collection(this.firestore, 'games')
  this.games$ = collectionData(aCollection);

  //Auslesen
  this.games$.subscribe((newGame)=>{                      
    console.log(newGame)
  })
}
  ngOnInit(): void {
    this.newGame();
  }

  newGame(){
    this.game = new Game();
  }

  takeCard(){
    if (!this.pickCardAnimation) {
      this.currentCard = this.game.stack.pop() ?? '';
      this.pickCardAnimation = true;
      this.game.currentPlayer++;
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;


    setTimeout(() => {
      this.game.playedCard.push(this.currentCard);
      this.pickCardAnimation = false;
    }, 1000);
  }
}

openDialog(): void {
  const dialogRef = this.dialog.open(DialogAddPlayerComponent);

  dialogRef.afterClosed().subscribe((name: string) => {
    if(name && name.length >0){
    this.game.players.push(name);
  }
  });
}


}

