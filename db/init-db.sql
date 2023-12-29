DROP DATABASE IF EXISTS expensedb;

CREATE DATABASE expensedb CHARACTER SET utf8 COLLATE utf8_spanish_ci;

USE expensedb;

CREATE TABLE app_users(
  id CHAR(36) BINARY PRIMARY KEY,
  active BOOLEAN DEFAULT true,
  nickname VARCHAR(50) NOT NULL UNIQUE,
  name VARCHAR(50) NOT NULL,
  lastname VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  phone VARCHAR(15) NOT NULL UNIQUE,
  birthday TIMESTAMP NOT NULL,
  nationality VARCHAR(10) NOT NULL,
  role VARCHAR(10) DEFAULT 'user',
  password TEXT NOT NULL,
  image TEXT,
  notifications BOOLEAN DEFAULT true,
  allowEmail BOOLEAN DEFAULT true,
  allowTerms BOOLEAN DEFAULT true,
  premium BOOLEAN DEFAULT false,
  premiumSince TIMESTAMP,
  premiumUntil TIMESTAMP,
  lastSession TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  leavingDate TIMESTAMP,
  code TEXT,
  createdAt TIMESTAMP DEFAULT (CURRENT_TIMESTAMP),
  updatedAt TIMESTAMP DEFAULT (CURRENT_TIMESTAMP)
);

CREATE TABLE app_groups(
  id CHAR(36) BINARY PRIMARY KEY,
  active BOOLEAN DEFAULT true,
  name VARCHAR(50) NOT NULL UNIQUE,
  description VARCHAR(250) NOT NULL,
  image TEXT,
  createdBy CHAR(36) BINARY NOT NULL,
  createdAt TIMESTAMP DEFAULT (CURRENT_TIMESTAMP),
  updatedAt TIMESTAMP DEFAULT (CURRENT_TIMESTAMP)
);

CREATE TABLE app_payments(
  id CHAR(36) BINARY PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  description VARCHAR(150) NOT NULL,
  amount FLOAT(7, 2) DEFAULT (0),
  typeAmount INT NOT NULL,
  userId CHAR(36) BINARY NOT NULL,
  groupId CHAR(36) BINARY NOT NULL,
  createdAt TIMESTAMP DEFAULT (CURRENT_TIMESTAMP),
  updatedAt TIMESTAMP DEFAULT (CURRENT_TIMESTAMP),
  FOREIGN KEY (userId) REFERENCES app_users(id),
  FOREIGN KEY (groupId) REFERENCES app_groups(id)
);

-- RELACIONES
CREATE TABLE app_users_groups(
  userId CHAR(36) BINARY NOT NULL,
  groupId CHAR(36) BINARY NOT NULL,
  createdAt TIMESTAMP DEFAULT (CURRENT_TIMESTAMP),
  updatedAt TIMESTAMP DEFAULT (CURRENT_TIMESTAMP),
  FOREIGN KEY (userId) REFERENCES app_users(id),
  FOREIGN KEY (groupId) REFERENCES app_groups(id),
  PRIMARY KEY (userId, groupId)
);

CREATE TABLE app_payments_users(
  id CHAR(36) BINARY PRIMARY KEY,
  paymentId CHAR(36) BINARY NOT NULL,
  payingUser CHAR(36) BINARY NOT NULL,
  userToPay CHAR(36) BINARY NOT NULL,
  amount FLOAT(7, 2) DEFAULT 0,
  paid BOOLEAN DEFAULT false,
  createdAt TIMESTAMP DEFAULT (CURRENT_TIMESTAMP),
  updatedAt TIMESTAMP DEFAULT (CURRENT_TIMESTAMP),
  FOREIGN KEY (paymentId) REFERENCES app_payments(id)
);

-- INTRODUCIMOS USUARIOS
INSERT INTO app_users (id, nickname, name, lastname, email, phone, birthday, nationality, role, password)
VALUES
  (UUID_TO_BIN(UUID()), 'gumodev', 'Guillermo', 'Montero Martín', 'gumodev@gumodev.com', '666555444', '1990-01-01', 'ES', 'admin', '123456'),
  (UUID_TO_BIN(UUID()), 'irenedev', 'Irene', 'Hernández', 'irenedev@irenedev.com', '666999777', '1990-01-01', 'ES', 'user', '123456');

-- CREAMOS GRUPOS
INSERT INTO app_groups (id, name, description, createdBy)
VALUES
  (UUID_TO_BIN(UUID()), 'Común', 'Grupo común de gastos', (SELECT id FROM app_users WHERE email = 'gumodev@gumodev.com')),
  (UUID_TO_BIN(UUID()), 'Hogar', 'Gastos de casa', (SELECT id FROM app_users WHERE email = 'irenedev@irenedev.com'));

-- ASOCIAMOS USUARIOS CON GRUPOS
INSERT INTO app_users_groups (userId, groupId)
VALUES
  ((SELECT id FROM app_users WHERE email = 'gumodev@gumodev.com'), (SELECT id FROM app_groups WHERE name = 'Común')),
  ((SELECT id FROM app_users WHERE email = 'irenedev@irenedev.com'), (SELECT id FROM app_groups WHERE name = 'Común')),
  ((SELECT id FROM app_users WHERE email = 'gumodev@gumodev.com'), (SELECT id FROM app_groups WHERE name = 'Hogar')),
  ((SELECT id FROM app_users WHERE email = 'irenedev@irenedev.com'), (SELECT id FROM app_groups WHERE name = 'Hogar'));

