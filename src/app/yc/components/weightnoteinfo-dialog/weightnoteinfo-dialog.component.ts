import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductItem } from '../../models/productItem';
import { ProductItemService } from '../../services/product-item.service';
import { ProductItemParameters } from '../../models/productItem-parameters';
import { PageMeta } from 'src/app/shared/models/page-meta';
import { ResultWithLinks } from 'src/app/shared/models/result-with-links';

@Component({
  selector: 'app-weightnoteinfo-dialog',
  templateUrl: './weightnoteinfo-dialog.component.html',
  styleUrls: ['./weightnoteinfo-dialog.component.scss']
})
export class WeightNoteinfoDialogComponent implements OnInit {
  // test Use
  testgg: string;
  selectorSource: ProductItem[] = [];
  editWeightNoteForm: FormGroup;

  // Now Use
  title: string;
  productSource: ProductItem[];
  showItemList: ProductItem[] = [];
  pageMeta: PageMeta;
  totalNum = 0;
  sugSubWeight = 0;

  productItemParameter = new ProductItemParameters({ orderBy: 'id desc', pageSize: 20, pageIndex: 0 });
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialog, private productItemService: ProductItemService) {
    this.title = `車牌: ${data.weightNote.carNo} &nbsp;&nbsp;磅單資訊編輯畫面`;
    console.log(`QQ id : ${data.weightNote.id} & ${data.weightNote.carNo}`);
  }


  ngOnInit() {
    this.loadProductItems();


    this.testgg = '123';
    this.iniForm();
  }

  iniForm() {
    this.editWeightNoteForm = new FormBuilder().group({
      carNoOne: [null, [Validators.required, Validators.minLength(2), Validators.pattern('[a-zA-Z0-9]{0,4}')]],
      carNoTwo: [null, [Validators.required, Validators.minLength(2), Validators.pattern('[a-zA-Z0-9]{0,4}')]],
      scaleNo: [1, [Validators.required]],
      fullWeight: [null]
    });
  }



  loadProductItems() {
    this.productItemService.getAllProductItems(this.productItemParameter).subscribe(resp => {
      this.pageMeta = JSON.parse(resp.headers.get('X-Pagination')) as PageMeta;
      const pagedResult = { ...resp.body } as ResultWithLinks<ProductItem>;
      this.productSource = pagedResult.value;
      console.log(this.productSource);
    });
  }


  /*  addItem(event: MouseEvent) {
     const sProduct = new ProductName();
     sProduct.ProductName = (event.target as HTMLInputElement).innerText;

     this.selectorSource.push(sProduct);

     console.log(this.selectorSource);
   } */

  addItemToShowList(productItem: ProductItem) {
    console.log(productItem);
    const findIndex = this.showItemList.indexOf(productItem);

    if (findIndex === -1) {
      productItem.percentage = 0.5;
      this.showItemList.push(productItem);
    } else {
      console.log(this.showItemList);
    }
    this.calTotalPercent();
  }

  RemoveItemOfShowList(productItem: ProductItem) {
    console.log(productItem);
    const findIndex = this.showItemList.indexOf(productItem);

    if (findIndex > -1) {
      this.showItemList.splice(findIndex, 1);
    }
    this.calTotalPercent();
  }


  calPercent(productItem: ProductItem, calNum: number) {
    console.log('testCal one');
    console.log(productItem);

    const calRs = productItem.percentage + calNum;
    productItem.percentage = calRs < 0 ? 0 :
      calRs > 1 ? 1 : calRs;

    console.log('testCal two');
    console.log(productItem);
    this.calTotalPercent();
  }


  calTotalPercent() {
    let tempNum = 0;
    this.showItemList.forEach(function (item, index, array) {
      console.log(`total item ${item.percentage} total index ${index}`);
      console.log(array);
      tempNum = tempNum + item.percentage;
    });
    this.totalNum = tempNum;
  }


  CalSugSubWeight(subWeight: number) {
    this.sugSubWeight = subWeight === 0 ? 0 : this.sugSubWeight + subWeight;
  }



}
