import { QueryParameters } from '../../shared/query-parameters';

export class WeightNoteParameters extends QueryParameters {
    title?: string;

    constructor(init?: Partial<WeightNoteParameters>) {
        super(init);
        Object.assign(this, init);
    }
}
