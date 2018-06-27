#!/usr/bin/python

"""
Convert a .sci file to a .js file for use with xcos_on_cloud.

Usage: ./sci2jsyacc.py filename.sci filename.pickle pass-number > filename.js

Example: ./sci2jsyacc.py macros/Sinks/CSCOPE.sci js/Sinks/CSCOPE.pickle 2 > js/Sinks/CSCOPE.js
"""

from __future__ import print_function

import re
import sys
import pickle
import ply.yacc as yacc

from sci2jslex import tokens, JOBTYPES

precedence = (
    ('left', 'COLON'),
    ('left', 'LOGICAL'),
    ('nonassoc', 'COMPARISON'),
    ('left', 'ADDITION'),
    ('left', 'MULTIPLICATION'),
    ('right', 'NOT'),
    ('right', 'UNARYADDITION'),
    ('right', 'TRANSPOSE'),
    ('left', 'DOT'),
)

start = 'functionblocks'

JOB_BLOCKS = {}

FUNCTION_VARS = set()
LOCAL_VARS = set()
GLOBAL_VARS = {'x'}

INDENT_LEVEL = 2
INDENT_SIZE = 4

# define functionblocks

def p_functionblocks_functionblocks_functionblock(p):
    'functionblocks : functionblocks functionblock'
    p[0] = '%s%s' % (p[1], p[2])

def p_functionblocks_jobfunctionblock(p):
    'functionblocks : EOL jobfunctionblock'
    p[0] = '%s' % (p[2])

# end functionblocks

# define functionblock

def p_jobfunctionblock_jobfunctionstatement_statementblock_endfunction(p):
    'jobfunctionblock : jobfunctionstatement statementblock ENDFUNCTION EOL'
    global INDENT_LEVEL
    fname = '%s' % (p[1])
    indent = '%*s' % (INDENT_LEVEL * INDENT_SIZE, ' ')
    INDENT_LEVEL += 1
    blocktype = getblocktype(fname)

    jdefine = JOB_BLOCKS['"define"']
    jget = JOB_BLOCKS['"get"']
    jgetinputs = JOB_BLOCKS['"getinputs"']
    jgetorigin = JOB_BLOCKS['"getorigin"']
    jgetoutputs = JOB_BLOCKS['"getoutputs"']
    jplot = JOB_BLOCKS['"plot"']
    jset = JOB_BLOCKS['"set"']

    jdefine = '%s%s.prototype.define = function %s() {\n%s%*sreturn new %s(this.x);\n%s}\n' % (indent, fname, fname, jdefine, INDENT_LEVEL * INDENT_SIZE, ' ', blocktype, indent)
    jdetails = '%s%s.prototype.details = function %s() {\n%*sreturn this.x;\n%s}\n' % (indent, fname, fname, INDENT_LEVEL * INDENT_SIZE, ' ', indent)
    jget = '%s%s.prototype.get = function %s() {\n%s%s}\n' % (indent, fname, fname, jget, indent)
    if jgetinputs != '':
        jgetinputs = '%s%s.prototype.getinputs = function %s() {\n%s%s}\n' % (indent, fname, fname, jgetinputs, indent)
    if jgetorigin != '':
        jgetorigin = '%s%s.prototype.getorigin = function %s() {\n%s%s}\n' % (indent, fname, fname, jgetorigin, indent)
    if jgetoutputs != '':
        jgetoutputs = '%s%s.prototype.getoutputs = function %s() {\n%s%s}\n' % (indent, fname, fname, jgetoutputs, indent)
    if jplot != '':
        jplot = '%s%s.prototype.plot = function %s() {\n%s%s}\n' % (indent, fname, fname, jplot, indent)
    jset = '%s%s.prototype.set = function %s() {\n%s%*sreturn new %s(this.x);\n%s}\n' % (indent, fname, fname, jset, INDENT_LEVEL * INDENT_SIZE, ' ', blocktype, indent)

    INDENT_LEVEL -= 1
    p[0] = 'function %s() {\n%s%s%s%s%s%s%s%s}' % (fname, jdefine, jdetails, jget, jset, jgetinputs, jgetorigin, jgetoutputs, jplot)

def p_functionblock_functionstatement_statementblock_endfunction(p):
    'functionblock : functionstatement statementblock ENDFUNCTION EOL'
    p[0] = ''

def p_jobfunctionstatement_function(p):
    '''jobfunctionstatement : FUNCTION lterm ASSIGNMENT VAR OPENBRACKET JOB COMMA VAR COMMA VAR CLOSEBRACKET EOL
                            | FUNCTION lterm ASSIGNMENT FUNCTIONNAME OPENBRACKET JOB COMMA VAR COMMA VAR CLOSEBRACKET EOL'''
    for var in (p[6], p[8], p[10]):
        FUNCTION_VARS.add(var)
    p[0] = '%s' % (p[4])

