from schema.schema import CreateTask
from sqlalchemy.orm import Session
from db.models import Task

def create_task(task: CreateTask,db: Session,current_user):
    new_task = Task(description = task.description, priority = task.priority, user_id = current_user.id)
    db.add(new_task)
    db.commit()
    db.refresh(new_task)
    return new_task