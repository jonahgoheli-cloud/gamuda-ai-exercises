# name = "John"
# age = 30
# height = 1.75
# is_student = True

# print(f"Name: {name}, Age: {age}")

# x = "Welcome"
# place = "to Kuala Lumpur!"
# message = f"{x} {place}"

# print(x[0])
# print(x[3:6])
# print(x[3:])
# print(x[:5])
# print(x.upper())
# print(x.lower())
# print(len(x))
# print("come" in x)
# print("come1" in x)
# print(x.replace("Welc", "H"))
# print(x + " Home")
# print(message)


# ============================================================
# LESSON: Strings in Python
# A "string" is just text — letters, words, sentences.
# We wrap it in quotes so Python knows it's text, not code.
# ============================================================

# ------------------------------------------------------------
# 1. INDEXING — grabbing ONE character
# Think of each letter having a seat number, starting at 0
#
# W  e  l  c  o  m  e
# 0  1  2  3  4  5  6
# ------------------------------------------------------------

# 'W' ← seat 0
# 'e' ← seat 1
# 'c' ← seat 3

# ------------------------------------------------------------
# 2. SLICING — grabbing a RANGE of characters [start : stop]
# "stop" is exclusive — Python stops just BEFORE that seat
# ------------------------------------------------------------

# 'com' ← seats 3, 4, 5 (stops before 6)
# 'come' ← seat 3 to the END
# 'Welco' ← from the START up to (not including) seat 5

# ------------------------------------------------------------
# 3. USEFUL STRING METHODS
# ------------------------------------------------------------

# 'WELCOME' — all caps
# 'welcome' — all lowercase
# 7 — total number of characters
# True — does this word exist inside?
# False — nope, "come1" isn't in there
# 'Home' — swap one part for another

# ------------------------------------------------------------
# 4. COMBINING STRINGS (called "concatenation")
# ------------------------------------------------------------

# Method A: + operator — glues strings together
# 'Welcome Home'

# Method B: f-string — fill-in-the-blank style (most modern & readable)
# 'Welcome Home'

# f-strings are preferred for longer sentences:
# 'Welcome to Kuala Lumpur, Home!'

# x = 3
# y = 2.5
# print(x + y) #5.5
# print(x - y) #0.5
# print(x * y) #7.5
# print(x / y) #1.2

# import math
# pi = 3.14159
# print (round(pi, 2)) #3.14
# print (math.floor(pi)) #3
# print (math.ceil(pi)) #4  *ceil stands for ceiling - rounds a decimal no. up to the nearest whole integer
# print (f"{pi:.2f}")
# print (f"{pi:.2%}")



# ============================================================
# LESSON: Numbers in Python
# Two types:
# int   — whole numbers       e.g. 3, 10, -7
# float — numbers with a dot  e.g. 2.5, 3.14, -0.9
# ============================================================

# ------------------------------------------------------------
# 1. BASIC ARITHMETIC
# Mixing int + float always gives back a float
# ------------------------------------------------------------

# 5.5  — addition
# 0.5  — subtraction
# 7.5  — multiplication
# 1.2  — division (always returns float)

# ------------------------------------------------------------
# 2. ROUNDING — four different ways, each with a use case
# ------------------------------------------------------------

# A) round() — standard rounding, built into Python (no import needed)
# 3.14  ← rounds to nearest, 2 decimal places

# B) math.floor() — always rounds DOWN (floor = ground level)
# 3
# 3.14
# step-by-step: floor(314.159) → 314 → 314/100 → 3.14

# C) math.ceil() — always rounds UP (ceil = ceiling)
# 4
# 3.15
# step-by-step: ceil(314.159) → 315 → 315/100 → 3.15

# Quick memory trick:
# floor(2.9) → 2   floor always goes DOWN to the lower whole number
# ceil(2.1)  → 3   ceil  always goes UP   to the higher whole number

# ------------------------------------------------------------
# 3. FORMATTING NUMBERS — controlling how numbers are displayed
# Uses f-strings: f"{ value : format_code }"
# ------------------------------------------------------------

# .2f → fixed decimal places (f = fixed-point)
# '3.14' — show exactly 2 decimal places

# .2% → convert to percentage, show 2 decimal places
# '314.16%' — Python multiplies by 100 automatically
# step-by-step: 3.14159 × 100 = 314.159% → rounded to 2dp → 314.16%



# num1 = input("Enter the first number: ")
# num2 = input("Enter your second number: ")
# # print (num1 + num2) #  100 + 100 = 100100
# print (int(num1) + int(num2)) # integer it does ACTUAL MATH 100 + 100 = 200

