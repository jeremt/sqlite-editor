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
        key: 'definitionsSeed',
        sql: `INSERT INTO definitions (word, definition) VALUES
('HTML', 'The skeleton of the web, or as some call it, "How To Make Lasagna"'),
('CSS', 'Cascading Style Sheets, or "Can''t Stop Struggling"'),
('JavaScript', 'The duct tape of the internet'),
('Python', 'A snake that eats bugs and produces code'),
('SQL', 'Structured Query Language, or "Sequel to my database nightmares"'),
('API', 'Application Programming Interface, the diplomatic liaison between software components'),
('Git', 'Version control system, or "Oops, I did it again" time machine'),
('Docker', 'Contains your app and its baggage, like a digital suitcase'),
('React', 'A JavaScript library for building UIs, or "Reacting to every state change since 2013"'),
('Vue', 'Progressive JavaScript framework, or "View it and forget it"'),
('Angular', 'A TypeScript-based framework, or "A-cute way to complicate things"'),
('Node.js', 'JavaScript runtime, because servers need therapy too'),
('Express', 'Fast, unopinionated, minimalist web framework for Node.js, or "Node.js on Red Bull"'),
('MongoDB', 'NoSQL database, where documents come to party'),
('Redux', 'State management for React, or "Reducers, Actions, and Headaches, oh my!"'),
('TypeScript', 'JavaScript with a type safety helmet'),
('Webpack', 'Module bundler, or "Web packet delivery service"'),
('Babel', 'JavaScript compiler, translating your hip ES6+ into old-school ES5'),
('REST', 'Representational State Transfer, not what developers do after implementing it'),
('GraphQL', 'Query language for APIs, or "Graph paper for your data"'),
('SASS', 'Syntactically Awesome Style Sheets, making CSS feel less like a chore'),
('LESS', 'Leaner CSS, for those who want their stylesheets on a diet'),
('JWT', 'JSON Web Token, the VIP pass of the web'),
('ORM', 'Object-Relational Mapping, or "Oh, Relational Madness"'),
('CI/CD', 'Continuous Integration/Continuous Deployment, or "Constantly Intimidating/Consistently Distressing"'),
('Agile', 'Software development methodology, or "Moving goal posts as a feature"'),
('Scrum', 'Agile framework, not to be confused with rugby'),
('Kubernetes', 'Container orchestration, or "Cube-netes: Attack of the Pods"'),
('Microservices', 'Architectural style, or "Micro-managing your application"'),
('Serverless', 'Cloud computing execution model, where servers exist in a parallel universe'),
('PWA', 'Progressive Web App, making websites feel like they hit the gym'),
('SEO', 'Search Engine Optimization, or "Secretly Entertaining Overlords"'),
('A11y', 'Accessibility, because typing 11 letters is too mainstream'),
('i18n', 'Internationalization, for when your app needs to speak in tongues'),
('UX', 'User Experience, or "Unexceptional Excuses" for bad design'),
('UI', 'User Interface, the digital fashion show'),
('DOM', 'Document Object Model, not to be confused with a certain fast-food chain'),
('AJAX', 'Asynchronous JavaScript and XML, stronger than other cleaning products'),
('JSON', 'JavaScript Object Notation, or "Jason''s On Notation duty again"'),
('XML', 'eXtensible Markup Language, because angle brackets are cool'),
('CRUD', 'Create, Read, Update, Delete, or "Cry, Regret, Undo, Debug"'),
('MVC', 'Model-View-Controller, a software design menage a trois'),
('Frontend', 'The part of a website that users see and interact with, also known as "The Diva"'),
('Backend', 'The server-side of an application, also known as "The Invisible Hero"'),
('Full-stack', 'A developer who can handle both frontend and backend, also known as "The Unicorn"'),
('Cache', 'A hardware or software component that stores data, not to be confused with cold hard cash'),
('Debugging', 'The process of removing bugs from code, or "Playing hide and seek with errors"'),
('Framework', 'A platform for developing software applications, or "Training wheels for developers"'),
('Library', 'A collection of pre-written code, like a bookshelf for lazy developers'),
('IDE', 'Integrated Development Environment, or "I Don''t Edit manually"'),
('Responsive Design', 'Web design approach for optimal viewing across devices, or "One size fits all, but actually works"'),
('Flex box', 'A CSS layout module, or "Yoga for your elements"'),
('Grid', 'A CSS layout system, for when your elements need to get in line'),
('Cookies', 'Small pieces of data stored on the user''s computer, not the delicious kind'),
('Session', 'A temporary and interactive information interchange, or "The therapist of web interactions"'),
('Authentication', 'The process of verifying identity, or "Proving you''re you and not your evil twin"'),
('Authorization', 'The process of giving someone permission to do something, like letting your code into the VIP section'),
('Encryption', 'The process of encoding data, or "Making your data wear a really good disguise"'),
('HTTP', 'HyperText Transfer Protocol, the postal service of the internet'),
('HTTPS', 'HTTP Secure, because sometimes your data needs a bodyguard'),
('SSL/TLS', 'Security protocols, or "The bouncers of the internet club"'),
('DNS', 'Domain Name System, the phonebook of the internet'),
('Hosting', 'A service that allows organizations and individuals to post a website or web page on the Internet, or "Renting a home for your website"'),
('Domain', 'An identification string that defines a realm of administrative autonomy, authority or control on the Internet, or "Your website''s street address"'),
('Repository', 'A storage location for software packages, or "The attic where developers store their digital junk"'),
('Commit', 'Record changes to the repository, or "The "point of no return" button for your code"'),
('Pull Request', 'Proposed changes to a repository submitted by a user and accepted or rejected by a repository''s collaborators, or "Hey, I made this. Want it?"'),
('Merge', 'Combining two or more development histories together, or "When two code streams become one"'),
('Conflict', 'When two branches have competing commits, and Git cannot automatically determine which version to use, or "Code custody battle"'),
('Branch', 'A parallel version of a repository, or "The multiverse of your code"'),
('Clone', 'A copy of a repository that lives on your computer instead of on a website''s server, or "Xeroxing your code"'),
('Fork', 'A personal copy of another user''s repository, or "I like your code, I think I''ll take it"'),
('Issue', 'Suggested improvements, tasks or questions related to the repository, or "Todo list for your code"'),
('Agile Sprint', 'A set period of time during which specific work has to be completed, or "The developer''s marathon"'),
('Backlog', 'A prioritized list of project requirements, or "The developer''s wish list"'),
('Burndown Chart', 'A graphical representation of work left to do versus time, or "The developer''s diet plan"'),
('Pair Programming', 'An agile software development technique in which two programmers work together at one workstation, or "Tango for coders"'),
('Code Review', 'Systematic examination of computer source code, or "Judgment day for your code"'),
('Technical Debt', 'The implied cost of additional rework caused by choosing an easy (limited) solution now instead of using a better approach that would take longer, or "The credit card of coding"'),
('Refactoring', 'The process of restructuring existing computer code without changing its external behavior, or "Giving your code a makeover"'),
('Legacy Code', 'Source code inherited from someone else or from an older version of the software, or "The ancient scrolls of programming"'),
('Rubber Duck Debugging', 'A method of debugging code by articulating a problem in spoken or written natural language, or "Therapy session with a toy duck"'),
('Yak Shaving', 'Any seemingly pointless activity which is actually necessary to solve a problem which solves a problem which, several levels of recursion later, solves the real problem you''re working on, or "The scenic route of problem-solving"'),
('Bikeshedding', 'Wasting time debating minor, trivial issues, or "Arguing about the color of the shed while the house is on fire"'),
('Feature Creep', 'The ongoing expansion or addition of new features in a product, or "When your app tries to do everything including making coffee"'),
('Scope Creep', 'Uncontrolled changes or continuous growth in a project''s scope, or "When your project grows legs and runs away"'),
('Premature Optimization', 'Optimizing a program or system before profiling or benchmarking exposes the real bottlenecks, or "Fixing the car before it breaks"'),
('Race Condition', 'Behavior of a system where the output is dependent on the sequence or timing of other uncontrollable events, or "When your code is running the 100-meter dash"'),
('Deadlock', 'A situation where two or more competing actions are each waiting for the other to finish, resulting in neither ever finishing, or "The Mexican standoff of programming"'),
('Fallback', 'An alternative action to be taken if the primary action fails, or "Plan B for your code"'),
('Polyfill', 'Code that implements a feature on web browsers that do not support the feature, or "Teaching old browsers new tricks"'),
('Transpiling', 'The process of converting source code written in one programming language to another, or "Code Babel fish"'),
('Recursion', 'See: Recursion'),
('Callback', 'A function passed as an argument to another function, or "When your code phones a friend"'),
('Promise', 'An object representing the eventual completion or failure of an asynchronous operation, or "Pinky swear in code"'),
('Async/Await', 'A way to write asynchronous code that looks synchronous, or "Time travel for your code"'),
('Dependency Injection', 'A technique whereby one object supplies the dependencies of another object, or "Feeding your code its vegetables"'),
('Middleware', 'Software that acts as a bridge between an operating system or database and applications, or "The middleman of your application"'),
('API Gateway', 'A server that acts as an API front-end, receiving API requests and routing them to the appropriate backend service, or "The bouncer of your microservices club"'),
('Containerization', 'OS-level virtualization method for deploying and running distributed applications, or "Putting your app in a box"'),
('Scalability', 'The capability of a system to handle a growing amount of work, or "Teaching your app to grow up"'),
('Load Balancing', 'Distributing network traffic across multiple servers, or "Playing musical chairs with your requests"'),
('Caching', 'Storing data in a cache, or "The art of not asking the same question twice"'),
('Throttling', 'The process of limiting the number of requests, or "Teaching your API some self-control"'),
('WebSocket', 'A computer communications protocol, providing full-duplex communication channels over a single TCP connection, or "When HTTP decides to stay for a chat"'),
('Progressive Enhancement', 'A strategy for web design that emphasizes core webpage content first, or "Building a fancy cake layer by layer"'),
('Graceful Degradation', 'A design philosophy that centers around trying to build a modern web site/application that will work in the newest browsers, but falls back to an experience that while not as good still delivers essential content and functionality in older browsers, or "Teaching your website to age gracefully"'),
('Separation of Concerns', 'A design principle for separating a computer program into distinct sections, or "Giving each part of your code its own room"'),
('Single Responsibility Principle', 'A computer programming principle that states that every module, class, or function should have responsibility over a single part of the functionality, or "One job, one code"'),
('DRY (Don''t Repeat Yourself)', 'A principle of software development aimed at reducing repetition of software patterns, or "Copy-paste is not your friend"'),
('KISS (Keep It Simple, Stupid)', 'A design principle which states that most systems work best if they are kept simple rather than made complicated, or "Simplicity is the ultimate sophistication in coding"'),
('YAGNI (You Aren''t Gonna Need It)', 'A principle which states that a programmer should not add functionality until deemed necessary, or "Just because you can, doesn''t mean you should"'),
('Linter', 'A tool that analyzes source code to flag programming errors, bugs, stylistic errors, and suspicious constructs, or "The grammar police for your code"'),
('Compiler', 'A program that translates computer code written in one programming language into another language, or "The United Nations translator for programming languages"'),
('Interpreter', 'A computer program that directly executes instructions written in a programming or scripting language, or "The simultaneous translator of the programming world"'),
('Garbage Collection', 'Automatic memory management, or "The Marie Kondo of your application"'),
('Memory Leak', 'A type of resource leak that occurs when a computer program incorrectly manages memory allocations, or "When your application becomes a data hoarder"'),
('Buffer Overflow', 'An anomaly where a program, while writing data to a buffer, overruns the buffer''s boundary and overwrites adjacent memory locations, or "When your data cup runneth over"'),
('Cross-Site Scripting (XSS)', 'A type of security vulnerability typically found in web applications, or "When your website starts speaking in tongues"'),
('SQL Injection', 'A code injection technique used to attack data-driven applications, or "Giving your database a truth serum"'),
('Man-in-the-Middle Attack', 'A type of cyberattack where the attacker secretly relays and possibly alters the communications between two parties, or "The eavesdropper of the digital world"'),
('Denial of Service (DoS)', 'A cyber-attack where the perpetrator seeks to make a machine or network resource unavailable to its intended users, or "Giving your server more than it can handle"'),
('Two-Factor Authentication', 'A method of confirming users'' claimed identities by using a combination of two different factors, or "Trust, but verify... twice"'),
('Blockchain', 'A growing list of records, called blocks, that are linked using cryptography, or "Digital Lego for cryptocurrencies"'),
('Machine Learning', 'A method of data analysis that automates analytical model building, or "Teaching computers to fish"'),
('Artificial Intelligence', 'The simulation of human intelligence in machines that are programmed to think like humans and mimic their actions, or "Making machines think they''re people"'),
('Internet of Things (IoT)', 'The interconnection via the Internet of computing devices embedded in everyday objects, or "When your toaster starts tweeting"'),
('Big Data', 'Extremely large data sets that may be analyzed computationally to reveal patterns, trends, and associations, or "When your data puts on weight"'),
('Cloud Computing', 'The on-demand availability of computer system resources, especially data storage and computing power, without direct active management by the user, or "Renting someone else''s computer"'),
('Serverless Computing', 'A cloud computing execution model in which the cloud provider runs the server, and dynamically manages the allocation of machine resources, or "The invisible hand of computing"'),
('DevOps', 'A set of practices that combines software development and IT operations, or "When developers and operations decide to play nice"'),
('Continuous Integration', 'The practice of merging all developers'' working copies to a shared mainline several times a day, or "Keeping your code in sync, all day, every day"'),
('Continuous Deployment', 'A software engineering approach in which software functionalities are delivered frequently through automated deployments, or "Shipping code faster than Amazon Prime"'),
('Test-Driven Development (TDD)', 'A software development process that relies on the repetition of a very short development cycle, or "Writing the test before the code, because we like to live dangerously"'),
('Behavior-Driven Development (BDD)', 'An agile software development process that encourages collaboration between developers, QA and non-technical or business participants in a software project, or "When your tests start speaking English"'),
('Code Smell', 'Any characteristic in the source code of a program that possibly indicates a deeper problem, or "When your code starts to stink"'),
('Spaghetti Code', 'A pejorative phrase for unstructured and difficult-to-maintain source code, or "When your code looks like your dinner"'),
('Pasta Theory of Programming', 'The principle that software should be soft and pliable like fresh pasta when in development, and should become hard and fixed like dried pasta when ready for release, or "Al dente coding"'),
('Yoda Conditions', 'A programming style where the constant goes before the variable in a conditional statement, or "If true this is, execute the code you must"'),
('Monkey Patch', 'Extending or modifying supporting system software locally, or "Teaching an old code new tricks"'),
('Dogfooding', 'The practice of an organization using its own product, or "Eating your own dog food, but for software"'),
('Easter Egg', 'An intentional inside joke, hidden message, or feature in a work such as a computer program, web page, or video game, or "The Kinder Surprise of software"'),
('Heisenbug', 'A software bug that seems to disappear or alter its behavior when one attempts to study it, or "The quantum physics of debugging"'),
('Vanilla JavaScript', 'The use of JavaScript without any additional libraries or frameworks, or "JavaScript, but make it plain"'),
('Syntactic Sugar', 'Syntax within a programming language that is designed to make things easier to read or to express, or "Making your code look sweet"'),
('Antipattern', 'A common response to a recurring problem that is usually ineffective and risks being highly counterproductive, or "The ''what not to do'' of coding"'),
('Bit Rot', 'The slow deterioration of software over time or its diminishing responsiveness that will eventually lead to software becoming faulty, unusable, or in need of upgrade, or "When your code gets old and cranky"'),
('Cargo Cult Programming', 'A style of computer programming characterized by the ritual inclusion of code or program structures that serve no real purpose, or "If it worked for them, it must work for me"'),
('Duck Typing', 'An application of the duck test in type safety, or "If it walks like a duck and quacks like a duck, it must be a duck... or a really good impersonator"'),
('Memoization', 'An optimization technique used primarily to speed up computer programs by storing the results of expensive function calls and returning the cached result when the same inputs occur again, or "Teaching your code to use Post-it notes"'),
('Sandbox', 'A testing environment that isolates untested code changes and outright experimentation from the production environment or repository, or "The playground for your code"'),
('Shebang', 'The character sequence consisting of the characters number sign and exclamation mark (#!) at the beginning of a script, or "The ''Hello World'' of script files"'),
('Thread', 'The smallest sequence of programmed instructions that can be managed independently by a scheduler, or "A single strand in the tapestry of your program"'),
('Hoisting', 'A JavaScript mechanism where variables and function declarations are moved to the top of their scope before code execution, or "Lifting your code to the top, whether it likes it or not"'),
('Closure', 'A function that has access to variables in its outer (enclosing) lexical scope, or "When your function brings its own luggage"'),
('Polymorphism', 'The provision of a single interface to entities of different types, or "When your code is a shapeshifter"'),
('Encapsulation', 'The bundling of data with the methods that operate on that data, or "Giving your code its own private room"'),
('Inheritance', 'A mechanism where you can to derive a class from another class for a hierarchy of classes that share a set of attributes and methods, or "When your class has a family tree"'),
('Abstraction', 'The process of hiding the internal details and showing only the functionality, or "The art of not saying too much in your code"'),
('Imperative Programming', 'A programming paradigm that uses statements that change a program''s state, or "Telling your computer exactly what to do, step by step"'),
('Declarative Programming', 'A programming paradigm that expresses the logic of a computation without describing its control flow, or "Telling your computer what you want, not how to do it"'),
('Functional Programming', 'A programming paradigm where programs are constructed by applying and composing functions, or "Treating computation as the evaluation of mathematical functions"'),
('Object-Oriented Programming', 'A programming paradigm based on the concept of "objects", which can contain data and code, or "Teaching your code to be more classy"'),
('Event-Driven Programming', 'A programming paradigm in which the flow of the program is determined by events, or "Making your program react to life events, just like the rest of us"'),
('Aspect-Oriented Programming', 'A programming paradigm that aims to increase modularity by allowing the separation of cross-cutting concerns, or "Teaching your code to multitask"'),
('Metaprogramming', 'A programming technique in which computer programs have the ability to treat other programs as their data, or "Writing code that writes code, because why do it yourself?"'),
('Just-In-Time Compilation', 'A way of executing computer code that involves compilation during execution of a program rather than before execution, or "Translating on the fly, like a very fast interpreter"'),
('Lexical Scope', 'The region of a computer program where a variable is valid, or "The neighborhood where your variables live"'),
('Dynamic Scope', 'A scope where the value of a variable is determined by the most recent binding in the execution context, or "When your variables like to travel"'),
('Type Coercion', 'The automatic or implicit conversion of values from one data type to another, or "When JavaScript tries to make sense of your nonsense"'),
('Currying', 'The technique of translating the evaluation of a function that takes multiple arguments into evaluating a sequence of functions, each with a single argument, or "Turning your function into a chain of single-argument functions"'),
('Lazy Evaluation', 'An evaluation strategy which delays the evaluation of an expression until its value is needed, or "Procrastination as a programming strategy"'),
('Higher-Order Function', 'A function that takes one or more functions as arguments, or "When your functions start to feel superior"'),
('Pure Function', 'A function that always returns the same result if the same arguments are passed and does not modify any external state, or "The monk of functions, living in isolation and purity"'),
('Side Effect', 'A change of system state or observable interaction with the outside world that occurs during the calculation of a result, or "When your function decides to meddle with the outside world"'),
('Immutability', 'The state of not changing, or being unable to be changed, or "Teaching your data to resist peer pressure"'),
('Idempotence', 'The property of certain operations in mathematics and computer science whereby they can be applied multiple times without changing the result beyond the initial application, or "The ''wash, rinse, repeat'' of programming"'),
('Atomicity', 'In database systems, atomicity is one of the ACID properties, or "All or nothing, there is no try"'),
('ACID', 'A set of properties of database transactions intended to guarantee validity even in the event of errors, power failures, etc., or "Making your database transactions as reliable as a Swiss watch"'),
('CAP Theorem', 'A concept that a distributed database system can only have 2 of the 3: Consistency, Availability, and Partition Tolerance, or "The ''you can''t have your cake and eat it too'' of distributed systems"'),
('Eventual Consistency', 'A consistency model used in distributed computing to achieve high availability that informally guarantees that, if no new updates are made to a given data item, eventually all accesses to that item will return the last updated value, or "When your distributed system promises to get its act together... eventually"'),
('Sharding', 'A type of database partitioning that separates very large databases into smaller, faster, more easily managed parts called data shards, or "Divide and conquer, database edition"'),
('Denormalization', 'The process of trying to improve the read performance of a database, at the expense of losing some write performance, by adding redundant copies of data or by grouping data, or "Making your database read-friendly, even if it means repeating yourself"'),
('Index', 'A data structure that improves the speed of data retrieval operations on a database table, or "The table of contents for your database"'),
('ETL', 'Extract, Transform, Load, a process in database usage that extracts data from a source, transforms it, and loads it into a target database, or "The assembly line of data processing"');`,
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
    article_id INTEGER REFERENCES articles(id)
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
        key: 'miniBlogSelect',
        sql: `SELECT 
    articles.title,
    articles.content,
    json_group_array(
            json_object(
                'author', comments.author,
                'message', comments.message
            )
        ) AS comments
FROM 
    articles
LEFT JOIN 
    comments ON articles.id = comments.article_id
GROUP BY 
    articles.id;`,
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
CREATE TABLE commands (
    customer_id INTEGER REFERENCES customers(id),
    product_id INTEGER REFERENCES products(id)
);`,
    },
    {
        key: 'miniShopSeed',
        sql: `-- Insert some sample products
