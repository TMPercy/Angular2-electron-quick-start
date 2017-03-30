/**
 * tool-lib
 */
'use strict';
let tools = {
    namespace: (name?: string) => {
        return (v?: string) => {
            return name + '-' + v;
        }
    },
    transformPositon: (obj: any) => {
        let result = Object.assign({}, obj);
        for (let i in result) {
            for (let j in result[i]) {
                if (typeof result[i][j] == 'number')
                    result[i][j] = result[i][j] + 'px';
            }
        }
        return result;
    },
    px2num: (obj: any) => {
        let result = Object.assign({}, obj);
        console.log(obj)
        let positionKey = ['bottomSidePanePosition', 'bottomSideDividerPosition', 'leftSidePanePosition', 'leftSideDividerPosition', 'contentPanePosition']
        for (let i in positionKey) {
            for (let j in result[positionKey[i]]) {
                if (typeof result[positionKey[i]][j] == 'string')
                    result[positionKey[i]][j] = +result[positionKey[i]][j].replace('px', '');
            }
        }
        return result;
    },
    seed: () => {
        return (new Date()).getTime().toString().substr(-2, 2) + Math.floor(Math.random() * 100);
    },
    transformHeaderPayload: (obj: any) => {
        let result = {};
        for (let i = 0, len = obj.length; i < len - 1; i += 2) {
            result[obj[i]] = obj[i + 1];
        }
        return result;
    },
    transformBodyPayload: (obj: any) => {

    },
    copy: (obj: any) => {
        return JSON.parse(JSON.stringify(obj));
    }
}

export const NameSpace = tools.namespace.bind(tools);
export const Tools = tools;