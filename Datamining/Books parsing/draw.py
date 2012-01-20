import numpy as np
import matplotlib.cm as cm
import matplotlib.pyplot as plt
from datetime import datetime

start = datetime.now()
print "Reading big file ... "
#fileSource = "/Users/soswow/Dropbox/TTU - Magister/IDN0100 - Datamining/Link Test/part.txt"
fileSource = "/Users/soswow/Dropbox/TTU - Magister/IDN0100 - Datamining/Link Test/revData3.csv"
x,y,c = np.loadtxt(fileSource,dtype=int,delimiter=',',skiprows=1,unpack=True)

xmin = x.min()
xmax = x.max()
ymin = y.min()
ymax = y.max()

end = datetime.now()
delta = end - start
print "Done in %d.%06d. Drawing ..." % (delta.seconds, delta.microseconds)

plt.scatter(x,y,s=c,alpha=0.005,cmap=cm.jet)
#plt.hexbin(x,y,c,cmap=cm.jet,bins='log')
#plt.axis([xmin, xmax, ymin, ymax])
#plt.title("Hexagon binning")
#cb = plt.colorbar()
#cb.set_label('counts')
end2 = datetime.now()
delta = end2 - end
print "Done in %d.%06d. Saving ... " % (delta.seconds, delta.microseconds)
#plt.show()
end3 = datetime.now()
delta = end3 - end2
plt.savefig("test.png")

print "Done in %d.%06d" % (delta.seconds, delta.microseconds)
