import cloudinary
import cloudinary.uploader
import os
from dotenv import load_dotenv
import asyncio


# Load environment variables
load_dotenv()

# Configure Cloudinary
cloudinary.config(
    cloud_name=os.getenv("CLOUD_NAME"),
    api_key=os.getenv("API_KEY"),
    api_secret=os.getenv("API_SECRET"),
)

async def upload_file(file_buffer, resource_type="auto"):
    """
    Uploads a file to Cloudinary asynchronously.

    :param file_path: Path to the file to upload.
    :param resource_type: The resource type ("image", "video", "raw"). Default is "auto".
    :return: Secure URL of the uploaded file.
    """
    try:
        loop = asyncio.get_running_loop()
        response = await loop.run_in_executor(
            None, lambda: cloudinary.uploader.upload(
                file_buffer, 
                resource_type=resource_type, 
                **{"public_id": "response", "format": "mp3"}  # Pass options as a dictionary
            )
        )
        return response["secure_url"]
    except Exception as e:
        print("Upload failed:", e)
        return None

