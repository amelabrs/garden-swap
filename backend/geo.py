"""Geolocation utilities for Garden Swap."""

import math

# Approximate lat/lng for Indian Pin Codes (Bangalore area for demo/dev)
# In production, use a pin code API or database
ZIP_COORDS = {
    "560001": (12.9716, 77.5946),   # Bangalore - MG Road / City Centre
    "560002": (12.9611, 77.5756),   # Bangalore - Basavanagudi
    "560003": (12.9850, 77.6050),   # Bangalore - Ulsoor
    "560004": (12.9980, 77.5700),   # Bangalore - Malleshwaram
    "560008": (12.9352, 77.6245),   # Bangalore - Koramangala
    "560010": (12.9563, 77.6410),   # Bangalore - Indiranagar
    "560011": (12.9698, 77.6500),   # Bangalore - HAL
    "560017": (12.9150, 77.6100),   # Bangalore - BTM Layout
    "560034": (12.9260, 77.6762),   # Bangalore - HSR Layout
    "560038": (12.9081, 77.6476),   # Bangalore - Jayanagar
    "560041": (13.0206, 77.6500),   # Bangalore - Banaswadi
    "560043": (13.0358, 77.5970),   # Bangalore - Hebbal
    "560066": (12.9698, 77.7500),   # Bangalore - Whitefield
    "560027": (12.9490, 77.5936),   # Bangalore - Wilson Garden
    "560045": (12.9063, 77.5857),   # Bangalore - JP Nagar
    "560047": (12.9172, 77.6230),   # Bangalore - Bommanahalli
    "560048": (12.9352, 77.6140),   # Bangalore - Sarjapur Road
    "560050": (12.9784, 77.6408),   # Bangalore - CV Raman Nagar
    "560052": (13.0477, 77.5872),   # Bangalore - Yelahanka
    "560060": (13.0012, 77.5437),   # Bangalore - Rajajinagar
    "560070": (12.8438, 77.6631),   # Bangalore - Electronic City
    "560095": (12.9081, 77.5489),   # Bangalore - Kengeri
}


def zip_to_coords(zip_code: str) -> tuple:
    """Convert pin code to (lat, lng). Returns Bangalore centre default if unknown."""
    return ZIP_COORDS.get(zip_code, (12.9716, 77.5946))


def haversine_miles(lat1: float, lng1: float, lat2: float, lng2: float) -> float:
    """Calculate distance in miles between two lat/lng points."""
    R = 3958.8  # Earth radius in miles

    lat1_r, lat2_r = math.radians(lat1), math.radians(lat2)
    dlat = math.radians(lat2 - lat1)
    dlng = math.radians(lng2 - lng1)

    a = (math.sin(dlat / 2) ** 2 +
         math.cos(lat1_r) * math.cos(lat2_r) * math.sin(dlng / 2) ** 2)
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))

    return R * c