def p_functionstatement_function(p):
    '''functionstatement : FUNCTION lterm ASSIGNMENT VAR OPENBRACKET list CLOSEBRACKET EOL
                         | FUNCTION lterm ASSIGNMENT FUNCTIONNAME OPENBRACKET list CLOSEBRACKET EOL'''
    p[0] = ''

# end define functionblock

# define statementblock

def p_statementblock_statementblock_statement(p):
    'statementblock : statementblock statement'
    p[0] = '%s%s' % (p[1], p[2])

def p_statementblock_statement(p):
    'statementblock : statement'
    p[0] = '%s' % (p[1])

# end define statementblock

# define statement

def p_statement_assignment(p):
    '''statement : assignment EOL
                 | getvalueassignment EOL
                 | function EOL'''
    p[0] = '%s;\n' % (p[1])

def p_statement_functionblock(p):
    'statement : functionblock'
    p[0] = ''

def p_statement_resume(p):
    'statement : lterm ASSIGNMENT RESUME OPENBRACKET expression CLOSEBRACKET EOL'
    p[0] = '%*s%s = %s(%s)\n' % (INDENT_LEVEL * INDENT_SIZE, ' ', p[1], p[3], p[5])

def p_statement_where(p):
    'statement : lterm ASSIGNMENT WHERE OPENBRACKET CLOSEBRACKET EOL'
    p[0] = '%*s%s%s%s()\n' % (INDENT_LEVEL * INDENT_SIZE, ' ', p[1], p[2], p[3])

def p_statement_forstatement_forstatementblock(p):
    'statement : forstatementblock endstatementblock'
    p[0] = '%s%s' % (p[1], p[2])

def p_statement_selectstatement_casestatementblock(p):
    'statement : selectstatement casestatementblock endstatementblock'
    p[0] = '%s%s%s' % (p[1], p[2], p[3])

def p_statement_selectjobstatement_casejobstatementblock(p):
    'statement : selectjobstatement casejobstatementblock endstatementblock'
    p[0] = ''

def p_statement_whilestatement_whilestatementblock(p):
    'statement : whilestatementblock endstatementblock'
    p[0] = '%s%s' % (p[1], p[2])

def p_statement_whilestatement_whilestatementblock_elsestatementblock(p):
    'statement : whilestatementblock elsestatementblock endstatementblock'
    p[0] = '%s%s%s%s' % (p[1], p[2], p[3], p[4])

def p_statement_ifstatement_ifstatementblock(p):
    'statement : ifstatementblock endstatementblock'
    p[0] = '%s%s' % (p[1], p[2])

def p_statement_ifstatement_ifstatementblock_elsestatementblock(p):
    'statement : ifstatementblock elsestatementblock endstatementblock'
    p[0] = '%s%s%s' % (p[1], p[2], p[3])

def p_statement_ifstatement_ifstatementblock_elseifstatementblock(p):
    'statement : ifstatementblock elseifstatementblock endstatementblock'
    p[0] = '%s%s%s' % (p[1], p[2], p[3])

def p_statement_ifstatement_ifstatementblock_elseifstatementblock_elsestatementblock(p):
    'statement : ifstatementblock elseifstatementblock elsestatementblock endstatementblock'
    p[0] = '%s%s%s%s' % (p[1], p[2], p[3], p[4])

def p_statement_trystatement_try_statementblock_catch_statementblock_end(p):
    'statement : trystatement statementblock catchstatement statementblock endstatementblock'
    p[0] = '%s%s%s%s%s' % (p[1], p[2], p[3], p[4], p[5])

def p_statement_break(p):
    '''statement : BREAK EOL
                 | RETURN EOL'''
    p[0] = '%*s%s;\n' % (INDENT_LEVEL * INDENT_SIZE, ' ', p[1])

def p_statement_eol(p):
    'statement : EOL'
    p[0] = '\n'

def p_statement_clearvar(p):
    'statement : clearvar EOL'
    p[0] = '%s' % (p[1])

# end define statement

# define for, case, while, if, elseif, else statement block

def p_endstatementblock_endstatement(p):
    'endstatementblock : END EOL'
    global INDENT_LEVEL
    INDENT_LEVEL -= 1
    p[0] = '%*s}\n' % (INDENT_LEVEL * INDENT_SIZE, ' ')

def p_forstatementblock_forstatement(p):
    'forstatementblock : forstatement statementblock'
    p[0] = '%s%s' % (p[1], p[2])

def p_casestatementblock_casestatementblock_casestatement_statementblock(p):
    'casestatementblock : casestatementblock casestatement statementblock'
    p[0] = '%s%s%s' % (p[1], p[2], p[3])

def p_casestatementblock_casestatementblock_casestatement(p):
    'casestatementblock : casestatementblock casestatement'
    p[0] = '%s%s%s' % (p[1], p[2], '')

