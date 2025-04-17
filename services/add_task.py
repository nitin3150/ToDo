from schema.schema import CreateTask
from fastapi import Depends
from sqlalchemy.orm import Session
from db.database import get_db
from db.models import Task

def create_task(task: CreateTask,db: Session = Depends(get_db)):
    new_task = Task(id = task.id, description = task.description, priority = task.priority, user_id = task.user_id)
    db.add(new_task)
    db.commit()
    db.refresh(new_task)
    return {'Message': new_task}