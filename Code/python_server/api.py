from flask import Flask, request
import popularTimesAPI
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
app.config["DEBUG"] = True

@app.route('/pythonAPI',methods=['POST'])
def api():
    # if key doesn't exist, returns a 400, bad request error
    place_id = request.args['place_id']
    
    print("query received!"+place_id)
    return popularTimesAPI.get_waiting_times(place_id)

if __name__ == '__main__':
  app.run(host='127.0.0.1')