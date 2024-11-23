CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    telefone VARCHAR(15) NOT NULL,
    senha VARCHAR(255) NOT NULL,
    tipo_usuario ENUM('voluntario', 'ong') NOT NULL,
    data_nascimento DATE,
    interesses TEXT,
    site VARCHAR(255),
    descricao TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);