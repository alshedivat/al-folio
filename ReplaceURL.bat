@echo off
setlocal ENABLEEXTENSIONS
setlocal ENABLEDELAYEDEXPANSION

for /R %%a in (*.html) do (
    echo Processing %%a...
    for /f %%i in (%%a) do (
        if /i "%%i"=="http://0.0.0.0:4000" (
            echo https://patrickkastner.de>>%%a
        ) else (
            echo %%i>>%%a
        )
    )
    move /y %%a %%a.bak > nul
    ren %%a.new %%a
)