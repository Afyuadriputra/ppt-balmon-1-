
import csv
import sys
import time
import socket
import xmlrpc.client
from pathlib import Path
from datetime import datetime

import numpy as np
import sounddevice as sd


# ============================================================
# KONFIGURASI
# ============================================================

FLRIG_URL = "http://127.0.0.1:12345"
DURASI = 3
SAMPLERATE = 44100
AUDIO_DEVICE = None
JUMLAH_CHANNEL = 1
AMBANG_SUARA_DB = -45.0
WAJIB_AUDIO = False

LEBAR = 76

flrig = xmlrpc.client.ServerProxy(FLRIG_URL, allow_none=True)


# ============================================================
# DAFTAR STASIUN
# ============================================================
daftar_stasiun = [
    {"no": 1, "kota": "Miaoli, Taiwan", "alat": "SW Broadcast", "freq_hz": 11_500_000, "mode": "AM", "call_sign": "SOH Xi Wang Zhi Sheng", "start": "20:30", "end": "17:00", "days": "1234567", "language": "Chinese, Cantonese", "power_kw": 1, "azimuth": "ND", "transmitter": "Miaoli, Taiwan", "remarks": ""},
    {"no": 2, "kota": "Miaoli, Taiwan", "alat": "SW Broadcast", "freq_hz": 11_520_000, "mode": "AM", "call_sign": "SOH Xi Wang Zhi Sheng", "start": "21:00", "end": "17:10", "days": "1234567", "language": "Chinese, Cantonese", "power_kw": 1, "azimuth": "ND", "transmitter": "Miaoli, Taiwan", "remarks": ""},
    {"no": 3, "kota": "Miaoli, Taiwan", "alat": "SW Broadcast", "freq_hz": 11_535_000, "mode": "AM", "call_sign": "SOH Xi Wang Zhi Sheng", "start": "20:00", "end": "16:00", "days": "1234567", "language": "Chinese", "power_kw": 1, "azimuth": "ND", "transmitter": "Miaoli, Taiwan", "remarks": ""},
    {"no": 4, "kota": "Miaoli, Taiwan", "alat": "SW Broadcast", "freq_hz": 11_550_000, "mode": "AM", "call_sign": "SOH Xi Wang Zhi Sheng", "start": "21:00", "end": "15:00", "days": "1234567", "language": "Chinese", "power_kw": 1, "azimuth": "ND", "transmitter": "Miaoli, Taiwan", "remarks": ""},
    {"no": 5, "kota": "Miaoli, Taiwan", "alat": "SW Broadcast", "freq_hz": 11_580_000, "mode": "AM", "call_sign": "SOH Xi Wang Zhi Sheng", "start": "21:00", "end": "15:00", "days": "1234567", "language": "Chinese", "power_kw": 1, "azimuth": "ND", "transmitter": "Miaoli, Taiwan", "remarks": ""},
    {"no": 6, "kota": "Miaoli, Taiwan", "alat": "SW Broadcast", "freq_hz": 11_600_000, "mode": "AM", "call_sign": "SOH Xi Wang Zhi Sheng", "start": "21:00", "end": "16:00", "days": "1234567", "language": "Chinese", "power_kw": 0.1, "azimuth": "ND", "transmitter": "Miaoli, Taiwan", "remarks": ""},
    {"no": 7, "kota": "Beijing, China", "alat": "SW Broadcast", "freq_hz": 11_610_000, "mode": "AM", "call_sign": "CNR 2 Business Radio", "start": "23:00", "end": "06:00", "days": "1234567", "language": "Chinese", "power_kw": 150, "azimuth": "270", "transmitter": "Beijing, China", "remarks": ""},
    {"no": 8, "kota": "Santa Maria di Galeria, Vatikan", "alat": "SW Broadcast", "freq_hz": 11_615_000, "mode": "AM", "call_sign": "JRC Radio Tamazui", "start": "04:00", "end": "04:30", "days": "..3456.", "language": "Juba Arabic", "power_kw": 250, "azimuth": "146", "transmitter": "Santa Maria di Galeria, Vatikan", "remarks": ""},
    {"no": 9, "kota": "Beijing, China", "alat": "SW Broadcast", "freq_hz": 11_620_000, "mode": "AM", "call_sign": "CNR 5 Cross-Strait Radio", "start": "00:00", "end": "06:00", "days": "1234567", "language": "Chinese", "power_kw": 100, "azimuth": "163", "transmitter": "Beijing, China", "remarks": ""},
    {"no": 10, "kota": "Lingshi, China", "alat": "SW Broadcast", "freq_hz": 11_630_000, "mode": "AM", "call_sign": "CNR 17 Kazakh Radio", "start": "23:55", "end": "06:00", "days": "1234567", "language": "Kazakh", "power_kw": 100, "azimuth": "286", "transmitter": "Lingshi, China", "remarks": ""},
    {"no": 11, "kota": "Santa Maria di Galeria, Vatikan", "alat": "SW Broadcast", "freq_hz": 11_640_000, "mode": "AM", "call_sign": "JRC Radio Tamazui", "start": "04:00", "end": "04:30", "days": "..3456.", "language": "Juba Arabic", "power_kw": 250, "azimuth": "146", "transmitter": "Santa Maria di Galeria, Vatikan", "remarks": ""},
    {"no": 12, "kota": "Kunming, China", "alat": "SW Broadcast", "freq_hz": 11_650_000, "mode": "AM", "call_sign": "China Radio International", "start": "04:00", "end": "05:57", "days": "1234567", "language": "Vietnamese", "power_kw": 100, "azimuth": "184", "transmitter": "Kunming-Anning, China", "remarks": ""},
    {"no": 13, "kota": "Xianyang, China", "alat": "SW Broadcast", "freq_hz": 11_660_000, "mode": "AM", "call_sign": "CNR 2 Business Radio", "start": "01:00", "end": "06:00", "days": "1234567", "language": "Chinese", "power_kw": 150, "azimuth": "ND", "transmitter": "Xianyang, China", "remarks": ""},
    {"no": 14, "kota": "Kajang, Malaysia", "alat": "SW Broadcast", "freq_hz": 11_665_000, "mode": "AM", "call_sign": "RTM WaiLimbang FM", "start": "00:00", "end": "00:00", "days": "1234567", "language": "Malaysian", "power_kw": 100, "azimuth": "93", "transmitter": "Kajang, Malaysia", "remarks": ""},
    {"no": 15, "kota": "Beijing, China", "alat": "SW Broadcast", "freq_hz": 11_670_000, "mode": "AM", "call_sign": "CNR 2 Business Radio", "start": "22:30", "end": "06:00", "days": "1234567", "language": "Chinese", "power_kw": 100, "azimuth": "220", "transmitter": "Beijing, China", "remarks": ""},
    {"no": 16, "kota": "Kanggye, Korea Utara", "alat": "SW Broadcast", "freq_hz": 11_680_000, "mode": "AM", "call_sign": "KCBS Pyongyang", "start": "20:00", "end": "18:00", "days": "1234567", "language": "Korean", "power_kw": 50, "azimuth": "ND", "transmitter": "Kanggye, Korea Utara", "remarks": ""},
    {"no": 17, "kota": "Baoji, China", "alat": "SW Broadcast", "freq_hz": 11_685_000, "mode": "AM", "call_sign": "CNR 11 Tibetan Radio", "start": "04:00", "end": "06:00", "days": "1234567", "language": "Tibetan", "power_kw": 100, "azimuth": "255", "transmitter": "Baoji-Sifangshan, China", "remarks": ""},
    {"no": 18, "kota": "Dongfang, Hainan, China", "alat": "SW Broadcast", "freq_hz": 11_695_000, "mode": "AM", "call_sign": "CNR 1 Voice of China", "start": "00:55", "end": "09:00", "days": "1234567", "language": "Chinese", "power_kw": 30, "azimuth": "41", "transmitter": "Dongfang, Hainan, China", "remarks": ""},
    {"no": 19, "kota": "Xianyang, China", "alat": "SW Broadcast", "freq_hz": 11_695_000, "mode": "AM", "call_sign": "CNR 2 Business Radio", "start": "00:00", "end": "06:00", "days": "1234567", "language": "Chinese", "power_kw": 150, "azimuth": "290", "transmitter": "Xianyang, China", "remarks": ""},
    {"no": 20, "kota": "Issoudun, Prancis", "alat": "SW Broadcast", "freq_hz": 11_700_000, "mode": "AM", "call_sign": "Radio France Int.", "start": "04:00", "end": "05:00", "days": "1234567", "language": "French", "power_kw": 500, "azimuth": "130", "transmitter": "Issoudun, Prancis", "remarks": ""},
    {"no": 21, "kota": "Miaoli, Taiwan", "alat": "SW Broadcast", "freq_hz": 11_715_000, "mode": "AM", "call_sign": "SOH Xi Wang Zhi Sheng", "start": "21:05", "end": "17:00", "days": "1234567", "language": "Chinese, Cantonese", "power_kw": 1, "azimuth": "ND", "transmitter": "Miaoli, Taiwan", "remarks": ""},
    {"no": 22, "kota": "Hanoi-Sontay, Vietnam", "alat": "SW Broadcast", "freq_hz": 11_720_000, "mode": "AM", "call_sign": "Voice of Vietnam 1", "start": "22:45", "end": "10:30", "days": "1234567", "language": "Vietnamese", "power_kw": 100, "azimuth": "187", "transmitter": "Hanoi-Sontay, Vietnam", "remarks": ""},
    {"no": 23, "kota": "Kujang, Korea Utara", "alat": "SW Broadcast", "freq_hz": 11_735_000, "mode": "AM", "call_sign": "Voice of Korea", "start": "04:00", "end": "04:57", "days": "1234567", "language": "English", "power_kw": 200, "azimuth": "28", "transmitter": "Kujang, Korea Utara", "remarks": ""},
    {"no": 24, "kota": "Beijing, China", "alat": "SW Broadcast", "freq_hz": 11_740_000, "mode": "AM", "call_sign": "China Radio International", "start": "03:00", "end": "05:57", "days": "1234567", "language": "Chinese", "power_kw": 150, "azimuth": "95", "transmitter": "Beijing, China", "remarks": ""},
    {"no": 25, "kota": "Shijiazhuang, China", "alat": "SW Broadcast", "freq_hz": 11_750_000, "mode": "AM", "call_sign": "CNR 1 Voice of China", "start": "22:00", "end": "06:00", "days": "1234567", "language": "Chinese", "power_kw": 100, "azimuth": "37", "transmitter": "Shijiazhuang Nanpo, China", "remarks": ""},
    {"no": 26, "kota": "Nanning, China", "alat": "SW Broadcast", "freq_hz": 11_750_000, "mode": "AM", "call_sign": "CNR 2 Business Radio", "start": "00:00", "end": "06:00", "days": "1234567", "language": "Chinese", "power_kw": 100, "azimuth": "142", "transmitter": "Nanning, China", "remarks": ""},
    {"no": 27, "kota": "Camboriu, Brasil", "alat": "SW Broadcast", "freq_hz": 11_750_000, "mode": "AM", "call_sign": "Radio Voz Missionaria", "start": "00:00", "end": "00:00", "days": "1234567", "language": "Portuguese", "power_kw": 1, "azimuth": "30", "transmitter": "Camboriu SC, Brasil", "remarks": ""},
    {"no": 28, "kota": "Shijiazhuang, China", "alat": "SW Broadcast", "freq_hz": 11_760_000, "mode": "AM", "call_sign": "CNR 1 Voice of China", "start": "00:00", "end": "06:00", "days": "1234567", "language": "Chinese", "power_kw": 100, "azimuth": "165", "transmitter": "Shijiazhuang, China", "remarks": ""},
    {"no": 29, "kota": "Bauta, Kuba", "alat": "SW Broadcast", "freq_hz": 11_760_000, "mode": "AM", "call_sign": "Radio Habana Cuba", "start": "03:00", "end": "05:00", "days": "1234567", "language": "Spanish", "power_kw": 100, "azimuth": "ND", "transmitter": "Bauta, Kuba", "remarks": ""},
    {"no": 30, "kota": "Miaoli, Taiwan", "alat": "SW Broadcast", "freq_hz": 11_765_000, "mode": "AM", "call_sign": "SOH Xi Wang Zhi Sheng", "start": "21:30", "end": "15:00", "days": "1234567", "language": "Chinese, Cantonese", "power_kw": 0.1, "azimuth": "ND", "transmitter": "Miaoli, Taiwan", "remarks": ""},
    {"no": 31, "kota": "Urumqi, China", "alat": "SW Broadcast", "freq_hz": 11_770_000, "mode": "AM", "call_sign": "CNR 1 Voice of China", "start": "00:30", "end": "08:00", "days": "1234567", "language": "Chinese", "power_kw": 100, "azimuth": "230", "transmitter": "Urumqi, China", "remarks": ""},
    {"no": 32, "kota": "Miaoli, Taiwan", "alat": "SW Broadcast", "freq_hz": 11_775_000, "mode": "AM", "call_sign": "SOH Xi Wang Zhi Sheng", "start": "21:31", "end": "17:30", "days": "1234567", "language": "Chinese, Cantonese", "power_kw": 1, "azimuth": "ND", "transmitter": "Miaoli, Taiwan", "remarks": ""},
    {"no": 33, "kota": "Xianyang, China", "alat": "SW Broadcast", "freq_hz": 11_785_000, "mode": "AM", "call_sign": "CNR 2 Business Radio", "start": "00:00", "end": "06:00", "days": "1234567", "language": "Chinese", "power_kw": 150, "azimuth": "257", "transmitter": "Xianyang, China", "remarks": ""},
    {"no": 34, "kota": "Beijing, China", "alat": "SW Broadcast", "freq_hz": 11_800_000, "mode": "AM", "call_sign": "CNR 2 Business Radio", "start": "23:00", "end": "06:00", "days": "1234567", "language": "Chinese", "power_kw": 150, "azimuth": "180", "transmitter": "Beijing, China", "remarks": ""},
    {"no": 35, "kota": "Beijing, China", "alat": "SW Broadcast", "freq_hz": 11_810_000, "mode": "AM", "call_sign": "CNR 8 Etnhic Minority Radio", "start": "02:00", "end": "05:00", "days": "1234567", "language": "Mongolian", "power_kw": 100, "azimuth": "15", "transmitter": "Beijing, China", "remarks": ""},
    {"no": 36, "kota": "Baoji, China", "alat": "SW Broadcast", "freq_hz": 11_815_000, "mode": "AM", "call_sign": "CNR 1 Voice of China", "start": "04:00", "end": "06:00", "days": "1234567", "language": "Chinese", "power_kw": 100, "azimuth": "255", "transmitter": "Baoji-Sifangshan, China", "remarks": ""},
    {"no": 37, "kota": "Goiania, Brasil", "alat": "SW Broadcast", "freq_hz": 11_815_000, "mode": "AM", "call_sign": "Radio Brasil Central", "start": "00:00", "end": "00:00", "days": "1234567", "language": "Portuguese", "power_kw": 7.5, "azimuth": "360", "transmitter": "Goiania, Brasil", "remarks": ""},
    {"no": 38, "kota": "Paochung, Taiwan", "alat": "SW Broadcast", "freq_hz": 11_815_000, "mode": "AM", "call_sign": "Radio Taiwan Int.", "start": "04:00", "end": "06:00", "days": "1234567", "language": "Chinese", "power_kw": 100, "azimuth": "310", "transmitter": "Paochung, Taiwan", "remarks": ""},
    {"no": 39, "kota": "Mahajanga, Madagaskar", "alat": "SW Broadcast", "freq_hz": 11_825_000, "mode": "AM", "call_sign": "World CHRISTIAN BROADC.AFRICAVPA", "start": "04:00", "end": "05:00", "days": "1234567", "language": "English", "power_kw": 100, "azimuth": "295", "transmitter": "Mahajanga, Madagaskar", "remarks": ""},
    {"no": 40, "kota": "Nanning, China", "alat": "SW Broadcast", "freq_hz": 11_850_000, "mode": "AM", "call_sign": "CNR 1 Voice of China", "start": "00:00", "end": "06:00", "days": "1234567", "language": "Chinese", "power_kw": 100, "azimuth": "142", "transmitter": "Nanning, China", "remarks": ""},
    {"no": 41, "kota": "Lhasa, Tibet", "alat": "SW Broadcast", "freq_hz": 11_860_000, "mode": "AM", "call_sign": "CNR 1 Voice of China", "start": "04:00", "end": "05:00", "days": "1234567", "language": "Chinese", "power_kw": 100, "azimuth": "85", "transmitter": "Lhasa, Tibet", "remarks": ""},
    {"no": 42, "kota": "Kajang, Malaysia", "alat": "SW Broadcast", "freq_hz": 11_885_000, "mode": "AM", "call_sign": "RTM Sabah FM", "start": "00:00", "end": "00:00", "days": "1234567", "language": "Malaysian", "power_kw": 100, "azimuth": "93", "transmitter": "Kajang, Malaysia", "remarks": ""},
    {"no": 43, "kota": "Urumqi, China", "alat": "SW Broadcast", "freq_hz": 11_885_000, "mode": "AM", "call_sign": "CNR 13 Uighur Radio", "start": "23:15", "end": "06:00", "days": "1234567", "language": "Uyghur", "power_kw": 100, "azimuth": "230", "transmitter": "Urumqi, China", "remarks": ""},
    {"no": 44, "kota": "Beijing, China", "alat": "SW Broadcast", "freq_hz": 11_905_000, "mode": "AM", "call_sign": "CNR 6 Shenzhou Easy Radio", "start": "01:00", "end": "05:00", "days": "1234567", "language": "Amoy", "power_kw": 100, "azimuth": "163", "transmitter": "Beijing, China", "remarks": ""},
    {"no": 45, "kota": "Baoji, China", "alat": "SW Broadcast", "freq_hz": 11_915_000, "mode": "AM", "call_sign": "CNR 2 Business Radio", "start": "00:30", "end": "06:00", "days": "1234567", "language": "Chinese", "power_kw": 100, "azimuth": "255", "transmitter": "Baoji-Sifangshan, China", "remarks": ""},
    {"no": 46, "kota": "Beijing, China", "alat": "SW Broadcast", "freq_hz": 11_935_000, "mode": "AM", "call_sign": "CNR 5 Cross-Strait Radio", "start": "23:00", "end": "06:00", "days": "1234567", "language": "Chinese", "power_kw": 100, "azimuth": "163", "transmitter": "Beijing, China", "remarks": ""},
    {"no": 47, "kota": "Lhasa, Tibet", "alat": "SW Broadcast", "freq_hz": 11_950_000, "mode": "AM", "call_sign": "CNR 1 Voice of China", "start": "04:00", "end": "05:00", "days": "1234567", "language": "Chinese", "power_kw": 100, "azimuth": "290", "transmitter": "Lhasa, Tibet", "remarks": ""},
    {"no": 48, "kota": "Bauta, Kuba", "alat": "SW Broadcast", "freq_hz": 11_950_000, "mode": "AM", "call_sign": "Radio Habana Cuba", "start": "00:00", "end": "06:00", "days": "1234567", "language": "English", "power_kw": 100, "azimuth": "100", "transmitter": "Bauta, Kuba", "remarks": ""},
    {"no": 49, "kota": "Miaoli, Taiwan", "alat": "SW Broadcast", "freq_hz": 11_970_000, "mode": "AM", "call_sign": "SOH Xi Wang Zhi Sheng", "start": "21:30", "end": "15:00", "days": "1234567", "language": "Chinese, Cantonese", "power_kw": 1, "azimuth": "ND", "transmitter": "Miaoli, Taiwan", "remarks": ""},
    {"no": 50, "kota": "Miaoli, Taiwan", "alat": "SW Broadcast", "freq_hz": 11_975_000, "mode": "AM", "call_sign": "SOH Xi Wang Zhi Sheng", "start": "21:00", "end": "17:00", "days": "1234567", "language": "Chinese, Cantonese", "power_kw": 1, "azimuth": "ND", "transmitter": "Miaoli, Taiwan", "remarks": ""},
    {"no": 51, "kota": "Urumqi, China", "alat": "SW Broadcast", "freq_hz": 11_975_000, "mode": "AM", "call_sign": "PBS Xinjiang", "start": "03:05", "end": "05:30", "days": "1234567", "language": "Kyrgyz", "power_kw": 100, "azimuth": "247", "transmitter": "Urumqi, China", "remarks": ""},
    {"no": 52, "kota": "Miaoli, Taiwan", "alat": "SW Broadcast", "freq_hz": 11_990_000, "mode": "AM", "call_sign": "SOH Xi Wang Zhi Sheng", "start": "21:00", "end": "16:00", "days": "1234567", "language": "Chinese, Cantonese", "power_kw": 1, "azimuth": "ND", "transmitter": "Miaoli, Taiwan", "remarks": ""},
    {"no": 53, "kota": "Elburg, Belanda", "alat": "SW Broadcast", "freq_hz": 12_030_000, "mode": "AM", "call_sign": "Radio DELTA International", "start": "00:00", "end": "12:00", "days": "1234567", "language": "Dutch, English", "power_kw": 1, "azimuth": "ND", "transmitter": "Elburg, Belanda", "remarks": ""},
    {"no": 54, "kota": "Beijing, China", "alat": "SW Broadcast", "freq_hz": 12_045_000, "mode": "AM", "call_sign": "CNR 1 Voice of China", "start": "23:00", "end": "06:00", "days": "1234567", "language": "Chinese", "power_kw": 100, "azimuth": "285", "transmitter": "Beijing, China", "remarks": ""},
    {"no": 55, "kota": "Vandiver, USA", "alat": "SW Broadcast", "freq_hz": 12_050_000, "mode": "AM", "call_sign": "EWTN 3", "start": "00:00", "end": "06:00", "days": "1234567", "language": "Spanish", "power_kw": 100, "azimuth": "155", "transmitter": "Vandiver, USA", "remarks": ""},
    {"no": 56, "kota": "Lingshi, China", "alat": "SW Broadcast", "freq_hz": 12_055_000, "mode": "AM", "call_sign": "CNR 17 Kazakh Radio", "start": "23:55", "end": "06:00", "days": "1234567", "language": "Kazakh", "power_kw": 100, "azimuth": "298", "transmitter": "Lingshi, China", "remarks": ""},
    {"no": 57, "kota": "Baoji, China", "alat": "SW Broadcast", "freq_hz": 12_080_000, "mode": "AM", "call_sign": "CNR 2 Business Radio", "start": "00:00", "end": "06:00", "days": "1234567", "language": "Chinese", "power_kw": 100, "azimuth": "255", "transmitter": "Baoji-Sifangshan, China", "remarks": ""},
    {"no": 58, "kota": "Talata-Volonondry, Madagaskar", "alat": "SW Broadcast", "freq_hz": 12_095_000, "mode": "AM", "call_sign": "BBC", "start": "04:00", "end": "05:00", "days": "1234567", "language": "English", "power_kw": 250, "azimuth": "265", "transmitter": "Talata-Volonondry, Madagaskar", "remarks": ""},
    {"no": 59, "kota": "Lebanon, Tennessee, USA", "alat": "SW Broadcast", "freq_hz": 12_105_000, "mode": "AM", "call_sign": "WTWW", "start": "14:00", "end": "06:00", "days": "1234567", "language": "English", "power_kw": 100, "azimuth": "180", "transmitter": "Lebanon, Tennessee, USA", "remarks": ""},
    {"no": 60, "kota": "Miaoli, Taiwan", "alat": "SW Broadcast", "freq_hz": 12_150_000, "mode": "AM", "call_sign": "SOH Xi Wang Zhi Sheng", "start": "21:30", "end": "17:00", "days": "1234567", "language": "Chinese, Cantonese", "power_kw": 0.1, "azimuth": "ND", "transmitter": "Miaoli, Taiwan", "remarks": ""},
    {"no": 61, "kota": "Miaoli, Taiwan", "alat": "SW Broadcast", "freq_hz": 12_160_000, "mode": "AM", "call_sign": "SOH Xi Wang Zhi Sheng", "start": "20:50", "end": "16:00", "days": "1234567", "language": "Chinese", "power_kw": 1, "azimuth": "ND", "transmitter": "Miaoli, Taiwan", "remarks": ""},
    {"no": 62, "kota": "Miaoli, Taiwan", "alat": "SW Broadcast", "freq_hz": 12_190_000, "mode": "AM", "call_sign": "SOH Xi Wang Zhi Sheng", "start": "22:00", "end": "16:00", "days": "1234567", "language": "Chinese", "power_kw": 1, "azimuth": "ND", "transmitter": "Miaoli, Taiwan", "remarks": ""},
]



