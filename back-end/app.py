from flask import Flask, render_template

app = Flask(__name__, static_folder="./../front-end/build/static", template_folder="./../front-end/build")

@app.route("/")
def hello():
    return render_template('index.html')