import socketio
from predict import makePredict
from frames import solve

sio = socketio.Client()
preproc_images = []
faces_images = []
video_name = ""
sio.connect('http://localhost:3000')
@sio.event
def connect():
    print('Connected to server')

@sio.event
def disconnect():
    print('Disconnected from server')
    exit()

@sio.event
def response(video):
    video_name = f"..\\server_client\\uploads\\deepfake\\{video}"
    print(video_name)

    face_path = "..\\server_client\\uploads\\faces"
    frame_path = "..\\server_client\\uploads\\frames"

    # Call the solve function
    faces_images, preproc_images = solve(video_name, face_path, frame_path)

    # Emit preproc_images and faces_images to the server
    sio.emit('preproc_images', preproc_images)
    sio.emit('faces_images', faces_images)
    print(video_name)
    if makePredict(video_name) == "REAL":
        print("REAL")
        sio.emit('prediction', "REAL")
    else:
        print("FAKE")
        sio.emit('prediction', "FAKE")