def p_casestatementblock_casestatement_statementblock(p):
    'casestatementblock : casestatement statementblock'
    p[0] = '%s%s' % (p[1], p[2])

def p_casejobstatementblock_casejobstatementblock_casejobstatement_statementblock(p):
    'casejobstatementblock : casejobstatementblock casejobstatement statementblock'
    JOB_BLOCKS[p[2]] = p[3]
    p[0] = ''

def p_casejobstatementblock_casejobstatementblock_casejobstatement(p):
    'casejobstatementblock : casejobstatementblock casejobstatement'
    JOB_BLOCKS[p[2]] = ''
    p[0] = ''

def p_casejobstatementblock_casejobstatement_statementblock(p):
    'casejobstatementblock : casejobstatement statementblock'
    JOB_BLOCKS[p[1]] = p[2]
    p[0] = ''

def p_whilestatementblock_whilestatement(p):
    'whilestatementblock : whilestatement statementblock'
    p[0] = '%s%s' % (p[1], p[2])

def p_ifstatementblock_ifstatement(p):
    'ifstatementblock : ifstatement statementblock'
    p[0] = '%s%s' % (p[1], p[2])

def p_elseifstatementblock_elseifstatementblock_elseifstatement(p):
    'elseifstatementblock : elseifstatementblock elseifstatement statementblock'
    p[0] = '%s%s%s' % (p[1], p[2], p[3])

def p_elseifstatementblock_elseifstatement(p):
    'elseifstatementblock : elseifstatement statementblock'
    p[0] = '%s%s' % (p[1], p[2])

def p_elsestatementblock_elsestatement(p):
    'elsestatementblock : elsestatement statementblock'
    p[0] = '%s%s' % (p[1], p[2])

def p_clearvar_clear_var(p):
    'clearvar : CLEAR VAR'
    p[0] = '%*s%s={};\n' % (INDENT_LEVEL * INDENT_SIZE, ' ', p[2])

def p_clearvar_clearvar_var(p):
    'clearvar : clearvar VAR'
    p[0] = '%s%*s%s={};\n' % (p[1], INDENT_LEVEL * INDENT_SIZE, ' ', p[2])

# end define for, case, if, elseif, else statement block

# define for, select, case, while, if, elseif, else

def p_trystatement_try(p):
    'trystatement : TRY EOL'
    global INDENT_LEVEL
    p[0] = '%*stry {\n' % (INDENT_LEVEL * INDENT_SIZE, ' ')
    INDENT_LEVEL += 1

def p_catchstatement_catch(p):
    'catchstatement : CATCH EOL'
    global INDENT_LEVEL
    INDENT_LEVEL -= 1
    p[0] = '%*s} catch (Exception e) {\n' % (INDENT_LEVEL * INDENT_SIZE, ' ')
    INDENT_LEVEL += 1

def p_forstatement_for_start_step_end(p):
    '''forstatement : FOR VAR ASSIGNMENT expression COLON expression COLON expression EOL
                    | FOR VAR ASSIGNMENT expression COLON expression COLON expression DO EOL'''
    global INDENT_LEVEL
    var = p[2]
    lstart = p[4]
    lstep = int(p[6])
    lend = p[8]
    if lstep > 0:
        endop = '<='
        stepop = '+='
    else:
        endop = '>='
        stepop = '-='
    if var not in GLOBAL_VARS:
        if var not in LOCAL_VARS:
            LOCAL_VARS.add(var)
    p[0] = '%*sfor (%s=%s;%s%s%s;%s%s%s) {\n' % (INDENT_LEVEL * INDENT_SIZE, ' ', var, lstart, var, endop, lend, var, stepop, lstep)
    INDENT_LEVEL += 1

def p_forstatement_for_start_end(p):
    '''forstatement : FOR VAR ASSIGNMENT expression COLON expression EOL
                    | FOR VAR ASSIGNMENT expression COLON expression DO EOL'''
    global INDENT_LEVEL
    var = p[2]
    lstart = p[4]
    lstep = 1
    lend = p[6]
    endop = '<='
    stepop = '+='
    if var not in GLOBAL_VARS:
        if var not in LOCAL_VARS:
            LOCAL_VARS.add(var)
    p[0] = '%*sfor (%s=%s;%s%s%s;%s%s%s) {\n' % (INDENT_LEVEL * INDENT_SIZE, ' ', var, lstart, var, endop, lend, var, stepop, lstep)
    INDENT_LEVEL += 1

def p_forstatement_for_list(p):
    '''forstatement : FOR VAR ASSIGNMENT VAR EOL
                    | FOR VAR ASSIGNMENT VAR DO EOL'''
    global INDENT_LEVEL
    var = p[2]
    if var not in GLOBAL_VARS:
        if var not in LOCAL_VARS:
            LOCAL_VARS.add(var)
    p[0] = '%*sfor (%s in %s) {\n' % (INDENT_LEVEL * INDENT_SIZE, ' ', var, p[4])
    INDENT_LEVEL += 1

