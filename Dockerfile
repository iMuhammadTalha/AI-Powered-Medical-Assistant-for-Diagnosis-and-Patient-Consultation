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

# Expose the port
EXPOSE 7860

# Command to run your app
CMD ["python", "backend/app/main.py"]
