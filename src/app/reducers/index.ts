import { ActionReducer, Action } from '@ngrx/store';

import {
    ERROR,
    Layout_H_Change,
    Layout_V_Change,
    View_Content_Loadded,
    ADD_HEADER_FORMDATA,
    DELETE_HEADER_FORMDATA,
    UPDATE_HEADER_CHECK_STATUS,
    UPDATE_HEADER_FORMDATA,
    ADD_BODY_FORMDATA,
    DELETE_BODY_FORMDATA,
    UPDATE_BODY_CHECK_STATUS,
    UPDATE_BODY_FORMDATA
} from '../actions';

import { DropdownItem } from '../components/form-item/form-item-dropdown';
import { FormDataBase } from '../components/form-item/form.base';
import { TextboxItem } from '../components/form-item/form-item-textbox';

import { Tools } from '../lib/util';

export const InitialState = {
    // bottomSidePanePosition: { left: 288, height: 240 },
    // bottomSideDividerPosition: { left: 288, bottom: 240 },
    leftSidePanePosition: { width: 280 },
    leftSideDividerPosition: { left: 280 },
    contentPanePosition: { 'margin-left': 280, bottom: 0 },
    viewContentLoaded: false,
    headerFormDatas: [{
        row: [
            new TextboxItem({
                key: 'tag',
                label: '头部参数:',
                name: 'tag',
                value: '',
                order: 1,
                placeholder: ''
            }),
            new TextboxItem({
                key: 'content',
                label: '头部内容:',
                name: 'content',
                value: '',
                order: 2,
                placeholder: ''
            })
        ], checked: true
    }
    ],
    bodyFormDatas: [{
        row: [
            new TextboxItem({
                key: 'name',
                label: '参数名称:',
                name: 'name',
                type: 'text',
                value: '',
                order: 1,
                placeholder: ''
            }),
            new DropdownItem({
                defaultValue: 'text',
                key: 'type',
                label: '类型:',
                name: 'type',
                value: '',
                options: [
                    { key: 'text', value: '[Text]' },
                    { key: 'file', value: '[File]' }
                ],
                order: 2
            }),
            new TextboxItem({
                key: 'value',
                label: '参数值:',
                type: 'text',
                value: '',
                name: 'value',
                order: 3,
                placeholder: ''
            })
        ], checked: true
    }
    ]
};

const transformLayout = (direction: string, value: number, state: any) => {
    let result = Tools.px2num(state);
    if (direction == 'v') {
        let diff = value - result.bottomSideDividerPosition.bottom;
        if (value > 792)
            return result;
        result.bottomSideDividerPosition.bottom = value;
        result.bottomSidePanePosition.height = result.bottomSidePanePosition.height + diff;
        result.contentPanePosition.bottom = result.contentPanePosition.bottom + diff;
    }
    else if (direction == 'h') {
        let diff = value - result.leftSideDividerPosition.left;
        if (value < 160 || value > 430)
            return result;
        result.leftSideDividerPosition.left = value;
        result.leftSidePanePosition.width += diff;
        result.bottomSideDividerPosition && (result.bottomSideDividerPosition.left += diff);
        result.bottomSidePanePosition && (result.bottomSidePanePosition.left += diff);
        result.contentPanePosition['margin-left'] += diff;
    }
    return result;
}

const generateHeaderFormData = (state: any): any[] => {
    let _new = Tools.copy(state);
    let _key = Tools.seed();
    let item = {
        row: [
            new TextboxItem({
                key: 'tag' + _key,
                label: '头部参数:',
                name: 'tag',
                value: '',
                order: 1,
                placeholder: ''
            }),
            new TextboxItem({
                key: 'content' + _key,
                label: '头部内容:',
                name: 'content',
                value: '',
                order: 2,
                placeholder: ''
            })
        ], checked: true
    }
    _new.headerFormDatas.push(item);
    return _new;
}
const removeHeaderFormData = (state: any, index: number): any[] => {
    let _new = Tools.copy(state);
    _new.headerFormDatas.splice(index, 1)
    return _new;
}
const updateHeaderFormData = (state: any, payload: any): any[] => {
    let _new = Tools.copy(state);
    for (let i = 0; i < _new.headerFormDatas.length; i++) {
        for (let j = 0; j < _new.headerFormDatas[i].row.length; j++) {
            _new.headerFormDatas[i].row[j]['value'] = payload[_new.headerFormDatas[i].row[j].key];
        }
    }
    return _new;
}
const updateHeaderCheckStatus = (state: any, payload: any): any[] => {
    let _new = Tools.copy(state);
    _new.headerFormDatas[payload.index].checked = payload.checked;
    return _new;
}




