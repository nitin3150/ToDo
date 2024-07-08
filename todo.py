def login():
    name = input("Enter username to login: ")
    fileName = name+'.txt'
    f = open('fileName','r')
    print(f.read())
    print('''\n1: Add new task\n2: Delete task\n3: Exit\n''')
    select = int(input("Choose: "))
    match select:
        case 1:
            addTask(fileName)
        case 2:
            deleteTask()
        case 3:
            exit()
        case _:
            print("Choose correct option")

def CreateUser():
    name = input("Enter username: ")
    fileName = name+'.txt'
    f = open('fileName','w')
    f.write('This is a ToDo list for '+name)
    print('User created!')
    login()

def addTask(fileName):
    f = open('filename','a')
    task = input('Enter task: ')
    time = input('Enter time: ')
    f.write(f'\nTask: {task}\t Time: {time}')
    f = open('filename','r')
    print(f.read())

def deleteTask():
    pass
def deleteUser():
    pass

def printOptions():
    print('''1: Create new user\n2: Existing User\n3: Exit''')

printOptions()

match int(input("Choose: ")):
    case 1:
        CreateUser()
    case 2:
        login()
    case 3:
        exit()
    case _:
        print("Choose correct option")
        printOptions()