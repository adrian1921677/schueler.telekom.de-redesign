# PowerShell Script zum Starten des Vite Dev Servers
cd "$PSScriptRoot"
Write-Host "Starte Vite Entwicklungsserver..." -ForegroundColor Green
Write-Host "Projektverzeichnis: $PWD" -ForegroundColor Cyan
npm run dev

