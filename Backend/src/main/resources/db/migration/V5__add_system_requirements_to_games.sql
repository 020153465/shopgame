-- Add system requirements fields to games table
ALTER TABLE games
  ADD COLUMN min_os VARCHAR(255),
  ADD COLUMN min_cpu VARCHAR(255),
  ADD COLUMN min_ram VARCHAR(255),
  ADD COLUMN min_gpu VARCHAR(255),
  ADD COLUMN min_storage VARCHAR(255),
  ADD COLUMN rec_os VARCHAR(255),
  ADD COLUMN rec_cpu VARCHAR(255),
  ADD COLUMN rec_ram VARCHAR(255),
  ADD COLUMN rec_gpu VARCHAR(255),
  ADD COLUMN rec_storage VARCHAR(255); 