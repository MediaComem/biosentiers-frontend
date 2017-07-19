import { Component, Input, OnInit } from '@angular/core';

import { TableManager } from './table.manager';
import { PaginatedResponse } from '../utils/api';

@Component({
  selector: 'bio-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.styl']
})
export class TableComponent<T, F> {
  @Input()
  manager: TableManager<T, F>;
  @Input()
  pagination: boolean;

  ngOnInit() {
    this.manager.changeState();
    this.pagination = this.pagination !== undefined ? this.pagination : true;
  }
}