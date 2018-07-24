/**
 * An individual list model
 * 
 * @export
 * @class List
 */
export class List {
    id: string;
    title: string;
    colour: string;
    icon: string;
    items?: Array<{ title: string; done: boolean; }>;
    removed?: boolean;
    note?: string;
}