def p_selectstatement_select(p):
    'selectstatement : SELECT expression EOL'
    global INDENT_LEVEL
    p[0] = '%*sswitch (%s) {\n' % (INDENT_LEVEL * INDENT_SIZE, ' ', p[2])
    INDENT_LEVEL += 1

def p_selectjobstatement_select(p):
    'selectjobstatement : SELECT JOB EOL'
    JOB_BLOCKS['"get"'] = ''
    for t in JOBTYPES.keys():
        JOB_BLOCKS[t] = ''
    p[0] = ''

def p_casestatement_case(p):
    '''casestatement : CASE expression THEN EOL
                     | CASE expression EOL'''
    global INDENT_LEVEL
    INDENT_LEVEL -= 1
    p[0] = '%*scase %s:\n' % (INDENT_LEVEL * INDENT_SIZE, ' ', p[2])
    INDENT_LEVEL += 1

def p_casejobstatement_case(p):
    '''casejobstatement : CASE expression THEN EOL
                        | CASE expression EOL'''
    LOCAL_VARS.clear()
    LOCAL_VARS.update(FUNCTION_VARS)
    p[0] = '%s' % (p[2])

def p_casejobstatement_case_job_define(p):
    '''casejobstatement : CASE JOB_DEFINE THEN EOL
                        | CASE JOB_DEFINE EOL'''
    LOCAL_VARS.clear()
    LOCAL_VARS.update(FUNCTION_VARS)
    p[0] = '%s' % (p[2])

def p_casejobstatement_case_job_getinputs(p):
    '''casejobstatement : CASE JOB_GETINPUTS THEN EOL
                        | CASE JOB_GETINPUTS EOL'''
    LOCAL_VARS.clear()
    LOCAL_VARS.update(FUNCTION_VARS)
    p[0] = '%s' % (p[2])

def p_casejobstatement_case_job_getorigin(p):
    '''casejobstatement : CASE JOB_GETORIGIN THEN EOL
                        | CASE JOB_GETORIGIN EOL'''
    LOCAL_VARS.clear()
    LOCAL_VARS.update(FUNCTION_VARS)
    p[0] = '%s' % (p[2])

def p_casejobstatement_case_job_getoutputs(p):
    '''casejobstatement : CASE JOB_GETOUTPUTS THEN EOL
                        | CASE JOB_GETOUTPUTS EOL'''
    LOCAL_VARS.clear()
    LOCAL_VARS.update(FUNCTION_VARS)
    p[0] = '%s' % (p[2])

def p_casejobstatement_case_job_plot(p):
    '''casejobstatement : CASE JOB_PLOT THEN EOL
                        | CASE JOB_PLOT EOL'''
    LOCAL_VARS.clear()
    LOCAL_VARS.update(FUNCTION_VARS)
    p[0] = '%s' % (p[2])

def p_casejobstatement_case_job_set(p):
    '''casejobstatement : CASE JOB_SET THEN EOL
                        | CASE JOB_SET EOL'''
    LOCAL_VARS.clear()
    LOCAL_VARS.update(FUNCTION_VARS)
    p[0] = '%s' % (p[2])

def p_whilestatement_while_do(p):
    '''whilestatement : WHILE expression DO EOL
                      | WHILE expression THEN EOL
                      | WHILE expression EOL'''
    global INDENT_LEVEL
    p[0] = '%*swhile (%s) {\n' % (INDENT_LEVEL * INDENT_SIZE, ' ', p[2])
    INDENT_LEVEL += 1

def p_ifstatement_if_then(p):
    '''ifstatement : IF expression THEN EOL
                   | IF expression EOL'''
    global INDENT_LEVEL
    p[0] = '%*sif (%s) {\n' % (INDENT_LEVEL * INDENT_SIZE, ' ', p[2])
    INDENT_LEVEL += 1

def p_elseifstatement_elseif_then(p):
    '''elseifstatement : ELSEIF expression THEN EOL
                       | ELSEIF expression EOL'''
    global INDENT_LEVEL
    INDENT_LEVEL -= 1
    p[0] = '%*s} else if (%s) {\n' % (INDENT_LEVEL * INDENT_SIZE, ' ', p[2])
    INDENT_LEVEL += 1

def p_elsestatement_else(p):
    '''elsestatement : ELSE EOL'''
    global INDENT_LEVEL
    INDENT_LEVEL -= 1
    p[0] = '%*s} else {\n' % (INDENT_LEVEL * INDENT_SIZE, ' ')
    INDENT_LEVEL += 1

# end define for, select, case, while, if, elseif, else

# define assignment

