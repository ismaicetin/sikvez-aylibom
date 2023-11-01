mongodump ve mongorestore için ortam degişkenine path olarak eklenecek :C:\Program Files\MongoDB\Server\4.2\bin

    "_id" : ObjectId("653fda4a6f15752ee6e58ec6"),
    "active" : false,
    "password" : "1q2w3e4r",
    "createDate" : ISODate("2023-10-09T20:07:11.714Z"),
    "tc" : "11111111111",
    "name" : "ismail",
    "surname" : "çetin"

Download

# Create a folder under the drive root

$ mkdir actions-runner; cd actions-runner# Download the latest runner package
$ Invoke-WebRequest -Uri https://github.com/actions/runner/releases/download/v2.311.0/actions-runner-win-x64-2.311.0.zip -OutFile actions-runner-win-x64-2.311.0.zip# Optional: Validate the hash
$ if((Get-FileHash -Path actions-runner-win-x64-2.311.0.zip -Algorithm SHA256).Hash.ToUpper() -ne 'e629628ce25c1a7032d845f12dfe3dced630ca13a878b037dde77f5683b039dd'.ToUpper()){ throw 'Computed checksum did not match' }# Extract the installer
$ Add-Type -AssemblyName System.IO.Compression.FileSystem ; [System.IO.Compression.ZipFile]::ExtractToDirectory("$PWD/actions-runner-win-x64-2.311.0.zip", "$PWD")

Configure

# Create the runner and start the configuration experience

$ ./config.cmd --url https://github.com/ismaicetin/sikvez-aylibom --token ALNTGS3FIFAXMYDQBABDIA3FIKOMQ# Run it!
$ ./run.cmd

Using your self-hosted runner

# Use this YAML in your workflow file for each job

runs-on: self-hosted
