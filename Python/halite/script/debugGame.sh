#!/bin/bash

trap "killall python3; exit" SIGHUP SIGINT SIGTERM
./halite-mac -t -d "30 30" "python3 MyBot2.py" "python3 pipe_socket_translator.py 2000"
