#!/bin/sh
if [ -n "$JAVA_HOME" ] ; then
  SCRIPT_PATH=`dirname $0`
  chmod +x "${SCRIPT_PATH}/gradlew"
  version=$(java -version 2>&1 | awk -F '"' '/version/ {print $2}')
else
  echo "Error: JAVA_HOME is not set, please set it in your environment."
  exit 255
fi

EXPECTED_JAVA_MAJOR_VER=11

if [ -n "$version" ] ; then
  if [ "$version" \< "${EXPECTED_JAVA_MAJOR_VER}" ]; then
    echo "Wrong java version is set - "$version", Installer requires at least java ${EXPECTED_JAVA_MAJOR_VER}"
    exit 255
  fi
fi
export INSTALLER_WORKING_DIR="${SCRIPT_PATH}"

java -classpath "${SCRIPT_PATH}/libs/groovy-all-1.0-2.5.4.jar:${SCRIPT_PATH}/libs/installer-cli-19.05.0-RC17.jar:${SCRIPT_PATH}/libs/commons-lang-2.6.jar:${SCRIPT_PATH}/libs/commons-cli-1.4.jar:" de.hybris.installer.CmdHandler "$@"