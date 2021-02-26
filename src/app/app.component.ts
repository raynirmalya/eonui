import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  name = 'jarvis';
  name1: FormControl = null;
  selectedItem = null;
  public singleSelectData = [
    {
      key: 'csx-100',
      value: 'csx-100',
    },
    {
      key: 'csx-101',
      value: 'csx-101',
    },
    {
      key: 'csx-102',
      value: 'csx-102',
    },
    {
      key: 'csx-103',
      value: 'csx-103',
    },
    {
      key: 'csx-104',
      value: 'csx-104',
    },
    {
      key: 'csx-105',
      value: 'csx-105',
    },
    {
      key: 'csx-106',
      value: 'csx-106',
    },
    {
      key: 'csx-107',
      value: 'csx-107',
    },
    {
      key: 'csx-108',
      value: 'csx-108',
    },
    {
      key: 'csx-109',
      value: 'csx-109',
    },
    {
      key: 'csx-110',
      value: 'csx-110',
    },
    {
      key: 'csx-111',
      value: 'csx-111',
    },
    {
      key: 'csx-112',
      value: 'csx-112',
    },
  ];
  constructor(public fb: FormBuilder) {}
  ngOnInit() {
    this.name1 = new FormControl('');
  }
}
