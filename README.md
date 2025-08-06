# 🧪 Client-side Auth Test App

A client-side test application for experimenting with JWT-based authentication in a multi-role environment using **Next.js**, **React Query**, **js-cookie**, **jwt-decode**, and **Zod**.

This app demonstrates **client-side handling of authentication tokens stored in cookies without the `HttpOnly` flag**, meaning:

- The **JWT token is accessible via `document.cookie`** using `js-cookie`.
- All authentication logic (reading, decoding, role extraction, etc.) is handled **entirely in the browser**.
- The token is decoded client-side using `jwt-decode`.
- Role-based access can be tested and simulated across different user roles.

> ⚠️ **Security Note**: This approach is **not suitable for production**.  
> Storing sensitive tokens in cookies without the `HttpOnly` flag makes them accessible via JavaScript, which poses a serious **XSS risk**.  
> This app is intended strictly for development, educational, or prototyping purposes.

---

## 🔧 Stack

- **Next.js** (App Router)
- **React Query** – for API communication and caching
- **Zod** – for client-side schema validation
- **js-cookie** – for working with cookies in the browser
- **jwt-decode** – to decode JWT tokens on the client side
- **Axios** – for API requests

---

## 📂 Features

- Login simulation with JWT tokens stored in cookies (without `HttpOnly`)
- Role-based UI rendering
- Token decoding and validation on the client
- Protected routes and client-side auth checks
- Simple form validation with Zod

##

# 🧪 Testowa aplikacja kliencka z autoryzacją

Testowa aplikacja stworzona w **Next.js** do eksperymentowania z autoryzacją opartą na **JWT** z obsługą wielu ról użytkownika. W projekcie wykorzystano **React Query**, **js-cookie**, **jwt-decode** oraz **Zod**.

Aplikacja prezentuje **obsługę tokenów uwierzytelniających po stronie klienta**, które są **przechowywane w cookies bez flagi `HttpOnly`**, co oznacza:

- **Token JWT jest dostępny przez `document.cookie`** z użyciem `js-cookie`.
- Cała logika autoryzacji (odczyt, dekodowanie, wyodrębnianie ról itp.) odbywa się **w całości w przeglądarce**.
- Token jest dekodowany po stronie klienta za pomocą `jwt-decode`.
- Można symulować i testować dostęp w zależności od ról użytkowników.

> ⚠️ **Uwaga dotycząca bezpieczeństwa**: takie podejście **nie nadaje się do produkcji**.  
> Przechowywanie wrażliwych tokenów w ciasteczkach bez `HttpOnly` sprawia, że są one dostępne z poziomu JavaScriptu, co niesie poważne ryzyko ataków **XSS**.  
> Aplikacja jest przeznaczona wyłącznie do celów edukacyjnych, testowych i prototypowania.

---

## 🔧 Stos technologiczny

- **Next.js** (App Router)
- **React Query** – komunikacja z API i cache
- **Zod** – walidacja danych po stronie klienta
- **js-cookie** – obsługa ciasteczek w przeglądarce
- **jwt-decode** – dekodowanie JWT po stronie klienta
- **Axios** – zapytania HTTP

---

## 📂 Funkcje

- Symulacja logowania z tokenem JWT przechowywanym w ciasteczku (bez `HttpOnly`)
- Renderowanie interfejsu w zależności od roli użytkownika
- Dekodowanie i walidacja tokena po stronie klienta
- Ochrona tras i sprawdzanie autoryzacji w przeglądarce
- Prosta walidacja formularza logowania z wykorzystaniem Zod

