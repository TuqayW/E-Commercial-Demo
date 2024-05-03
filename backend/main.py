from database import Base, SessionLocal, engine
from fastapi import FastAPI, Depends, HTTPException, status,Body
from fastapi.middleware.cors import CORSMiddleware
import schemas, models
from typing import List
from sqlalchemy.orm import Session

Base.metadata.create_all(engine)

def get_session():
    session = SessionLocal()
    try:
        yield session
    finally:
        session.close()

app = FastAPI(docs_url="/docs")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)

@app.get("/")
def index():
    return "Hello World!"

@app.post("/signup", response_model=schemas.User)
def add_student(new_person: schemas.UserCreate, session: Session = Depends(get_session)): 
    user = models.User(
        name=new_person.name,
        surname=new_person.surname,
        email=new_person.email,
        password=new_person.password
    )
    session.add(user)
    session.commit()
    session.refresh(user)

    return user

@app.get("/getAllUsers",response_model=List[schemas.User])
def getAllUsers(session:Session=Depends(get_session)):
    users=session.query(models.User).all()
    return users

@app.delete("/deleteUser/{id}")
def deleteUserById(id:int,session:Session=Depends(get_session)):
    user = session.query(models.User).get(id)
    if not user:
        return "User not found"
    session.delete(user)
    session.commit()
    session.refresh(user)
    return {"message": "User deleted successfully"}

@app.get("/getUserById/{id}")
def getUserById(id:int,session:Session=Depends(get_session)):
    user=session.query(models.User).get(id)
    return user.name

@app.post("/login", response_model=schemas.User)
@app.get("/login", response_model=schemas.User)
def login(email: str = Body(..., embed=True), password: str = Body(..., embed=True), session: Session = Depends(get_session)):
    user = session.query(models.User).filter(models.User.email == email).first()
    if not user or user.password != password:
        raise HTTPException(status_code=401, detail="Invalid email or password")
    return user
# @app.get("/getStudentById/{id}",response_model=schemas.Student)
# def getStudentById(id:int,session:Session=Depends(get_session)):
#     student=session.query(models.Student).get(id)
#     if not student:
#         raise HTTPException(status_code=404,detail=f"Student {id} not found!")
#     return student

# @app.get("/getStudent",response_model=List[schemas.Student])
# def getStudentById(session:Session=Depends(get_session)):
#     student=session.query(models.Student).all()
#     if not student:
#         raise HTTPException(status_code=404,detail=f"Students not found!")
#     return student


# @app.put("/updateStudentById/{id}",response_model=schemas.Student)
# def updateStudentbyId(id:int,newUser:schemas.StudentCreate,session:Session=Depends(get_session)):
#     student=session.query(models.Student).get(id)
#     if not student:
#         raise HTTPException(status_code=404,detail=f"Student {id} not found")
#     student.name=newUser.name
#     student.surname=newUser.surname
#     student.age=newUser.age
#     student.score=newUser.score

# @app.delete("/deleteStudentbyId/{id}")
# def deleteStudentById(id:int,session:Session=Depends(get_session)):
#     student=session.query(models.Student).get(id)

#     if not student:
#         raise HTTPException(status_code=404,detail=f"Student {id} not found!")

#     session.delete(student)
#     session.commit()
#     session.refresh(student)
#     return f"Student {id} successfully deleted"




# @app.get("/getTeacherById/{id}",response_model=schemas.Teacher)
# def getTeacherById(id:int,session:Session=Depends(get_session)):
#     teacher=session.query(models.Teacher).get(id)
#     if not teacher:
#         raise HTTPException(status_code=404,detail=f"Teacher {id} not found!")
#     return teacher

# @app.get("/getTeacher",response_model=List[schemas.Teacher])
# def getTeacherById(session:Session=Depends(get_session)):
#     teacher=session.query(models.Teacher).all()
#     if not teacher:
#         raise HTTPException(status_code=404,detail=f"Teachers not found!")
#     return teacher

# @app.post("/addTeacher",response_model=schemas.Teacher)
# def addTeacher(newTeacher:schemas.TeacherCreate,session:Session=Depends(get_session)): 
#     teacher=models.Teacher(name=newTeacher.name,surname=newTeacher.surname,subject=newTeacher.subject,age=newTeacher.age,experience=newTeacher.experience)
#     session.add(teacher)
#     session.commit()
#     session.refresh(teacher)

#     return teacher

# @app.put("/updateTeacherById/{id}", response_model=schemas.Teacher)
# def updateTeacherById(id: int, newTeacher: schemas.TeacherCreate, session: Session = Depends(get_session)):
#     teacher = session.query(models.Teacher).get(id)
#     if not teacher:
#         raise HTTPException(status_code=404, detail=f"Teacher {id} not found")
#     teacher.name = newTeacher.name
#     teacher.surname = newTeacher.surname
#     teacher.subject = newTeacher.subject
#     teacher.age = newTeacher.age
#     teacher.experience = newTeacher.experience
#     session.commit()
#     return teacher

# @app.delete("/deleteTeacherbyId/{id}")
# def deleteTeacherById(id:int,session:Session=Depends(get_session)):
#     teacher=session.query(models.Teacher).get(id)

#     if not teacher:
#         raise HTTPException(status_code=404,detail=f"Teacher {id} not found!")

#     session.delete(teacher)
#     session.commit()
#     session.refresh(teacher)
#     return f"teacher {id} successfully deleted"