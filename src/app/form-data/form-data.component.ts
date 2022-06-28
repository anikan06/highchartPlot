import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharingService } from '../services/sharing.service';

@Component({
  selector: 'app-form-data',
  templateUrl: './form-data.component.html',
  styleUrls: ['./form-data.component.scss'],
})
export class FormDataComponent implements OnInit {
  chartDataForm!: FormGroup;
  clrs: any = ['Red', 'Green', 'Purple', 'Yellow', 'Blue', 'Grey', 'Orange'];
  tl: any;
  flag: boolean = false;

  constructor(
    private fb: FormBuilder,
    private cd: ChangeDetectorRef,
    private share: SharingService
  ) {}

  ngOnInit(): void {
    this.chartDataForm = this.fb.group({
      monthlyRevenue: this.fb.group({
        jan: ['', [Validators.required, Validators.maxLength(3), Validators.pattern('^[0-9]+$')]],
        feb: ['', [Validators.required, Validators.maxLength(3), Validators.pattern('^[0-9]+$')]],
        mar: ['', [Validators.required, Validators.maxLength(3), Validators.pattern('^[0-9]+$')]],
      }),
      colors: this.fb.group({
        janColor: ['Red'],
        febColor: ['Green'],
        marColor: ['Blue'],
      }),
      type: this.fb.group({
        chartType: ['', Validators.required]
      }) 
    });
  }

  changeChart(e: any) {
    console.log(this.chartDataForm.value);
    this.share.editUser(this.chartDataForm.value);
    this.flag = true;
  }

}
