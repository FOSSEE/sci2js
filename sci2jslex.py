#!/usr/bin/python

"""
Parse a .sci file and split it into tokens. This file is used indirectly
through sci2jsyacc.py (except for debugging purposes).

Usage: ./sci2jslex.py filename.sci > filename.lex

Example: ./sci2jslex.py macros/Sinks/CSCOPE.sci > js/Sinks/CSCOPE.lex
"""

from __future__ import print_function

import sys
import ply.lex as lex

# keep track of how many open brackets have been encountered so far
BRACKET_STACK = [' ']

SYNTAX_TOKENS = {
    'break': 'BREAK',
    'case': 'CASE',
    'catch': 'CATCH',
    'clear': 'CLEAR',
    'do': 'DO',
    'else': 'ELSE',
    'elseif': 'ELSEIF',
    'end': 'END',
    'endfunction': 'ENDFUNCTION',
    'for': 'FOR',
    'function': 'FUNCTION',
    'if': 'IF',
    'in': 'IN',
    'job': 'JOB',
    'part': 'PART',
    'resume': 'RESUME',
    'return': 'RETURN',
    'scicos_getvalue': 'SCICOS_GETVALUE',
    'select': 'SELECT',
    'string': 'STRING',
    'then': 'THEN',
    'try': 'TRY',
    'where': 'WHERE',
    'while': 'WHILE',
}

PREDEFINED_VARIABLES = {
    'FF': 'PREVAR_SUBSTITUTE',
    'GG': 'PREVAR_SUBSTITUTE',
    'f': 'PREVAR_BOOLEAN',
    'foo': 'PREVAR_SUBSTITUTE',
    'e': 'PREVAR_FLOAT',
    'i': 'PREVAR_COMPLEX',
    'jji': 'PREVAR_SUBSTITUTE',
    'pi': 'PREVAR_FLOAT',
    'scicos_context': 'PREVAR_SUBSTITUTE',
    't': 'PREVAR_BOOLEAN',
}

FUNCTION_NAMES = {
    '_',
    'ANDLOG_f',
    'AutoScale',
    'CFORTR',
    'CFORTR2',
    'CFORTREDP',
    'CLKIN_f',
    'CLKINV_f',
    'CLKOUT_f',
    'CLKOUTV_f',
    'CLKSOM_f',
    'CLKSOMV_f',
    'CLKSPLIT_f',
    'DEBUG',
    'Do_Spline',
    'EVTDLY_f',
    'FORTR',
    'IFTHEL_f',
    'IHM_EDP',
    'IN_f',
    'MFCLCK_f',
    'MODCOM',
    'Modulo_Count',
    'OUT_f',
    'REGISTER_f',
    'ReadExcel',
    'ReadFromFile',
    'SWITCH_f',
    'SaveToFile',
    'abs',
    'addmenu',
    'and',
    'atan',
    'block_parameter_error',
    'check_io',
    'cleandata',
    'compile_expr',
    'compiler_expression',
    'cont_frm',
    'deff',
    'degree',
    'delmenu',
    'diffobjs',
    'do_eval',
    'double',
    'drawSplin',
    'drawlater',
    'drawnow',
    'edit_curv',
    'emptystr',
    'eval',
    'evstr',
    'execstr',
    'exists',
    'fileinfo',
    'fileparts',
    'find',
    'findrect',
    'floor',
    'gca',
    'gcf',
    'genfunc1',
    'genfunc2',
    'get_click',
    'getmethod',
    'getos',
    'gettext',
    'getvalue',
    'gsort',
    'hidetoolbar',
    'ieee',
    'imag',
    'int',
    'int16',
    'int32',
    'int8',
    'interp',
    'inv',
    'is_modelica_block',
    'isequal',
    'isreal',
    'lasterror',
    'length',
    'lines',
    'linspace',
    'list',
    'log',
    'lstsize',
    'matrix',
    'max',
    'mclose',
    'message',
    'messagebox',
    'mfrequ_clk',
    'mfscanf',
    'mgetl',
    'min',
    'mlist',
    'modelica',
    'modulo',
    'mopen',
    'msprintf',
    'norm',
    'ones',
    'or',
    'pathconvert',
    'plot3d',
    'poke_point',
    'prod',
    'rand',
    'real',
    'save',
    'scf',
    'sci2exp',
    'scicos',
    'scicos_block',
    'scicos_debug',
    'scicos_diagram',
    'scicos_graphics',
    'scicos_link',
    'scicos_model',
    'scicos_params',
    'script2var',
    'set_io',
    'setvalue_IHM_EDP',
    'sign',
    'sin',
    'size',
    'splin',
    'sqrt',
    'standard_define',
    'strcat',
    'strindex',
    'stripblanks',
    'strsubst',
    'struct',
    'sum',
    'tan',
    'test_increasing',
    'tlist',
    'translate',
    'typeof',
    'uint16',
    'uint32',
    'uint8',
    'warnBlockByUID',
    'warning',
    'warnobsolete',
    'winsid',
    'x_mdialog',
    'x_message',
    'xcos',
    'xfpoly',
    'xfpolys',
    'xget',
    'xinfo',
    'xpoly',
    'xpolys',
    'xset',
    'xstringb',
    'xstringl',
    'xtitle',
    'zeros',
}

