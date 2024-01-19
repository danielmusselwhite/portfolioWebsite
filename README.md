# Flowchart

![Diagram](./_docs/img/architecture.png)

- Flow chart explaining basic architecture of the app

# To Deploy:

## Hosting the React Website

- To deploy the react website, you can do so by running the following command in the /frontend_react/ directory:
  - npm run build
    - Builds the react app into /frontend_react/build/
  - go to netlify.com
  - drag and drop the /frontend_react/build/ folder into the netlify window

## Hosting the Go API

<!-- Link to ./api_go/README.Docker.md -->
[Read more here](./api_go/README.Docker.md)

## Hosting the Sanity CMS FrontEnd

- Not needed for deployment, but if you want to host the Sanity CMS FrontEnd locally, you can do so by running the following command in the /backend_sanity/ directory:
  - sanity start
    - Hosts on http://localhost:3333

# Testing Go API with PostMan

- Postman collection of sample requests if you would like to interact with it
  - If testing the go API locally: 
    - _misc\PortfolioLocal.postman_collection.json
  - If testing the go API on Google Cloud Run:
    - _misc\PortfolioRemote.postman_collection.json


# To Run Website Locally:

- If you want to run/test the Website using the Go API locally, go into header.tsx and replace: 
  - https://emojiapi-service-yegyl5lwfq-nw.a.run.app/
  - with
  - http://localhost:8080/
- Or, do the opposite if you want to run/test the Website using the Go API on Google Cloud Run

## Automatic 

1. in file-explorer navigate to /_misc/ then run startScript.ps1 to do all of the below automatically
   
## Manual

1. Launch new Powershell Window in /backend_sanity/
2. run sanity via "sanity start"
   1. Hosts on http://localhost:3333
3. Launch new Powershell Window in /frontend_react/
4. run react via "npm start"
   1. Hosts on http://localhost:3000
5. Launch new Powershell Window in /api_go/
6. run go via "go run main.go"
   1. Hosts on http://localhost:8080