def p_assignment_expression(p):
    'assignment : lterm ASSIGNMENT expression'
    p[0] = '%*s%s %s %s' % (INDENT_LEVEL * INDENT_SIZE, ' ', p[1], p[2], p[3])

def p_getvalueassignment_getvalue(p):
    'getvalueassignment : lterm ASSIGNMENT SCICOS_GETVALUE OPENBRACKET list CLOSEBRACKET'
    p[0] = '%*s%s %s %s(%s)' % (INDENT_LEVEL * INDENT_SIZE, ' ', p[1], p[2], p[3], p[5])
    lterm = p[1]
    if lterm[0] == '[':
        lterm = lterm[1:-1]
        ltermvars = lterm.split(',')
        for var in ltermvars:
            if var in ('ok', 'exprs'):
                continue
            if var not in GLOBAL_VARS:
                GLOBAL_VARS.add(var)

# end define assignment

# define ltermarraylist

def p_ltermarraylist_ltermarraylist_comma_ltermvar(p):
    'ltermarraylist : ltermarraylist COMMA ltermvar'''
    p[0] = '%s,%s' % (p[1], p[3])

def p_ltermarraylist_ltermvar(p):
    'ltermarraylist : ltermvar'
    p[0] = '%s' % (p[1])

# end define ltermarraylist

# define termarraylist

def p_termarrayarraylist_termarrayarraylist_semicolon_termarraylist(p):
    'termarrayarraylist : termarrayarraylist SEMICOLON termarraylist'
    p[0] = '%s,[%s]' % (p[1], p[3])

def p_termarrayarraylist_termarraylist_semicolon_termarraylist(p):
    'termarrayarraylist : termarraylist SEMICOLON termarraylist'
    p[0] = '[%s],[%s]' % (p[1], p[3])

def p_termarraylist_termarraylist_comma_expression(p):
    '''termarraylist : termarraylist COMMA expression
                     | termarraylist SPACE expression'''
    p[0] = '%s,%s' % (p[1], p[3])

def p_termarraylist_expression(p):
    'termarraylist : expression'
    p[0] = '%s' % (p[1])

def p_termarraylist_expression_colon_expression(p):
    'termarraylist : expression COLON expression'
    p[0] = '%s:%s' % (p[1], p[3])

# end define termarraylist

# define list

def p_list_list_expression(p):
    'list : list COMMA expression'
    p[0] = '%s,%s' % (p[1], p[3])

def p_list_list_var_expression(p):
    'list : list COMMA VAR ASSIGNMENT expression'
    p[0] = '%s,%s=%s' % (p[1], p[3], p[5])

def p_list_list_in_expression(p):
    'list : list COMMA IN ASSIGNMENT expression'
    p[0] = '%s,%s1=%s' % (p[1], p[3], p[5])

def p_list_expression(p):
    'list : expression'
    p[0] = '%s' % (p[1])

def p_list_var_expression(p):
    'list : VAR ASSIGNMENT expression'
    p[0] = '%s=%s' % (p[1], p[3])

def p_list_in_expression(p):
    'list : IN ASSIGNMENT expression'
    p[0] = '%s1=%s' % (p[1], p[3])

# end define list

# define expression

# (2+3)
def p_expression_expression(p):
    'expression : OPENBRACKET expression CLOSEBRACKET'
    p[0] = '(%s)' % (p[2])

# [2+1,1;3-1,2;4-1,3]
def p_expression_termarrayarraylist(p):
    '''expression : OPENSQBRACKET termarrayarraylist CLOSESQBRACKET
                  | OPENSQBRACKET termarrayarraylist SEMICOLON CLOSESQBRACKET'''
    p[0] = '[%s]' % (p[2])

# [2+1,1;]
def p_expression_termarraylist_semicolon(p):
    '''expression : OPENSQBRACKET termarraylist SEMICOLON CLOSESQBRACKET'''
    p[0] = '[[%s]]' % (p[2])

# [2 3 4]
# [2,3,4]
def p_expression_termarraylist(p):
    '''expression : OPENSQBRACKET termarraylist CLOSESQBRACKET
                  | OPENSQBRACKET termarraylist COMMA CLOSESQBRACKET
                  | OPENSQBRACKET termarraylist SPACE CLOSESQBRACKET'''
    p[0] = '[%s]' % (p[2])

# []
def p_expression_empty(p):
    'expression : OPENSQBRACKET CLOSESQBRACKET'
    p[0] = '[]'

def p_expression_term_transpose(p):
    'expression : expression TRANSPOSE'
    p[0] = 'transpose(%s)' % (p[1])

def p_expression_expression_multiplication_expression(p):
    'expression : expression MULTIPLICATION expression'
    if p[2] == '**':
        operator = '^'
    elif p[2] == '\\':
        operator = '\\'
    else:
        operator = p[2]
    p[0] = '%s%s%s' % (p[1], operator, p[3])

