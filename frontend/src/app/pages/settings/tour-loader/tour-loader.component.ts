import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';

import { TicketsService } from '../../../services/tickets/tickets.service';

@Component({
  selector: 'app-tour-loader',
  templateUrl: './tour-loader.component.html',
  styleUrls: ['./tour-loader.component.scss'],
})

export class TourLoaderComponent implements OnInit {
  tourForm: FormGroup;

  constructor(private ticketsService: TicketsService) {
  }

  // tourImg: File;
  // tmp: any;
  // @ViewChild('imgEl') imgEl: ElementRef;
  // @ViewChild('inputFileEl') inputFileEl: ElementRef;

  ngOnInit(): void {
    this.tourForm = new FormGroup({
      name: new FormControl('', {validators: Validators.required}),
      description: new FormControl('', [Validators.required, Validators.minLength(10)]),
      operator: new FormControl(),
      price: new FormControl(),
      img: new FormControl(),
    });
  }

  createTour(): void {
    const tourDataRow = this.tourForm.getRawValue();
    let formParams = new FormData();
    if (typeof tourDataRow === "object") {
      for (let prop in tourDataRow) {
        formParams.append(prop, tourDataRow[prop]);
      }
    }
    this.ticketsService.createTour(formParams).subscribe((data) => {});

  }

  selectFile(ev: any): void {
    console.log('ev', ev)
    if (Array.isArray(ev.target.files) && ev.target.files.length > 0) {
      const file = ev.target.files[0];
      this.tourForm.patchValue({
        img: file
      });
    }
  }
}




















