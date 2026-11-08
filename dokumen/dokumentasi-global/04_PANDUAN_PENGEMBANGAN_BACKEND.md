# 04 — PANDUAN PENGEMBANGAN & INTEGRASI BACKEND (FASTAPI)
## Portal Web Resmi Balai Monitor Spektrum Frekuensi Radio Kelas I Pekanbaru

---

## 1. Ikhtisar Arsitektur Backend

Backend Balmon Pekanbaru dirancang sebagai **layanan micro-service RESTful API berkinerja tinggi** yang bertugas menyajikan data publik secara cepat dan aman ke frontend SvelteKit, serta menyediakan portal manajemen data (CMS) di masa depan bagi administrator balai.

Framework yang ditetapkan untuk implementasi backend adalah **Python (FastAPI)** karena:
1. **Validasi Skema Native**: Menggunakan **Pydantic v2** yang secara otomatis menjamin keselarasan tipe data dengan spesifikasi OpenAPI 3.1 dan JSON Schema Draft 2020-12 yang digunakan frontend.
2. **Kinerja Asinkron**: Berjalan di atas standar ASGI (Uvicorn / Starlette) dengan latensi rendah.
3. **Dokumentasi Otomatis**: Menghasilkan antarmuka Swagger UI interaktif di `/docs` secara instan dari kode sumber.

---

## 2. Struktur Direktori Rekomendasi (`backend/`)

Struktur folder backend dirancang modular dengan pemisahan per domain:

```
backend/
├── app/
│   ├── __init__.py
│   ├── main.py                          # Inisialisasi FastAPI, middleware CORS, & router
│   ├── core/
│   │   ├── __init__.py
│   │   ├── config.py                    # Pydantic BaseSettings pembaca backend/.env
│   │   ├── security.py                  # Token JWT, hashing password, & otorisasi
│   │   └── response.py                  # Helper amplop respons { success, data, meta }
│   ├── db/
│   │   ├── __init__.py
│   │   ├── base.py                      # Declarative Base SQLAlchemy
│   │   ├── session.py                   # Engine & get_db dependency (SQLite WAL / PostgreSQL)
│   │   └── init_db.py                   # Inisialisasi tabel database
│   ├── models/                          # Definisi ORM Model SQLAlchemy
│   │   ├── __init__.py
│   │   ├── article.py
│   │   ├── education.py
│   │   ├── document.py
│   │   ├── service.py
│   │   ├── coverage.py
│   │   ├── performance.py
│   │   └── contact.py
│   ├── schemas/                         # Pydantic v2 DTOs (Ketat sesuai Ajv Frontend)
│   │   ├── __init__.py
│   │   ├── envelope.py                  # BaseEnvelope, ErrorEnvelope
│   │   ├── article.py
│   │   ├── document.py
│   │   ├── service.py
│   │   └── contact.py
│   ├── api/
│   │   ├── __init__.py
│   │   ├── v1/
│   │   │   ├── __init__.py
│   │   │   ├── api.py                   # Aggregator router v1
│   │   │   └── public/                  # 8 Modul Router Publik (GET Only)
│   │   │       ├── contacts.py          # GET /contacts
│   │   │       ├── coverage.py          # GET /coverage, /districts, /spectrum-applications
│   │   │       ├── institution.py       # GET /institution, /functions, /leaders, /legal-bases
│   │   │       ├── performance.py       # GET /performance
│   │   │       ├── publications.py      # GET /articles, /education, /featured-video
│   │   │       ├── public_info.py       # GET /documents, /documents/{id}, /ppid
│   │   │       ├── services.py          # GET /services, /portals, /faqs, /complaints
│   │   │       └── site_content.py      # GET /site-content/hero, /homepage
│   └── static/                          # Berkas statis publik (PDF unduhan & gambar)
│       └── uploads/
│           ├── documents/               # File PDF regulasi & SOP
│           └── images/                  # Foto banner & thumbnail WebP
├── scripts/
│   ├── seed_canonical.py               # Skrip pembaca 22 JSON di frontend/src/lib/data/
│   └── verify_contracts.py              # Skrip pengujian kesesuaian respons terhadap Ajv
├── tests/
│   ├── __init__.py
│   ├── conftest.py
│   └── test_public_api.py              # Pytest unit & integration tests
├── .env.example                         # Contoh variabel lingkungan server
├── .gitignore
├── requirements.txt                     # Dependensi pip
└── uvicorn_run.py                       # Skrip runner uvicorn development
```

