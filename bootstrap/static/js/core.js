import Action from '/static/js/action.js';

// Global constants
const SUPPORTED_EVENTS = new Array("click", "mouseover", "mouseout", "change",
                            "keydown", "keyup", "keypress", "onload"
                         )

const FULLNAME_SUPPORTED_EVENTS = new Array("event_click", "event_mouseover", "event_mouseout", "event_change",
                            "event_keydown", "event_keyup", "event_keypress", "event_onload")

export default class Core {
    constructor(app){
        this.action = new Action(this)
        this.eventLists = {}
        this.eventHandlers = {}
        this.app = app
    }
    _dealWithAttributes(obj){
        /* Deals with attributes, selecting specific from it to apply specific actions */
        if( obj.attributes !== undefined){
            Array.from(obj.attributes).forEach((attr) => {
                // Seek for specific attributes to perform a correspondent action
                if(attr.name == 'repeat'){
                    this.action.repeat(obj, obj, parseInt(attr.value))
                }
                else if(attr.name == 'replace_vars'){
                    this.action.replaceVars(obj, obj)
                }
                else if(attr.name == 'replace_template'){
                    let json_obj = JSON.parse(attr.nodeValue)
                    var position = null
                    if(json_obj['position'] !== null && json_obj['position'] !== undefined && json_obj['position'] != '' ){
                        position = json_obj['position']
                    }
                    this.action.replaceTemplate(obj, obj, 'inline-box', position)
                }
            });
        }
    }

    _processEventAttribute(event, element, event_name) {
        let attribute = JSON.parse(element.getAttribute("event_" + event_name))
        var params = {}
        if('params' in attribute) {
            params = attribute['params']
        }
        var action = attribute['action']
        var module_path = attribute['module_path']
        var items = action.split('.')
        var class_name = items[0]
        var action_method = items[1]
        // Avoiding problems(the most stupid way) dangerous code injection
        if(! class_name.match(/^[A-Z][a-zA-Z0-9]+$/)){
            console.error("Try to use a normal class name using camelcase starting with the first letter in uppercase")
            return false;
        }
        if(items.length > 1){
            if(module_path !== null) {
                import(module_path).then(module_obj => {
                    module_obj = module_obj.default
                    var instance = new module_obj(this)
                    if(params !== null && params !== undefined){
                        instance[action_method](event, element, params)
                    }
                    else {
                        instance[action_method](event, element)
                    }
                })
                .catch(err => {
                    console.error("Can't load module " + module_path + " - " + err)
                })
            }
            else {
                let msg = "module_path is not defined!"
                console.error(msg)
                return
            }
        }
    }

    updateElementsEvents(elements_ids, event_name){
        /* Forces a new addEventListener event for one or more object ids */
        elements_ids.forEach((id) => {
            var element = document.querySelector("#" + id)
            var self = this
            element.addEventListener(event_name, (e) => {
                self._processEventAttribute(e, element, event_name)
            }, false)
        })
    }

    _dealWithEvents(obj){
        /* Look at attributes searching for custom event attributes and adding listeners for them */
        if( obj.attributes !== undefined){
            Array.from(obj.attributes).forEach((attr) => {
                // Seeking for specific attributes to perform a correspondent action
                if(attr.name.match(/^event_/)) {
                    let part = attr.name.replace('event_', '')
                    let eventListName = part + "EventIds"
                    if( eventListName in this.eventLists) {
                        this.eventLists[eventListName].push(obj.id)
                    }
                    else {
                        this.eventLists[eventListName] = new Array()
                        this.eventLists[eventListName].push(obj.id)
                    }
                    // Adding event
                    let js_event_name = attr.name.split('_')[1]
                    let element = document.querySelector("#" + obj.id)
                    let app = this
                    element.addEventListener(js_event_name, (e) => {
                        app._processEventAttribute(e, element, js_event_name)
                    }, false)
                    // For all elements that will be clicked, 'pointer' is the correct cursor
                    if(attr.name == 'event_click'){
                        obj.style.cursor='pointer'
                    }
                }
            }, false);
        }
    }

    _traverse(obj){
        /* Look at neasted nodes on DOM processing custom attributes and events */
        if( obj !== null && typeof(obj) == "object" ) {
            // Getting attributes
            this._dealWithAttributes(obj)
            this._dealWithEvents(obj)
            obj.childNodes.forEach((o) => {
                this._traverse(o)
            })
        }
    }

    start() {
    /* Look at document object searching for custom attributes and events */
        this._traverse(document)
    }

    refresh(element) {
    /* Look at an specific element searching for custom attributes and events. If element is suppress, assume document */
        if(element === undefined || element === null){
            element = document
        }
        else if(element !== undefined && element !== null){
            this._traverse(element)
        }
    }
}
