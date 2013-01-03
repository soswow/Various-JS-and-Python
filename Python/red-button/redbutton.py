import usb.core
import usb.util

dev = usb.core.find(idVendor=0x1D34,idProduct=0x000D)

if dev is None:
    raise ValueError('Device not found')

dev.set_configuration()
cfg = dev.get_active_configuration()
interface_number = cfg[(0,0)].bInterfaceNumber
alternate_setting = usb.control.get_interface(dev, interface_number)
intf = usb.util.find_descriptor(
    cfg, bInterfaceNumber = interface_number,
    bAlternateSetting = alternate_setting
)
ep = usb.util.find_descriptor(intf,bEndpointAddress=0x81)
a = ep.read(1)
print a