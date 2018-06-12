#!/usr/bin/python3

import sys
import ply.yacc as yacc

from sci2jslex import tokens

start = 'statementblock'

# define statementblock

def p_statementblock_statementblock_statement(p):
    'statementblock : statementblock statement'
    p[0] = str(p[1]) + str(p[2])

def p_statementblock_statement(p):
    'statementblock : statement'
    p[0] = str(p[1])

# end define statementblock

# define statement

def p_statement_assignment(p):
    '''statement : assignment EOL
                 | assignment SEMICOLON EOL'''
    p[0] = str(p[1]) + '\n'

def p_statement_eol(p):
    'statement : EOL'
    pass

# end define statement

# define assignment

def p_assignment_expression(p):
    'assignment : lterm ASSIGNMENT expression'
    p[0] = str(p[1]) + str(p[2]) + str(p[3])

# end define assignment

# define ltermarraylist

def p_ltermarraylist_ltermarraylist_semicolon_var(p):
    '''ltermarraylist : ltermarraylist SEMICOLON VAR
                     | ltermarraylist COMMA VAR
                     | VAR SEMICOLON VAR
                     | VAR COMMA VAR'''
    p[0] = str(p[1]) + ',' + str(p[3])

def p_ltermarraylist_ltermarraylist_var(p):
    '''ltermarraylist : ltermarraylist VAR
                      | VAR VAR'''
    p[0] = str(p[1]) + ',' + str(p[2])

# end define ltermarraylist

# define termarraylist

def p_termarraylist_termarraylist_semicolon_expression(p):
    '''termarraylist : termarraylist SEMICOLON expression
                     | termarraylist COMMA expression
                     | expression SEMICOLON expression
                     | expression COMMA expression'''
    p[0] = str(p[1]) + ',' + str(p[3])

def p_termarraylist_termarraylist_expression(p):
    '''termarraylist : termarraylist expression
                     | expression expression'''
    p[0] = str(p[1]) + ',' + str(p[2])

# end define termarraylist

# define list

def p_list_list_expression(p):
    '''list : list COMMA expression
            | expression COMMA expression'''
    p[0] = str(p[1]) + str(p[2]) + str(p[3])

# end define list

# define expression

def p_expression_term_transpose(p):
    'expression : term TRANSPOSE'
    p[0] = 'transpose(' + str(p[1]) + ')'

def p_expression_operator_term(p):
    'expression : expression OPERATOR term'
    p[0] = str(p[1]) + str(p[2]) + str(p[3])

def p_expression_term(p):
    'expression : term'
    p[0] = str(p[1])

# end define expression

# define lterm

# A[1:3]
# B(2:$-1)
def p_lterm_slice(p):
    '''lterm : VAR OPENBRACKET expression COLON expression CLOSEBRACKET
            | VAR OPENSQBRACKET expression COLON expression CLOSESQBRACKET'''
    addtoarray(p[1])
    p[0] = str(p[1]) + '[' + str(p[3]) + str(p[4]) + str(p[5]) + ']'

def p_lterm_index(p):
    '''lterm : VAR OPENBRACKET expression CLOSEBRACKET
            | VAR OPENSQBRACKET expression CLOSESQBRACKET'''
    addtoarray(p[1])
    p[0] = str(p[1]) + '[' + str(p[3]) + ']'

# [A,B,C]
def p_lterm_ltermarraylist(p):
    'lterm : OPENSQBRACKET ltermarraylist CLOSESQBRACKET'
    p[0] = str(p[1]) + str(p[2]) + str(p[3])

def p_lterm_prevar(p):
    'lterm : PREVAR'
    p[0] = str(p[1])

def p_lterm_var_dot_var(p):
    'lterm : VAR DOT VAR'
    p[0] = str(p[1]) + str(p[2]) + str(p[3])

def p_lterm_var(p):
    'lterm : VAR'
    p[0] = str(p[1])

# end define lterm

# define term

