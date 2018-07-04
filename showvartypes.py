#!/usr/bin/python

from __future__ import print_function

import sys
import pickle

GLOBAL_VARS = {'x'}

VAR_TYPES = {}

def load_vars(picklefilename):
    global GLOBAL_VARS
    global VAR_TYPES

    with open(picklefilename, 'r') as cfile:
        GLOBAL_VARS = pickle.load(cfile)

        VAR_TYPES = pickle.load(cfile)

def processfile(picklefilename):
    load_vars(picklefilename)
    for var in sorted(VAR_TYPES):
        print(var, '=>', VAR_TYPES[var])

if __name__ == '__main__':
    if len(sys.argv) <= 1:
        print('Usage:', sys.argv[0], 'filename.pickle')
        sys.exit(1)

    processfile(sys.argv[1])
