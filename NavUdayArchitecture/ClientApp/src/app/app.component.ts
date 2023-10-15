import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';
import { TimeOutDialogueComponent } from './Dialogue/time-out-dialogue.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  authToken = localStorage.getItem('access_token')
  idleState = 'Not started.';
  timedOut = false;
  lastPing?: Date = undefined;
  title = 'angular-idle-timeout';
  matDialogRef: MatDialogRef<TimeOutDialogueComponent> | undefined;
  constructor(private idle: Idle, private keepalive: Keepalive, private matDialog: MatDialog, public router: Router) {
    if (this.authToken != null && this.authToken != "") {
      // sets an idle timeout of 5 seconds, for testing purposes.
      idle.setIdle(50000);
      // sets a timeout period of 5 seconds. after 10 seconds of inactivity, the user will be considered timed out.
      idle.setTimeout(15);
      // sets the default interrupts, in this case, things like clicks, scrolls, touches to the document
      idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

      idle.onIdleEnd.subscribe(() => {
        this.idleState = 'No longer idle.'
        console.log(this.idleState);
        this.reset();
      });

      idle.onTimeout.subscribe(() => {
        this.idleState = 'Timed out!';
        this.timedOut = true;
        console.log(this.idleState);
        this.router.navigate(['/login']);
      });

      idle.onIdleStart.subscribe(() => {
        this.idleState = 'You\'ve gone idle!'
        console.log(this.idleState);
      });

      idle.onTimeoutWarning.subscribe((countdown) => {
        this.idleState = 'You will time out in ' + countdown + ' seconds!'
        console.log(this.idleState);
        if (countdown == 15) {

          this.openTimeoutPopup(countdown)
        }
      });
      // sets the ping interval to 15 seconds
      keepalive.interval(15);

      keepalive.onPing.subscribe(() => this.lastPing = new Date());
      this.reset();
    }
  }

  reset() {
    this.idle.watch();
    this.idleState = 'Started.';
    this.timedOut = false;
  }

  openTimeoutPopup(countdown: number): void {
    const dialogRef = this.matDialog.open(TimeOutDialogueComponent, {
      data: { message: countdown },
    });

    dialogRef.afterClosed().subscribe((result: any) => {

      if (result == 'exit') {
        this.authToken = null;
        this.router.navigate(['/']);
      }
      console.log('The dialog was closed');
      // this.reset();
    });
  }
}
