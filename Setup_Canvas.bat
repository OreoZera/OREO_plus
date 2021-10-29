@echo off
:: BatchGotAdmin
:-------------------------------------
REM  --> Check for permissions
    IF "%PROCESSOR_ARCHITECTURE%" EQU "amd64" (
>nul 2>&1 "%SYSTEMROOT%\SysWOW64\cacls.exe" "%SYSTEMROOT%\SysWOW64\config\system"
) ELSE (
>nul 2>&1 "%SYSTEMROOT%\system32\cacls.exe" "%SYSTEMROOT%\system32\config\system"
)

REM --> If error flag set, we do not have admin.
if '%errorlevel%' NEQ '0' (
    echo Requesting administrative privileges...
    goto UACPrompt
) else ( goto gotAdmin )

:UACPrompt
    echo Set UAC = CreateObject^("Shell.Application"^) > "%temp%\getadmin.vbs"
    set params= %*
    echo UAC.ShellExecute "cmd.exe", "/c ""%~s0"" %params:"=""%", "", "runas", 1 >> "%temp%\getadmin.vbs"

    "%temp%\getadmin.vbs"
    del "%temp%\getadmin.vbs"
    exit /B

:gotAdmin
    pushd "%CD%"
    CD /D "%~dp0"
:--------------------------------------    

echo "[ START ] Installing Chocolatey...."
Set-ExecutionPolicy Bypass -Scope Process
@"%SystemRoot%\System32\WindowsPowerShell\v1.0\powershell.exe" -NoProfile -InputFormat None -ExecutionPolicy Bypass -Command "[System.Net.ServicePointManager]::SecurityProtocol = 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))" && SET "PATH=%PATH%;%ALLUSERSPROFILE%\chocolatey\bin"
choco install -y python2 gtk-runtime microsoft-build-tools libjpeg-turbo wget
set /p Option=32 bit or 64 bit (1 for 32 bit 2 for 64 bit): 
if %Option% == 1 goto bit32
if %Option% == 2 goto bit64
:bit64
wget http://ftp.gnome.org/pub/GNOME/binaries/win64/gtk+/2.22/gtk+-bundle_2.22.1-20101229_win64.zip
mkdir GTK
unzip gtk+-bundle_2.22.1-20101229_win64.zip -d C:/GTK
goto end64
:bit32
wget http://ftp.gnome.org/pub/GNOME/binaries/win32/gtk+/2.24/gtk+-bundle_2.24.10-20120208_win32.zip
mkdir GTK
unzip gtk+-bundle_2.24.10-20120208_win32.zip -d C:/GTK
goto end32
:end32
del /f gtk+-bundle_2.24.10-20120208_win32.zip
del /f unzip.exe
echo "Done"
pause
:end64
del /f gtk+-bundle_2.22.1-20101229_win64.zip
del /f unzip.exe
echo "Done"
pause