# ============================================================
# TAMPILAN TERMINAL
# ============================================================

def garis(char="─"):
    print(char * LEBAR)


def judul(teks):
    print()
    garis("═")
    print(f"  {teks}")
    garis("═")


def bersihkan_baris():
    print("\r" + " " * 60 + "\r", end="", flush=True)


# ============================================================
# KONEKSI RADIO
# ============================================================

def cek_koneksi():
    judul("PEMERIKSAAN KONEKSI RADIO")
    print(f"  XML-RPC : {FLRIG_URL}")

    try:
        nama_radio = flrig.rig.get_xcvr()
        frekuensi = float(flrig.rig.get_vfo())

        if not nama_radio or str(nama_radio).strip().upper() == "NONE":
            print("  [GAGAL] Radio belum terhubung ke FLRig.")
            print("  Periksa CAT control dan tombol Init.")
            return False

        print("  Status      : TERHUBUNG")
        print(f"  Transceiver : {nama_radio}")
        print(f"  Frekuensi   : {frekuensi / 1e6:.3f} MHz")
        return True

    except (socket.error, OSError, xmlrpc.client.Error) as err:
        print("  [GAGAL] Tidak dapat mengakses FLRig.")
        print(f"  Detail      : {err}")
        print("  Periksa FLRig dan server XML-RPC port 12345.")
        return False


