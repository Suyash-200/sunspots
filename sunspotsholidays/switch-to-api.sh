#!/bin/bash
# Script to switch data source to API

echo "Switching data source to LIVE API..."

# Set config to use API (false = use API)
drush config:set sunspotsholidays.settings use_mock_data false

# Clear cache
drush cr

echo "✅ Configuration updated!"
echo "Data source is now set to: LIVE API"
echo ""
echo "To verify, check the browser console for:"
echo "  [Data Source] Using DYNAMIC API"
echo ""
echo "Or check the page source for:"
echo "  data-use-mock=\"false\""

