import { Component, Input } from '@angular/core';

interface Alert {
	type: string;
	message: string;
}

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})

export class AlertComponent {
  @Input() alerts: Alert[] = [];

	constructor() {
	}

	close(alert: Alert) {
		this.alerts.splice(this.alerts.indexOf(alert), 1);
	}
}
