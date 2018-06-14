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
    'functionblock : emptystatementblock FUNCTION lterm ASSIGNMENT VAR OPENBRACKET list CLOSEBRACKET EOL statementblock ENDFUNCTION emptystatementblock'
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
                 | assignment SEMICOLON
                 | function EOL'''
    p[0] = str(p[1]) + '\n'

def p_statement_resume(p):
    'statement : lterm ASSIGNMENT RESUME OPENBRACKET expression CLOSEBRACKET EOL'
    p[0] = p[1] + p[2] + p[3] + p[4] + p[5] + p[6] + p[7]

def p_statement_where(p):
    'statement : lterm ASSIGNMENT WHERE OPENBRACKET CLOSEBRACKET EOL'
    p[0] = p[1] + p[2] + p[3] + p[4] + p[5] + p[6]

def p_statement_forstatement_forstatementblock(p):
    'statement : forstatementblock END EOL'
    p[0] = p[1] + '}\n'

def p_statement_selectstatement_selectstatement_casestatementblock(p):
    'statement : selectstatement casestatementblock END EOL'
    p[0] = p[1] + p[2] + '}\n'

def p_statement_whilestatement_whilestatementblock(p):
    'statement : whilestatementblock END EOL'
    p[0] = p[1] + '}\n'

def p_statement_whilestatement_whilestatementblock_elsestatementblock(p):
    'statement : whilestatementblock elsestatementblock END EOL'
    p[0] = p[1] + p[2] + p[3] + '}\n'

def p_statement_ifstatement_ifstatementblock(p):
    'statement : ifstatementblock END EOL'
    p[0] = p[1] + '}\n'

def p_statement_ifstatement_ifstatementblock_elsestatementblock(p):
    'statement : ifstatementblock elsestatementblock END EOL'
    p[0] = p[1] + p[2] + '}\n'

def p_statement_ifstatement_ifstatementblock_elseifstatementblock(p):
    'statement : ifstatementblock elseifstatementblock END EOL'
    p[0] = p[1] + p[2] + '}\n'

def p_statement_ifstatement_ifstatementblock_elseifstatementblock_elsestatementblock(p):
    'statement : ifstatementblock elseifstatementblock elsestatementblock END EOL'
    p[0] = p[1] + p[2] + p[3] + '}\n'

def p_statement_break(p):
    'statement : BREAK EOL'
    p[0] = str(p[1]) + '\n'

def p_statement_eol(p):
    'statement : EOL'
    p[0] = ''

# end define statement

# define for, case, while, if, elseif, else statement block

def p_forstatementblock_forstatement(p):
    'forstatementblock : forstatement statementblock'
    p[0] = p[1] + p[2]

def p_casestatementblock_casestatementblock_casestatement(p):
    'casestatementblock : casestatementblock casestatement statementblock'
    p[0] = p[1] + p[2] + p[3]

def p_casestatementblock_casestatement(p):
    'casestatementblock : casestatement statementblock'
    p[0] = p[1] + p[2]

def p_whilestatementblock_whilestatement(p):
    'whilestatementblock : whilestatement statementblock'
    p[0] = p[1] + p[2]

def p_ifstatementblock_ifstatement(p):
    'ifstatementblock : ifstatement statementblock'
    p[0] = p[1] + p[2]

def p_elseifstatementblock_elseifstatementblock_elseifstatement(p):
    'elseifstatementblock : elseifstatementblock elseifstatement statementblock'
    p[0] = p[1] + p[2] + p[3]

def p_elseifstatementblock_elseifstatement(p):
    'elseifstatementblock : elseifstatement statementblock'
    p[0] = p[1] + p[2]

def p_elsestatementblock_elsestatement(p):
    'elsestatementblock : elsestatement statementblock'
    p[0] = p[1] + p[2]

# end define for, case, if, elseif, else statement block

# define for, select, case, while, if, elseif, else

def p_forstatement_for_start_step_end(p):
    '''forstatement : FOR VAR ASSIGNMENT expression COLON expression COLON expression EOL
                    | FOR VAR ASSIGNMENT expression COLON expression COLON expression DO EOL'''
    var = p[2]
    start = p[4]
    step = int(p[6])
    end = p[8]
    if step > 0:
        endop = '<='
        stepop = '+='
    else:
        endop = '>='
        stepop = '-='
    p[0] = p[1] + '(' + var + p[3] + start + ';' + var + endop + end + ';' + var + stepop + str(step) + ') {'

def p_forstatement_for_start_end(p):
    '''forstatement : FOR VAR ASSIGNMENT expression COLON expression EOL
                    | FOR VAR ASSIGNMENT expression COLON expression DO EOL'''
    var = p[2]
    start = p[4]
    step = 1
    end = p[6]
    endop = '<='
    stepop = '+='
    p[0] = p[1] + '(' + var + p[3] + start + ';' + var + endop + end + ';' + var + stepop + str(step) + ') {'

def p_forstatement_for_list(p):
    '''forstatement : FOR VAR ASSIGNMENT VAR EOL
                    | FOR VAR ASSIGNMENT VAR DO EOL'''
    var = p[2]
    p[0] = p[1] + '(' + var + ' in ' + p[4] + ') {'

def p_selectstatement_select(p):
    'selectstatement : SELECT expression emptystatementblock'
    p[0] = 'switch (' + p[2] + ') {\n'

def p_casestatement_case(p):
    '''casestatement : CASE expression THEN EOL
                       | CASE expression EOL
                       | CASE expression THEN COMMA'''
    p[0] = 'case ' + p[2] + ':\n'

def p_whilestatement_while_do(p):
    '''whilestatement : WHILE expression DO EOL
                      | WHILE expression THEN EOL
                      | WHILE expression EOL'''
    p[0] = 'while (' + p[2] + ') {\n'

def p_ifstatement_if_then(p):
    '''ifstatement : IF expression THEN EOL
                   | IF expression EOL'''
    p[0] = 'if (' + p[2] + ') {\n'

def p_elseifstatement_elseif_then(p):
    '''elseifstatement : ELSEIF expression THEN EOL'''
    p[0] = '} else if (' + p[2] + ') {\n'

def p_elsestatement_else(p):
    '''elsestatement : ELSE EOL'''
    p[0] = '} else {\n'

# end define for, select, case, while, if, elseif, else

# define assignment

def p_assignment_expression(p):
    'assignment : lterm ASSIGNMENT expression'
    p[0] = str(p[1]) + str(p[2]) + str(p[3])

# end define assignment

# define ltermarraylist

def p_ltermarraylist_ltermarraylist_semicolon_var(p):
    '''ltermarraylist : ltermarraylist SEMICOLON VAR
                      | ltermarraylist COMMA VAR'''
    p[0] = str(p[1]) + ',' + str(p[3])

def p_ltermarraylist_ltermarraylist_var(p):
    'ltermarraylist : ltermarraylist VAR'
    p[0] = str(p[1]) + ',' + str(p[2])

def p_ltermarraylist_var(p):
    'ltermarraylist : VAR'
    p[0] = str(p[1])

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
    '''expression : OPENSQBRACKET termarraylist CLOSESQBRACKET
                  | OPENSQBRACKET termarraylist SEMICOLON CLOSESQBRACKET
                  | OPENSQBRACKET termarraylist COMMA CLOSESQBRACKET'''
    p[0] = str(p[1]) + str(p[2]) + str(p[3])

def p_expression_sqbracket_addition_term_sqbracket(p):
    'expression : OPENSQBRACKET ADDITION term CLOSESQBRACKET'
    p[0] = str(p[1]) + str(p[2]) + str(p[3]) + str(p[4])

def p_expression_sqbracket_term_sqbracket(p):
    'expression : OPENSQBRACKET term CLOSESQBRACKET'
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
    'function : ltermvar OPENBRACKET expression CLOSEBRACKET'
    p[0] = str(p[1]) + str(p[2]) + str(p[3]) + str(p[4])

# A(2,3)
def p_function_function_parameters(p):
    'function : ltermvar OPENBRACKET list CLOSEBRACKET'
    p[0] = str(p[1]) + str(p[2]) + str(p[3]) + str(p[4])

# A()
def p_function_function(p):
    'function : ltermvar OPENBRACKET CLOSEBRACKET'
    p[0] = str(p[1]) + str(p[2]) + str(p[3])

# end define function

# define lterm

# A[1:3]
# B(2:$-1)
def p_lterm_slice(p):
    '''lterm : ltermvar OPENBRACKET expression COLON expression CLOSEBRACKET
             | ltermvar OPENSQBRACKET expression COLON expression CLOSESQBRACKET'''
    addtoarray(p[1])
    p[0] = str(p[1]) + '[' + str(p[3]) + str(p[4]) + str(p[5]) + ']'

def p_lterm_index(p):
    '''lterm : ltermvar OPENBRACKET expression CLOSEBRACKET
             | ltermvar OPENSQBRACKET expression CLOSESQBRACKET'''
    addtoarray(p[1])
    p[0] = str(p[1]) + '[' + str(p[3]) + ']'

# [A,B,C]
def p_lterm_ltermarraylist(p):
    'lterm : OPENSQBRACKET ltermarraylist CLOSESQBRACKET'
    p[0] = str(p[1]) + str(p[2]) + str(p[3])

def p_lterm_prevar(p):
    'lterm : PREVAR'
    p[0] = str(p[1])

def p_lterm_ltermvar(p):
    'lterm : ltermvar'
    p[0] = str(p[1])

def p_ltermvar_ltermvar_dot_var(p):
    'ltermvar : ltermvar DOT VAR'
    p[0] = str(p[1]) + str(p[2]) + str(p[3])

def p_ltermvar_var(p):
    'ltermvar : VAR'
    p[0] = str(p[1])

# end define lterm

# define term

# A[1:3]
# B(2:$-1)
def p_term_slice(p):
    '''term : termvar OPENBRACKET expression COLON expression CLOSEBRACKET
            | termvar OPENSQBRACKET expression COLON expression CLOSESQBRACKET'''
    p[0] = str(p[1]) + '[' + str(p[3]) + str(p[4]) + str(p[5]) + ']'

# A[:3]
# B(:$-1)
def p_term_left_slice(p):
    '''term : termvar OPENBRACKET COLON expression CLOSEBRACKET
            | termvar OPENSQBRACKET COLON expression CLOSESQBRACKET'''
    p[0] = str(p[1]) + '[' + str(p[3]) + str(p[4]) + ']'

# A[1:]
# B(2:)
def p_term_right_slice(p):
    '''term : termvar OPENBRACKET expression COLON CLOSEBRACKET
            | termvar OPENSQBRACKET expression COLON CLOSESQBRACKET'''
    p[0] = str(p[1]) + '[' + str(p[3]) + str(p[4]) + ']'

# A[:]
# B(:)
def p_term_full_slice(p):
    '''term : termvar OPENBRACKET COLON CLOSEBRACKET
            | termvar OPENSQBRACKET COLON CLOSESQBRACKET'''
    p[0] = str(p[1]) + '[' + str(p[3]) + ']'

# A[3]
# B($-2)
# C('function parameter')
def p_term_index(p):
    '''term : termvar OPENBRACKET expression CLOSEBRACKET
            | termvar OPENSQBRACKET expression CLOSESQBRACKET'''
    if isarray(p[1]):
        p[0] = str(p[1]) + '[' + str(p[3]) + ']'
    elif isfunction(p[1]):
        p[0] = str(p[1]) + '(' + str(p[3]) + ')'
    else:
        p[0] = str(p[1]) + str(p[2]) + str(p[3]) + str(p[4])

# A(2,3)
def p_term_part_parameters(p):
    'term : PART OPENBRACKET expression COMMA expression COLON expression CLOSEBRACKET'
    p[0] = p[1] + p[2] + p[3] + p[4] + p[5] + ',' + p[7] + p[8]

# A(2,3)
def p_term_function_parameters(p):
    '''term : termvar OPENBRACKET list CLOSEBRACKET
            | SCICOS_GETVALUE OPENBRACKET list CLOSEBRACKET'''
    p[0] = str(p[1]) + str(p[2]) + str(p[3]) + str(p[4])

# A()
def p_term_function(p):
    '''term : termvar OPENBRACKET CLOSEBRACKET
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

def p_term_termvar(p):
    'term : termvar'
    p[0] = str(p[1])

# A.B
def p_termvar_termvar_dot_var(p):
    'termvar : termvar DOT VAR'
    p[0] = str(p[1]) + str(p[2]) + str(p[3])

# A
def p_termvar_var(p):
    'termvar : VAR'
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
