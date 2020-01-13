import { Entity } from '../../shared/models/entity';

export class ProductItem extends Entity {
  productName: string;
  ioType: string;
  isShow: string;
  remark: string;
  creatorEmpNo: string;
  createTime: Date;
  updateEmpNo: string;
  updateTime: Date;

  // Page Display
  percentage: number;

}
