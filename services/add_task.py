from schema.schema import CreateTask
from fastapi import Depends
from sqlalchemy.orm import Session
from db.database import get_db
from db.models import Task
from utils.auth import get_current_user

def create_task(task: CreateTask,db: Session,current_user):
    new_task = Task(description = task.description, priority = task.priority, user_id = current_user.id)
    db.add(new_task)
    db.commit()
    db.refresh(new_task)
    return {'Message': new_task}