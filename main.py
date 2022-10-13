
import base64
import cv2
import json
import js
import numpy as np


def bytes_to_data_url(img_bytes):
    return base64.b64encode(img_bytes).decode("ascii")

def readb64(encoded_data):
    nparr = np.frombuffer(base64.b64decode(encoded_data), np.uint8)
    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    return img


js.console.log("nav element created")

async def handle_click(e):
    img = js.getCanvasSrc()
    msk= js.getMaskSrc()
    pyscript.write("output", "you clicked the button")
    newSrc = inpainting(img,msk)
#     js.setCanvasSrc(newSrc)
    js.setCanvasSrc(newSrc)
    pyscript.write("output", "finish")
# async def click_upload(event):


    # js.updateCorners()  # send points to js
def inpainting(static_img,mask):
    rgb_img = readb64(static_img[len('data:image/jpg;base64,'):])
    mask_img= readb64(mask[len('data:image/jpg;base64,'):])
    gray_img = cv2.cvtColor(mask_img, cv2.COLOR_RGB2GRAY)
    inpaint_image = cv2.inpaint(rgb_img, gray_img, 1, cv2.INPAINT_TELEA)

    _, buffer = cv2.imencode(".jpg", inpaint_image)
    data_url = bytes_to_data_url(buffer)
    return f"data:image/jpg;base64,{data_url}"

