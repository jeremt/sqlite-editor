export const snippets = [
    {
        key: 'definitions',
        sql: `CREATE TABLE definitions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at DATETIME,
    word TEXT NOT NULL UNIQUE,
    definition TEXT NOT NULL
);`,
    },
    {
        key: 'miniBlog',
        sql: `CREATE TABLE articles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at DATETIME,
    title TEXT NOT NULL UNIQUE,
    content TEXT NOT NULL
);
CREATE TABLE comments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at DATETIME,
    author TEXT NOT NULL,
    message TEXT NOT NULL,
    article_id INTEGER,
    FOREIGN KEY (article_id) REFERENCES articles(id)
);`,
    },
    {
        key: 'miniBlogSeed',
        sql: `-- Insertion de données dans la table 'articles'
INSERT INTO articles (title, content) VALUES
('Le futur de l''intelligence artificielle', 'L''IA continue de progresser à un rythme rapide...'),
('10 astuces pour un code propre', 'Écrire un code propre est essentiel pour la maintenance...'),
('Introduction à SQLite', 'SQLite est un système de gestion de base de données relationnelle...'),
('Les meilleures pratiques en cybersécurité', 'La sécurité informatique est plus importante que jamais...'),
('Comprendre les microservices', 'L''architecture microservices gagne en popularité...'),
('L''importance du DevOps', 'DevOps est une approche qui combine développement et opérations...'),
('Machine Learning pour débutants', 'Le machine learning est un domaine passionnant de l''IA...'),
('Optimisation des performances web', 'La vitesse de chargement est cruciale pour l''expérience utilisateur...'),
('L''essor de la réalité virtuelle', 'La VR transforme de nombreux secteurs...'),
('Principes de la programmation fonctionnelle', 'La programmation fonctionnelle offre de nombreux avantages...');

-- Insertion de données dans la table 'comments'
INSERT INTO comments (author, message, article_id) VALUES
('Alice', 'Super article, très instructif !', 1),
('Bob', 'Je ne suis pas d''accord avec certains points.', 1),
('Charlie', 'Pourriez-vous développer la partie sur les réseaux de neurones ?', 1),
('David', 'Ces astuces m''ont beaucoup aidé, merci !', 2),
('Eve', 'J''utilise SQLite depuis des années, c''est vraiment pratique.', 3),
('Frank', 'La sécurité est souvent négligée, bon rappel.', 4),
('Grace', 'Avez-vous des ressources supplémentaires sur les microservices ?', 5),
('Henry', 'DevOps a révolutionné notre façon de travailler.', 6),
('Ivy', 'Cet article m''a donné envie d''en apprendre plus sur le ML !', 7),
('Jack', 'J''ai appliqué ces conseils et mon site est beaucoup plus rapide maintenant.', 8);

-- Mise à jour des champs 'updated_at' pour simuler des modifications
UPDATE articles SET updated_at = DATETIME('now', '-' || ABS(RANDOM() % 30) || ' days');
UPDATE comments SET updated_at = DATETIME('now', '-' || ABS(RANDOM() % 15) || ' days');`,
    },
    {
        key: 'miniShop',
        sql: `CREATE TABLE products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at DATETIME,
    title TEXT NOT NULL UNIQUE,
    description TEXT,
    image_url TEXT,
    price DECIMAL(10, 2) NOT NULL
);
CREATE TABLE customers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at DATETIME,
    email TEXT NOT NULL UNIQUE,
    address TEXT NOT NULL
);
CREATE TABLE customers_products (
    customer_id INTEGER,
    product_id INTEGER,
    FOREIGN KEY (customer_id) REFERENCES customers(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);`,
    },
    {
        key: 'listTables',
        sql: `select tbl_name from sqlite_master where type = 'table';`,
    },
];
