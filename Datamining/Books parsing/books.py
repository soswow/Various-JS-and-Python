from datetime import datetime

def clientGenerator():
  f = open("data.txt")
  for line in f:
    yield map(int, line.strip().split(","))
    
def clientBookMap():
  m = {}
  for client, book in clientGenerator():
    if client not in m:
      m[client] = []
    m[client].append(book)
  return m
    
def bookClientMap():
  m = {}
  for client, book in clientGenerator():
    if book not in m:
      m[book] = []
    m[book].append(client)
  return m

def crossings(li1, li2):
  return sum([1 for el in li1 if el in li2])

def countClientWithBooks(books, bcMap):
  clients = [bcMap[book] for book in books]
  return crossings(*clients)

def allPairsCounts():
  bcMap = bookClientMap()
  l = len(bcMap)
  books = bcMap.keys()
  result = {}
  f = open("stats.csv",'w')
  print "book1,book2count,seconds,left"
  f.write("book1,book2count,seconds,left\n")
  for i, book1 in enumerate(books):
    cc = 0
    t1 = datetime.now()
    for j in range(i+1, l):
      if j in books:
        book2 = books[j]
        pair = (book1, book2)
        res = countClientWithBooks(pair, bcMap)
        if res:
          result[pair] = res
          cc += 1
          yield book1, book2, res
    t2 = datetime.now()
    dt = t2 - t1
    stat = "%d,%d,%d.%06d,%d" % (book1, cc, dt.seconds, dt.microseconds, (l-i+1))
    f.write(stat + "\n")
    f.flush()
    print stat
  f.close()


def main():
  #f = open('pairsres.txt', 'w')
  #for b1, b2, res in allPairsCounts():
  #  f.write("%d, %d, %d\n" % (b1, b2, res))
  #f.close()
  print "Reading original list and making Book/Client map"
  bcMap = bookClientMap()
  print "Done."
  
  f = open('revData2.csv', 'w')
  f.write("raamatX,raamatY,mitu_inimest_ostis_molemit\n")
  [f.write("%d,%d,%d\n" % bookPairAndRes) for bookPairAndRes in allPairsCounts()]
  f.close()
  print "Done"
  
if __name__ == '__main__':
  main()

