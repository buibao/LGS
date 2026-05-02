$ErrorActionPreference = "Stop"

function Test-IsAdmin {
  $identity = [Security.Principal.WindowsIdentity]::GetCurrent()
  $principal = New-Object Security.Principal.WindowsPrincipal($identity)
  return $principal.IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)
}

if (-not (Test-IsAdmin)) {
  Write-Host "Please run this script from an Administrator PowerShell window." -ForegroundColor Yellow
  exit 1
}

$postgresPassword = "postgres"
$postgresPort = 5432
$databaseName = "leadops_ai"

Write-Host "Installing PostgreSQL via Chocolatey..." -ForegroundColor Cyan
choco install postgresql --params-global --params '"/Password:postgres /Port:5432"' -y

$pgRoot = Join-Path $env:ProgramFiles "PostgreSQL"
if (-not (Test-Path $pgRoot)) {
  throw "PostgreSQL installation directory was not found at $pgRoot."
}

$latestVersionDir = Get-ChildItem -Path $pgRoot -Directory | Sort-Object Name -Descending | Select-Object -First 1
if (-not $latestVersionDir) {
  throw "Could not detect an installed PostgreSQL version under $pgRoot."
}

$psqlPath = Join-Path $latestVersionDir.FullName "bin\psql.exe"
if (-not (Test-Path $psqlPath)) {
  throw "psql was not found at $psqlPath."
}

$env:PGPASSWORD = $postgresPassword

Write-Host "Waiting for PostgreSQL service to come online..." -ForegroundColor Cyan
Start-Sleep -Seconds 5

Write-Host "Creating database '$databaseName' if needed..." -ForegroundColor Cyan
$databaseExists = & $psqlPath -U postgres -h localhost -p $postgresPort -tAc "SELECT 1 FROM pg_database WHERE datname = '$databaseName';"
if ($databaseExists.Trim() -ne "1") {
  & $psqlPath -U postgres -h localhost -p $postgresPort -d postgres -c "CREATE DATABASE $databaseName;"
}

Write-Host "Running Prisma setup..." -ForegroundColor Cyan
Push-Location (Resolve-Path (Join-Path $PSScriptRoot ".."))
try {
  npm.cmd run db:generate
  npm.cmd run db:push
  npm.cmd run db:seed
} finally {
  Pop-Location
}

Write-Host ""
Write-Host "PostgreSQL is ready." -ForegroundColor Green
Write-Host "You can now run: npm run dev" -ForegroundColor Green
