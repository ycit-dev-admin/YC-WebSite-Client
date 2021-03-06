import { Entity } from '../../shared/models/entity';

export class WeightNote extends Entity {
    carNo: string;
    fullWeight: number;
    fullWeightTime: Date;
    // weightNoteType: string; 已移除
    scaleNo: string;
    inputType: string;
    facNo: string;
    ingredient: string;
    defectiveWeight: number;
    defectiveReason: string;
    excavatorOpTime: Date;
    excavatorOpEmpNo: string;
    carWeight: number;
    carWeightTime: Date;
    tradeWeight: number;
    finalDefectiveWeight: number;
    unitPrice: number;
    totalPrice: number;
    actualPrice: number;
    payType: string;
    customerId: string;
    NoteStatus: string;
    remark: string;
    creatorEmpNo: string;
    createTime: Date;
    updateEmpNo: string;
    updateTime: Date;
    effectiveTime: Date;
}
