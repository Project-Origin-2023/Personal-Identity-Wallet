
.\buildIssuerApp.bat
.\buildVerifierApp.bat
.\buildPoc_waltid_presentation.bat

docker compose down
docker compose up -d #avvia i container necessari
timeout 60
.\restoreDbIssuerApp.sh
