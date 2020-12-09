
hybris Changes
=============================

This is a modified version of Solr.

The following directories were removed:
- docs
- example

The following files/directories were added:
- HYBRIS_README.txt
- contrib/hybris
- server/solr/security.json.example
- server/solr/solr.jks

The following files/directories were modified/replaced:
- bin/solr.cmd:
	- workaround for https://issues.apache.org/jira/browse/SOLR-7283 (lines 19-20)
- bin/solr.in.cmd:
	- authentication and ssl configuration example (lines 159-172)
	- workaround for JDK 11.0.2 and TLS 1.3 issue - https://bugs.openjdk.java.net/browse/JDK-8212885 (line 174)
- bin/solr.in.sh:
	- authentication and ssl configuration example (lines 187-200)
	- workaround for JDK 11.0.2 and TLS 1.3 issue - https://bugs.openjdk.java.net/browse/JDK-8212885 (line 202)
- server/solr/solr.xml
- server/solr/configsets
- jackson-databind related files (due to CVE-2018-14721, CVE-2018-14718, CVE-2018-14719, CVE-2018-14720 and CVE-2018-19362)
	- licenses/jackson-databind-2.9.6.jar.sha1 -> licenses/jackson-databind-2.9.8.jar.sha1
	- server/solr-webapp/webapp/WEB-INF/lib/jackson-databind-2.9.6.jar -> server/solr-webapp/webapp/WEB-INF/lib/jackson-databind-2.9.8.jar
	- contrib/clustering/lib/jackson-databind-2.9.6.jar -> contrib/clustering/lib/jackson-databind-2.9.8.jar
	- contrib/prometheus-exporter/lib/jackson-databind-2.9.6.jar -> contrib/prometheus-exporter/lib/jackson-databind-2.9.6.jar
