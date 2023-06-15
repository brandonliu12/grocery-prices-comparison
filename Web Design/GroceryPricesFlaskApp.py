import pandas as pd
from flask import Flask, jsonify, render_template
from flask_cors import CORS
import math
import numpy as np

app = Flask(__name__)
CORS(app)

# Load the sorted and merged DataFrame
df_sorted_merged = pd.read_csv('Final_Merged_Loblaws_price_comparison.csv')

# Replace NaN values with a specific string
df_sorted_merged.replace(np.nan, 'N/A', inplace=True)

# Base Route
@app.route("/")
def index():
    return render_template("index.html")

# API Route
@app.route("/api")
def api():
    # Convert DataFrame to a list of dictionaries
    data = df_sorted_merged.to_dict(orient='records')

    # Return JSON data
    return jsonify(data)

# Run
if __name__ == "__main__":
    app.run()