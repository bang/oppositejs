import Action from '/static/js/action.js';
import Config from '/static/js/config.js';


export default class Base {
    config = {}
    clickEventIds = []
    changeEventIds = []
    mouseoverEventIds = []
    mouseoutEventIds = []
    keydownEventIds = []
    keyupEventIds = []
    json_struct = {}

    constructor() {
        this.config = new Config()
        this.action = new Action()
        this.eventLists = {}
        this.json_struct = {}
    }

    arrayRemove(arr, value) {
        return arr.filter(function(target){
            return value != target;
        });
    }

    loadJsonStruct(){
        // Load from cookie
        var c = document.cookie
        if(c !== undefined && typeof(c) == 'string' && c.length > 0){
            var from_cookie = c.split('json_struct=')[1]
            this.json_struct = JSON.parse(from_cookie)
        }
        else {
            this.json_struct = {}
        }
    }

    clearJsonStruct() {
        // cleanup cookies
        document.cookie = "json_struct={}"
    }

    saveJsonStruct() {
        // Save json_struct attribute using cookie
        document.cookie = "json_struct=" + JSON.stringify(this.json_struct)
    }

    setOutputJson() {
        document.querySelector("#json_output").innerHTML = JSON.stringify(this.json_struct, null, 2);
        this.saveJsonStruct()
    }
}