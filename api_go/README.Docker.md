
# Upload Dockerized API Image to Google Cloud

## Step 1: Install Google Cloud SDK

Make sure you have the Google Cloud SDK installed on your local machine. You can download it from [Google Cloud SDK](https://cloud.google.com/sdk).

## Step 2: Authenticate with Google Cloud

Open a terminal and run the following command to authenticate your account:

```bash
gcloud auth login
```
Follow the instructions in your browser to complete the authentication process.

## Step 3: Set the Google Cloud project
If you have multiple projects, set the one you want to use:

```bash
gcloud config set project projectID
```

## Step 4: Enable Container Registry API
Ensure that the Container Registry API is enabled. You can do this in the Google Cloud Console, or use the following command:

```bash
gcloud services enable containerregistry.googleapis.com
```
## Step 5: Build and Tag your Docker Image
Navigate to the directory containing your Dockerfile and API code, then build and tag your Docker image:

```bash
docker build -t gcr.io/projectID/emojiapi:v1 .
```
Replace projectID, emojiapi, and v1 with your actual project ID, image name, and tag.

## Step 6: Push Docker Image to Google Container Registry
Now, push your Docker image to Google Container Registry:

```bash
docker push gcr.io/projectID/emojiapi:v1
```

## Step 7: Deploy your API on Google Cloud Run (Optional)
If you want to deploy your Dockerized API using Google Cloud Run, you can use the following command:

```bash
gcloud run deploy emojiapi-service --image gcr.io/projectID/emojiapi:v1 --platform managed
```
Replace emojiapi-service with the desired service name.

That's it! Your Dockerized API is now uploaded to Google Cloud. Remember to replace placeholder values with your actual project details, image name, and tag. If you encounter any issues, refer to the Google Cloud documentation for more detailed information.

# Trouble Shooting

## Error on Step 6 - unauthorized: You don't have the needed permissions to perform this operation, and you may have invalid credentials. 

### Step 1: Authenticate with Google Cloud
Make sure you are authenticated with your Google Cloud account. Run the following command to log in:

```bash
gcloud auth login
```
Follow the instructions in your browser to complete the authentication process.

### Step 2: Set the Google Cloud project
Ensure you have set the correct Google Cloud project:

```bash
gcloud config set project projectID
```

### Step 3: Authenticate Docker with Google Container Registry
Run the following command to authenticate Docker with your Google Container Registry:

```bash
gcloud auth configure-docker
```
This command configures Docker to use your Google Cloud credentials when pushing images.

### Step 4: Retry Docker Image Push
Now, try pushing your Docker image again:

```bash
docker push gcr.io/projectID/emojiapi:v1
```
