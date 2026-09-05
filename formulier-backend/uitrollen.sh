#!/usr/bin/env bash
#
# Zet de code uit deze map bij Google en rolt hem uit naar de live webapp.
# Wordt automatisch aangeroepen door de pre-push hook; je kunt hem ook zelf
# draaien als je alleen de backend wilt bijwerken.
#
set -euo pipefail

CLASP="npx --yes @google/clasp@2.4.2"
HIER="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

if [ ! -f "$HIER/.clasp.json" ]; then
  echo "Nog niet gekoppeld. Voer eerst uit: ./formulier-backend/clasp-opzetten.sh" >&2
  exit 1
fi

echo "▸ Code naar Google sturen"
( cd "$HIER" && $CLASP push --force )

if [ -f "$HIER/.clasp-deployment" ]; then
  DEPLOY_ID="$(cat "$HIER/.clasp-deployment")"
  echo "▸ Uitrollen naar de bestaande webapp (adres blijft hetzelfde)"
  ( cd "$HIER" && $CLASP deploy -i "$DEPLOY_ID" -d "$(date '+%Y-%m-%d %H:%M') via git push" )
  echo "▸ Klaar. De wijziging is live."
else
  echo "▸ Code staat bij Google, maar er is geen implementatie ingesteld."
  echo "  Rol zelf uit: Implementeren → Implementaties beheren → Nieuwe versie."
fi
