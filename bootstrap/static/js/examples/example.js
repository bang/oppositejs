import Base from '/static/js/base.js'


export default class Example extends Base {
    constructor(app){
        super()
        this.app = app
    }

    click1(event, element, params) {
        alert("HEY FROM example1")
    }

    click2(event, element, params) {
        alert("HEY FROM example2")
    }

    click3(event, element, params) {
        alert("HEY FROM exemple3")
    }

    replaceVarEx(event, element, params){
        console.log(params)
        var div = document.querySelector('#click_rep')
        var target = document.querySelector('#var2div')
        this.action.replaceVars(div, target, JSON.stringify(params))
    }
}
