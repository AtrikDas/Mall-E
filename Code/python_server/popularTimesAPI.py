import populartimes

def get_waiting_times(place_id):
    response = populartimes.get_id("AIzaSyA-XRcHLWd3GVfU0RE6XpbRn86XXG4SsEI", place_id)
    print(response) 
    return response