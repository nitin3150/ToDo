from fastapi import FastAPI
# from services import create_user
from fastapi.params import Body


app = FastAPI(title = "ToDo application")

@app.get('/')
def root():
    return {'Message': "Welcome to Todo!"}

@app.post('/create-user')
async def new_user(user: dict = Body(...)):
    print(user)
    return {"Name": f"{user['name']}",
            "Email" : f"{user['email']}"
            }