---

## 3. Protokol Keamanan & Pemisahan Secrets

Berdasarkan temuan audit keamanan frontend ([12_TASK5_FRONTEND_SECURITY_AUDIT.md](file:///d:/KERJA/magang%20hub/batch2/Balaimonitor/balmon-pekanbaru/dokumentasi_BE-FE/FE/doc/12_TASK5_FRONTEND_SECURITY_AUDIT.md)):

> [!CAUTION]
> **ATURAN ISOLASI VARIABEL LINGKUNGAN (SECRETS PROTECTION)**:
> Konfigurasi Vite pada frontend mengekspos semua env var berawalan `BALMON_` ke bundle JavaScript browser.
> **Dilarang keras** meletakkan kata sandi basis data, kunci rahasia JWT, atau token kredensial server ke dalam berkas `frontend/.env` atau menggunakan awalan `BALMON_`.
> Seluruh rahasia server wajib diisolasi di dalam `backend/.env` menggunakan awalan `BACKEND_*`.

### Format Berkas `backend/.env`:
```env
# Konfigurasi Aplikasi Server
BACKEND_APP_NAME="Balmon Pekanbaru Public REST API"
BACKEND_ENVIRONMENT="development"
BACKEND_DEBUG=true
BACKEND_PORT=8000
BACKEND_HOST="127.0.0.1"

# Basis Data (Gunakan SQLite untuk dev lokal cepat, PostgreSQL untuk production)
BACKEND_DATABASE_URL="sqlite:///./balmon_dev.db"
# BACKEND_DATABASE_URL="postgresql+asyncpg://balmon_user:secret@localhost:5432/balmon_db"

# Kredensial Keamanan Server
BACKEND_SECRET_KEY="ganti-dengan-string-acak-panjang-64-karakter"
BACKEND_ACCESS_TOKEN_EXPIRE_MINUTES=60

# Pengaturan Batas Rate Limiter
BACKEND_RATE_LIMIT_PER_MINUTE=60
```

---

## 4. Konfigurasi CORS & Handler Amplop Respons

### 4.1. Konfigurasi Middleware CORS Aman
Frontend berjalan di `http://localhost:5173` saat development dan port `4173` saat preview build. Konfigurasi CORS di `backend/app/main.py` wajib membatasi origin secara eksplisit:

```python
# backend/app/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from app.api.v1.api import api_router
from app.core.config import settings

app = FastAPI(
    title=settings.BACKEND_APP_NAME,
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# Konfigurasi CORS Origin Terbatas
ORIGINS = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:4173",
    "http://127.0.0.1:4173",
    "https://balmonpekanbaru.postel.go.id"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=ORIGINS,
    allow_credentials=True,
    allow_methods=["GET", "OPTIONS"],
    allow_headers=["*"],
)

# Sajikan file statis PDF regulasi & gambar unggahan
app.mount("/static", StaticFiles(directory="app/static"), name="static")

# Registrasi Router API Publik v1
app.include_router(api_router, prefix="/api/v1/public")
```

### 4.2. Helper Format Amplop Respons (`app/core/response.py`)

```python
# backend/app/core/response.py
from datetime import datetime, timezone
from typing import Any, Optional
from fastapi.responses import JSONResponse

def success_response(data: Any, status_code: int = 200) -> dict:
    """Membungkus payload sukses ke dalam amplop { success, data, meta }."""
    return {
        "success": True,
        "data": data,
        "meta": {
            "timestamp": datetime.now(timezone.utc).isoformat(),
            "version": "1.0.0",
            "sourceMode": "api"
        }
    }

def error_response(
    code: str,
    message: str,
    status_code: int = 400,
    details: Optional[dict] = None
) -> JSONResponse:
    """Membungkus error ke dalam amplop { success, error, meta } standar."""
    content = {
        "success": False,
        "error": {
            "code": code,
            "message": message,
            "details": details or {}
        },
        "meta": {
            "timestamp": datetime.now(timezone.utc).isoformat(),
            "version": "1.0.0"
        }
    }
    return JSONResponse(status_code=status_code, content=content)
```

---

## 5. Implementasi Router Publik (Contoh Publikasi & Dokumen)

### 5.1. Router Artikel Berita (`backend/app/api/v1/public/publications.py`)

```python
from fastapi import APIRouter, Depends, Query, HTTPException
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.models.article import Article
from app.schemas.article import NewsArticleDTO
from app.core.response import success_response, error_response

router = APIRouter()

@router.get("/articles")
def get_articles(
    limit: int = Query(50, ge=1, le=50, description="Maksimum 50 entitas"),
    category: str = Query(None, description="Filter kategori"),
    featured: bool = Query(None, description="Filter headline"),
    db: Session = Depends(get_db)
):
    query = db.query(Article).filter(Article.published == True)
    if category:
        query = query.filter(Article.category == category)
    if featured is not None:
        query = query.filter(Article.featured == featured)
        
    articles = query.order_by(Article.published_at.desc()).limit(limit).all()
    # Konversi ke Pydantic DTO
    serialized = [NewsArticleDTO.model_validate(art).model_dump(by_alias=True) for art in articles]
    return success_response(data=serialized)

@router.get("/articles/{slug}")
def get_article_by_slug(slug: str, db: Session = Depends(get_db)):
    article = db.query(Article).filter(Article.slug == slug, Article.published == True).first()
    if not article:
        return error_response(
            code="RESOURCE_NOT_FOUND",
            message=f"Artikel dengan slug '{slug}' tidak ditemukan.",
            status_code=404,
            details={"slug": slug}
        )
    serialized = NewsArticleDTO.model_validate(article).model_dump(by_alias=True)
    return success_response(data=serialized)
```

---

## 6. Roadmap Pengembangan Bertahap (Milestones M1–M5)

| Milestone | Target Pengerjaan | Kriteria Keberterimaan (Acceptance Criteria) |
| :---: | :--- | :--- |
| **M1** | **Scaffolding & Server Setup** | Proyek `backend/` terpasang dependensi, Uvicorn aktif di port 8000, middleware CORS & format response envelope teruji. |
| **M2** | **Basis Data & Auto-Seeding** | Model tabel SQLAlchemy terbangun, skrip seeder sukses membaca 22 JSON kanonikal dan mengisi DB lokal dengan status data parity 100%. |
| **M3** | **Implementasi 24 Endpoint Publik** | Seluruh 24 HTTP GET endpoints melayani data sesuai format DTO Ajv Draft 2020-12, error 404 terstandarisasi. |
| **M4** | **Pengujian Integrasi FE-BE (Hybrid Switch)** | Frontend diuji dengan menyetel `BALMON_*_SOURCE=api`. Verifikasi `test-provider-switching.js` lulus 100%. |
| **M5** | **Fitur Admin CMS & Upload Handler** | Endpoint mutasi (POST/PUT/DELETE) terlindungi JWT auth & RBAC, upload PDF regulasi & gambar WebP berfungsi. |

---

## 7. Prosedur Pengujian Integrasi End-to-End dengan Frontend

Setelah backend berjalan di `http://localhost:8000`, jalankan prosedur berikut untuk memverifikasi integrasi:

1. **Jalankan Backend**:
   ```powershell
   Set-Location -LiteralPath 'backend'
   python -m venv venv
   .\venv\Scripts\Activate.ps1
   pip install -r requirements.txt
   python scripts/seed_canonical.py
   uvicorn app.main:app --host 127.0.0.1 --port 8000 --reload
   ```

2. **Arahkan Frontend ke Backend API**:
   Buka file `frontend/.env` dan ubah variabel:
   ```env
   BALMON_DATA_SOURCE_DEFAULT=api
   BALMON_API_BASE_URL=http://localhost:8000/api/v1/public
   ```

3. **Jalankan Verifikasi Kualitas Frontend**:
   ```powershell
   Set-Location -LiteralPath 'frontend'
   
   # Uji switching provider
   node scripts/data/test-provider-switching.js
   
   # Uji unit test & kontrak
   pnpm exec vitest run src/lib/contracts/ src/lib/repositories/ src/lib/api/
   
   # Uji build produksi SSR
   $env:RAYON_NUM_THREADS="1"; pnpm run build
   ```

Jika seluruh tes di atas menghasilkan status **PASS**, maka backend telah 100% terintegrasi sempurna dengan antarmuka frontend Balmon Pekanbaru!

