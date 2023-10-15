import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { interval } from 'rxjs';

@Component({
  selector: 'app-time-out-dialogue',
  templateUrl: './time-out-dialogue.component.html',
  styleUrls: ['./time-out-dialogue.component.css']
})
export class TimeOutDialogueComponent implements OnInit {

  message: string = "";
  interval
  timeLeft: number = 0;
  ngOnInit(): void {
  }
  constructor(
    public dialogRef: MatDialogRef<TimeOutDialogueComponent>, public router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.timeLeft = data.message;
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;

      }
      if (this.timeLeft == 0) {
        this.dialogRef.close('exit');
        this.router.navigateByUrl('login');
      }
    }, 1000)

  }

  restartSession(): void {
    this.dialogRef.close('restart');
  }
}
