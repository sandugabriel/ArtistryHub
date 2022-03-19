import json

def convert_to_json(lst, names):
    data = [dict(zip(names, l)) for l in lst]
    json_data = json.dumps(data, indent=4)

    return json_data