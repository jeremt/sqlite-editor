Pas encore de tables crées. Tu peux en créer une en copiant le SQL ci-dessous dans l'éditeur (à gauche) et en cliquant sur **EXÉCUTER**.

```sql
-- Crée une table "users"
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
  updated_at DATETIME,
  firstname TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE
);
-- Insert 4 utilisatrices dans la table
INSERT INTO users (firstname, email) VALUES
  ('Ada', 'ada@codepassport.dev'),
  ('Grace', 'grace@codepassport.dev'),
  ('Dorothy', 'dorothy@codepassport.dev'),
  ('Vi', 'vi@codepassport.dev');
```
