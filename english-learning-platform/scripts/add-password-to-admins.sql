-- Adicionar campo de senha na tabela admins se não existir
ALTER TABLE admins ADD COLUMN IF NOT EXISTS password_hash VARCHAR(255);

-- Atualizar administradores existentes com senhas padrão (você deve alterar essas senhas!)
-- Senha padrão: "admin123" (hash bcrypt)
UPDATE admins 
SET password_hash = '$2b$10$rQJ8vQZ9Zm9Zm9Zm9Zm9ZuK7K7K7K7K7K7K7K7K7K7K7K7K7K7K7K7'
WHERE password_hash IS NULL;

-- Nota: As senhas acima são apenas exemplos. 
-- Em produção, você deve:
-- 1. Gerar hashes bcrypt reais para senhas seguras
-- 2. Alterar as senhas padrão imediatamente após o primeiro login
-- 3. Implementar um sistema de alteração de senhas no painel admin

-- Exemplo de como gerar hash bcrypt em Node.js:
-- const bcrypt = require('bcrypt');
-- const hash = await bcrypt.hash('suaSenhaSegura', 10);
