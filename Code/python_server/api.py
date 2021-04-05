from flask import Flask
import popularTimesAPI
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
app.config["DEBUG"] = True

@app.route('/api/')
def api():
  return popularTimesAPI.api()

if __name__ == '__main__':
  app.run(host='0.0.0.0')