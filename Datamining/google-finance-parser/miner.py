import requests
import re

def get_stock_info(exchange, id):
    if not exchange or not id:
        return {}
    d = requests.get(url='http://www.google.com/finance?q=%s:%s' % (exchange,id))
    print "Getting infor for %s:%s" % (exchange,id)
    info = {
        'Related': [],
        'Section': "",
        'Industry': "",
        'Label': "",
        'Exchange':exchange
    }
    for line in d.content.split('\n'):
        if line.startswith('google.finance.data'):
            lines = [line for line in d.content.split('\n') if line.startswith('google.finance.data')]
            if not lines:
                return {}
            line = lines[0]
            start = line.find('streaming:')
            end = line.find(']', start)
            cid, s, e,  = 'cid','s','e'
            info['Related'] = eval(line[start+10:end+1])
        if line.startswith('<div class="g-unit g-first">Sector'):
            pattern = '<div class="g-unit g-first">([^:]*): <a id=sector href="\?catid=[^"]*" >([^<]*)</a> &gt; ([^:]*): <a href="\?catid=[^"]*" >([^<]*)</a>'
            match = re.search(pattern, line)
            _, info['Section'], _, info['Industry'] = match.groups()
        if line.startswith('<div class="g-unit g-first"><h3>'):
            pattern = '<div class="g-unit g-first"><h3>([^<]*)&nbsp;&nbsp;</h3>'
            match = re.search(pattern, line)
            info['Label'] = match.groups()[0]

    return info

def get_all_data(start_exchange, start_id, depth):
    data = {}
    def iter(exchange, id, level):
        if level >= depth or not exchange or not id:
            return

        if id not in data:
            info = get_stock_info(exchange, id)
            info['Related'] = [rel for rel in info['Related'] if rel['s'] != id]
            data[id] = info

            for rel in info['Related']:
                iter(rel['e'], rel['s'], level+1)

    iter(start_exchange, start_id, 0)
    return data

def get_nodes(data):
    nodes = []
    ids = []
    def get_dict(id, info):
        info['Id'] = id
        return info

    for id, dic in data.items():
        ids.append(id)
        nodes.append(get_dict(id, dic))
        
    for key, dic in data.items():
        for rel_obj in dic['Related']:
            if rel_obj['s'] and rel_obj['s'] not in ids:
                ids.append(rel_obj['s'])
                more_info = get_stock_info(rel_obj['e'], rel_obj['s'])
                nodes.append(get_dict(rel_obj['s'], more_info))

    return nodes

def save_nodes(data):
    f = open('nodes.csv', 'w')
    columns = ['Label','Id','Section','Industry', 'Exchange']
    f.write(";".join(columns) + '\n')
    nodes = get_nodes(data)
    for node in nodes:
        f.write(";".join([node['Label'], node['Id'], node['Section'], node['Industry'], node['Exchange']], )+ '\n')
    f.close()

def save_edges(data):
    f = open('edges.csv', 'w')
    columns = ['Source','Target']
    f.write(";".join(columns) + '\n')
    for source in data.keys():
        for target in data[source]['Related']:
            f.write(";".join([source, target['s']])+ '\n')
    f.close()

def main(start_exchange, start_id, depth):
    print 'Scraping ... '
    data = get_all_data(start_exchange, start_id, depth)
    print 'Saving nodes ... '
    save_nodes(data)
    print 'Saving edges ... '
    save_edges(data)


if __name__ == "__main__":
#    main("NASDAQ", "GOOG", 7)
    main("ETR", "BMW", 7)