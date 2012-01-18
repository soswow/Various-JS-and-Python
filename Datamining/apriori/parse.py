
def main():
    dir = '/Volumes/New Mac HD/Users/soswow/Dropbox/TTU - Magister/IDN0100 - Datamining/apriori'
    fi = open('%s/%s' % (dir, 'tshekid3.csv'))
    fo = open('%s/%s' % (dir, 'input4.txt'), 'w')
    fi.readline()
    old_id = None
    goods = []
    for line in fi:
        _, good, id, _ = line.replace('\n','').split(';')
        if old_id and old_id != id:
            fo.write("%s\n" % " ".join(goods))
            goods = []
        old_id = id
        goods.append(good.replace(' ', '_').lower())
    fo.close()
    fi.close()

if __name__ == "__main__":
    main()