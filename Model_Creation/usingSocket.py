import socketio
from predict import makePredict 
sio = socketio.Client()

@sio.event
def connect():
    print('Connected to server')

@sio.event
def disconnect():
    print('Disconnected from server')
    exit()

@sio.event
def prediction_result(data):
    print('Prediction:', data)

sio.connect('http://localhost:3000')


if makePredict("fake1.mp4") == "REAL":
    print("REAL")
    sio.emit('prediction', "REAL")
else:
    print("FAKE")
    sio.emit('prediction', "FAKE")