/**
 * Created by Rohit Kamal Saxena on 3/2/17.
 */
import sizeof from 'object-sizeof';

module.exports = {
    /**
     * converts a data_obj into standard JSON format expected from API
     * @param  {object} data_obj {type: <success/error>, statusMessage: <string>, data: <object>}
     * @return {object}
     */
    jsonResponse: (data_obj) => {
        var json_response = {};

        if (data_obj.type == "success") {
            json_response = {
                'status': {
                    'statusType': 'SUCCESS',
                    'statusMessage': data_obj.statusMessage ? data_obj.statusMessage : 'Success',
                    'statusCode': 2000
                }
            }
            if (typeof(data_obj.totalCount) != 'undefined'){
                json_response['status']['totalCount'] = data_obj.totalCount;
            }
        }
        else if (data_obj.type == "error") {
            json_response = {
                'status': {
                    'statusType': 'FAILURE',
                    'statusMessage': data_obj.statusMessage ? data_obj.statusMessage : 'Error',
                    'statusCode': 3000
                }
            }
        }

        // copying remaining keys to json_response
        for (var key in data_obj) {
            if (key != "type" && key != "statusMessage" && key != "totalCount") {
                json_response[key] = data_obj[key]
            }
        }

        return json_response;
    },
    isValidDate: (date_str) => {
        var bits = date_str.split('-');
        if (bits.length != 3) {
            return false;
        }

        var d = new Date(bits[0], bits[1] - 1, bits[2]);
        return d && (d.getMonth() + 1) === Number(bits[1]) && d.getDate() === Number(bits[2]) && d.getFullYear() === Number(bits[0]);
    },
    isValidEmail: (val) => {
        // Regualar Expression copied from stack overflow [46155]
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(val);
    },
    toTitleCase: (str) => {
        return str.replace(/\w\S*/g, function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    },
    formatNumber: (number) => {
        number = number.toString();

        var afterPoint = '';
        if (number.indexOf('.') > 0)
            afterPoint = number.substring(number.indexOf('.'), number.length);

        number = Math.floor(number);
        number = number.toString();
        var lastThree = number.substring(number.length - 3);
        var otherNumbers = number.substring(0, number.length - 3);
        if (otherNumbers != '')
            lastThree = ',' + lastThree;

        return otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree + afterPoint;
    },
    formatMoney: (number) => {
        if (number) {
            return number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
        }
        return '';
    },
    /**
     * returns the size of the object in KB
     * @param obj
     * @returns {number}
     */
    getSizeOfObj: (obj) => {
        var bytes = sizeof(obj);
        return bytes / 1024;
    },
    getFileExtension: (fileName) => {
        return fileName.substring(fileName.lastIndexOf('.'));
    },
    sanitizeImageUrl: (imageUrl, imageWidth) => {
        if (imageWidth == undefined) {
            imageWidth = 360;
        }

        var sanitizedUrl = imageUrl;
        if (imageUrl && imageUrl.length) {
            sanitizedUrl = imageUrl.replace("myntra.myntassets.com/", "assets.myntassets.com/w_" + imageWidth + ",q_90/");
        }
        return sanitizedUrl;
    },
    generateUUID: () => {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    },
    sanitizeFileName: (fileName) => {
        return fileName.replace(/[^a-z0-9/.]/gi, '_').toLowerCase();
    }
};