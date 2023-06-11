import pandas as pd
from flask import Flask, jsonify, render_template

app = Flask(__name__)

# Load the sorted and merged DataFrame
df_sorted_merged = pd.read_csv(r'C:\Users\Pradivan\Documents\GitHub\grocery-prices-comparison\Web Design\Sorted_Merged_Loblaws_price_comparison.csv')

# Base Route
@app.route("/")
def index():
    return render_template("index.html")

# API Route
@app.route("/api")
def api():
    # Convert DataFrame to JSON
    data = df_sorted_merged.to_dict(orient='records')

    # Return JSON data
    return jsonify(data)

# Run
if __name__ == "__main__":
    app.run()
