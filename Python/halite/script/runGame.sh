#!/bin/bash

if hash python3 2>/dev/null; then
    ./halite -d "10 10" "python3 MyBot2.py" "python3 MyMLBot.py"
#    ./halite -d "30 30" "python3 MyBot2.py" "python3 MyBot2.py"
else
    ./halite -d "30 30" "python MyBot2.py" "python MyMLBot.py"
fi
