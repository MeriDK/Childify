import socket
import json

hostname = socket.gethostname()

ip_address = socket.gethostbyname(hostname)
print(f"{ip_address}")

with open('package.json', 'r+') as f:
    data = json.load(f)
    data['scripts']['front-server'] = "cd front-end && ng serve --host "+ip_address
    if ip_address=="127.0.0.1":
        data['scripts']['back-server'] = "back-end\\venv\\Scripts\\activate.bat && python back-end/childify_api/manage.py runserver"
    else:
        data['scripts']['back-server'] = "back-end\\venv\\Scripts\\activate.bat && python back-end/childify_api/manage.py runserver 0.0.0.0:8000 "
    data['baseURL']='http://'+ip_address+':8000'
    data['IP']=ip_address
    f.seek(0)        
    json.dump(data, f, indent=4)
    f.truncate()     

with open('front-end/package.json', 'r+') as f:
    data = json.load(f)
    data['scripts']['front-server'] = "ng serve --host "+ip_address
    if ip_address=="127.0.0.1":
        data['scripts']['back-server'] = "..\\back-end\\venv\\Scripts\\activate.bat && python ../back-end/childify_api/manage.py runserver"
    else:
        data['scripts']['back-server'] = "..\\back-end\\venv\\Scripts\\activate.bat && python ../back-end/childify_api/manage.py runserver 0.0.0.0:8000 "
    f.seek(0)        
    json.dump(data, f, indent=4)
    f.truncate()     