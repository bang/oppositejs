import Base from '/static/js/base.js'

export default class Index extends Base {

    constructor(app){
        super()
        this.app = app
        var version = this.config.version
        var title = document.querySelector("#main_title")
        var vars = JSON.stringify({"version": version})
        this.app.action.replaceVars(title, title, vars)
    }
}
