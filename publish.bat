cd _site
powershell -File .\ReplaceURL.ps1
cd ..
"C:\ProgramData\chocolatey\lib\rsync\tools\bin\rsync.exe" -azvI --chmod=Du=rwx,Dgo=rx,Fu=rw,Fog=r  --delete -e "C:\ProgramData\chocolatey\lib\rsync\tools\bin\ssh.exe" ./_site/ pkastner@daphnis.uberspace.de:/var/www/virtual/pkastner/html/portfolio/
PAUSE
