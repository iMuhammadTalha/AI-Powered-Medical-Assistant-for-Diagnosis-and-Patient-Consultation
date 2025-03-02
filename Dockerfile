# Use an official Python runtime as a parent image
FROM python:3.9

# Set the working directory
WORKDIR /app

# Copy backend and frontend
COPY backend backend
COPY frontend frontend

# Set PYTHONPATH to include the backend directory
ENV PYTHONPATH=/app/backend

# Upgrade pip
RUN pip install --upgrade pip

# Fix the huggingface_hub issue
RUN pip install --upgrade huggingface_hub

# Install dependencies
RUN pip install -r backend/requirements.txt

# Expose the correct port
EXPOSE 7860

# Command to run the FastAPI app with Uvicorn
CMD ["uvicorn", "backend.app.main:app", "--host", "0.0.0.0", "--port", "7860"]