OBJECTS = {
#    'PREVAR_scicos_context': 'PREVAR_SCICOS_CONTEXT',
#    'arg1': 'ARG1',
#    'model': 'MODEL',
#    'scicos_context': 'SCICOS_CONTEXT',
}

tokens = [
    'ADDITION',
    'ASSIGNMENT',
    'CLOSEBRACKET',
    'CLOSEOPENBRACKET',
    'CLOSESQBRACKET',
    'COLON',
    'COMMA',
    'COMPARISON',
    'DOT',
    'DQSTRING',
    'EOL',
    'FUNCTIONNAME',
    'LASTINDEX',
    'LOGICAL',
    'MULTIPLICATION',
    'NOT',
    'NUMBER',
    'OPENBRACKET',
    'OPENSQBRACKET',
    'PREVAR',
    'QSTRING',
    'SEMICOLON',
    'SPACE',
    'TRANSPOSE',
    'VAR',
] + list(SYNTAX_TOKENS.values()) + list(set(PREDEFINED_VARIABLES.values())) + list(OBJECTS.values())

states = (
    ('qstring', 'exclusive'),
    ('dqstring', 'exclusive'),
)

def t_COMMA(t):
    r'[ \t]*,([ \t]*(//.*)?\n?)*'
    t.lexer.afterarray = False
    if BRACKET_STACK[-1] != ' ':
        return t
    t.type = 'EOL'
    return t

def t_SEMICOLON(t):
    r'[ \t]*;([ \t]*(//.*)?\n?)*'
    t.lexer.afterarray = False
    if BRACKET_STACK[-1] != ' ':
        return t
    t.type = 'EOL'
    return t

def t_CLOSESQBRACKET(t):
    r'([ \t]*\.\.+[ \t]*\n)?[ \t]*\]'
    t.lexer.afterarray = True
    if BRACKET_STACK.pop() != '[':
        print("Syntax error: Mismatched ]")
    return t

def t_CLOSEOPENBRACKET(t):
    r'[ \t]*\)\(([ \t]*(//.*)?\n?)*'
    t.lexer.afterarray = True
    return t

def t_CLOSEBRACKET(t):
    r'([ \t]*\.\.+[ \t]*\n)?[ \t]*\)'
    t.lexer.afterarray = True
    if BRACKET_STACK.pop() != '(':
        print("Syntax error: Mismatched )")
    return t

def t_COMMENT(t):
    r'\.\.+[ \t]*(//.*)?(\n[ \t]*|$)|//.*'
    pass

def t_NUMBER(t):
    r'(\d+(\.\d*)?|\.\d+)([dDeE][+-]?\d+)?'
    t.lexer.afterarray = False
    return t

def t_PREVAR(t):
    r'%[a-zA-Z_][a-zA-Z0-9_]*'
    t.lexer.afterarray = False
    base = t.value[1:]
    t.type = PREDEFINED_VARIABLES.get(base, 'PREVAR')
    if t.type == 'PREVAR_SUBSTITUTE':
        t.type = 'VAR'
        t.value = 'PREVAR_' + base
    return t

def t_VAR(t):
    r'[a-zA-Z_][a-zA-Z0-9_]*'
    t.lexer.afterarray = True
    vartype = SYNTAX_TOKENS.get(t.value)
    if vartype is None:
        vartype = OBJECTS.get(t.value)
    if vartype is None:
        vartype = 'FUNCTIONNAME' if t.value in FUNCTION_NAMES else 'VAR'
    t.type = vartype
    return t

