def login():
    pass
def CreateUser():
    pass
def deleteUser():
    pass
def printOptions():
    print('''1: Create new user\n2: Existing User\n3: Exit''')

printOptions()

match int(input("Choose")):
    case 1:
        CreateUser()
    case 2:
        login()
    case 3:
        exit()
    case _:
        print("Choose correct option")
        printOptions()