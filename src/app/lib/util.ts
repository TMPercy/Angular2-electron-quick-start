/**
 * tool-lib
 */
'use strict';
import * as _ from "underscore";
let base64Sign;
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
    fransformFileToValue: (obj: any) => {
        let result = this.copy(obj);
        for (let i in obj) {
            if (obj[i] instanceof File) {
                result[i] = obj[i].name
            }
        }
        return result;
    },
    copy: (obj: any) => {
        // return _.clone(obj);
        return JSON.parse(JSON.stringify(obj));
    },
    isEqual: (object, other) => {
        return _.isEqual(object, other);
    },
    generateSign: () => {
        if (base64Sign) return base64Sign;
        base64Sign = 'base64Sign' + Math.floor(Math.random() * 100);
        return base64Sign;
    }
}

export const NameSpace = tools.namespace.bind(tools);
export const Tools = tools;
