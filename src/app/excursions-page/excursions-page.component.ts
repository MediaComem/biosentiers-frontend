import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import extend from 'lodash/extend';
import pick from 'lodash/pick';
import { Observable } from 'rxjs/Rx';

import { AuthViewService } from '../auth/auth.view.service';
import { BioExcursionsService, RetrieveExcursionParams } from '../excursions/excursions.service';
import { Excursion, User } from '../models';
import { TableManager, TableState } from '../tables/table.manager';
import { PaginatedResponse } from '../utils/api';

@Component({
  selector: 'bio-excursions-page',
  templateUrl: './excursions-page.component.html',
  styleUrls: ['./excursions-page.component.styl']
})
export class ExcursionsPageComponent implements OnInit {
  auth: AuthViewService;
  tableManager: ExcursionsTableManager;

  constructor(auth: AuthViewService, private excursionsService: BioExcursionsService) {
    this.auth = auth;
  }

  ngOnInit() {
    this.tableManager = new ExcursionsTableManager(this.excursionsService, {
      includeCreator: true
    });
  }
}

class ExcursionsTableManager extends TableManager<Excursion, ExcursionsTableFilters> {
  constructor(private excursionsService: BioExcursionsService, private params?: RetrieveExcursionParams) {
    super();
  }

  getInitialState(): TableState<ExcursionsTableFilters> {

    const original = super.getInitialState();
    original.sorts = [
      {
        property: 'plannedAt',
        direction: 'desc'
      }
    ];

    return original;
  }

  initializeFilters(formBuilder: FormBuilder): FormGroup {
    return formBuilder.group({
      search: [ '' ]
    });
  }

  retrievePage(state: TableState<ExcursionsTableFilters>): Observable<PaginatedResponse<Excursion>> {
    return this.excursionsService.retrievePaginated(extend(this.params, pick(state, 'offset', 'limit', 'sorts'), state.filters));
  }
}

interface ExcursionsTableFilters {
  search?: string;
}
