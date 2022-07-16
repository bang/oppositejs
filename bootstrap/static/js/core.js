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
        var items = action.split('.')
        var class_name = items[0]
        var action_method = items[1]
        // Avoiding problems(the most stupid way) dangerous code injection
        if(! class_name.match(/^[A-Z][a-zA-Z0-9]+$/)){
            console.error("Try to use a normal class name using camelcase starting with the first letter in uppercase")
            return false;
        }
        if(items.length > 1){
            // window[<SOMETHING>] doesn't works into class context because of encapsulation I guess.
            if(class_name == 'HomeModal'){
                console.log("Loading HomeModal")
            }
            var instance = eval("new " + class_name + "(this.app)")
            // If parameters was sent, call method with parameters.
            if(params !== undefined) {
                instance[action_method](event, element, params)
            }
            else {
                instance[action_method](event, element)
            }
        }
        else if(params !== undefined) {
            this.item(event, element)
        }
        else {
            this.item(event, element, params)
        }
    }

    _addEvent(event_name) {
        var eventListName = event_name + "EventIds"
        if(!(eventListName in this.eventLists)){
            this.eventLists[eventListName] = new Array()
        }
        this.eventLists[eventListName].forEach((id) => {
            var element = document.querySelector('#' + id)
            // Adds event handler only where doesn't exists yet
            if(!(id in this.eventHandlers)){
                this.eventHandlers[id] = element.addEventListener(event_name, (e) => {
                    //check for action
                    if(element.attributes !== undefined ) {
                        // Executing module method according to attribute
                        this._processEventAttribute(e, element, event_name)
                    }
                }, false)
            }
        })
    }

    updateElementsEvents(elements_ids, event_name){
        elements_ids.forEach((id) => {
            var element = document.querySelector("#" + id)
            var self = this
            element.addEventListener(event_name, (e) => {
                self._processEventAttribute(e, element, event_name)
            }, false)
        })
    }

    _addAllEvents() {
        SUPPORTED_EVENTS.forEach((event_name) => {
            this._addEvent(event_name)
        })
    }

    _dealWithEvents(obj){
        /* Deals with attributes, selecting specific from it to apply specific actions */
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
        this._traverse(document)
    }

    refresh(element) {
        if(element === undefined || element === null){
            element = document
        }

        if(element !== undefined && element !== null){
            this._traverse(element)
        }
    }
}
