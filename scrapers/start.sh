#!/bin/bash

# run scraper
make

TOKEN=$(bash ./echo-token)

echo "TOKEN IS $TOKEN"

# step 1 - get s3 upload link
S1=curl --location --request POST 'https://api2.dropbase.io/v1/pipeline/generate_presigned_url' \
--data-raw '{
    "token": "$TOKEN"
}'

UPLOAD_URL=$(echo "$S1"|jq '.token')
JOB_ID=$(echo "$1"|jq '.job_id')

# step 2 - upload to url to run pipeline
curl --request PUT --upload-file out.json '$UPLOAD_URL'

# step 3 - get status
curl --location --request GET 'https://api2.dropbase.io/v1/pipeline/run_pipeline' \
--data-raw '{
    "job_id":"$JOB_ID"
}'