# ============================================================
# AUDIO
# ============================================================

def cek_audio():
    try:
        info = sd.query_devices(AUDIO_DEVICE, "input")

        if info["max_input_channels"] < JUMLAH_CHANNEL:
            raise RuntimeError("Input audio tidak memiliki channel yang cukup.")

        print(f"  Input audio : {info['name']}")
        print(f"  Sample rate : {SAMPLERATE} Hz")
        print(f"  Threshold   : {AMBANG_SUARA_DB} dBFS")
        return True

    except Exception as err:
        print(f"  [PERINGATAN] Input audio tidak siap: {err}")
        return False


def deteksi_suara():
    """Rekam selama DURASI detik dan hitung level RMS dalam dBFS."""
    try:
        rekaman = sd.rec(
            int(DURASI * SAMPLERATE),
            samplerate=SAMPLERATE,
            channels=JUMLAH_CHANNEL,
            dtype="float32",
            device=AUDIO_DEVICE,
            blocking=False,
        )

        for sisa in range(DURASI, 0, -1):
            print(
                f"\r  Mendengarkan: {sisa} detik tersisa...",
                end="",
                flush=True,
            )
            time.sleep(1)

        sd.wait()
        bersihkan_baris()

        audio = np.asarray(rekaman, dtype=np.float64)

        if audio.size == 0 or not np.all(np.isfinite(audio)):
            return "GAGAL AUDIO", None

        rms = float(np.sqrt(np.mean(audio ** 2)))
        level_dbfs = 20 * np.log10(max(rms, 1e-12))

        status = (
            "ADA SUARA"
            if level_dbfs >= AMBANG_SUARA_DB
            else "TIDAK ADA SUARA"
        )

        return status, round(level_dbfs, 2)

    except KeyboardInterrupt:
        sd.stop()
        raise

    except Exception as err:
        sd.stop()
        bersihkan_baris()
        print(f"  [ERROR AUDIO] {err}")
        return "GAGAL AUDIO", None


