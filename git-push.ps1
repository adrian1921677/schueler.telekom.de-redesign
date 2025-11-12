# Git Push Script - Pusht automatisch alle Änderungen
param(
    [string]$Message = "Update: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"
)

Write-Host "Git Push Script" -ForegroundColor Cyan
Write-Host "=================" -ForegroundColor Cyan

# Prüfe ob es Änderungen gibt
$status = git status --porcelain
if ([string]::IsNullOrWhiteSpace($status)) {
    Write-Host "Keine Änderungen zum Committen." -ForegroundColor Yellow
    exit 0
}

Write-Host "`nÄnderungen gefunden:" -ForegroundColor Green
git status --short

# Alle Änderungen hinzufügen
Write-Host "`nFüge alle Änderungen hinzu..." -ForegroundColor Cyan
git add .

# Commit erstellen
Write-Host "Erstelle Commit..." -ForegroundColor Cyan
git commit -m $Message

# Pushen
Write-Host "Pushe zu GitHub..." -ForegroundColor Cyan
git push origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host "`n✓ Erfolgreich zu GitHub gepusht!" -ForegroundColor Green
} else {
    Write-Host "`n✗ Fehler beim Pushen!" -ForegroundColor Red
    exit 1
}

