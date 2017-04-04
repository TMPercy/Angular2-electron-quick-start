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
        let result = tools.copy(obj);
        for (let i in obj) {
            if (obj[i] instanceof File) {
                result[i] = obj[i].name
            }
        }
        return result;
    },

    isEqual: (object, other) => {
        return _.isEqual(object, other);
    },
    generateSign: () => {
        if (base64Sign) return base64Sign;
        base64Sign = 'base64Sign' + Math.floor(Math.random() * 100);
        return base64Sign;
    },
    formatHeaderData: (obj: any) => {
        let result = obj;
        let res = {};
        if (result.length > 0) {
            for (let i in result) {
                if (result[i].checked && result[i].row[0].value && result[i].row[1].value) {
                    res[result[i].row[0].value] = result[i].row[1].value;
                }
            }
        }
        return res;
    },
    formatBodyData: (obj: any) => {
        let result = obj;
        let res = {};
        if (result.length > 0) {
            for (let i in result) {
                if (result[i].checked && result[i].row[0].value && result[i].row[2].value) {
                    res[result[i].row[0].value] = result[i].row[2].value;
                }
            }
        }
        return res;
    },
    formatBodyFormData: (obj: any) => {
        let result = obj;
        let res = {};
        let files = [];
        if (result.length > 0) {
            for (let i in result) {
                if (result[i].checked) {
                    if (result[i].row[1].value == 'text' && result[i].row[0].value && result[i].row[2].value) {
                        res[result[i].row[0].value] = result[i].row[2].value;
                    } else if (result[i].row[1].value == 'file' && result[i].row[2].value) {
                        let regex = /\((.+?)\)/g;
                        let temp = result[i].row[2].value.split(base64Sign);
                        let regtmp = temp[0].match(regex);
                        let file: File;
                        let len = regtmp.length;
                        file = new File([tools.convertBase64UrlToBlob(temp[1], regtmp[len - 1])], temp[0].split()[0])
                        files.push({ file: file, name: result[i].row[0].value });
                    }
                }
            }
        }
        return { postdata: res, files: files };
    },
    convertBase64UrlToBlob: (urlData, type) => {

        let bytes = window.atob(urlData.split(',')[1]);        //去掉url的头，并转换为byte

        //处理异常,将ascii码小于0的转换为大于0
        let ab = new ArrayBuffer(bytes.length);
        let ia = new Uint8Array(ab);
        for (let i = 0; i < bytes.length; i++) {
            ia[i] = bytes.charCodeAt(i);
        }

        return new Blob([ab], { type: type });
    },
    copy: (obj: any) => {
        // return _.clone(obj);
        return JSON.parse(JSON.stringify(obj));
    },
}

export const NameSpace = tools.namespace.bind(tools);
export const Tools = tools;
