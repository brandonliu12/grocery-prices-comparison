from flask import Flask, jsonify, render_template
import pandas as pd

app = Flask(__name__)

# Base Route
@app.route("/")
def index(): 
    return render_template("index.html")

# API Route
@app.route("/api")
def api():
    try:
        # Load the CSV file into a pandas DataFrame
        df = pd.read_csv('Sorted_Merged_Loblaws_price_comparison.csv')

        # Convert the DataFrame to a dictionary and jsonify it
        data = df.to_dict(orient='records')
        return jsonify(data)
    except Exception as e:
        print(e)  # print the error to the console for debugging
        return jsonify({"error": str(e)}), 500  # Return a JSON response with error message and a 500 status code

# Run
if __name__ == "__main__":
    app.run(debug=True)  # enable debug mode for more detailed error messages
