export class FormDataBase<T>{
    value: T;
    key: string;
    label: string;
    name: string;
    required: boolean;
    order: number;
    controlType: string;
    placeholder: string;
    constructor(options: {
        value?: T,
        key?: string,
        label?: string,
        name?: string,
        required?: boolean,
        placeholder?: string,
        order?: number,
        controlType?: string
    } = {}) {
        this.value = options.value;
        this.key = options.key || '';
        this.label = options.label || '';
        this.name = options.name || '';
        this.placeholder = options.placeholder || '';
        this.required = !!options.required;
        this.order = options.order === undefined ? 1 : options.order;
        this.controlType = options.controlType || '';
    }
}