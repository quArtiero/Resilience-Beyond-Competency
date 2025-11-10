-- Update Module 3 Lessons 39-43 in Render Database
-- Run this script in the Render PostgreSQL console

-- First, check if lessons exist
SELECT id, title FROM lesson WHERE id IN (39, 40, 41, 42, 43) ORDER BY id;

-- The updates will be done through Python script due to the complex JSON content
-- This SQL file is just for verification

-- Instructions:
-- 1. Log into Render Dashboard
-- 2. Navigate to your PostgreSQL database
-- 3. Click on "Shell" tab
-- 4. Run the Python update scripts from there using the internal connection

-- Alternatively, you can run this from your local docker container:
-- 1. Make sure docker-compose is running
-- 2. Update the scripts to use local DB connection
-- 3. Run the scripts locally
-- 4. Export the data
-- 5. Import to Render
