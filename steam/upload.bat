@echo off
REM 用法：upload.bat <你的Steamworks账号>
REM 上传前请先完成 app_build.vdf / depot_build_*.vdf 的 AppID 与 DepotID 填写

set STEAMCMD=C:\steamcmd\steamcmd.exe
set APP_BUILD=%~dp0app_build.vdf
set LOGIN=%1

if "%LOGIN%"=="" (
  echo 用法: upload.bat ^<Steamworks账号^>
  exit /b 1
)

if not exist "%STEAMCMD%" (
  echo 找不到 steamcmd: %STEAMCMD%
  echo 请修改本脚本里的 STEAMCMD 路径
  exit /b 1
)

"%STEAMCMD%" +login %LOGIN% +run_app_build "%APP_BUILD%" +quit
