import pandas as pd
from flask import Flask, jsonify, render_template
from flask_cors import CORS
import math

app = Flask(__name__)
CORS(app)

# Load the sorted and merged DataFrame
df_sorted_merged = pd.read_csv('Sorted_Merged_Loblaws_price_comparison.csv')

# Base Route
@app.route("/")
def index():
    return render_template("index.html")

# API Route
@app.route("/api")
def api():
    # Convert DataFrame to a list of dictionaries
    data = df_sorted_merged.to_dict(orient='records')

    # Handle NaN values in the data
    for row in data:
        for key, value in row.items():
            if isinstance(value, float) and math.isnan(value):
                row[key] = 'N/A'

    # Return JSON data
    return jsonify(data)

# Run
if __name__ == "__main__":
    app.run()







