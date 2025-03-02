# Use an official Python runtime as a parent image
FROM python:3.9

# Set the working directory
WORKDIR /app

# Copy only the requirements file first (for caching)
COPY backend/requirements.txt backend/

# Create a virtual environment and install dependencies
RUN python -m venv /app/venv && \
    /app/venv/bin/pip install --upgrade pip && \
    /app/venv/bin/pip install "huggingface_hub==0.14.1" && \
    /app/venv/bin/pip install -r backend/requirements.txt

# Copy the rest of the application code
COPY backend backend
COPY frontend frontend

# Set PYTHONPATH to include the backend directory
ENV PYTHONPATH=/app/backend
ENV PATH="/app/venv/bin:$PATH"

# Create a non-root user
RUN useradd -m appuser && chown -R appuser /app
USER appuser

# Expose the correct port
EXPOSE 7860

# Use entrypoint for better argument handling
ENTRYPOINT ["uvicorn", "backend.app.main:app", "--host", "0.0.0.0", "--port", "7860"]
