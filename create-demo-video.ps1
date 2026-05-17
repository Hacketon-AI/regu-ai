# PowerShell Script to Create Demo Video from Successful Playwright Tests
# ReguAI E2E Test Demo Video Generator

Write-Host "=== ReguAI Demo Video Generator ===" -ForegroundColor Cyan
Write-Host ""

# Check if FFmpeg is installed
$ffmpeg = "C:\Users\User\AppData\Local\Microsoft\WinGet\Links\ffmpeg.exe"
$ffmpegExists = Test-Path $ffmpeg

if (-not $ffmpegExists) {
    Write-Host "ERROR: FFmpeg is not installed or not in PATH" -ForegroundColor Red
    exit 1
}

Write-Host "OK: FFmpeg found" -ForegroundColor Green

# Get all video files from test results
Write-Host ""
Write-Host "Scanning for test videos..." -ForegroundColor Cyan

$allVideos = Get-ChildItem -Path "test-results" -Recurse -Filter "video.webm" -ErrorAction SilentlyContinue

if ($allVideos.Count -eq 0) {
    Write-Host "ERROR: No video files found in test-results/" -ForegroundColor Red
    Write-Host "Please run: npx playwright test" -ForegroundColor Yellow
    exit 1
}

Write-Host "Found $($allVideos.Count) video files" -ForegroundColor Green

# Filter out retry videos
$successVideos = $allVideos | Where-Object { 
    $_.DirectoryName -notmatch "retry\d+" 
}

Write-Host "Found $($successVideos.Count) non-retry videos" -ForegroundColor Green

# Create output directory
$outputDir = "demo-videos"
if (-not (Test-Path $outputDir)) {
    New-Item -ItemType Directory -Path $outputDir | Out-Null
    Write-Host "OK: Created output directory: $outputDir" -ForegroundColor Green
}

# Parse test results to identify passed tests
Write-Host ""
Write-Host "Analyzing test results..." -ForegroundColor Cyan

$testResultsFile = "test-results/test-results.json"
if (-not (Test-Path $testResultsFile)) {
    Write-Host "ERROR: Test results file not found: $testResultsFile" -ForegroundColor Red
    exit 1
}

$testResults = Get-Content $testResultsFile | ConvertFrom-Json

# Extract passed tests
$passedTests = @()
foreach ($suite in $testResults.suites) {
    foreach ($subSuite in $suite.suites) {
        foreach ($spec in $subSuite.specs) {
            if ($spec.ok -eq $true) {
                $passedTests += @{
                    Title = $spec.title
                    File = $spec.file
                }
            }
        }
    }
}

Write-Host "OK: Found $($passedTests.Count) passed tests" -ForegroundColor Green

# Match videos to passed tests
Write-Host ""
Write-Host "Matching videos to passed tests..." -ForegroundColor Cyan

$demoVideos = @()
$excludedVideos = @()

foreach ($video in $successVideos) {
    $dirName = $video.Directory.Name
    $isMatched = $false
    
    foreach ($test in $passedTests) {
        $testTitle = $test.Title.ToLower() -replace '\s+', '-' -replace '[^a-z0-9-]', ''
        $dirNameLower = $dirName.ToLower()
        
        if ($dirNameLower -match $testTitle.Substring(0, [Math]::Min(20, $testTitle.Length))) {
            $demoVideos += @{
                Path = $video.FullName
                Test = $test.Title
                Directory = $dirName
            }
            $isMatched = $true
            break
        }
    }
    
    if (-not $isMatched) {
        $excludedVideos += @{
            Path = $video.FullName
            Directory = $dirName
        }
    }
}

Write-Host "OK: Matched $($demoVideos.Count) videos to passed tests" -ForegroundColor Green
Write-Host "OK: Excluded $($excludedVideos.Count) videos from failed tests" -ForegroundColor Yellow

