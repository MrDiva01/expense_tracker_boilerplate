import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { AccountService } from '@app/_services';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html' // Ensure the correct template URL
})
export class HomeComponent implements OnInit, AfterViewInit {
    @ViewChild('calendarEl') calendarEl: ElementRef;
    calendar: Calendar;
    eventDate: string; // Property to hold the date input
    eventDescription: string; // Property to hold the description input

    account: any; // Define type based on your AccountService data structure

    constructor(private accountService: AccountService) {}

    ngOnInit() {
        this.account = this.accountService.accountValue;
    }

    ngAfterViewInit() {
        if (this.calendarEl && this.calendarEl.nativeElement) {
            this.calendar = new Calendar(this.calendarEl.nativeElement, {
                plugins: [dayGridPlugin],
                initialView: 'dayGridMonth',
                events: [
                    // Add your calendar events here (if needed)
                    { title: 'New Year\'s Day', start: '2024-01-01' },
                    { title: 'Holy Week', start: '2024-04-18', end: '2024-04-20' },
                    { title: 'Araw ng Kagitingan', start: '2024-04-09' },
                    { title: 'Labor Day', start: '2024-05-01' },
                    { title: 'Independence Day', start: '2024-06-12' },
                    { title: 'National Heroes Day', start: '2024-08-26' },
                    { title: 'Bonifacio Day', start: '2024-11-30' },
                    { title: 'Christmas Day', start: '2024-12-25' },
                    { title: 'Rizal Day', start: '2024-12-30' }
                ]
            });
            this.calendar.render();
        }
    }

    addEvent() {
        if (this.calendar && this.eventDate && this.eventDescription) {
            this.calendar.addEvent({
                title: this.eventDescription, // Use the description as the title
                start: this.eventDate, // Use the selected date
                allDay: true
            });
        }
    }
}
