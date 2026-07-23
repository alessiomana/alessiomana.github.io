@echo off
setlocal enabledelayedexpansion

set PROXY=http://reglomb.proxy:8080

:: Lista degli URL univoci
set URLS=(^
 "https://www.epmgmt.checkpoint.com"^
 "https://dl3.checkpoint.com"^
 "https://gwevents.checkpoint.com"^
 "https://ftp-proxy.checkpoint.com"^
 "https://updates.checkpoint.com"^
 "https://sc1.checkpoint.com"^
 "https://www.iaas.checkpoint.com"^
 "https://cloudinfra-gw.portal.checkpoint.com"^
 "https://cws.checkpoint.com"^
 "https://secureupdates.checkpoint.com"^
 "https://s.sophosxl.net"^
 "https://us-east4-chkp-gcp-rnd-threat-hunt-box.cloudfunctions.net"^
 "https://datatube-prod.azurewebsites.net"^
 "https://www.datatube.checkpoint.com"^
 "https://europe-west1-datatube-240519.cloudfunctions.net"^
 "https://dtwesteuropeprod1.blob.core.windows.net"^
 "https://dtwesteuropeprod2.blob.core.windows.net"^
 "https://dtwesteuropeprod3.blob.core.windows.net"^
 "https://datatubeprodwesteurope.blob.core.windows.net"^
 "https://ci-gw.portal.checkpoint.com"^
 "https://rep.checkpoint.com"^
 "https://web-rep.checkpoint.com"^
 "https://microsoftedge.microsoft.com"^
 "https://edge.microsoft.com"^
 "https://www.google.com"^
 "https://clients2.googleusercontent.com"^
 "https://clients2.google.com"^
 "https://www.checkpoint.com"^
 "https://teadv.checkpoint.com"^
 "https://services.checkpoint.com"^
 "https://eu-west-1.allowed-ips.checkpoint.com"^
 "https://eu-west-2.allowed-ips.checkpoint.com"^
 "https://s3-fips-r-w.us-east-1.amazonaws.com"^
)

echo Controllo URL in corso... (Mostro solo gli errori 403 e 307)
echo ----------------------------------------------------

for %%u in %URLS% do (
    for /f "delims=" %%i in ('curl -x %PROXY% %%u -s -w "%%{http_code}" -o NUL') do (
        set CODE=%%i
        if "!CODE!"=="403" (
            echo [ALERT] 403 Forbidden: %%u
        )
	if "!CODE!"=="307" (
            echo [ALERT] 307 Proxy Block: %%u
        )
    )
)

echo ----------------------------------------------------
echo Scansione completata.
pause
