#!/usr/bin/env python3
import swisseph as swe
import math

def calc_jd(year, month, day, hour, minute, timezone=8):
    utc_hour = hour - timezone + minute / 60.0
    return swe.julday(year, month, day, utc_hour)

def get_planet_positions(jd):
    positions = {}
    flags = swe.FLG_MOSEPH
    planet_ids = {'Sun': swe.SUN, 'Moon': swe.MOON, 'Mercury': swe.MERCURY, 'Venus': swe.VENUS, 'Mars': swe.MARS, 'Jupiter': swe.JUPITER, 'Saturn': swe.SATURN, 'Uranus': swe.URANUS, 'Neptune': swe.NEPTUNE, 'Pluto': swe.PLUTO}
    for name, pid in planet_ids.items():
        pos, ret = swe.calc_ut(jd, pid, flags=flags)
        positions[name] = pos[0] % 360
    return positions

def get_houses(jd, lat, lon):
    hcusps, ascmc = swe.houses(jd, lat, lon, b'P')
    houses = {f'House{i+1}': hcusps[i] % 360 for i in range(12)}
    houses['ASC'] = ascmc[0] % 360
    houses['DES'] = (ascmc[0] + 180) % 360
    houses['MC'] = ascmc[1] % 360
    houses['IC'] = (ascmc[1] + 180) % 360
    return houses

