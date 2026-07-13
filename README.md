# Formularz rekrutacyjny - generator oryginalnego PDF

Strona działa w całości w przeglądarce. Wpisane dane nie są wysyłane do serwera i nie są zapisywane w bazie. Po kliknięciu **Generuj wypełniony PDF** dane są nanoszone na oryginalny, pięciostronicowy wzór PDF.

## Publikacja na GitHub Pages

1. Utwórz nowe publiczne repozytorium na GitHubie.
2. Wgraj całą zawartość tej paczki do katalogu głównego repozytorium.
3. Otwórz `Settings` → `Pages`.
4. W `Build and deployment` wybierz `Deploy from a branch`.
5. Wybierz gałąź `main` i katalog `/root`, a następnie `Save`.
6. Po kilku minutach GitHub pokaże adres gotowej strony.

## Prywatność

- brak bazy danych,
- brak wysyłania formularza,
- brak localStorage,
- brak analityki i skryptów śledzących,
- PDF powstaje lokalnie na urządzeniu użytkownika.

## Test lokalny

Ze względów bezpieczeństwa przeglądarka może blokować wczytanie PDF po otwarciu pliku `index.html` bezpośrednio z dysku. W katalogu projektu uruchom:

```bash
python -m http.server 8000
```

Następnie otwórz `http://localhost:8000`.
