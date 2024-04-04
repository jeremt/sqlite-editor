# SQLite editor

A simple in-browser SQL editor to test to SQL queries easily.

Try it [here](https://sqlite-editor.vercel.app).

![demo](https://github.com/jeremt/sqlite-editor/assets/1913169/98532b59-92a7-4163-adf8-438c48abd293)

## Why this? 🤔

The other day, I did a introductory workshop about SQL.

I didn't want the students to have to do all the installation because the workshop was about SQL not install 😅

I looked for a simple online tool to easily run SQL queries and visualize tables, but I didn't find any 😭

So I decided to make one 😬

I'm also working on a [website to learn code](https://codepassport.dev) to I already made an online code editor. Also, sqlite is written in C, so its easily compiled to WASM ([https://sqlite.org/download.html](https://sqlite.org/download.html)). Thanks to those 2 things I could make a simple version quite fast.

I might improve it later but feel free to use it or contribute 😎

## TODO

-   [ ] Allow to import .sql or .csv to fill a given table
-   [ ] Enable autocomplete based on db schema
-   [ ] Show errors directly in editor with tooltip
-   [ ] Add help dialog with basic SQL queries
-   [ ] Maybe also postgres instead of sqlite (https://github.com/electric-sql/pglite)
-   [ ] Add light mode ☀️
-   [ ] Add export (just the tables schema or with the data)

![](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZXp6ZzFpYTNtMnF2Mjdvc3p0aTA4a3A4cmE0ZHpnbDVjcGVsN2ZjZiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/xUPOqo6E1XvWXwlCyQ/giphy.gif)
