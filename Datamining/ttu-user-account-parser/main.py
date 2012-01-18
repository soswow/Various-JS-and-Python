import requests

def find_word(from_id, to_id, words):
    valid = 0
    for student_id in range(from_id, to_id):
        if student_id % 100 == 0:
            print "%06d is going ... (%d found accounts)" % (student_id, valid)
        try:
            d = requests.get(url='http://www.tud.ttu.ee/~t%06d/' % student_id)
        except:
            print "Exception for (%d) ... " % student_id
        for line in d.content.split("\n"):
            if '<title>Index of' in line:
                valid += 1
            if any([word in line for word in words]):
                print "Ho-ho! - %d" % student_id

    return valid


def main():
    valid = find_word(000000,109999,['itv0090','.svg'])
    print "There is %d accounts open" % valid

if __name__ == "__main__":
    main()
    