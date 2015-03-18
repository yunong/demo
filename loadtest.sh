#!/bin/bash
ab -n 10000000000000 -c 10 'http://0.0.0.0:1337/hello?name=yunong'
