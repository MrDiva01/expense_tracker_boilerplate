import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import * as FullCalendar from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { AccountService } from '@app/_services';

@Component({
    templateUrl: 'home.component.html'
})
export class HomeComponent implements OnInit, AfterViewInit {
    @ViewChild('calendarEl') calendarEl: ElementRef;

    account: any; // Define type based on your AccountService data structure

    constructor(private accountService: AccountService) {}

    ngOnInit() {
        this.account = this.accountService.accountValue;
    }

    ngAfterViewInit() {
        if (this.calendarEl && this.calendarEl.nativeElement) {
            const calendar = new FullCalendar.Calendar(this.calendarEl.nativeElement, {
                plugins: [dayGridPlugin],
                initialView: 'dayGridMonth',
                events: [
                    // Add your calendar events here (if needed)
                    // Example:
                     { title: 'Event 1', start: '2024-05-10' },
                    { title: 'Event 2', start: '2024-05-15', end: '2024-05-17' }
                ]
            });
            calendar.render();
        }
    }
}
