FROM python:3.11-slim

WORKDIR /runner

COPY pg_logger.py .
COPY pg_encoder.py .
COPY runner.py .
COPY normalizer.py .
COPY compressor.py .

CMD ["python", "runner.py"]