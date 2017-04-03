import { FormDataBase } from '../components/form-item/form.base';


export interface AppState {
    bottomSidePanePosition: { left: number, height: number },
    bottomSideDividerPosition: { left: number, bottom: number },
    leftSidePanePosition: { width: number },
    leftSideDividerPosition: { left: number },
    contentPanePosition: { 'margin-left': number, bottom: number },
    viewContentLoaded: boolean,
    headerFormDatas: FormDataBase<any>[][]
};
