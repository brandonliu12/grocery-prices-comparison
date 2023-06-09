from flask import Flask, render_template
import csv

app = Flask(__name__)

@app.route('/')
def display_csv():
    csv_data = []
    with open('myfile.csv', 'r') as file:
        reader = csv.DictReader(file)
        for row in reader:
            csv_data.append(row)
    return render_template('display.html', data=csv_data)

if __name__ == '__main__':
    app.run(debug=True, port=5501)
