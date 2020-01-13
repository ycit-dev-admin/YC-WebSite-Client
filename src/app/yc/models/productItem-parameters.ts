import { QueryParameters } from '../../shared/query-parameters';

export class ProductItemParameters extends QueryParameters {
    title?: string;

    constructor(init?: Partial<ProductItemParameters>) {
        super(init);
        Object.assign(this, init);
    }
}
