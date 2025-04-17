from fastapi import FastAPI, Depends
from services.create_user import create_user
from services.add_task import create_task
from services.remove_task import delete_task
from fastapi.params import Body
from db.database import get_db
from sqlalchemy.orm import Session
from db.models import User, Task
from schema.schema import CreateTask

app = FastAPI(title = "ToDo application")

@app.get('/')
def root():
    return {'Message': "Welcome to Todo!"}

@app.post('/create-user')
async def new_user(user: dict = Body(...), db: Session = Depends(get_db)):
    print(user)
    return create_user(user,db)

@app.post('/create-task')
async def new_task(task: CreateTask, db: Session = Depends(get_db)):
    return create_task(task,db)

@app.get('/get-task/{id}')
async def test(id: int, db : Session = Depends(get_db)):
    tasks = db.query(Task).filter(Task.user_id == id).all()
    return {"Data": tasks}

@app.get('/get-user')
async def test(db : Session = Depends(get_db)):
    users = db.query(User).all()
    return {"Data": users}

@app.get('/delete-task/{id}')
async def delete(id: int, db: Session = Depends(get_db)):
    return delete_task(id,db)