/* action.js

Implements action methods. Action it's a concept that perform transformations in elements.

*/

export default class Action {

    constructor(app) {
        this.app = app
    }

    _traverse_repeat(obj, index){
        if( obj !== undefined && obj.id != undefined && typeof(obj) == "object" ) {
            obj.childNodes.forEach((c) => {
                if(! c.nodeName.match(/^#text$/) && c.attributes !== undefined){
                    // iterating attributes
                    Array.from(c.attributes).forEach((attr) => {
                        if(attr.value.match(/\$\{index\}/)) {
                            attr.value = attr.value.replace("${index}", index)
                        }
                    })
                }
                //Maybe object has no id
                c.id += '_' + index
                this._traverse_repeat(c)
            })
        }
    }

    repeat(obj, target, times, position='after', modify_original_id=true) {
        /* Repeats an element n times positioning the clones before or after a target element. */
        // Assuming target as obj if it's not defined
        if(target === undefined || target == null){target = obj}
        // Getting parent
        for(var t = times; t > 1; t--) {
            var clone = obj.cloneNode(true)
            clone.id = clone.id + '_' + t
            clone.removeAttribute('repeat')
            target[position](clone)
            if(clone.childNodes !== undefined){
                this._traverse_repeat(clone, t)
            }
        }
        // Modifying original ids if sufix is set as _\d+. If it's not, set modify_original_id as false
        if(modify_original_id) {
            obj.id += '_1'
        };

        // Applying traverse to the original obj
        if(obj.childNodes !== undefined){
            this._traverse_repeat(obj, t)
        }
    }

    getStructure(obj, structure_string){
        /* Builds a data structure based on a JSON string passed as a parameter or the 'replace_template' attribute.

        */
        let structure = null
        if(structure_string === null || structure_string === undefined || typeof(structure_string) != 'string' || structure_string.length == 0){
            structure = JSON.parse(obj.getAttribute('replace_template'))
        }
        else {
            structure = JSON.parse(structure_string)
        }
        return structure
    }

    replaceTemplate(obj, target, display, keep_content, position, structure_string){
        /* Replace a template code into element. Can replace vars into it.
            Ex:
            Template file 'templates/examples/someTemplate.html'
            -------------
            <p> Roses are ${rose_color} and violets are ${violet_color}</p>

            HTML file
            ---------
               <div id="my_div"
                    replace_template='{
                        "template": "templates/examples/someTemplate.html"
                        "vars": [
                            {"roses_color": "red"},
                            {"violet_color": "blue"}
                        ]
                    }' >
               </div>

            Javascript calling(if needed)
            -----------------------------
                let mydiv = document.querySelector('#my_div")
                vars = [
                    {"roses_color": "red"},
                    {"violet_color": "blue"}
                ]
                this.app.action.repeatTemplate("someTemplate.html", mydiv, null, null, null, JSON.stringify(vars))

        */
        // Setting default
        if(display === null || display === undefined || display == "") display="inline"
        if(keep_content === null || keep_content === undefined || keep_content == "") keep_content=false
        if(position === null || position === undefined || position == "") position="after"
        // Getting structure
        let structure = this.getStructure(obj, structure_string)
        let template = structure['template']
        // Fetching template
        var old_content = target.innerHTML
        var self = this
        fetch('/get_template/' + template).then((response) => {
            // Success!
            return response.text();
        }).then((template) => {
            // Replacing variables
            let vars_list = structure['vars']
            target.innerHTML = ''
            new_html += old_content
            if('vars' in structure && structure['vars'] !== undefined && structure['vars'] !== null) {
                var new_html = template
                for(var i in vars_list){
                    this.replaceVars(new_html, new_html, JSON.stringify(vars))
                }
            }
            else {
                let new_html = template
                target.innerHTML = new_html
                console.log("NEW HTML")
                console.log(new_html)
            }
            // Temporarily remove repalce_list attribute in order to avoid infinite loops
            let tmp = target.getAttribute("replace_template")
            target.removeAttribute("replace_template")
            // Refreshing events
            self.app.refresh(target)
            // Restoring the attributes
            target.setAttribute("replace_template", tmp)
            target.style.display=display
        }).catch((err) => {
            // Error
            console.warn('Something went wrong.', err);
        });
    }

    replaceVars(obj, target, replace_vars){
        /* Replaces vars on objects which has ${some_var}*/
        let attributes = obj.attributes
        if( (replace_vars !== null && replace_vars !== undefined && replace_vars != '') ||
            (attributes !== undefined && attributes !== null && attributes['replace_vars'] !== null &&
            attributes['replace_vars']!= undefined)) {
            if(replace_vars === null || replace_vars === undefined || typeof(replace_vars) != 'string' || (typeof(replace_vars) == 'string' && replace_vars.length == 0)){
                replace_vars = JSON.parse(attributes["replace_vars"].value)
            }
            else {
                replace_vars = JSON.parse(replace_vars)
            }
            let new_html = target.innerHTML
            for(let k in replace_vars){
                let v = replace_vars[k]
                let from = new RegExp("\\$\\{" + k + "\\}", 'g')
                new_html = new_html.replace(from, v)
            }
            target.innerHTML = new_html
        }
        if(obj.childNodes !== undefined && obj.childNodes !== null) {
            self = this
            obj.childNodes.forEach((c) => {
                let attributes = c.attributes
                if('replace_vars' in c) {
                    self.replaceVars(c, c)
                }
            })
        }
    }
}
