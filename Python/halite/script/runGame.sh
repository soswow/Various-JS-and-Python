#!/bin/bash

if hash python3 2>/dev/null; then
    ./halite-mac -d "30 30" "python3 MyBot2.py" "python3 MyBot3.py"
else
    ./halite-mac -d "30 30" "python MyBot2.py" "python MyMLBot.py"
fi
