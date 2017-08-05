import json
import time

orders = {
    "restaurant-id": [
        {
            "item": "garlic bread",
            "table": 1,
            "created": time.strftime("%c")
        },
        {
            "item": "sandwhich",
            "table": 2,
            "created": time.strftime("%c")
        },
        {
            "item": "cheese",
            "table": 3,
            "created": time.strftime("%c")
        }
    ]
}

def getOrders(restaurant_id):
    return json.dumps(orders[restaurant_id])
