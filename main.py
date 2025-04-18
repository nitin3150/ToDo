from fastapi import FastAPI
from routes import user,task

app = FastAPI(title = "ToDo application")

@app.get('/')
def root():
    return {'Message': "Welcome to Todo!"}

app.include_router(user.router)

app.include_router(task.router)