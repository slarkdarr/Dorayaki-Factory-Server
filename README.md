# Dorayaki-Factory-Server

## Instalation
- Create .env based on .env.example, fill it accordingly
- npm install
- Make sure mysql running
- npm start

CREATE TABLE IF NOT EXISTS `dorayaki`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(25) UNIQUE NOT NULL,
  `name` VARCHAR(255) NULL,
  `email` VARCHAR(255) NULL,
  `password` VARCHAR(255) NOT NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`));a

INSERT INTO `dorayaki`.`users` (username, name, email, password, created_at) VALUES ('admin', 'admin gantenk', 'admin@admin.com', ')