def p_expression_expression_addition_expression(p):
    'expression : expression ADDITION expression'
    p[0] = '%s%s%s' % (p[1], p[2], p[3])

def p_expression_expression_comparison_expression(p):
    'expression : expression COMPARISON expression'
    operator = p[2]
    if operator == '<>' or operator == '~=':
        operator = '!='
    p[0] = '%s%s%s' % (p[1], operator, p[3])

def p_expression_expression_logical_expression(p):
    'expression : expression LOGICAL expression'
    operator = p[2]
    if operator == '&':
        operator = '&&'
    elif operator == '|':
        operator = '||'
    p[0] = '%s%s%s' % (p[1], operator, p[3])

def p_expression_addition_term(p):
    'expression : ADDITION expression %prec UNARYADDITION'
    p[0] = '%s%s' % (p[1], p[2])

def p_expression_not_expression(p):
    'expression : NOT expression'
    operator = '!'
    p[0] = '%s%s' % (operator, p[2])

def p_expression_term(p):
    'expression : term'
    p[0] = '%s' % (p[1])

# end define expression

# define function

# A(2,3)
def p_function_function_parameters(p):
    'function : FUNCTIONNAME OPENBRACKET list CLOSEBRACKET'
    p[0] = '%*s%s(%s)' % (INDENT_LEVEL * INDENT_SIZE, ' ', p[1], p[3])

# A()
def p_function_function(p):
    'function : FUNCTIONNAME OPENBRACKET CLOSEBRACKET'
    p[0] = '%*s%s()' % (INDENT_LEVEL * INDENT_SIZE, ' ', p[1])

# end define function

# define lterm

# B(2:$-1)
def p_lterm_ltermvar_slice(p):
    'lterm : ltermvar OPENBRACKET expression COLON expression CLOSEBRACKET'
    p[0] = '%s.slice(%s-1,%s)' % (p[1], p[3], p[5])

# B(2)
def p_lterm_ltermvar_index(p):
    'lterm : ltermvar OPENBRACKET expression CLOSEBRACKET'
    p[0] = '%s[%s-1]' % (p[1], p[3])

# B(2:$-1,1:n)
def p_lterm_ltermvar_slice_slice(p):
    'lterm : ltermvar OPENBRACKET expression COLON expression COMMA expression COLON expression CLOSEBRACKET'
    p[0] = '%s.slice(%s-1,%s).slice(%s-1,%s)' % (p[1], p[3], p[5], p[7], p[9])

# B(2,3)
# B($-2)(3)
def p_lterm_ltermvar_index_index(p):
    '''lterm : ltermvar OPENBRACKET expression COMMA expression CLOSEBRACKET
             | ltermvar OPENBRACKET expression CLOSEOPENBRACKET expression CLOSEBRACKET'''
    base = '%s[%s-1]' % (p[1], p[3])
    p[0] = '%s[%s-1]' % (base, p[5])

# [A,B,C]
def p_lterm_ltermarraylist(p):
    'lterm : OPENSQBRACKET ltermarraylist CLOSESQBRACKET'
    p[0] = '[%s]' % (p[2])

def p_lterm_ltermvar(p):
    'lterm : ltermvar'
    p[0] = '%s' % (p[1])

def p_ltermvar_ltermvar_dot_var(p):
    'ltermvar : ltermvar DOT VAR'
    p[0] = '%s.%s' % (p[1], p[3])

def p_ltermvar_ltermvar_dot_in(p):
    'ltermvar : ltermvar DOT IN'
    p[0] = '%s.%s1' % (p[1], p[3])

def p_ltermvar_var(p):
    'ltermvar : VAR'
    var = p[1]
    if var not in GLOBAL_VARS:
        if var not in LOCAL_VARS:
            LOCAL_VARS.add(var)
    if var in GLOBAL_VARS:
        p[0] = 'this.%s' % (var)
    else:
        p[0] = '%s' % (var)

# in
def p_ltermvar_in(p):
    'ltermvar : IN'
    var = p[1] + '1'
    if var not in GLOBAL_VARS:
        if var not in LOCAL_VARS:
            LOCAL_VARS.add(var)
    if var in GLOBAL_VARS:
        p[0] = 'this.%s' % (var)
    else:
        p[0] = '%s' % (var)

def p_ltermvar_prevar(p):
    'ltermvar : PREVAR'
    p[0] = '%s' % (p[1])

# end define lterm

# define term

# B(2:$-1)
def p_term_slice(p):
    'term : termvar OPENBRACKET expression COLON expression CLOSEBRACKET'
    p[0] = '%s.slice(%s-1,%s)' % (p[1], p[3], p[5])

