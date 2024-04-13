cd /d C:\tools\input-overlay-5.0.4-windows-x64\io_client

:loop
io_client -a ws://localhost:16899 -k -g -n gaming_pc
timeout /T 5
goto loop
pause