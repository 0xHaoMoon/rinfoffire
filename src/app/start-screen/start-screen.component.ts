import { Component, OnInit, inject } from '@angular/core';
import { Game } from 'src/models/game';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';
import { Router } from '@angular/router';


@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.scss']
})
export class StartScreenComponent implements OnInit{
  firestore: Firestore = inject(Firestore);
  constructor(private router: Router){

  }

  ngOnInit(): void {
    
  }

  newgame(){
    let game = new Game();
    let db = collection(this.firestore,"games");
     addDoc(db,game.toJson())
    .then((docRef) => {
      console.log(docRef.id);
      this.router.navigateByUrl('/game/'+ docRef.id);
  })

  }
}
