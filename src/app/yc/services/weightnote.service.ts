import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/shared/base.service';
import { WeightnoteAdd } from '../models/weightnote-add';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { WeightNote } from '../models/weightnote';
import { WeightNoteParameters } from '../models/weightNote-parameters';

@Injectable({
  providedIn: 'root'
})
export class WeightNoteService extends BaseService {

  constructor(private http: HttpClient) {
    super();
  }


  getPagedWeightNotes(weightNoteParameter?: any | WeightNoteParameters) {
    return this.http.get(`${this.apiUrlBase}/weightnotes`, {
      headers: new HttpHeaders({
        'Accept': 'application/vnd.yuan-chun.hateoas+json'
      }),
      observe: 'response',
      params: weightNoteParameter
    });
  }

  addWeightnote(
    weightnote: WeightnoteAdd,
    weightNoteType = "1",
    inputType = "1",
    facNo = "2") {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/vnd.yuan-chun.weightnote.create+json',
        'Accept': 'application/vnd.yuan-chun.hateoas+json'
      })
    };
    weightnote.weightNoteType = weightNoteType; //進貨    //可能可以加在Create-Wieghnote的ts檔
    weightnote.inputType = inputType; //手動建立   //可能可以加在Create-Wieghnote的ts檔
    weightnote.facNo = facNo; //手動建立   //可能可以加在Create-Wieghnote的ts檔

    return this.http.post<WeightNote>(`${this.apiUrlBase}/weightnotes`, weightnote, httpOptions);
  }
}
