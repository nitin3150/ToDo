from sqlalchemy.orm import Session
from schema.schema import UpdateTask
from db.models import Task

def update_task(id : int, task: UpdateTask,db: Session):
    found_task = db.query(Task).filter_by(id = id).first()
    if found_task:
        if task.completed:
            found_task.completed = task.completed
        else:
            found_task.description = task.description
            found_task.priority = task.priority
        db.commit()
        db.refresh(found_task)
    return found_task