-- Criar bucket para arquivos de provas no Supabase Storage
INSERT INTO storage.buckets (id, name, public) VALUES ('exam-files', 'exam-files', true);

-- Política para permitir upload de arquivos
CREATE POLICY "Allow authenticated uploads" ON storage.objects
FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'exam-files');

-- Política para permitir leitura pública dos arquivos
CREATE POLICY "Allow public downloads" ON storage.objects
FOR SELECT TO public
USING (bucket_id = 'exam-files');
