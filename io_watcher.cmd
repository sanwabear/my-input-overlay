::[Bat To Exe Converter]
::
::YAwzoRdxOk+EWAnk
::fBw5plQjdG8=
::YAwzuBVtJxjWCl3EqQJgSA==
::ZR4luwNxJguZRRnk
::Yhs/ulQjdF+5
::cxAkpRVqdFKZSDk=
::cBs/ulQjdF+5
::ZR41oxFsdFKZSDk=
::eBoioBt6dFKZSDk=
::cRo6pxp7LAbNWATEpCI=
::egkzugNsPRvcWATEpCI=
::dAsiuh18IRvcCxnZtBJQ
::cRYluBh/LU+EWAnk
::YxY4rhs+aU+JeA==
::cxY6rQJ7JhzQF1fEqQJQ
::ZQ05rAF9IBncCkqN+0xwdVs0
::ZQ05rAF9IAHYFVzEqQJQ
::eg0/rx1wNQPfEVWB+kM9LVsJDGQ=
::fBEirQZwNQPfEVWB+kM9LVsJDGQ=
::cRolqwZ3JBvQF1fEqQJQ
::dhA7uBVwLU+EWDk=
::YQ03rBFzNR3SWATElA==
::dhAmsQZ3MwfNWATElA==
::ZQ0/vhVqMQ3MEVWAtB9wSA==
::Zg8zqx1/OA3MEVWAtB9wSA==
::dhA7pRFwIByZRRnk
::Zh4grVQjdCyDJE2L+04jFBJaXBGWcWSsA6cQ6fG2uqTX7BlQQ+sxfIDMyfmWdrQv+lfhZpM5xUZbmsgIMBJXQQWqegw8rHwMs3yAVw==
::YB416Ek+ZG8=
::
::
::978f952a14a936cc963da21a135fa983
@echo off
setlocal enabledelayedexpansion

cd /d %~dp0

:: iniファイルのパス
set CONFIG_FILE=io_watcher.ini

:: ファイル存在チェック
if not exist "%CONFIG_FILE%" (
    echo [ERROR] INIファイルが見つかりません: %CONFIG_FILE%
    echo このファイルを作成してください。
    pause
    exit /b 1
)

:: 各キーを取得
call :readini IO_CLIENT_DIR IO_CLIENT_DIR
call :readini PORT PORT
call :readini NAME NAME

:: 値のバリデーション
if not defined IO_CLIENT_DIR (
    echo [ERROR] IO_CLIENT_DIR の設定が空です。
    exit /b 1
)
if not exist "%IO_CLIENT_DIR%" (
    echo [ERROR] IO_CLIENT_DIR のパスが存在しません: %IO_CLIENT_DIR%
    exit /b 1
)

if not defined PORT (
    echo [ERROR] PORT の設定が空です。
    exit /b 1
)
echo %PORT%| findstr /r "^[0-9][0-9]*$" >nul
if errorlevel 1 (
    echo [ERROR] PORT の値が数値ではありません: %PORT%
    echo %PORT% | findstr /r "^[0-9][0-9]*$"
    exit /b 1
)

if not defined NAME (
    echo [ERROR] NAME の設定が空です。
    exit /b 1
)

:: 表示（デバッグ用）
echo IO_CLIENT_DIR = %IO_CLIENT_DIR%
echo PORT = %PORT%
echo NAME = %NAME%

cd /d %IO_CLIENT_DIR%

io_client -a ws://localhost:%PORT% -k -g -n %NAME%
timeout /T 5

exit /b 0

::-------------------------------
:: 関数定義部（本体の最後に配置）
::-------------------------------
:: キーの値をINIから取得する関数
:: usage: call :readini キー名 変数名
:readini
set "key=%~1"
set "retvar=%~2"
set "found="
for /f "usebackq tokens=1,* delims==" %%A in ("%CONFIG_FILE%") do (
    if /i "%%A"=="%key%" (
        set "%retvar%=%%B"
        set "found=1"
    )
)
if not defined found (
    echo [ERROR] %key% の設定が %CONFIG_FILE% に存在しません。
    exit /b 1
)
goto :eof