# A[1:3]
# B(2:$-1)
def p_term_slice(p):
    '''term : VAR OPENBRACKET expression COLON expression CLOSEBRACKET
            | VAR OPENSQBRACKET expression COLON expression CLOSESQBRACKET'''
    p[0] = str(p[1]) + '[' + str(p[3]) + str(p[4]) + str(p[5]) + ']'

# A[:3]
# B(:$-1)
def p_term_left_slice(p):
    '''term : VAR OPENBRACKET COLON expression CLOSEBRACKET
            | VAR OPENSQBRACKET COLON expression CLOSESQBRACKET'''
    p[0] = str(p[1]) + '[' + str(p[3]) + str(p[4]) + ']'

# A[1:]
# B(2:)
def p_term_right_slice(p):
    '''term : VAR OPENBRACKET expression COLON CLOSEBRACKET
            | VAR OPENSQBRACKET expression COLON CLOSESQBRACKET'''
    p[0] = str(p[1]) + '[' + str(p[3]) + str(p[4]) + ']'

# A[:]
# B(:)
def p_term_full_slice(p):
    '''term : VAR OPENBRACKET COLON CLOSEBRACKET
            | VAR OPENSQBRACKET COLON CLOSESQBRACKET'''
    p[0] = str(p[1]) + '[' + str(p[3]) + ']'

# A[3]
# B($-2)
def p_term_index(p):
    '''term : VAR OPENBRACKET expression CLOSEBRACKET
            | VAR OPENSQBRACKET expression CLOSESQBRACKET'''
    if isarray(p[1]):
        p[0] = str(p[1]) + '[' + str(p[3]) + ']'
    elif isfunction(p[1]):
        p[0] = str(p[1]) + '(' + str(p[3]) + ')'
    else:
        p[0] = str(p[1]) + str(p[2]) + str(p[3]) + str(p[4])

# A(2,3)
def p_term_function_parameters(p):
    '''term : VAR OPENBRACKET list CLOSEBRACKET
            | SCICOS_GETVALUE OPENBRACKET list CLOSEBRACKET'''
    p[0] = str(p[1]) + str(p[2]) + str(p[3]) + str(p[4])

# A()
def p_term_function(p):
    '''term : VAR OPENBRACKET CLOSEBRACKET'''
    p[0] = str(p[1]) + str(p[2]) + str(p[3])

# (2+3)
def p_term_expression(p):
    'term : OPENBRACKET expression CLOSEBRACKET'
    p[0] = str(p[1]) + str(p[2]) + str(p[3])

# [2 3 4]
# [2,3,4]
# [2;3;4]
def p_term_termarraylist(p):
    'term : OPENSQBRACKET termarraylist CLOSESQBRACKET'
    p[0] = str(p[1]) + str(p[2]) + str(p[3])

# []
def p_term_termarraylist_empty(p):
    'term : OPENSQBRACKET CLOSESQBRACKET'
    p[0] = str(p[1]) + str(p[2])

# $
def p_term_lastindex(p):
    'term : LASTINDEX'
    p[0] = str(p[1])

# %f
def p_term_prevar(p):
    '''term : PREVAR
            | PREVAR_BOOLEAN
            | PREVAR_COMPLEX
            | PREVAR_FLOAT'''
    p[0] = str(p[1])

# A.B
def p_term_var_dot_var(p):
    'term : VAR DOT VAR'
    p[0] = str(p[1]) + str(p[2]) + str(p[3])

# A
def p_term_var(p):
    'term : VAR'
    p[0] = str(p[1])

# 3.4
# 'abc'
# "abc"
def p_term_constant(p):
    '''term : NUMBER
          | QSTRING
          | DQSTRING'''
    p[0] = str(p[1])

# end define term

def p_error(p):
    print("Syntax error in input", p)

arraylist = set()

def addtoarray(s):
    global arraylist
    arraylist.add(s)

def isarray(s):
    global arraylist
    return s in arraylist

def isfunction(s):
    return False

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
