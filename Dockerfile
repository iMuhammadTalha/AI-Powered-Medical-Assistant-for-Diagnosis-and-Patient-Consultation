# Use an official Python runtime as a parent image
FROM python:3.9

# Set the working directory
WORKDIR /app

# Copy backend and frontend
COPY backend backend
COPY frontend frontend

# Install dependencies (modify as needed)
RUN pip install -r backend/requirements.txt

# Expose the port
EXPOSE 7860

# Command to run your app (modify for Streamlit/Gradio)
CMD ["python", "backend/app.main.py"]
