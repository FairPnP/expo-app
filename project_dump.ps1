$srcDirectory = ".\src\view"
$outputFile = ".\project_dump.txt"

# Clear the output file
if (Test-Path $outputFile) {
    Clear-Content $outputFile
} else {
    New-Item $outputFile -ItemType File
}

# Get all .ts and .tsx files excluding index.ts
Get-ChildItem $srcDirectory -Recurse -Include *.ts, *.tsx | Where-Object { $_.Name -ne "index.ts" } | ForEach-Object {
    # Write file path as comment
    Add-Content $outputFile "// $($_.FullName)"
    # Append file content
    Get-Content $_.FullName | Add-Content $outputFile
    # Add a newline
    Add-Content $outputFile "`n"
}
