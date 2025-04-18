from sqlalchemy.orm import Session
from services.add_task import create_task
from fastapi import Depends, APIRouter
from db.database import get_db
from db.models import Task
from schema.schema import CreateTask
from services.remove_task import delete_task

router = APIRouter(
    prefix = "/tasks",
    tags=["Tasks"]
)

@router.post('/')
async def new_task(task: CreateTask, db: Session = Depends(get_db)):
    return create_task(task,db)

@router.get('/{id}')
async def test(id: int, db : Session = Depends(get_db)):
    tasks = db.query(Task).filter(Task.user_id == id).all()
    return {"Data": tasks}

@router.get('/delete/{id}')
async def delete(id: int, db: Session = Depends(get_db)):
    return delete_task(id,db)