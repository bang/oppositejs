import Core from '/static/js/core.js'
import Base from '/static/js/base.js'
//import Index from '/static/js/index.js'

export default class Main extends Base{

    constructor() {
        super()
        console.log("Starting everything...")
        this.core = new Core(this)
        this.core.start()
        // Processing "routes"
        let url = window.location.href
        console.log("URL: " + url)
        // Getting template info from url
        let endpoint = url.replace(/http:\/\/.+?\//, "")
        if(endpoint !== null && endpoint !== undefined && endpoint.length > 0){
            this.setMainContent(endpoint)
        }
        this.init_start_module()
    }

    init_start_module(){
        /* Initiate a module defined on config.js as 'starter_module' */
        var starter_module = this.config.starter_module
        this.init_module(starter_module)
    }

    init_module(module_path){
        /* Imports and instantiate dynamically a module passed in module_path parameter */
        import(module_path).then(module_obj => {
            module_obj = module_obj.default
            var instance = new module_obj(this)
        })
        .catch(err => {
            console.error("Can't load module " + module_path + " - " + err)
        })
    }

    setMainContent(endpoint){
        /* Set content into main div */
        let template = endpoint + '.html'
        let div_main = document.querySelector("#main")
        let structure_str = {
            "template": template
        }
        this.core.action.replaceTemplate(
            div_main, div_main, null,
            null, null, JSON.stringify(structure_str)
        )
        //Importing the module correspondent to endpoint
        var module_name = endpoint
        var class_name = module_name.replace(/^\w/, (c) => c.toUpperCase());
        var module_path = '/static/js/' + module_name + '.js'
        this.init_module(module_path)
    }
}

let home = new Main()




