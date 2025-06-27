-- Criar tabela de administradores
CREATE TABLE IF NOT EXISTS admins (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  password_hash VARCHAR(255),
  role VARCHAR(50) DEFAULT 'admin',
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Criar tabela de usuários pais
CREATE TABLE IF NOT EXISTS parent_users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  password_hash VARCHAR(255),
  auth_provider VARCHAR(50) DEFAULT 'email', -- 'email' ou 'google'
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Criar tabela de usuários alunos
CREATE TABLE IF NOT EXISTS student_users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  age INTEGER,
  parent_email VARCHAR(255),
  password_hash VARCHAR(255),
  auth_provider VARCHAR(50) DEFAULT 'email',
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (parent_email) REFERENCES parent_users(email)
);

-- Inserir admin padrão (Michelle) - sem senha inicialmente para permitir configuração
INSERT INTO admins (email, name, role) VALUES 
('michelle@psicopedagoga.com', 'Michelle Marques', 'admin'),
('admin@michelle.com', 'Michelle Admin', 'admin')
ON CONFLICT (email) DO NOTHING;

-- Inserir alguns dados de exemplo
INSERT INTO parent_users (email, name, phone) VALUES 
('pai@exemplo.com', 'João Silva', '(11) 99999-9999'),
('mae@exemplo.com', 'Maria Santos', '(11) 88888-8888')
ON CONFLICT (email) DO NOTHING;

INSERT INTO student_users (email, name, age, parent_email) VALUES 
('ana@exemplo.com', 'Ana Silva', 8, 'pai@exemplo.com'),
('joao@exemplo.com', 'João Santos', 12, 'mae@exemplo.com')
ON CONFLICT (email) DO NOTHING;
