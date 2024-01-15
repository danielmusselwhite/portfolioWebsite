# really simple powershell to quickly launch the local sanity and react servers

Start-Process powershell -ArgumentList "sanity start" -WorkingDirectory "..\backend_sanity" -WindowStyle Maximized
Start-Process powershell -ArgumentList "npm start" -WorkingDirectory "..\frontend_react" -WindowStyle Maximized
Start-Process powershell -ARgumentList "go run main.go" -WorkingDirectory "..\api_go" -WindowStyle Maximized