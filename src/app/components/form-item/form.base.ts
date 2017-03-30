export class FormDataBase<T>{
    value: T;
    key: string;
    label: string;
    name: string;
    required: boolean;
    order: number;
    controlType: string;
    placeholder: string;
    defaultValue: string;
    constructor(options: {
        value?: T,
        key?: string,
        label?: string,
        name?: string,
        required?: boolean,
        placeholder?: string,
        order?: number,
        controlType?: string,
        defaultValue?: string
    } = {}) {
        this.value = options.value;
        this.key = options.key || '';
        this.label = options.label || '';
        this.name = options.name || '';
        this.placeholder = options.placeholder || '';
        this.defaultValue = options.defaultValue || '';
        this.required = !!options.required;
        this.order = options.order === undefined ? 1 : options.order;
        this.controlType = options.controlType || '';
    }
}