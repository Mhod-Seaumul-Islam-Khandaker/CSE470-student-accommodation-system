# Save this script as Get-ProjectStructure.ps1 and run it from the root of your project

# Define a recursive function to build the directory tree structure
function Get-ProjectStructure {
    param (
        [string]$Path  # The folder path to scan
    )

    # Create a hashtable (similar to a dictionary) to store this folder's structure
    $structure = @{
        Name = (Split-Path $Path -Leaf)      # Get the folder name only
        Type = "Folder"                      # Mark it as a folder
        Children = @()                       # Initialize a list for child items
    }

    # Get all items (files and folders) in the current directory
    $items = Get-ChildItem -Path $Path

    foreach ($item in $items) {
        if ($item.PSIsContainer) {
            # If it's a folder, call this function recursively
            $childStructure = Get-ProjectStructure -Path $item.FullName
            $structure.Children += $childStructure
        } else {
            # If it's a file, add its name and mark it as a file
            $structure.Children += @{
                Name = $item.Name
                Type = "File"
            }
        }
    }

    return $structure
}

# Set the root path (current directory)
$rootPath = Get-Location

# Get the structure starting from the root
$projectStructure = Get-ProjectStructure -Path $rootPath

# Convert the structure to JSON format (Indented for readability)
$json = $projectStructure | ConvertTo-Json -Depth 100  # -Depth handles nested folders

# Define output file path
$outputFile = Join-Path -Path $rootPath -ChildPath "project-structure.json"

# Write the JSON to a file
$json | Set-Content -Path $outputFile -Encoding UTF8

# Output a message to let the user know it's done
Write-Host "Project structure saved to $outputFile"