# ============================================================
# SCANNING
# ============================================================


def pantau_stasiun():
    hasil = []
    mulai = datetime.now()
    total = len(daftar_stasiun)

    judul("PEMINDAIAN FREKUENSI")
    print(f"  Jumlah stasiun : {total}")
    print(f"  Durasi dengar  : {DURASI} detik/stasiun")
    print("  Input hasil    : Manual")

    for indeks, stasiun in enumerate(daftar_stasiun, start=1):
        mhz = stasiun["freq_hz"] / 1_000_000

        catatan = {
            "waktu": datetime.now().isoformat(timespec="seconds"),
            "no": stasiun["no"],
            "kota": stasiun["kota"],
            "alat": stasiun["alat"],
            "frekuensi_mhz": f"{mhz:.6f}",
            "mode": stasiun["mode"],
            "call_sign": stasiun["call_sign"],
            "status": "",
            "level_audio_dbfs": "",
            "durasi_detik": DURASI,
            "keterangan": "Penilaian suara manual",
        }

        print()
        garis()
        print(f"  STASIUN {indeks:02d}/{total:02d} | {stasiun['call_sign']}")
        garis()
        print(f"  Kota       : {stasiun['kota']}")
        print(f"  Frekuensi  : {mhz:.3f} MHz")
        print(f"  Mode       : {stasiun['mode']}")

        try:
            flrig.rig.set_vfoA(float(stasiun["freq_hz"]))
            time.sleep(0.2)
            flrig.rig.set_mode(stasiun["mode"])
        except Exception as err:
            catatan["status"] = "GAGAL TUNING"
            catatan["keterangan"] = str(err)
            hasil.append(catatan)
            print(f"  [GAGAL] Tidak bisa mengatur radio: {err}")
            continue

        # Beri waktu untuk mendengarkan siaran.
        for sisa in range(DURASI, 0, -1):
            print(
                f"\r  Dengarkan siaran: {sisa} detik tersisa...",
                end="",
                flush=True,
            )
            time.sleep(1)

        print("\n")
        print("  Apakah ada suara yang terdengar?")
        print("  [1] Ada suara")
        print("  [2] Tidak ada suara")
        print("  [3] Lewati / tidak yakin")
        
        while True:
            pilihan = input("  Pilihan (1/2/3): ").strip()

            if pilihan == "1":
                catatan["status"] = "ADA SUARA"
                break
            elif pilihan == "2":
                catatan["status"] = "TIDAK ADA SUARA"
                break
            elif pilihan == "3":
                catatan["status"] = "TIDAK DIKETAHUI"
                catatan["keterangan"] = "Dilewati oleh pengguna"
                break
            else:
                print("  Pilihan tidak valid. Masukkan 1, 2, atau 3.")

        hasil.append(catatan)
        print(f"\n  Hasil tersimpan sementara: {catatan['status']}")

    return hasil, mulai, datetime.now()

