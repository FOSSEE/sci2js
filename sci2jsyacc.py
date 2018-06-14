#!/usr/bin/python

import sys
import ply.yacc as yacc

from sci2jslex import tokens

precedence = (
    ('left', 'LOGICAL'),
    ('left', 'COMPARISON'),
    ('left', 'ADDITION'),
    ('left', 'MULTIPLICATION'),
    ('right', 'NOT'),
    ('right', 'UNARYADDITION'),
)

start = 'functionblock'

# define functionblock

def p_functionblock_function_statementblock_endfunction(p):
    'functionblock : emptystatementblock FUNCTION lterm ASSIGNMENT VAR OPENBRACKET list CLOSEBRACKET EOL statementblock ENDFUNCTION EOL'
    p[0] = str(p[5])

# end define functionblock

# define statementblock

def p_statementblock_statementblock_statement(p):
    'statementblock : statementblock statement'
    p[0] = str(p[1]) + str(p[2])

def p_statementblock_statement(p):
    'statementblock : statement'
    p[0] = str(p[1])

def p_emptystatementblock_eol(p):
    '''emptystatementblock : emptystatementblock EOL
                           | EOL'''
    p[0] = str(p[1])

# end define statementblock

# define statement

def p_statement_assignment(p):
    '''statement : assignment EOL
                 | assignment SEMICOLON EOL
                 | function EOL'''
    p[0] = str(p[1]) + '\n'

def p_statement_while_do(p):
    '''statement : WHILE expression DO EOL statementblock END EOL
                 | WHILE expression THEN EOL statementblock END EOL'''
    p[0] = 'while (' + p[2] + ') {\n' + p[5] + '}\n'

def p_statement_while(p):
    'statement : WHILE expression EOL statementblock END EOL'
    p[0] = 'while (' + p[2] + ') {\n' + p[4] + '}\n'

def p_statement_if(p):
    'statement : IF expression THEN EOL statementblock END EOL'
    p[0] = 'if (' + p[2] + ') {\n' + p[5] + '}\n'

def p_statement_break(p):
    'statement : BREAK EOL'
    p[0] = str(p[1]) + '\n'

def p_statement_eol(p):
    'statement : EOL'
    p[0] = ''

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

def p_termarraylist_termarraylist_term(p):
    '''termarraylist : termarraylist term
                     | term term'''
    p[0] = str(p[1]) + ',' + str(p[2])

def p_termarraylist_addition_term_term(p):
    'termarraylist : ADDITION term term'
    p[0] = str(p[1]) + str(p[2]) + ',' + str(p[3])

# end define termarraylist

# define list

def p_list_list_expression(p):
    '''list : list COMMA expression
            | expression COMMA expression'''
    p[0] = str(p[1]) + str(p[2]) + str(p[3])

# end define list

# define expression

# (2+3)
def p_expression_expression(p):
    'expression : OPENBRACKET expression CLOSEBRACKET'
    p[0] = str(p[1]) + str(p[2]) + str(p[3])

# [2 3 4]
# [2,3,4]
# [2+1;3-1;4-1]
def p_expression_termarraylist(p):
    'expression : OPENSQBRACKET termarraylist CLOSESQBRACKET'
    p[0] = str(p[1]) + str(p[2]) + str(p[3])

# []
def p_expression_empty(p):
    'expression : OPENSQBRACKET CLOSESQBRACKET'
    p[0] = str(p[1]) + str(p[2])

def p_expression_term_transpose(p):
    'expression : term TRANSPOSE'
    p[0] = 'transpose(' + str(p[1]) + ')'

def p_expression_expression_multiplication_expression(p):
    'expression : expression MULTIPLICATION expression'
    p[0] = str(p[1]) + str(p[2]) + str(p[3])

def p_expression_expression_addition_expression(p):
    'expression : expression ADDITION expression'
    p[0] = str(p[1]) + str(p[2]) + str(p[3])

def p_expression_expression_comparison_expression(p):
    'expression : expression COMPARISON expression'
    o = p[2]
    if (o == '<>' or o == '~='):
        o = '!='
    p[0] = str(p[1]) + o + str(p[3])

def p_expression_expression_logical_expression(p):
    'expression : expression LOGICAL expression'
    o = p[2]
    if (o == '&'):
        o = '&&'
    elif (o == '|'):
        o = '||'
    p[0] = str(p[1]) + o + str(p[3])

def p_expression_addition_term(p):
    'expression : ADDITION term %prec UNARYADDITION'
    p[0] = str(p[1]) + str(p[2])

def p_expression_not_expression(p):
    'expression : NOT expression'
    p[0] = '!' + str(p[2])

def p_expression_term(p):
    'expression : term'
    p[0] = str(p[1])

# end define expression

# define function

# C('function parameter')
def p_function_function_parameter(p):
    'function : VAR OPENBRACKET expression CLOSEBRACKET'
    p[0] = str(p[1]) + str(p[2]) + str(p[3]) + str(p[4])

# A(2,3)
def p_function_function_parameters(p):
    'function : VAR OPENBRACKET list CLOSEBRACKET'
    p[0] = str(p[1]) + str(p[2]) + str(p[3]) + str(p[4])

# A()
def p_function_function(p):
    'function : VAR OPENBRACKET CLOSEBRACKET'
    p[0] = str(p[1]) + str(p[2]) + str(p[3])

# end define function

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
# C('function parameter')
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
    '''term : VAR OPENBRACKET CLOSEBRACKET
            | SCICOS_MODEL OPENBRACKET CLOSEBRACKET'''
    p[0] = str(p[1]) + str(p[2]) + str(p[3])

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
    if len(sys.argv) <= 1:
        print("Usage: %s filename" % sys.argv[0])
        sys.exit(1)

    filename = sys.argv[1]

    data = ''
    with open(filename, 'r') as infile:
        for line in infile:
            data += line

        parser = yacc.yacc()
        result = parser.parse(data)

        print(result)
