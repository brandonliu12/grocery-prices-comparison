from flask import Flask, jsonify, render_template
import pandas as pd

app = Flask(__name__)

# Load the data at the start of the application
df = pd.read_csv('Web Scrapping\Sorted_Merged_Loblaws_price_comparison.csv')

@app.route('/')
def main():
    # This is the main page
    return render_template('main.html')

@app.route('/view_data')
def view_data():
    # Render the DataFrame in an HTML template
    return render_template('data.html', data=df.to_html())

@app.route('/charts')
def charts():
    # Page for dynamic charts
    # This will depend on what charting library you want to use
    # And what data you want to display
    return render_template('charts.html', data=df.to_dict(orient='records'))

@app.route('/maps')
def maps():
    # Page for leaflet plots
    # The implementation will depend on how you want to plot your data
    return render_template('maps.html', data=df.to_dict(orient='records'))

if __name__ == '__main__':
    app.run(debug=True)
