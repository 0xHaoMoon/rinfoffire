import { Component, OnInit, inject } from '@angular/core';
import { Game } from 'src/models/game';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { Firestore, addDoc, collection, collectionData, doc, docData, getDoc, getDocs, onSnapshot, query, setDoc, updateDoc, where } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})

export class GameComponent implements OnInit {
  pickCardAnimation = false;
  currentCard: string = '';
  game!: Game;
  firestore: Firestore = inject(Firestore);
  games$: Observable<any> | undefined;
  gameId: any;

  constructor(private route: ActivatedRoute, public dialog: MatDialog) {

  }
  async ngOnInit(): Promise<void> {
    
    this.newGame();
    this.route.params.subscribe((params)=>{
      this.gameId = params['id'];
      const aCollection = doc(this.firestore, 'games', this.gameId)
      this.games$ = docData(aCollection);
     this.games$.subscribe((game) => {
      console.log(game)
      this.game.currentPlayer = game.currentPlayer;
      this.game.playedCard = game.playedCard;
      this.game.players = game.players;
      this.game.stack = game.stack;
    })
    })
   

  }

  async newGame() {
    this.game = new Game();
 //const docRef = await addDoc(collection(this.firestore, "games"), {
  //game:this.game.toJson()  //so fügt man ein Json hinzu
   //});
  }




  takeCard() {
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
      if (name && name.length > 0) {
        this.game.players.push(name);
      }
    });
  }


}

