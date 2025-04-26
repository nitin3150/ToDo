from sqlalchemy.orm import Session
from db.models import Task
from fastapi import HTTPException,status, Response

def delete_task(id,db):
    task = db.query(Task).filter(Task.id == id)

    if task.first() is None:
        raise HTTPException(status_code=status.HTTP_204_NO_CONTENT, detail="Task not found")
    
    task.delete(synchronize_session=False)
    db.commit()
    return {"Detail": "Deleted"}