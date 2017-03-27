
import addnodes, flatten, inkex

class Transform(flatten.MyEffect, addnodes.SplitIt):
    def __init__(self):
        flatten.MyEffect.__init__(self)
        flattenOptions = self.OptionParser._get_all_options()
        addnodes.SplitIt.__init__(self)
        self.OptionParser.set_conflict_handler("resolve")
        self.OptionParser.add_options(flattenOptions)

    def effect(self):
        flatten.MyEffect.effect(self)
        addnodes.SplitIt.effect(self)

if __name__ == '__main__':
    e = Transform()
    e.affect()
