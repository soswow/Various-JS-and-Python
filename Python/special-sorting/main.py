import re
from exceptions import BaseException, ValueError

def try_to_int(el):
    try:
        return int(el)
    except ValueError:
        return el
    
def comp(a,b,i):
    if i >= min(len(a), len(b)) or (i > 0 and a[i-1] != b[i-1]):
        return 0
    else:
        return 1 if a[i] > a[i] else -1 if a[i] < b[i] else 0

def mega_sort(arr):
    arr = [[try_to_int(item2) for item2 in re.split('(\d*)', item) if item2] for item in arr]
    max_items = max([len(item) for item in arr])
    for i in range(0, max_items):
        arr.sort(cmp=lambda a,b: comp(a,b,i) )
    return ["".join(map(str, item)) for item in arr]

def main():
    arr = ["A10", "A11", "A2", "B1", "A2B1", "A2B11", "A2B2", "A2BCC", "A2BCC1", "A2BCC3", "B2", "A2BCC22",]
    right_result = ["A2","A2B1", "A2B2", "A2B11", "A2BCC", "A2BCC1", "A2BCC3", "A2BCC22","A10", "A11", "B1", "B2"]
    result = mega_sort(arr)
    if result != right_result:
        print result
        raise BaseException("Not equal")

if __name__ =="__main__":
    main()