import time
import os.path
from http import server
import json
import orders

#HOST_NAME = 'example.net' # !!!REMEMBER TO CHANGE THIS!!!
PORT_NUMBER = 8000

def respond_unknown (s):
    s.send_response(400)
    s.send_header(bytes("Content-type", "utf-8"), bytes("text/html", "utf-8"))
    s.end_headers()
    s.wfile.write(bytes("Invalid request", "utf-8"))

def respond_menu (s, restaurant_id):
    if os.path.isfile(restaurant_id + ".json"):
        s.send_response(200)
        s.send_header(bytes("Content-type", "utf-8"), bytes("application/json", "utf-8"))
        s.end_headers()

        menu_file = open(restaurant_id + ".json")
        s.wfile.write(bytes(menu_file.read(), "utf-8"))
    else:
        s.send_response(404)
        s.send_header(bytes("Content-type", "utf-8"), bytes("text/html", "utf-8"))
        s.end_headers()

        s.wfile.write(bytes("Restaurant not found", "utf-8"))

def respond_view (s, restaurant_id):
    print("Responding to view")
    if restaurant_id in orders.orders:
        s.send_response(200)
        s.send_header(bytes("Content-type", "utf-8"), bytes("application/json", "utf-8"))
        s.send_header('Access-Control-Allow-Origin', 'http://localhost:9000')
        s.send_header(bytes('Access-Control-Allow-Methods', "utf-8"), bytes('GET, POST, OPTIONS, PUT, PATCH, DELETE', "utf-8"));
        s.send_header(bytes("Access-Control-Allow-Headers", "utf-8"), bytes("Origin, X-Requested-With, Content-Type, Accept", "utf-8"));
        s.end_headers()

        s.wfile.write(bytes(orders.getOrders(restaurant_id), "utf-8"))
    else:
        s.send_response(404)
        s.send_header(bytes("Content-type", "utf-8"), bytes("text/html", "utf-8"))
        s.end_headers()

        s.wfile.write(bytes("Restaurant not found", "utf-8"))




class MobileHandler(server.BaseHTTPRequestHandler):
    def do_HEAD(s):
        s.send_response(200)
        s.send_header(bytes("Content-type", "utf-8"), bytes("text/html", "utf-8"))
        s.end_headers()
    def do_GET(s):
        path = s.path.split("/")
        path.pop(0)

        if len(path) < 2:
            respond_unknown(s)
            return

        if path[0] == "menu":
            restaurant_id = path[1]

            respond_menu(s, restaurant_id)
        elif path[0] == "view":
            restaurant_id = path[1]

            respond_view(s, restaurant_id)
        else:
            respond_unknown(s)


server_class = server.HTTPServer
httpd = server_class(("", PORT_NUMBER), MobileHandler)
print (time.asctime(), "Server Starts - " + str(PORT_NUMBER))

try:
    httpd.serve_forever()
except KeyboardInterrupt:
    pass
httpd.server_close()
print (time.asctime(), "Server Stops - " + str(PORT_NUMBER))
