import os

def login():
    fileName = ''
    name = input("Enter username to login: ")
    fileName = name+'.txt'
    try:
        with open(fileName,'r') as file:
            print(file.read())
        taskOptions(fileName)
    except IOError:
        print("User does not exist!")
        main()

def CreateUser():
    name = input("Enter username: ")
    fileName = name+'.txt'
    f = open(fileName,'w')
    f.write('This is a ToDo list for '+name)
    print('User created!')
    login()

def taskOptions(fileName):
    with open(fileName, 'r') as file:
        print('''\n1: Add new task\n2: Delete task\n3: Change Username\n 4: Exit\n''')
        select = int(input("Choose: "))
        match select:
            case 1:
                addTask(fileName)
            case 2:
                deleteTask()
            case 3:
                changeName(fileName)
            case 4:
                file.close()
            case _:
                print("Choose correct option")

def addTask(fileName):
    try:
        with open(fileName,'a') as file:
            task = input('Enter task: ')
            time = input('Enter time: ')
            file.write(f'\nTask: {task}\t Time: {time}')
        with open(fileName,'r') as file:
            print(file.read())
            taskOptions(fileName)
    except IOError:
        print("Task could not be added!")
        taskOptions(fileName)

def deleteTask():
    pass

def changeName(fileName):
    newName = input("Enter new Username: ")
    try:
        os.rename(fileName,newName)
        print("Username changed successfully!!")
    except:
        print("Username is not changed")

def deleteUser():
    name = input("Enter username: ")
    print(f"Are you sure you want to delete user {name}")
    temp = input("Yes/No: ")
    if('yes'):
        try:
            os.remove(name)
            print("List deleted")
            main()
        except:
            print("List not deleted")
    else:
        main()

def main():
    print('''1: Create new user\n2: Existing User\n3: Delete User\n4: Exit''')

    match int(input("Choose: ")):
        case 1:
            CreateUser()
        case 2:
            login()
        case 3:
            deleteUser()
        case 4:
            exit()
        case _:
            print("Choose correct option")
            main()


if __name__ == "__main__":
    main()