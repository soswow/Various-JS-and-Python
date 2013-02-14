from time import sleep
import PyHID
PyHID.initialise()
d = PyHID.scan_devices()[-2]
print d.name
d.enable_monitoring()
#el = d.elements[0]
#
#
for el in d.elements:
    try:
#        el.enable_monitoring()
        print el.read(), el(), "ok"
#        print 
#        print "ok"
    except:
        print "fail"
#print "\n".join([str(e) for e in d.elements])
#print "\n".join([e.get_usage_string() for e in d.elements])
#print "\n".join([e.get_usage_page_string() for e in d.elements])
try:
#    pass
    while True:
        sleep(0.1)
        res = d.poll()
        if res:
            print res 
except KeyboardInterrupt:
    PyHID.finalise()

PyHID.finalise()

    
