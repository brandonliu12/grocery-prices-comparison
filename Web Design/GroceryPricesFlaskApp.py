#IMPORTS

from flask import Flask, jsonify, render_template

app = Flask(__name__)

#Base Route

@app.route("/")
def index(): 
    return render_template("index.html")

#API Route
@app.route("/api")
def api():


    #Return Data

    return "data"

    #Return Nothing if Error

    return 0


#Run

if __name__ == "__main__":
    app.run()