const generateBodyFormData = (state: any): any[] => {
    let _new = Tools.copy(state);
    let _key = Tools.seed();
    let item = {
        row: [
            new TextboxItem({
                key: 'name' + _key,
                label: '参数名称:',
                name: 'name',
                type: 'text',
                value: '',
                order: 1,
                placeholder: ''
            }),
            new DropdownItem({
                defaultValue: 'text',
                key: 'type' + _key,
                label: '类型:',
                name: 'type',
                value: '',
                options: [
                    { key: 'text', value: '[Text]' },
                    { key: 'file', value: '[File]' }
                ],
                order: 2
            }),
            new TextboxItem({
                key: 'value' + _key,
                label: '参数值:',
                type: 'text',
                value: '',
                name: 'value',
                order: 3,
                placeholder: ''
            })
        ], checked: true
    }
    _new.bodyFormDatas.push(item);
    return _new;
}
const removeBodyFormData = (state: any, index: number): any[] => {
    let _new = Tools.copy(state);
    _new.bodyFormDatas.splice(index, 1)
    return _new;
}
const updateBodyFormData = (state: any, payload: any): any[] => {
    console.log(payload)
    let _new = Tools.copy(state);
    for (let i = 0; i < _new.bodyFormDatas.length; i++) {
        for (let j = 0; j < _new.bodyFormDatas[i].row.length; j++) {
            if (payload[_new.bodyFormDatas[i].row[j].key] instanceof File) {
                _new.bodyFormDatas[i].row[j]['value'] = new File([payload[_new.bodyFormDatas[i].row[j].key].slice(0, payload[_new.bodyFormDatas[i].row[j].key].size, payload[_new.bodyFormDatas[i].row[j].key].type)], payload[_new.bodyFormDatas[i].row[j].key].name, payload[_new.bodyFormDatas[i].row[j].key].prototype);
                console.log(_new.bodyFormDatas[i].row[j]['value'])
                // _new.bodyFormDatas[i].row[j]['value'] = Tools.copy(payload[_new.bodyFormDatas[i].row[j].key]);
            } else {
                _new.bodyFormDatas[i].row[j]['value'] = payload[_new.bodyFormDatas[i].row[j].key];
            }
        }
    }
    console.log(_new)
    return _new;
}
const updateBodyCheckStatus = (state: any, payload: any): any[] => {
    let _new = Tools.copy(state);
    _new.bodyFormDatas[payload.index].checked = payload.checked;
    return _new;
}

export const AppStore: ActionReducer<Object> = (state: any = InitialState, action: Action) => {
    let transformObject: any;
    let _new;
    switch (action.type) {
        case ERROR:
            return {
                ...state,
                test: 'demo'
            };
        case Layout_H_Change:
            transformObject = transformLayout('h', action.payload.value, state);
            return {
                ...state,
                ...transformLayout
            };
        case Layout_V_Change:
            transformObject = transformLayout('v', action.payload.value, state);
            return {
                ...state,
                ...transformLayout
            };
        case View_Content_Loadded:
            return {
                ...state,
                viewContentLoaded: action.payload.value
            };
        case ADD_HEADER_FORMDATA:
            _new = generateHeaderFormData(state);
            return {
                ..._new
            };
        case DELETE_HEADER_FORMDATA:
            _new = removeHeaderFormData(state, action.payload.index);
            return {
                ..._new
            };
        case UPDATE_HEADER_FORMDATA:
            _new = updateHeaderFormData(state, action.payload.payload)
            return {
                ..._new
            }
        case UPDATE_HEADER_CHECK_STATUS:
            _new = updateHeaderCheckStatus(state, action.payload.payload)
            return {
                ..._new
            }
        case ADD_BODY_FORMDATA:
            _new = generateBodyFormData(state);
            return {
                ..._new
            };
        case DELETE_BODY_FORMDATA:
            _new = removeBodyFormData(state, action.payload.index);
            return {
                ..._new
            };
        case UPDATE_BODY_FORMDATA:
            _new = updateBodyFormData(state, action.payload.payload)
            return {
                ..._new
            }
        case UPDATE_BODY_CHECK_STATUS:
            _new = updateBodyCheckStatus(state, action.payload.payload)
            return {
                ..._new
            }
        default:
            return state;
    }
};
