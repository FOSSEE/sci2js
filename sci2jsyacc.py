#!/usr/bin/python3

import sys
import ply.yacc as yacc

from sci2jslex import tokens

start = 'statement'

def p_expression_operator(p):
    'expression : expression OPERATOR term'
    p[0] = str(p[1]) + str(p[2]) + str(p[3])

def p_expression_term(p):
    'expression : term'
    p[0] = str(p[1])

def p_term_number(p):
    'term : NUMBER'
    p[0] = str(p[1])

def p_term_var(p):
    'term : VAR'
    p[0] = str(p[1])

def p_term_prevar(p):
    'term : PREVAR'
    p[0] = str(p[1])

def p_term_lastindex(p):
    'term : LASTINDEX'
    p[0] = str(p[1])

def p_term_slice(p):
    '''term : VAR OPENBRACKET expression COLON expression CLOSEBRACKET
            | VAR OPENSQBRACKET expression COLON expression CLOSESQBRACKET'''
    p[0] = str(p[1]) + '[' + str(p[3]) + str(p[4]) + str(p[5]) + ']'

def p_term_index(p):
    '''term : VAR OPENBRACKET expression CLOSEBRACKET
            | VAR OPENSQBRACKET expression CLOSESQBRACKET'''
    p[0] = str(p[1]) + '[' + str(p[3]) + ']'

def p_lterm_var(p):
    'lterm : VAR '
    p[0] = str(p[1])

def p_lterm_slice(p):
    '''lterm : VAR OPENBRACKET expression COLON expression CLOSEBRACKET
            | VAR OPENSQBRACKET expression COLON expression CLOSESQBRACKET'''
    p[0] = str(p[1]) + '[' + str(p[3]) + str(p[4]) + str(p[5]) + ']'

def p_lterm_index(p):
    '''lterm : VAR OPENBRACKET expression CLOSEBRACKET
            | VAR OPENSQBRACKET expression CLOSESQBRACKET'''
    p[0] = str(p[1]) + '[' + str(p[3]) + ']'

def p_term_expression(p):
    'term : OPENBRACKET expression CLOSEBRACKET'
    p[0] = str(p[1])

def p_term_function(p):
    'term : VAR OPENBRACKET list CLOSEBRACKET'
    p[0] = str(p[1])

def p_list_list_expression(p):
    'list : list COMMA expression'
    p[0] = str(p[1]) + str(p[2]) + str(p[3])

def p_list_empty(p):
    'list : '
    p[0] = ''

def p_expression_term_transpose(p):
    'expression : term TRANSPOSE'
    p[0] = 'transpose(' + p[1] + ')'

def p_assignment_expression(p):
    'assignment : lterm ASSIGNMENT expression'
    p[0] = str(p[1]) + str(p[2]) + str(p[3])

def p_statement_assignment(p):
    'statement : assignment EOL'
    p[0] = str(p[1]) + str(p[2])

def p_error(p):
    print("Syntax error in input")

if __name__ == '__main__':
    parser = yacc.yacc()

    if len(sys.argv) <= 1:
        print("Usage: %s filename" % sys.argv[0])
        sys.exit(1)

    filename = sys.argv[1]
    data = ''
    with open(filename, 'r') as infile:
        for line in infile:
            data += line

        result = parser.parse(data)

        print(result)