# ============================================================
# SIMPAN CSV
# ============================================================

def simpan_csv(hasil, nama_file):
    kolom = [
        "waktu", "no", "kota", "alat", "frekuensi_mhz",
        "mode", "call_sign", "status", "level_audio_dbfs",
        "durasi_detik", "keterangan",
    ]

    path = Path(nama_file).expanduser()

    if path.suffix.lower() != ".csv":
        path = path.with_suffix(".csv")

    path = path.resolve()

    with path.open("w", newline="", encoding="utf-8-sig") as file:
        writer = csv.DictWriter(file, fieldnames=kolom)
        writer.writeheader()
        writer.writerows(hasil)

    return path


# ============================================================
# RINGKASAN
# ============================================================

def ringkasan(hasil, mulai, selesai, file_csv):
    judul("RINGKASAN AKHIR")

    print(f"  Mulai          : {mulai:%Y-%m-%d %H:%M:%S}")
    print(f"  Selesai        : {selesai:%Y-%m-%d %H:%M:%S}")
    print(f"  Total tercatat : {len(hasil)}")
    print()

    for status in (
        "ADA SUARA",
        "TIDAK ADA SUARA",
        "GAGAL AUDIO",
        "GAGAL TUNING",
        "DIHENTIKAN",
    ):
        jumlah = sum(r["status"] == status for r in hasil)
        print(f"  {status:<20}: {jumlah:>3}")

    garis()
    print("  HASIL PER STASIUN")
    garis()

    for r in hasil:
        level = (
            f"{r['level_audio_dbfs']} dBFS"
            if r["level_audio_dbfs"] != ""
            else "-"
        )
        print(
            f"  {int(r['no']):02d} | {r['frekuensi_mhz']:>9} MHz"
            f" | {r['status']:<16} | {level}"
        )

    garis()
    print(f"  File CSV: {file_csv}")
    garis()


