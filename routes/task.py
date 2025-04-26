from sqlalchemy.orm import Session
from services.add_task import create_task
from fastapi import Depends, APIRouter
from db.database import get_db
from db.models import Task
from schema.schema import CreateTask,UpdateTask
from services.remove_task import delete_task
from utils.auth import get_current_user
from services.update_task import update_task

router = APIRouter(
    prefix = "/tasks",
    tags=["Tasks"]
)

@router.post('/')
async def new_task(task: CreateTask, db: Session = Depends(get_db), current_user: int = Depends(get_current_user)):
    # print(task)
    return create_task(task,db,current_user)

@router.get('/gettask')
async def get_task(current_user: int = Depends(get_current_user), db : Session = Depends(get_db)):
    tasks = db.query(Task).filter(Task.user_id == current_user.id).all()
    return {"Data": tasks}

@router.delete('/delete/{id}')
async def delete(id: int, db: Session = Depends(get_db)):
    return delete_task(id,db)

@router.patch('/update/{id}')
async def update(id:int,task:UpdateTask, db: Session = Depends(get_db)):
    # print(task)
    return update_task(id,task,db)