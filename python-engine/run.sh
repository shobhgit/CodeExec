#!/bin/bash

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

sudo docker run --rm \
  -v "$SCRIPT_DIR/submissions/test.py:/code/test.py:ro" \
  python-engine
