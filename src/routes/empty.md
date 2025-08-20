No tables created yet. You can create one by copying the following SQL query into the editor (on the left) and clicking on **RUN**.

```sql
-- Create a simple user table
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
  updated_at DATETIME,
  firstname TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE
);
-- Insert 4 famous in tech women into the table
INSERT INTO users (firstname, email) VALUES
  ('Ada', 'ada@codepassport.dev'),
  ('Grace', 'grace@codepassport.dev'),
  ('Dorothy', 'dorothy@codepassport.dev'),
  ('Vi', 'vi@codepassport.dev');
```