if ($demoVideos.Count -eq 0) {
    Write-Host ""
    Write-Host "ERROR: No videos available for demo creation" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "Creating demo video with $($demoVideos.Count) clips..." -ForegroundColor Cyan

# Create FFmpeg concat file
$concatFile = "$outputDir/video-list.txt"
if (Test-Path $concatFile) {
    Remove-Item $concatFile
}

foreach ($video in $demoVideos) {
    $videoPath = $video.Path -replace '\\', '/'
    $lines = @()

    foreach ($video in $demoVideos) {
        $videoPath = $video.Path -replace '\\', '/'
        $lines += "file '$videoPath'"
    }

    $utf8NoBom = New-Object System.Text.UTF8Encoding $false
    [System.IO.File]::WriteAllLines($concatFile, $lines, $utf8NoBom)
}

# Combine videos using FFmpeg
$outputFile = "$outputDir/final-demo.mp4"
Write-Host ""
Write-Host "Running FFmpeg..." -ForegroundColor Cyan

$ffmpegArgs = "-f concat -safe 0 -i `"$concatFile`" -c:v libx264 -pix_fmt yuv420p -movflags +faststart -y `"$outputFile`""
$process = Start-Process -FilePath $ffmpeg -ArgumentList $ffmpegArgs -NoNewWindow -Wait -PassThru

if ($process.ExitCode -eq 0) {
    Write-Host ""
    Write-Host "OK: Demo video created successfully!" -ForegroundColor Green
    Write-Host "  Output: $outputFile" -ForegroundColor Cyan
    
    $fileInfo = Get-Item $outputFile
    $fileSizeMB = [math]::Round($fileInfo.Length / 1MB, 2)
    Write-Host "  Size: $fileSizeMB MB" -ForegroundColor Cyan
} else {
    Write-Host ""
    Write-Host "ERROR: FFmpeg failed with exit code $($process.ExitCode)" -ForegroundColor Red
    exit 1
}

# Create README
Write-Host ""
Write-Host "Creating README..." -ForegroundColor Cyan

$readmeLines = @()
$readmeLines += "# Demo Video - ReguAI E2E Tests"
$readmeLines += ""
$readmeLines += "**Generated:** $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"
$readmeLines += "**Total Clips:** $($demoVideos.Count)"
$readmeLines += "**Output File:** final-demo.mp4"
$readmeLines += "**File Size:** $fileSizeMB MB"
$readmeLines += ""
$readmeLines += "---"
$readmeLines += ""
$readmeLines += "## Included Test Flows"
$readmeLines += ""

$index = 1
foreach ($video in $demoVideos) {
    $readmeLines += "$index. **$($video.Test)**"
    $readmeLines += "   - Source: ``$($video.Directory)``"
    $readmeLines += ""
    $index++
}

$readmeLines += "---"
$readmeLines += ""
$readmeLines += "## Excluded Videos (Failed Tests)"
$readmeLines += ""

if ($excludedVideos.Count -gt 0) {
    foreach ($video in $excludedVideos) {
        $readmeLines += "- ``$($video.Directory)``"
    }
} else {
    $readmeLines += "None - all tests passed!"
}

$readmeLines += ""
$readmeLines += "---"
$readmeLines += ""
$readmeLines += "## Test Statistics"
$readmeLines += ""
$totalTests = $testResults.stats.expected + $testResults.stats.unexpected
$passRate = [math]::Round(($testResults.stats.expected / $totalTests) * 100, 1)
$readmeLines += "- **Total Tests:** $totalTests"
$readmeLines += "- **Passed:** $($testResults.stats.expected)"
$readmeLines += "- **Failed:** $($testResults.stats.unexpected)"
$readmeLines += "- **Pass Rate:** $passRate%"
$readmeLines += ""
$readmeLines += "---"
$readmeLines += ""
$readmeLines += "**Generated by:** ReguAI Demo Video Generator"
$readmeLines += "**Project:** ReguAI Incident Management System"

$readmeFile = "$outputDir/README.md"
$readmeLines | Out-File -FilePath $readmeFile -Encoding utf8

Write-Host "OK: README created: $readmeFile" -ForegroundColor Green

# Summary
Write-Host ""
Write-Host "=== Summary ===" -ForegroundColor Cyan
Write-Host "OK: Demo video: $outputFile" -ForegroundColor Green
Write-Host "OK: README: $readmeFile" -ForegroundColor Green
Write-Host "OK: Included clips: $($demoVideos.Count)" -ForegroundColor Green
Write-Host "OK: Excluded clips: $($excludedVideos.Count)" -ForegroundColor Yellow
Write-Host ""
Write-Host "Demo video creation complete!" -ForegroundColor Green

# Made with Bob
