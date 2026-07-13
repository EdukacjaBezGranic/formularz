# Formularz rekrutacyjny - GitHub Pages

Strona działa wyłącznie w przeglądarce użytkownika. Dane nie są wysyłane do serwera ani zapisywane w repozytorium.

## Publikacja
1. Utwórz publiczne lub prywatne repozytorium obsługujące GitHub Pages.
2. Wgraj całą zawartość tego folderu do katalogu głównego repozytorium.
3. Wejdź w **Settings -> Pages**.
4. Wybierz **Deploy from a branch**, gałąź `main` oraz katalog `/root`.
5. Otwórz podany adres HTTPS.

## Działanie
- użytkownik wypełnia wygodny formularz HTML;
- przycisk **Podgląd PDF** generuje lokalny podgląd pięciu stron;
- przycisk **Pobierz wypełniony PDF** zapisuje dokument na urządzeniu;
- PDF korzysta z oryginalnego wzoru i nanosi dane w jego polach;
- PESEL i data urodzenia są rozkładane znak po znaku;
- dane nie są zapisywane w localStorage, cookies ani bazie danych.

Do testowania lokalnego użyj prostego serwera HTTP, np. `python -m http.server 8000`, a następnie otwórz `http://localhost:8000`.

## Kalibracja 3.0

Ta wersja korzysta z czystego, nieinteraktywnego wzoru PDF. Usunięto dodatkowe puste kwadraty, ustawiono cyfry PESEL i daty urodzenia według rzeczywistych granic komórek oraz poprawiono położenie miejscowości i daty na stronie 5. Dane są przetwarzane wyłącznie lokalnie w przeglądarce.
