arr = [10, 20, 30, 40, 50]

target = 30
found = False

for i in range(len(arr)):
    if arr[i] == target:
        found = True
        print("Found at index:", i)
        break

print("Result:", found)