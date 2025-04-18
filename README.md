
# 📝 ToDo App with FastAPI

A simple and efficient task management application built using FastAPI, SQLAlchemy, and PostgreSQL.

## 🚀 Features

- Create new users
- Add new tasks with priority
- View tasks
- Update and delete tasks
- PostgreSQL database integration
- RESTful API with auto-generated docs (Swagger UI)

## 📦 Tech Stack

- **Backend**: FastAPI
- **ORM**: SQLAlchemy
- **Database**: PostgreSQL
- **Templating**: Jinja2
- **Password Hashing**: Passlib (bcrypt)
- **Migrations**: Alembic (optional)

## 📂 Project Structure

```
ToDo/
│
├── main.py                # Entry point
├── models/                # SQLAlchemy models
├── routes/                # Route definitions
├── schemas/               # Pydantic models
├── services/              # Business logic
├── db/
│   └── database.py        # DB connection
├── templates/             # HTML Templates
├── static/                # CSS, JS, etc.
└── README.md              # This file
```

## 🛠️ Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/nitin3150/ToDo.git
cd todo
```

### 2. Create a virtual environment & activate it

```bash
python3 -m venv venv
source venv/bin/activate
```

### 3. Install dependencies

```bash
pip install -r requirements.txt
```

### 4. Configure your `.env` or `database.py`

Update your DB connection string in `db/database.py`:

```python
DATABASE_URL = "postgresql://username:password@localhost/dbname"
```

### 5. Run the app

```bash
uvicorn main:app --reload
```

Visit: [http://localhost:8000](http://localhost:8000)

Swagger UI: [http://localhost:8000/docs](http://localhost:8000/docs)

## ✅ Endpoints

- `GET /` – Render homepage
- `POST /user` – Register a new user
- `POST /tasks/{id}` – Add a new task
- `GET /tasks` – Get all tasks

## 🔐 Security

- Passwords are securely hashed using **Passlib** with `bcrypt`.
- Ensure to never store plain text passwords.

## 📌 Notes

- You can view and test your APIs using `/docs`.
- Consider using Alembic for production-grade schema migrations.

## ✍️ Author

- **Nitin Goyal**