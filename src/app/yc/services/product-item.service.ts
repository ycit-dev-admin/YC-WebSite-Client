import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BaseService } from 'src/app/shared/base.service';
import { ProductItemParameters } from '../models/productItem-parameters';

@Injectable({
  providedIn: 'root'
})
export class ProductItemService extends BaseService {

  constructor(private http: HttpClient) {
    super();
  }

  getAllProductItems(productItemParameter?: any | ProductItemParameters) {
    return this.http.get(`${this.apiUrlBase}/productItems`, {
      headers: new HttpHeaders({
        'Accept': 'application/vnd.yuan-chun.hateoas+json'
      }),
      observe: 'response',
      params: productItemParameter
    });
  }
}
