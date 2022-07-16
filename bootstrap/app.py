import os


from flask import Flask, render_template, send_from_directory

app = Flask(__name__)
# Default port
PORT = 8088
if 'OPPOSITEJS_PORT' in os.environ :
    PORT = os.environ['OPPOSITEJS_PORT']


@app.route('/')
def render_main():
    return render_template('index.html')


@app.route('/favicon.ico')
def favicon():
    return send_from_directory(os.path.join(app.root_path, 'static'), 'favicon.ico', mimetype='image/x-icon')


@app.route('/getting_started')
def render_usage():
    return render_template('index.html')


@app.route('/download')
def render_download():
    return render_template('index.html')


@app.route('/get_template/<template_path>', methods=['GET'])
def get_template(template_path):
    return render_template(template_path)


@app.route('/get_template/components/<template_path>', methods=['GET'])
def get_component_template(template_path):
    return render_template("/components/" + template_path)


@app.route('/get_template/components/footer/<template_path>', methods=['GET'])
def get_footer_component_template(template_path):
    return render_template("/components/footer/" + template_path)


@app.route('/get_template/components/header/<template_path>', methods=['GET'])
def get_header_component_template(template_path):
    return render_template("/components/header/" + template_path)


@app.route('/get_template/examples/<template_path>', methods=['GET'])
def get_example_template(template_path):
    return render_template("/examples/" + template_path)


if __name__ == '__main__':
    app.run(host="0.0.0.0", debug=True, port=PORT)
