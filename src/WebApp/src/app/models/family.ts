import { Child } from './child';
import { Parent } from './parent';

export interface Family {
    familyId: number;
    familyName: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    telephone: string;
    children?: Child[];
    parents?: Parent[];
}
