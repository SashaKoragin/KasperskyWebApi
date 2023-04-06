import { Component, EventEmitter, Input, Output, AfterViewInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { AppDateAdapter, APP_DATE_FORMATS } from './DataAdapterFormat';


@Component({
  selector: 'templateValidators',
  templateUrl: '../ValidationModelHtml/ValidationModel.html',
  styleUrls: ['../ValidationModelCss/ValidationModel.css'],
  providers: [
    { provide: DateAdapter, useClass: AppDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS },
  ]
})

export class ModelValidator implements AfterViewInit {

  constructor(private cd: ChangeDetectorRef) { }



  @Input() typeFilters: string | null = null;

  @Input() inputValue: string | null = null;

  @Output() onChangedBackParameter = new EventEmitter<string | null>();

  @Output() isValidateMemo = new EventEmitter<boolean>();


  public stringValue: any = ''
  public integerValue: any = ''
  public binaryValue: any = ''
  public booleanValue: any = ''
  public timeValue: any = ''
  public longLongValue: any = ''

  public getModelValue() {
    switch (this.typeFilters) {
      case 'String':
        this.stringValue = this.inputValue;
        break;
      case 'Integer':
        this.integerValue = this.inputValue;
        break;
      case 'Binary':
        this.binaryValue = this.inputValue;
        break;
      case 'Boolean':
        this.booleanValue = this.inputValue;
        break;
      case 'Time':
        this.timeValue = this.timeValue;
        break;
      case 'LongLong':
        this.longLongValue = this.timeValue;
        break;
      default:
        break;
    }
  }



  public subscribeForm() {
    this.FormGroup.get('String')?.valueChanges.subscribe(async x => {
      this.onChangedBackParameter.emit(x);
      this.isValidateMemo.emit(this.FormGroup.get('String')?.invalid);
    })
    this.FormGroup.get('Integer')?.valueChanges.subscribe(async x => {
      this.onChangedBackParameter.emit(x);
      this.isValidateMemo.emit(this.FormGroup.get('Integer')?.invalid);
    })
    this.FormGroup.get('Binary')?.valueChanges.subscribe(async x => {
      this.onChangedBackParameter.emit(x);
      this.isValidateMemo.emit(this.FormGroup.get('Binary')?.invalid);
    })
    this.FormGroup.get('Boolean')?.valueChanges.subscribe(async x => {
      this.onChangedBackParameter.emit(x);
      this.isValidateMemo.emit(this.FormGroup.get('Boolean')?.invalid);
    })
    this.FormGroup.get('Time')?.valueChanges.subscribe(async x => {
      this.onChangedBackParameter.emit(x);
      this.isValidateMemo.emit(this.FormGroup.get('Time')?.invalid);
    })
    this.FormGroup.get('LongLong')?.valueChanges.subscribe(async x => {
      this.onChangedBackParameter.emit(x);
      this.isValidateMemo.emit(this.FormGroup.get('LongLong')?.invalid);
    })
  }

  public FormGroup: FormGroup = new FormGroup({
    'String': new FormControl<string | null>(null, Validators.required),
    'Integer': new FormControl<number | null>(null, [Validators.required, Validators.pattern(/^\d+$/)]),
    'Binary': new FormControl<string | null>(null, [Validators.required, Validators.pattern(/^((.)+)$/)]),
    'Boolean': new FormControl<boolean | null>(null, [Validators.required]),
    'Time': new FormControl<string | null>(null, Validators.required),
    'LongLong': new FormControl<number | null>(null, [Validators.required, Validators.pattern(/^\d+$/)])
  })

  async ngOnDestroy(): Promise<void> {
    this.isValidateMemo.unsubscribe();
    this.onChangedBackParameter.unsubscribe();
    console.log("Destroy загрузка!!!");
  }



  ngAfterViewInit(): void {
    this.getModelValue();
    this.subscribeForm();
    this.cd.detectChanges();
    console.log("After загрузка!!!");
  }


  //Костыль дожидаемся обновление DOM
  async delay(ms: number): Promise<void> {
    await new Promise(resolve => setTimeout(() => resolve(null), ms)).then(() => console.log("Задержка подгрузки DOM!!!"));
  }
}
