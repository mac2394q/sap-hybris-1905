@echo off
SET INSTALLER_WORKING_DIR=%~dp0
SET EXPECTED_JAVA_MAJOR_VER=11

for /f tokens^=2-5^ delims^=.-_^" %%j in ('java -fullversion 2^>^&1') do set "jver=%%j%"

if %jver% LSS %EXPECTED_JAVA_MAJOR_VER% (
    echo "you are running unsupported version of java: %jver%. Required: %EXPECTED_JAVA_MAJOR_VER%"
) else (
    java -classpath ";%INSTALLER_WORKING_DIR:~0,-1%/libs/groovy-all-1.0-2.5.4.jar;%INSTALLER_WORKING_DIR:~0,-1%/libs/installer-cli-19.05.0-RC17.jar;%INSTALLER_WORKING_DIR:~0,-1%/libs/commons-lang-2.6.jar;%INSTALLER_WORKING_DIR:~0,-1%/libs/commons-cli-1.4.jar" de.hybris.installer.CmdHandler %*
)