# x = "42"
# y = 3.99
# z = 0
# print(int(x)) #42
# print(int(y)) #3
# print(float(x)) #42.0
# print(str(y)) #3.99
# print(bool(z)) #False
# print(bool(x)) #True


# ============================================================
# LESSON: Type Casting
# "Casting" = converting a value from one data type to another
#
# The 4 main types you'll cast between:
# str   — text          "hello", "3"
# int   — whole number  3, 10
# float — decimal       3.0, 2.5
# bool  — true/false    True, False
# ============================================================

# ------------------------------------------------------------
# 1. WHY CASTING EXISTS — the classic beginner trap
# ------------------------------------------------------------

# input() ALWAYS returns a string, even if the user types a number
# e.g. user types 5 → stored as "5"
# e.g. user types 3 → stored as "3"

# "53" ← WRONG! Python glued two strings together
# because + on strings means "combine"

# Fix: cast to int first
# 8 ← NOW it does real math

# ------------------------------------------------------------
# 2. THE FOUR CASTING FUNCTIONS
# ------------------------------------------------------------

# 42      str  → int   (must be a whole number string)
# 3       float→ int   (cuts off the decimal, does NOT round)
# 42.0    str  → float
# '3.99'  float→ str
# False   int  → bool  (0 = False, anything else = True)
# True    str  → bool  (empty string "" = False, anything else = True)

# ------------------------------------------------------------
# 3. REAL EXAMPLE — putting it all together
# ------------------------------------------------------------

# user types 19.99 → stored as "19.99"
# user types 3 → stored as "3"

# cast before calculating!
# 'Total: $59.97'





# Temperature Converter
#Defines a function to hold the logic.

# def celsius_to_fahrenheit():
#     # A 'try' block lets you test a block of code for errors.
#     try:
#         # 1. Prompts the user in the terminal and reads the input as a string.
#     	# 2. float() attempts to convert that string into a number with decimals.
#         celsius = float(input("Enter temperature in Celsius: "))
#         # The core conversion formula.
#         fahrenheit=(celsius * 9/5) + 32
#         # Prints the final, formatted result to the terminal.
#     	# The :.2f formats the Fahrenheit number to two decimal places.
#         print(f"{celsius}°C is equal to {fahrenheit:.2f}°F")
#         # If float() fails (e.g., the user typed "abc"), a ValueError occurs.
# 	    # This 'except' block catches that specific error.
#         # It then prints a user-friendly error message instead of crashing.
#     except ValueError:
#         print("Invalid input. Please enter a numeric value.")

# # This line calls the function to start the program.
# celsius_to_fahrenheit()

# age = 20
# if age >=18:
#     print("Adult.")
# else:
#     print("Minor.")

# age = 23
# if age >= 18 and age <=20:
#     print("Freshman")
# elif age > 20 and age <=22:
#     print("Sophomore")
# elif age > 22:
#     print("Graduate")

# ------------------------------------------------------------
# LOGICAL OPERATORS — combining conditions
# and  → BOTH sides must be True
# or   → AT LEAST ONE side must be True
# not  → flips True to False, False to True
# ------------------------------------------------------------

# age = 5
# print(age > 0 and age < 10) 
# print(age > 0 or age > 10)
# print(not(age >3))

# a = True
# b = True
# c = False
# d = a and b and (not c)

# print(f"a ={a}") #True
# print(f"b ={b}") #True
# print(f"c ={c}") #True
# print(f"d = a and b and (not c) = {d}") 

# (think: empty = False, something = non-False) for both string n number

# for i in range (1, 6):
#     print(f"Number:{i}")

# for i in range(1, 6):
#     if i == 3:
#         break
#     print("Loop ended")

# for i in range (1, 11):
#         if i % 2 == 0:
#             continue
#         print(f"Odd Number: {i}")
#         print("Loop ended")

# fruits = ["apple", "banana", "orange"]
# fruits.append("grape")     
# fruits.insert(1, "chicken") 
# fruits.remove("apple")
# print(fruits)        #["chicken", "banana", "orange", "grape"]
# print(fruits[0])     #chicken
# print(fruits[-1])    #grape

# numbers = [3, 1, 4, 1, 5, 9, 2]
# numbers.sort()
# print(numbers)
# numbers.reverse()
# print(numbers)
# print(numbers.count(1))
# print(numbers.index(1))

# todos = []
# todos.append("Buy groceries")
# todos.append("Clean the house")
# todos.append("Pay bills")
# print("To-Do List:")
# for index, task in enumerate(todos, 1):
#     print(f"{index}.{task}")

