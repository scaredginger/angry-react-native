import json

orders = {
    "restaurant-id": [
        {
            "name": "garlic bread",
            "table": 1
        },
        {
            "name": "sandwhich",
            "table": 2
        },
        {
            "name": "cheese",
            "table": 3
        }
    ]
}

def getOrders(restaurant_id):
    return json.dumps(orders[restaurant_id])
