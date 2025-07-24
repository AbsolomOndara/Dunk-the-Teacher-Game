# This section imports a random number generator function
import random

# This section defines the variables used in the program
x = random.randint(1, 10)
y = random.randint(1, 10)
tries = 0
distance = 100
n = 6

# This section introduces the player to the game
print("Welcome to Dunk the Teacher!")
print("Try to guess where the teacher is hiding on a 10x10 grid.")
print("You have 6 attempts to dunk the teacher by guessing the correct X and Y coordinates.")
print("X and Y values range from 1 to 10.")
print("Good luck!\n")

# Main game loop
while distance != 0 and tries < n:
    x_guess = int(input("Enter your guess for X coordinate (1-10): "))
    y_guess = int(input("Enter your guess for Y coordinate (1-10): "))
    
    # Validate input
    if x_guess < 1 or x_guess > 10 or y_guess < 1 or y_guess > 10:
        print("Please enter values between 1 and 10.")
        continue
    
    distance = ((x - x_guess)**2 + (y - y_guess)**2)**0.5
    tries += 1
    
    if distance == 0:
        print("\nOh no! You dunked the teacher. Your grade will suffer!")
    else:
        remaining_tries = n - tries
        if remaining_tries > 0:
            print(f"Better luck next time! The distance of that guess from the teacher is {distance:.2f}")
            print(f"You have {remaining_tries} tries left.\n")
        else:
            print("\nBetter luck next time, you are out of tries")
            print(f"The teacher was at position X: {x}, Y: {y}")
            print(f"Your last guess was {distance:.2f} units away from the teacher.")