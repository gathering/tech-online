#!/usr/bin/env bash
echo "Getting raw TG file list from FTP, writing results to ./ftp-files"

export LC_ALL=C.UTF-8
lftp -c "open http://ftp.gathering.org/TG/ && find -l && exit" >> ftp-files

echo "Converting relevant images paths to ftp urls, writing results to ./ftp-image-urls"

cat ftp-files | \
  # All MSPaint files
  grep -o '\.\/.*MSPaint.*' | \
  grep -v 'WIP' | \
  # Only allow certain filetypes
  grep '\(png\|jpg\|jpeg\)$' | \
  # Append the full url, and output
  sed -e 's/\.\//http\:\/\/ftp\.gathering\.org\/TG\//' > ftp-image-urls


echo "Running JS script to convert ftp urls into proper image objects, writing rsults to ./images.json"

./convertFTPImageUrlsToJson.mjs
