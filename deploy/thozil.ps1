param(
    [string]$Command,
    [string]$Message
)

$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
# Resolve thozil.js which is located in the parent folder of 'deploy/'
$JsPath = [System.IO.Path]::GetFullPath((Join-Path $ScriptDir "..\thozil.js"))

if (-not (Test-Path $JsPath)) {
    # Fallback to current directory check
    $JsPath = Join-Path $ScriptDir "thozil.js"
}

if (Test-Path $JsPath) {
    # Pass all arguments to the Node script
    node $JsPath $args
} else {
    Write-Error "Thozil CLI engine (thozil.js) not found at: $JsPath"
}
