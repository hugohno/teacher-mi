-- Criar tabelas no Supabase

-- Tabela de alunos
CREATE TABLE IF NOT EXISTS students (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  age INTEGER NOT NULL,
  email VARCHAR(255) UNIQUE,
  parent_name VARCHAR(255) NOT NULL,
  parent_phone VARCHAR(20) NOT NULL,
  parent_email VARCHAR(255) NOT NULL,
  level VARCHAR(50) NOT NULL,
  plan VARCHAR(100) NOT NULL,
  status VARCHAR(20) DEFAULT 'Ativo',
  start_date DATE DEFAULT CURRENT_DATE,
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de planos
CREATE TABLE IF NOT EXISTS plans (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price_per_class DECIMAL(10,2) NOT NULL,
  monthly_price DECIMAL(10,2) NOT NULL,
  classes_per_month INTEGER NOT NULL,
  duration INTEGER NOT NULL, -- em minutos
  features TEXT[], -- array de recursos
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de formas de pagamento
CREATE TABLE IF NOT EXISTS payment_methods (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description VARCHAR(255),
  discount DECIMAL(5,2) DEFAULT 0, -- porcentagem de desconto
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de provas/avaliações
CREATE TABLE IF NOT EXISTS exams (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  level VARCHAR(50) NOT NULL,
  questions INTEGER NOT NULL,
  time_limit INTEGER NOT NULL, -- em minutos
  file_url VARCHAR(500), -- URL do arquivo no Supabase Storage
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de configurações gerais
CREATE TABLE IF NOT EXISTS settings (
  id SERIAL PRIMARY KEY,
  key VARCHAR(100) UNIQUE NOT NULL,
  value TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de aulas agendadas
CREATE TABLE IF NOT EXISTS classes (
  id SERIAL PRIMARY KEY,
  student_id INTEGER REFERENCES students(id),
  teacher_name VARCHAR(255) DEFAULT 'Michelle Marques',
  date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  type VARCHAR(20) DEFAULT 'Online', -- Online ou Presencial
  status VARCHAR(20) DEFAULT 'Agendada', -- Agendada, Concluída, Cancelada
  focus VARCHAR(100), -- Foco da aula (Vocabulário, Gramática, etc.)
  notes TEXT,
  google_event_id VARCHAR(255), -- ID do evento no Google Calendar
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de pagamentos
CREATE TABLE IF NOT EXISTS payments (
  id SERIAL PRIMARY KEY,
  student_id INTEGER REFERENCES students(id),
  amount DECIMAL(10,2) NOT NULL,
  due_date DATE NOT NULL,
  payment_date DATE,
  status VARCHAR(20) DEFAULT 'Pendente', -- Pendente, Pago, Atrasado
  payment_method VARCHAR(100),
  month_reference VARCHAR(7), -- YYYY-MM
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Inserir dados iniciais
INSERT INTO plans (name, description, price_per_class, monthly_price, classes_per_month, duration, features) VALUES
('Plano Individual', 'Aulas personalizadas com acompanhamento psicopedagógico', 45.00, 180.00, 4, 60, ARRAY['Acompanhamento psicopedagógico', 'Material incluso', 'Relatórios mensais']),
('Plano Intensivo', 'Aulas mais frequentes para desenvolvimento acelerado', 42.00, 336.00, 8, 60, ARRAY['Acompanhamento psicopedagógico', 'Material incluso', 'Relatórios semanais', 'Suporte WhatsApp']);

INSERT INTO payment_methods (name, description, discount) VALUES
('PIX', 'Desconto de 5%', 5.00),
('Cartão de Débito', 'À vista', 0.00),
('Cartão de Crédito', 'Até 12x', 0.00),
('Dinheiro', 'Presencial', 0.00);

INSERT INTO settings (key, value) VALUES
('school_name', 'Michelle Marques'),
('school_subtitle', 'Psicopedagoga'),
('school_phone', '(11) 95752-3975'),
('school_instagram', '@michellinha31'),
('school_email', 'michelle@psicopedagoga.com'),
('school_address', 'Av. das Nações Unidas, 18801 - Santo Amaro, SP'),
('school_address_complement', '5º andar, conjunto 519'),
('primary_color', '#0d9488'),
('secondary_color', '#2563eb'),
('accent_color', '#7c3aed');
