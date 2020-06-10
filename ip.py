import socket
import json
import sys

hostname = socket.gethostname()

ip_address = socket.gethostbyname(hostname)


if len(sys.argv)>1:
    ip_address = sys.argv[1]

print(f"{ip_address}")

with open('package.json', 'r+') as f:
    data = json.load(f)
    data['scripts']['fe-ip'] = "cd front-end && ng serve --host "+ip_address
    if ip_address=="localhost":
        data['scripts']['be-ip'] = "back-end\\venv\\Scripts\\activate.bat && python back-end/childify_api/manage.py runserver"
        data['scripts']['be-l-ip'] = "source back-end/venv/bin/activate && python back-end/childify_api/manage.py runserver"
    else:
        data['scripts']['be-ip'] = "back-end\\venv\\Scripts\\activate.bat && python back-end/childify_api/manage.py runserver 0.0.0.0:8000 "
        data['scripts']['be-l-ip'] = "source back-end/venv/bin/activate && python back-end/childify_api/manage.py runserver 0.0.0.0:8000 "
    data['baseURL']='http://'+ip_address+':8000'
    data['IP']=ip_address
    f.seek(0)        
    json.dump(data, f, indent=4)
    f.truncate()     