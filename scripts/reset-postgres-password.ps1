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

$postgresRoot = Join-Path $env:ProgramFiles "PostgreSQL"
$latestVersionDir = Get-ChildItem -Path $postgresRoot -Directory | Sort-Object Name -Descending | Select-Object -First 1

if (-not $latestVersionDir) {
  throw "No PostgreSQL installation was found under $postgresRoot."
}

$dataDir = Join-Path $latestVersionDir.FullName "data"
$pgHbaPath = Join-Path $dataDir "pg_hba.conf"
$psqlPath = Join-Path $latestVersionDir.FullName "bin\psql.exe"
$serviceName = "postgresql-x64-$($latestVersionDir.Name)"
$backupPath = "$pgHbaPath.bak-codex"

if (-not (Test-Path $pgHbaPath)) {
  throw "pg_hba.conf was not found at $pgHbaPath."
}

Copy-Item -LiteralPath $pgHbaPath -Destination $backupPath -Force

$content = Get-Content $pgHbaPath
$content = $content | ForEach-Object {
  if ($_ -match '^\s*host\s+all\s+all\s+127\.0\.0\.1/32\s+\w+') {
    "host    all             all             127.0.0.1/32            trust"
  } elseif ($_ -match '^\s*host\s+all\s+all\s+::1/128\s+\w+') {
    "host    all             all             ::1/128                 trust"
  } else {
    $_
  }
}

Set-Content -LiteralPath $pgHbaPath -Value $content

try {
  Restart-Service $serviceName -Force
  Start-Sleep -Seconds 3

  & $psqlPath -U postgres -h localhost -p 5432 -d postgres -c "ALTER USER postgres WITH PASSWORD 'postgres';"
} finally {
  Copy-Item -LiteralPath $backupPath -Destination $pgHbaPath -Force
  Restart-Service $serviceName -Force
  Remove-Item -LiteralPath $backupPath -Force -ErrorAction SilentlyContinue
}

Write-Host "PostgreSQL password for user 'postgres' has been reset to 'postgres'." -ForegroundColor Green
Write-Host "Now run: npm run db:push" -ForegroundColor Green
