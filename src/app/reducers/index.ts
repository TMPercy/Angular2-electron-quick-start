import { ActionReducer, Action } from '@ngrx/store';

import { ERROR, Layout_H_Change, Layout_V_Change, View_Content_Loadded } from '../actions';

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
    headerFormDatas: [[
        new TextboxItem({
            key: 'tag',
            label: '头部参数:',
            name: 'tag',
            order: 1,
            placeholder: ''
        }),
        new TextboxItem({
            key: 'content',
            label: '头部内容:',
            name: 'content',
            order: 2,
            placeholder: ''
        })
    ]
    ],
    bodyFormDatas: [[
        new TextboxItem({
            key: 'name',
            label: '参数名称:',
            name: 'name',
            order: 1,
            placeholder: ''
        }),
        new DropdownItem({
            key: 'type',
            label: '类型:',
            name: 'type',
            options: [
                { key: 'text', value: '[Text]' },
                { key: 'file', value: '[File]' }
            ],
            order: 2
        }),
        new TextboxItem({
            key: 'value',
            label: '参数值:',
            name: 'value',
            order: 3,
            placeholder: ''
        })
    ]
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
        if (value < 280)
            return result;
        result.leftSideDividerPosition.left = value;
        result.leftSidePanePosition.width += diff;
        result.bottomSideDividerPosition && (result.bottomSideDividerPosition.left += diff);
        result.bottomSidePanePosition && (result.bottomSidePanePosition.left += diff);
        result.contentPanePosition['margin-left'] += diff;
    }
    return result;
}


export const AppStore: ActionReducer<Object> = (state: Object = InitialState, action: Action) => {
    let transformObject: any;;
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
        default:
            return state;
    }
};
