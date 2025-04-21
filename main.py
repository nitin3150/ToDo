from fastapi import FastAPI
from routes import user,task
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title = "ToDo application")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React app's URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# if __name__ == "__main__":
#     import uvicorn
#     uvicorn.run(app, host="0.0.0.0", port=8000)

@app.get('/')
def root():
    return {'Message': "Welcome to Todo!"}

app.include_router(user.router)

app.include_router(task.router)