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
  game!: Game;
  firestore: Firestore = inject(Firestore);
  games$!: Observable<any>;

  gameId: any;
  pickCardAnimation = false;
  currentCard: string = '';

  constructor(private route: ActivatedRoute, public dialog: MatDialog) {

  }
  async ngOnInit(): Promise<void> {

    this.newGame();
    this.route.params.subscribe((params:any) => {
      this.gameId = params['id'];
      const docRef = doc(this.firestore,'games',this.gameId);
      this.games$ = docData(docRef)
      this.games$.subscribe((game) => {
      this.game.currentPlayer = game.currentPlayer;
      this.game.playedCard = game.playedCard;
      this.game.players = game.players;
      this.game.stack = game.stack;

      })
    })


  }

  async newGame() {
    this.game = new Game();

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