# B(2:$-1,1)
def p_term_slice_expression(p):
    'term : termvar OPENBRACKET expression COLON expression COMMA expression CLOSEBRACKET'
    p[0] = '%s.slice(%s-1,%s)[%s-1]' % (p[1], p[3], p[5], p[7])

# B(:$-1)
def p_term_left_slice(p):
    'term : termvar OPENBRACKET COLON expression CLOSEBRACKET'
    p[0] = '%s.slice(%s-1)' % (p[1], p[3])

# B(2:)
def p_term_right_slice(p):
    'term : termvar OPENBRACKET expression COLON CLOSEBRACKET'
    p[0] = '%s.slice(%s-1,%s)' % (p[1], '1', p[4])

# B(:)
def p_term_full_slice(p):
    'term : termvar OPENBRACKET COLON CLOSEBRACKET'
    p[0] = '%s.slice()' % (p[1])

# B(:,1)
def p_term_full_slice_expression(p):
    'term : termvar OPENBRACKET COLON COMMA expression CLOSEBRACKET'
    p[0] = '%s.slice()[%s-1]' % (p[1], p[5])

# B(1,:)
def p_term_expression_full_slice(p):
    '''term : termvar OPENBRACKET expression COMMA COLON CLOSEBRACKET
            | termvar OPENBRACKET expression CLOSEOPENBRACKET COLON CLOSEBRACKET'''
    base = '%s[%s-1]' % (p[1], p[3])
    p[0] = '%s.slice()' % (base)

# B(1,1)
# B($-2)(1)
def p_term_expression_expression(p):
    '''term : termvar OPENBRACKET expression COMMA expression CLOSEBRACKET
            | termvar OPENBRACKET expression CLOSEOPENBRACKET expression CLOSEBRACKET'''
    base = '%s[%s-1]' % (p[1], p[3])
    p[0] = '%s[%s-1]' % (base, p[5])

# B(:,:)
def p_term_full_slice_full_slice(p):
    'term : termvar OPENBRACKET COLON COMMA COLON CLOSEBRACKET'
    p[0] = '%s.slice().slice()' % (p[1])

# (1:10)
def p_term_range(p):
    'term : OPENBRACKET expression COLON expression CLOSEBRACKET'
    p[0] = '[%s:%s]' % (p[2], p[4])

# 1:10:50
def p_term_range_step(p):
    'term : expression COLON expression COLON expression'
    p[0] = '[%s:%s:%s]' % (p[1], p[3], p[5])

# B($-2)
# C('function parameter')
def p_term_termvar_parameter(p):
    'term : termvar OPENBRACKET expression CLOSEBRACKET'
    p[0] = '%s[%s-1]' % (p[1], p[3])

# B($-2)('function parameter')(3)
def p_term_termvar_parameter_parameter_parameter(p):
    'term : termvar OPENBRACKET expression CLOSEOPENBRACKET expression CLOSEOPENBRACKET expression CLOSEBRACKET'
    base = '%s[%s-1]' % (p[1], p[3])
    base = '%s[%s-1]' % (base, p[5])
    p[0] = '%s[%s-1]' % (base, p[7])

# B($-2)('function parameter')(3:4)
def p_term_termvar_parameter_parameter_slice(p):
    'term : termvar OPENBRACKET expression CLOSEOPENBRACKET expression CLOSEOPENBRACKET expression COLON expression CLOSEBRACKET'
    base = '%s[%s-1]' % (p[1], p[3])
    base = '%s[%s-1]' % (base, p[5])
    p[0] = '%s.slice(%s-1,%s)' % (base, p[7], p[9])

# part(x,1:10)
def p_term_part_parameter_range(p):
    'term : PART OPENBRACKET expression COMMA expression COLON expression CLOSEBRACKET'
    p[0] = '%s(%s,%s,%s)' % (p[1], p[3], p[5], p[7])

# part(x,1)
def p_term_part_parameter_parameter(p):
    'term : PART OPENBRACKET expression COMMA expression CLOSEBRACKET'
    p[0] = '%s(%s,%s)' % (p[1], p[3], p[5])

# string(1:10)
def p_term_string_range(p):
    'term : STRING OPENBRACKET expression COLON expression CLOSEBRACKET'
    p[0] = '%s(%s,%s)' % (p[1], p[3], p[5])

# string(x)
def p_term_string_parameter(p):
    'term : STRING OPENBRACKET expression CLOSEBRACKET'
    p[0] = '%s(%s)' % (p[1], p[3])

# A(2,3)
def p_term_function_parameters(p):
    'term : FUNCTIONNAME OPENBRACKET list CLOSEBRACKET'
    p[0] = '%s(%s)' % (p[1], p[3])

# A()
def p_term_function(p):
    'term : FUNCTIONNAME OPENBRACKET CLOSEBRACKET'
    p[0] = '%s()' % (p[1])

# $
def p_term_lastindex(p):
    'term : LASTINDEX'
    p[0] = '%s' % (p[1])