# ============================================================
# PROGRAM UTAMA
# ============================================================

def main():
    if not cek_koneksi():
        sys.exit(1)

    audio_ok = cek_audio()

    if not audio_ok and WAJIB_AUDIO:
        print("\nPemindaian dibatalkan: input audio wajib tersedia.")
        sys.exit(1)

    if not audio_ok:
        print("  Deteksi suara mungkin gagal sampai input audio tersedia.")

    hasil = []
    mulai = datetime.now()
    selesai = mulai

    try:
        hasil, mulai, selesai = pantau_stasiun()

    except KeyboardInterrupt:
        selesai = datetime.now()
        print("\n\n  [INFO] Pemindaian dihentikan oleh pengguna.")

    except Exception as err:
        selesai = datetime.now()
        print(f"\n  [ERROR] Pemindaian terhenti: {err}")

    finally:
        print()
        nama_file = input(
            "Nama file CSV output [hasil_pemindaian.csv]: "
        ).strip()

        if not nama_file:
            nama_file = "hasil_pemindaian.csv"

        try:
            lokasi = simpan_csv(hasil, nama_file)
            ringkasan(hasil, mulai, datetime.now(), lokasi)
            print("\n  Penyimpanan CSV berhasil.")
        except OSError as err:
            print(f"\n  [GAGAL] Tidak dapat menyimpan CSV: {err}")


if __name__ == "__main__":
    main()
