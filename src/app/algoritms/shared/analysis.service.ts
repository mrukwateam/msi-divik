/*
 * analysis.service.ts
 * Service providing analysis result.
 *
 Copyright 2018 Grzegorz Mrukwa, Sebastian Pustelnik

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

import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/Rx';

import { Heatmap } from '../../heatmaps/shared/heatmap';
import { Service } from '../../app.service';
import { HeatmapUtil } from '../../heatmaps/shared/heatmap-util';

@Injectable()
export class AnalysisService extends Service {

  constructor(private http: Http) {
    super();
  }

  private getHeaders() {
    const headers = new Headers();
    headers.append('Accept', 'application/json');
    return headers;
  }

  get(preparationId: number, analysisType: string, analysisId: number): Observable<Heatmap> {
    const queryUrl = `${this.getBaseDivikUrl()}/preparation/${preparationId}/analyses/${analysisType}/${analysisId}$`;
    const response = this.http.get(queryUrl, {headers: this.getHeaders()});
    return response.map((res: Response) => HeatmapUtil.toHeatmap(res, '[DivikService]')); // TODO
  }
}