INSERT INTO products (title, description, image_url, price) VALUES 
('Wireless Noise-Canceling Headphones', 'High-quality over-ear headphones with advanced noise cancellation technology', 'https://example.com/headphones.jpg', 249.99),
('Smart Fitness Tracker', 'Waterproof fitness watch with heart rate monitoring and GPS tracking', 'https://example.com/fitness-tracker.jpg', 129.50),
('Portable Bluetooth Speaker', 'Compact wireless speaker with 12-hour battery life and waterproof design', 'https://example.com/speaker.jpg', 79.99),
('Ergonomic Office Chair', 'Adjustable office chair with lumbar support and breathable mesh back', 'https://example.com/office-chair.jpg', 299.00),
('4K Ultra HD Smart TV', '55-inch LED smart TV with HDR and built-in streaming apps', 'https://example.com/tv.jpg', 549.99);

-- Insert some sample customers
INSERT INTO customers (email, address) VALUES 
('john.smith@example.com', '123 Main St, Anytown, USA 12345'),
('emily.jones@gmail.com', '456 Oak Avenue, Springfield, IL 62701'),
('michael.wong@hotmail.com', '789 Pine Road, Portland, OR 97201'),
('sarah.miller@yahoo.com', '321 Maple Drive, Boston, MA 02108'),
('david.garcia@outlook.com', '654 Elm Street, San Diego, CA 92101');

-- Insert some sample customer-product relationships
INSERT INTO commands (customer_id, product_id) VALUES 
(1, 1), -- John bought Wireless Headphones
(1, 3), -- John also bought Portable Speaker
(2, 2), -- Emily bought Fitness Tracker
(3, 4), -- Michael bought Office Chair
(4, 5), -- Sarah bought 4K Smart TV
(5, 1), -- David bought Wireless Headphones
(5, 2), -- David also bought Fitness Tracker
(5, 3); -- David also bought Portable Speaker`,
    },
    {
        key: 'miniShopSelect',
        sql: `-- Selectionne les commandes de david
SELECT
    products.title AS product_title,
    customers.email AS customer_email
    FROM products
    JOIN commands ON commands.product_id = products.id
    JOIN customers ON commands.customer_id = customers.id
    WHERE customers.email = 'david.garcia@outlook.com';

-- Calcul le prix total dépensé par tout⸱e⸱s les client⸱e⸱s
SELECT
    SUM(products.price)
    FROM products
    JOIN commands ON commands.product_id = products.id
    JOIN customers ON commands.customer_id = customers.id;`,
    },
    {
        key: 'listTables',
        sql: `SELECT tbl_name FROM sqlite_master WHERE type = 'table';`,
    },
] as const;
