# Use an official Python runtime as a parent image
FROM python:3.9

# Set the working directory
WORKDIR /app

# Copy backend and frontend
COPY backend backend
COPY frontend frontend

# Set PYTHONPATH to include the backend directory
ENV PYTHONPATH=/app/backend

# Upgrade pip and install dependencies
RUN pip install --upgrade pip && pip install -r backend/requirements.txt

# Expose the correct port (8000 instead of 7860)
EXPOSE 8000

# Command to run the FastAPI app with Uvicorn
CMD ["uvicorn", "backend.app.main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]
