/*
 * app.component.spec.ts
 * Unit tests for application root element.
 *
   Copyright 2017 Sebastian Pustelnik, Grzegorz Mrukwa, Daniel Babiak

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/

import { TestBed, async } from '@angular/core/testing';
import { Http, BaseRequestOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { MockBackend } from '@angular/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs/Rx';
import 'rxjs/Rx';

import {
  MatExpansionModule,
  MatListModule,
  MatSidenavModule,
  MatToolbarModule,
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { PreparationListComponent } from './preparations/preparation-list/preparation-list.component';
import { AlgorithmExpansionPanelComponent } from './algorithm/algorithm-expansion-panel/algorithm-expansion-panel.component';
import { AlgorithmListComponent } from './algorithm/algorithm-list/algorithm-list.component';


class MockHttpClient {
  get()  {
    return new Observable(observer => {
      observer.next({analysis: ['divik']});
      observer.complete();
    });
  }
}


describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AlgorithmExpansionPanelComponent,
        AlgorithmListComponent,
        AppComponent,
        PreparationListComponent
      ],
      imports: [
        RouterTestingModule,
        MatExpansionModule,
        MatListModule,
        MatSidenavModule,
        MatToolbarModule,
        BrowserAnimationsModule,
      ],
      providers: [
          MockBackend,
          BaseRequestOptions,
          {
            provide: Http,
            useFactory: (backendInstance: MockBackend, defaultOptions: BaseRequestOptions) => {
              return new Http(backendInstance, defaultOptions);
            },
            deps: [MockBackend, BaseRequestOptions]
          },
          {provide: HttpClient, useClass: MockHttpClient},
      ],
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