-- INSERTAMOS PAGOS
INSERT INTO app_payments (id, name, description, amount, typeAmount, userId, groupId)
VALUES
  (UUID_TO_BIN(UUID()), 'Ruedas coche', 'Recambio invierno ruedas delanteras', 75.98, 1, (SELECT id FROM app_users WHERE email = 'gumodev@gumodev.com'), (SELECT id FROM app_groups WHERE name = 'Hogar')),
  (UUID_TO_BIN(UUID()), 'Comida navidad', 'Comida fin de año langostinos', 56.87, 1, (SELECT id FROM app_users WHERE email = 'irenedev@irenedev.com'), (SELECT id FROM app_groups WHERE name = 'Común')),
  (UUID_TO_BIN(UUID()), 'Tabaco', 'Tabaco Irene', 12.45, 2, (SELECT id FROM app_users WHERE email = 'gumodev@gumodev.com'), (SELECT id FROM app_groups WHERE name = 'Común')),
  (UUID_TO_BIN(UUID()), 'Regalos navidad', 'Varios regalos navidad', 198.35, 1, (SELECT id FROM app_users WHERE email = 'irenedev@irenedev.com'), (SELECT id FROM app_groups WHERE name = 'Hogar')),
  (UUID_TO_BIN(UUID()), 'Papelería', 'Papel regalo', 20.10, 1, (SELECT id FROM app_users WHERE email = 'irenedev@irenedev.com'), (SELECT id FROM app_groups WHERE name = 'Hogar')),
  (UUID_TO_BIN(UUID()), 'Abono transporte', 'Transporte diciembre', 82, 2, (SELECT id FROM app_users WHERE email = 'gumodev@gumodev.com'), (SELECT id FROM app_groups WHERE name = 'Común')),
  (UUID_TO_BIN(UUID()), 'Compra Mercadona', 'Compra primera semana diciembre', 78.04, 1, (SELECT id FROM app_users WHERE email = 'gumodev@gumodev.com'), (SELECT id FROM app_groups WHERE name = 'Hogar')),
  (UUID_TO_BIN(UUID()), 'Cena McDonalds', 'Cena sábado', 23.98, 1, (SELECT id FROM app_users WHERE email = 'irenedev@irenedev.com'), (SELECT id FROM app_groups WHERE name = 'Común'));

-- ASOCIAMOS USUARIO/S A UN PAGO
INSERT INTO app_payments_users (id, paymentId, userToPay, payingUser, amount)
VALUES
  (UUID_TO_BIN(UUID()), (SELECT id FROM app_payments WHERE name = 'Ruedas coche'), (SELECT id FROM app_users WHERE email = 'gumodev@gumodev.com'), (SELECT id FROM app_users WHERE email = 'irenedev@irenedev.com'), 37.99),
  (UUID_TO_BIN(UUID()), (SELECT id FROM app_payments WHERE name = 'Comida navidad'), (SELECT id FROM app_users WHERE email = 'irenedev@irenedev.com'), (SELECT id FROM app_users WHERE email = 'gumodev@gumodev.com'), 28.44),
  (UUID_TO_BIN(UUID()), (SELECT id FROM app_payments WHERE name = 'Tabaco'), (SELECT id FROM app_users WHERE email = 'gumodev@gumodev.com'), (SELECT id FROM app_users WHERE email = 'irenedev@irenedev.com'), 12.45),
  (UUID_TO_BIN(UUID()), (SELECT id FROM app_payments WHERE name = 'Regalos navidad'), (SELECT id FROM app_users WHERE email = 'irenedev@irenedev.com'), (SELECT id FROM app_users WHERE email = 'gumodev@gumodev.com'), 99.18),
  (UUID_TO_BIN(UUID()), (SELECT id FROM app_payments WHERE name = 'Papelería'), (SELECT id FROM app_users WHERE email = 'irenedev@irenedev.com'), (SELECT id FROM app_users WHERE email = 'gumodev@gumodev.com'), 10.05),
  (UUID_TO_BIN(UUID()), (SELECT id FROM app_payments WHERE name = 'Abono transporte'), (SELECT id FROM app_users WHERE email = 'gumodev@gumodev.com'), (SELECT id FROM app_users WHERE email = 'irenedev@irenedev.com'), 82),
  (UUID_TO_BIN(UUID()), (SELECT id FROM app_payments WHERE name = 'Compra Mercadona'), (SELECT id FROM app_users WHERE email = 'gumodev@gumodev.com'), (SELECT id FROM app_users WHERE email = 'irenedev@irenedev.com'), 39.02),
  (UUID_TO_BIN(UUID()), (SELECT id FROM app_payments WHERE name = 'Cena McDonalds'), (SELECT id FROM app_users WHERE email = 'irenedev@irenedev.com'), (SELECT id FROM app_users WHERE email = 'gumodev@gumodev.com'), 11.99);