def t_COMPARISON(t):
    r'<>|[<>~=]=|[<>]'
    t.lexer.afterarray = False
    return t

def t_LASTINDEX(t):
    r'\$'
    t.lexer.afterarray = False
    return t

def t_EOL(t):
    r'[ \t]*(//.*)?\n([ \t]*(//.*)?\n?)*'
    lastbracket = BRACKET_STACK[-1]
    if lastbracket == ' ':
        t.lexer.afterarray = False
        return t
    if lastbracket == '[':
        t.type = 'SPACE'
        return t

def t_DOT(t):
    r'\.'
    t.lexer.afterarray = False
    return t

def t_MULTIPLICATION(t):
    r'\*\*|[*/^\\]'
    t.lexer.afterarray = False
    return t

def t_ADDITION(t):
    r'[+\-]'
    t.lexer.afterarray = False
    return t

def t_OPENSQBRACKET(t):
    r'\[([ \t]*(//.*)?\n?)*'
    t.lexer.afterarray = False
    BRACKET_STACK.append('[')
    return t

def t_OPENBRACKET(t):
    r'\(([ \t]*(//.*)?\n?)*'
    t.lexer.afterarray = False
    BRACKET_STACK.append('(')
    return t

def t_NOT(t):
    r'~'
    t.lexer.afterarray = False
    return t

def t_LOGICAL(t):
    r'[&|]'
    t.lexer.afterarray = False
    return t

def t_ASSIGNMENT(t):
    r'='
    t.lexer.afterarray = False
    return t

def t_COLON(t):
    r':'
    t.lexer.afterarray = False
    return t

def t_SPACE(t):
    r'[ \t]+'
    if BRACKET_STACK[-1] == '[':
        return t

def t_error(t):
    print("Syntax error: Illegal character '", t.value[0], "'", sep='')
    t.lexer.skip(1)

def t_TRANSPOSE(t):
    r"'"
    if t.lexer.afterarray:
        t.lexer.afterarray = False
        return t
    t.lexer.push_state('qstring')
    t.lexer.qstring = t.value

def t_begin_dqstring(t):
    r'"'
    t.lexer.afterarray = False
    t.lexer.push_state('dqstring')
    t.lexer.dqstring = t.value

def t_qstring_COMMENT(t):
    r'\.\.+[ \t]*(//.*)?\n'
    pass

def t_dqstring_COMMENT(t):
    r'\.\.+[ \t]*(//.*)?\n'
    pass

def t_qstring_char(t):
    r'\.|[^\'".]+'
    t.lexer.qstring += t.value

def t_dqstring_char(t):
    r'\.|[^\'".]+'
    t.lexer.dqstring += t.value

def t_qstring_quote(t):
    r'\'\'|""'
    t.lexer.qstring += '\\' + t.value[0]

def t_dqstring_quote(t):
    r'\'\'|""'
    t.lexer.dqstring += '\\' + t.value[0]

def t_qstring_end(t):
    r"'"
    t.lexer.pop_state()
    t.lexer.qstring += t.value
    t.type = 'QSTRING'
    t.value = t.lexer.qstring
    return t

def t_dqstring_end(t):
    r'"'
    t.lexer.pop_state()
    t.lexer.dqstring += t.value
    t.type = 'DQSTRING'
    t.value = t.lexer.dqstring
    return t

def t_qstring_error(t):
    print("Syntax error: Illegal character '", t.value[0], "' in qstring", sep='')
    t.lexer.skip(1)

def t_dqstring_error(t):
    print("Syntax error: Illegal character '", t.value[0], "' in dqstring", sep='')
    t.lexer.skip(1)

def processfile(filename):
    '''split a sci file into tokens'''
    data = ''
    with open(filename, 'r') as infile:
        for line in infile:
            data += line

        lexer.input(data)

        for tok in lexer:
            print(tok)

lexer = lex.lex()
# keep current string in memory
lexer.qstring = ''
lexer.dqstring = ''
lexer.afterarray = False

if __name__ == '__main__':
    if len(sys.argv) <= 1:
        print('Usage:', sys.argv[0], 'filename')
        sys.exit(1)

    processfile(sys.argv[1])