# person = {
#     "name": "Alice",
#     "age": 81,
#     "city": "Keningau"
# }
# # print(person["name"])
# person["email"] = "alice@email.com"
# # print(person)
# # for key in person:
# #     print(key)
# # for value in person.values():
# #     print(value)
# for key, value in person.items():
#     print(f"{key}: {value}")


# try:
#     result = 10 / 0
# except:
#     print("Error: cannot divide by zero.")
# finally:
#     print("Closing...")

# try:
#     numerator = 10
#     denominator = int(input("Enter a denominator: "))
#     result = numerator / denominator
# except: 
#     print("Error: cannot divide by zero!")  
# else: 
#     print(f"Success: Result = {result}")
# finally:
#     print("Closing...")  


# ============================================================
# PART 3: ERROR HANDLING
# try/except lets your program handle errors gracefully
# instead of crashing.
# ============================================================

# ------------------------------------------------------------
# 7. TRY / EXCEPT / FINALLY
# try     -- code that might cause an error
# except  -- what to do IF an error happens
# finally -- ALWAYS runs, error or not (e.g. cleanup)
# ------------------------------------------------------------

# ------------------------------------------------------------
# 8. TRY / EXCEPT / ELSE / FINALLY
# else    -- runs ONLY when NO error occurred
# ------------------------------------------------------------

# Flow summary:
#   No error  ->  try  ->  else  ->  finally
#   Error     ->  try  ->  except           ->  finally

# todos = []
# completed_tasks = []

# # Add initial tasks
# todos.append("Learn Python!")
# todos.append("Practice coding")
# todos.append("Take a break")

# def display_lists():
#     """Display both to-do and completed task list with counts"""
#     print("\n" + "=" * 30)
#     # Display To-Do List
#     print(f"📋 TO-DO LIST ({len(todos)} tasks):")
#     if not todos:
#         print("   (No pending tasks!)")
#     else:
#         for index, task in enumerate(todos, start=1):
#             print(f"   {index}. {task}")
            
#     print("-" * 30)
    
#     # Display Completed List
#     print(f"✅ COMPLETED TASKS ({len(completed_tasks)} tasks):")
#     if not completed_tasks:
#         print("   (No completed tasks yet.)")
#     else:
#         for task in completed_tasks:
#             print(f"   [✓] {task}")
#     print("=" * 30 + "\n")

# def add_task():
#     """Ask user for a new task and add it to the to-do list"""
#     new_task = input("Enter the new task: ").strip()
#     if new_task:  # Check if the user actually typed something
#         todos.append(new_task)
#         print(f"👍 Added: '{new_task}'")
#     else:
#         print("❌ Task cannot be empty!")

# def complete_task():
#     """Mark your task as complete and move it to a completed list"""
#     if not todos:
#         print("❌ There are no tasks to complete!")
#         return

#     # Call display_lists first so the user can see the index numbers
#     display_lists()
    
#     try:
#         choice = int(input("Enter the task number to complete: "))
#         # Convert 1-based user input back to 0-based Python indexing
#         index = choice - 1 
        
#         if 0 <= index < len(todos):
#             # .pop() removes the item from todos and returns it
#             finished_task = todos.pop(index)
#             # Add that item to the completed list
#             completed_tasks.append(finished_task)
#             print(f"🎉 Great job! Marked '{finished_task}' as complete.")
#         else:
#             print("❌ Invalid task number!")
            
#     except ValueError:
#         print("❌ Please enter a valid number!")

# # Main program loop
# running = True
# while running:
#     print("--- TASK MANAGER MENU ---")
#     print("1. View Lists")
#     print("2. Add a Task")
#     print("3. Complete a Task")
#     print("4. Exit")
    
#     user_choice = input("Choose an option (1-4): ").strip()
    
#     if user_choice == "1":
#         display_lists()
#     elif user_choice == "2":
#         add_task()
#     elif user_choice == "3":
#         complete_task()
#     elif user_choice == "4":
#         print("👋 Goodbye! Have a productive day.")
#         running = False
#     else:
#         print("❌ Invalid option, please try again.\n")

todos = [
    {"task": "Learn Python", "completed": True},
    {"task": "Practice coding", "completed": False},
    {"task": "Take a break", "completed": False},
    ]

# Using a dictionary comprehension
todos_dict = {item["task"]: item["completed"] for item in todos}

print(todos_dict)
# Output:
# {'Learn Python': False, 'Practice coding': False, 'Take a break': False}