# %xyz
def p_term_prevar(p):
    '''term : PREVAR
            | PREVAR_SUBSTITUTE'''
    p[0] = '%s' % (p[1])

# %f
def p_term_prevar_boolean(p):
    'term : PREVAR_BOOLEAN'
    if p[1] == '%t':
        value = 'true'
    elif p[1] == '%f':
        value = 'false'
    p[0] = '%s' % (value)

# 1+2*%i
def p_term_prevar_complex1(p):
    'expression : expression ADDITION expression MULTIPLICATION PREVAR_COMPLEX'
    if p[2] == '-':
        imag = '%s%s' % (p[2], p[3])
    else:
        imag = '%s' % (p[3])
    p[0] = 'math.complex(%s,%s)' % (p[1], imag)

# 1+2*%i
def p_term_prevar_complex2(p):
    'expression : expression ADDITION PREVAR_COMPLEX MULTIPLICATION expression'
    if p[2] == '-':
        imag = '%s%s' % (p[2], p[5])
    else:
        imag = '%s' % (p[5])
    p[0] = 'math.complex(%s,%s)' % (p[1], imag)

# %e %pi
def p_term_prevar_float(p):
    'term : PREVAR_FLOAT'
    if p[1] == '%e':
        flt = 'math.E'
    elif p[1] == '%pi':
        flt = 'math.PI'
    else:
        flt = p[1]
    p[0] = '%s' % (flt)

def p_term_termvar(p):
    'term : termvar'
    p[0] = '%s' % (p[1])

# A.B
def p_termvar_termvar_dot_var(p):
    'termvar : termvar DOT VAR'
    p[0] = '%s.%s' % (p[1], p[3])

def p_termvar_termvar_dot_in(p):
    'termvar : termvar DOT IN'
    p[0] = '%s.%s1' % (p[1], p[3])

# A
def p_termvar_var(p):
    'termvar : VAR'
    var = p[1]
    if var not in GLOBAL_VARS:
        if var not in LOCAL_VARS:
            GLOBAL_VARS.add(var)
    if var in GLOBAL_VARS:
        p[0] = 'this.%s' % (var)
    else:
        p[0] = '%s' % (var)

# in
def p_termvar_in(p):
    'termvar : IN'
    var = p[1] + '1'
    if var not in GLOBAL_VARS:
        if var not in LOCAL_VARS:
            GLOBAL_VARS.add(var)
    if var in GLOBAL_VARS:
        p[0] = 'this.%s' % (var)
    else:
        p[0] = '%s' % (var)

# 5
# 3.4
# 4e5
# 1.0d-4
def p_term_number(p):
    'term : NUMBER'
    number = re.sub(r'[de]', r'e', p[1], flags=re.IGNORECASE)
    p[0] = '%s' % (number)

# 'abc'
# "abc"
def p_term_string(p):
    '''term : QSTRING
            | DQSTRING'''
    p[0] = '%s' % (p[1])

# end define term

def p_error(p):
    print("Syntax error in input", p)

BLOCK_TYPE = {
    'AFFICH_m': 'AfficheBlock',
    'BIGSOM_f': 'BigSom',
    'CLKINV_f': 'EventInBlock',
    'CLKOUTV_f': 'EventOutBlock',
    'Ground': 'GroundBlock',
    'IN_f': 'ExplicitInBlock',
    'INIMPL_f': 'ImplicitInBlock',
    'OUT_f': 'ExplicitOutBlock',
    'OUTIMPL_f': 'ImplicitOutBlock',
    'PRODUCT': 'Product',
    'SUMMATION': 'Summation',
    'SUPER_f': 'SuperBlock',
    'TEXT_f': 'TextBlock',
    'VoltageSensor': 'VoltageSensorBlock',
}

def getblocktype(module):
    '''return a block type for a module'''
    return BLOCK_TYPE.get(module, 'BasicBlock')

def processfile(filename, picklefilename, passnumber):
    '''convert a sci file to a js file'''

    global GLOBAL_VARS
    debug = False

    if passnumber == 2:
        with open(picklefilename, 'r') as cfile:
            GLOBAL_VARS = pickle.load(cfile)
        debug = True

    data = ''
    with open(filename, 'r') as infile:
        for line in infile:
            data += line

        parser = yacc.yacc()
        result = parser.parse(data, debug=debug)

        if passnumber == 1:
            with open(picklefilename, 'w') as cfile:
                pickle.dump(GLOBAL_VARS, cfile)

        print('/* autogenerated from "', filename, '" */', sep='')
        print(result)

if __name__ == '__main__':
    if len(sys.argv) <= 3:
        print('Usage:', sys.argv[0], 'filename.sci filename.pickle pass-number')
        sys.exit(1)

    processfile(sys.argv[1], sys.argv[2], int(sys.argv[3]))
