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
    'gettext': 'GETTEXT',
    'if': 'IF',
    'in': 'IN',
    'job': 'JOB',
    'list': 'LIST',
    'message': 'MESSAGE',
    'part': 'PART',
    'resume': 'RESUME',
    'return': 'RETURN',
    'scicos_getvalue': 'SCICOS_GETVALUE',
    'select': 'SELECT',
    'standard_define': 'STANDARD_DEFINE',
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

BOOLEAN_TYPE = 'boolean'
BOOLEAN_FUNCTION_NAMES = {
    'is_modelica_block',
    'isequal',
    'isequalbitwise',
    'isreal',
}

DOUBLE_TYPE = 'double'
DOUBLE_FUNCTION_NAMES = {
}
UNKNOWN_FUNCTION_NAMES = {
    '_',
    'AutoScale',
    'CC4',
    'CFORTR',
    'CFORTR2',
    'CFORTREDP',
    'Do_Spline',
    'FORTR',
    'IHM_EDP',
    'MODCOM',
    'ReadExcel',
    'ReadFromFile',
    'SaveToFile',
    'abs',
    'addmenu',
    'and',
    'arbre_decision',
    'atan',
    'block_parameter_error',
    'cleandata',
    'compile_expr',
    'compiler_expression',
    'cont_frm',
    'deff',
    'degree',
    'delete',
    'delmenu',
    'dialog',
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
    'genSwitchInnerDiagram',
    'genfunc',
    'genfunc1',
    'genfunc2',
    'get_click',
    'getmethod',
    'getos',
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
    'jetcolormap',
    'lasterror',
    'length',
    'lines',
    'linspace',
    'log',
    'lstsize',
    'matrix',
    'max',
    'mclose',
    'messagebox',
    'mfprintf',
    'mfrequ_clk',
    'mfscanf',
    'mgetl',
    'min',
    'mlist',
    'modelica',
    'modulo',
    'mopen',
    'movept',
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
    'scicos',
    'scicos_block',
    'scicos_debug',
    'scicos_diagram',
    'scicos_graphics',
    'scicos_link',
    'scicos_params',
    'script2var',
    'set_io',
    'setvalue_IHM_EDP',
    'sign',
    'sin',
    'size',
    'splin',
    'sqrt',
    'standard_origin',
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

LIST_TYPE = 'list'
LIST_FUNCTION_NAMES = {
    'check_io',
}

MATRIX_TYPE = 'matrix'
MATRIX_FUNCTION_NAMES = {
}

NULL_TYPE = 'null'
NULL_FUNCTION_NAMES = {
}

OBJECT_TYPE = 'object'
OBJECT_FUNCTION_NAMES = {
    'scicos_model',
}
SCICOS_BLOCKS = {
    'ANDLOG_f',
    'CLKIN_f',
    'CLKINV_f',
    'CLKOUT_f',
    'CLKOUTV_f',
    'CLKSOM_f',
    'CLKSOMV_f',
    'CLKSPLIT_f',
    'CONST_m',
    'DEBUG',
    'EDGETRIGGER',
    'EVTDLY_c',
    'EVTDLY_f',
    'IFTHEL_f',
    'IN_f',
    'MFCLCK_f',
    'Modulo_Count',
    'OUT_f',
    'REGISTER_f',
    'STEP',
    'SWITCH_f',
}

STRING_TYPE = 'string'
STRING_FUNCTION_NAMES = {
    'sci2exp',
}

VECTOR_TYPE = 'vector'
VECTOR_FUNCTION_NAMES = {
}

VECTOR_BOOLEAN_TYPE = 'vector_boolean'
VECTOR_BOOLEAN_FUNCTION_NAMES = {
}

VECTOR_STRING_TYPE = 'vector_string'
VECTOR_STRING_FUNCTION_NAMES = {
}

FUNCTION_NAMES = { }
FUNCTION_NAMES.update(dict.fromkeys(BOOLEAN_FUNCTION_NAMES, BOOLEAN_TYPE))
FUNCTION_NAMES.update(dict.fromkeys(DOUBLE_FUNCTION_NAMES, DOUBLE_TYPE))
FUNCTION_NAMES.update(dict.fromkeys(UNKNOWN_FUNCTION_NAMES, DOUBLE_TYPE))
FUNCTION_NAMES.update(dict.fromkeys(LIST_FUNCTION_NAMES, LIST_TYPE))
FUNCTION_NAMES.update(dict.fromkeys(MATRIX_FUNCTION_NAMES, MATRIX_TYPE))
FUNCTION_NAMES.update(dict.fromkeys(NULL_FUNCTION_NAMES, NULL_TYPE))
FUNCTION_NAMES.update(dict.fromkeys(OBJECT_FUNCTION_NAMES, OBJECT_TYPE))
FUNCTION_NAMES.update(dict.fromkeys(SCICOS_BLOCKS, OBJECT_TYPE))
FUNCTION_NAMES.update(dict.fromkeys(STRING_FUNCTION_NAMES, STRING_TYPE))
FUNCTION_NAMES.update(dict.fromkeys(VECTOR_FUNCTION_NAMES, VECTOR_TYPE))
FUNCTION_NAMES.update(dict.fromkeys(VECTOR_BOOLEAN_FUNCTION_NAMES, VECTOR_BOOLEAN_TYPE))
FUNCTION_NAMES.update(dict.fromkeys(VECTOR_STRING_FUNCTION_NAMES, VECTOR_STRING_TYPE))

OBJECTS = {
#    'PREVAR_scicos_context': 'PREVAR_SCICOS_CONTEXT',
#    'arg1': 'ARG1',
    'graphics': 'GRAPHICS',
    'model': 'MODEL',
#    'scicos_context': 'SCICOS_CONTEXT',
}

JOBTYPES = {
    '"define"': 'JOB_DEFINE',
    '"getinputs"': 'JOB_GETINPUTS',
    '"getorigin"': 'JOB_GETORIGIN',
    '"getoutputs"': 'JOB_GETOUTPUTS',
    '"plot"': 'JOB_PLOT',
    '"set"': 'JOB_SET',
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
] + list(SYNTAX_TOKENS.values()) + list(set(PREDEFINED_VARIABLES.values())) + list(OBJECTS.values()) + list(JOBTYPES.values())

states = (
    ('qstring', 'exclusive'),
    ('dqstring', 'exclusive'),
)

def t_COMMA(t):
    r'[ \t]*,([ \t]*(//.*)?\n?)*'
    t.lexer.afterarray = False
    t.lexer.aftercase = False
    if BRACKET_STACK[-1] != ' ':
        return t
    t.type = 'EOL'
    return t

def t_SEMICOLON(t):
    r'[ \t]*;([ \t]*(//.*)?\n?)*'
    t.lexer.afterarray = False
    t.lexer.aftercase = False
    if BRACKET_STACK[-1] != ' ':
        return t
    t.type = 'EOL'
    return t

def t_CLOSESQBRACKET(t):
    r'([ \t]*\.\.+[ \t]*\n)?[ \t]*\]'
    t.lexer.afterarray = True
    t.lexer.aftercase = False
    if BRACKET_STACK.pop() != '[':
        print("Syntax error: Mismatched ]")
    return t

def t_CLOSEOPENBRACKET(t):
    r'[ \t]*\)\(([ \t]*(//.*)?\n?)*'
    t.lexer.afterarray = True
    t.lexer.aftercase = False
    return t

def t_CLOSEBRACKET(t):
    r'([ \t]*\.\.+[ \t]*\n)?[ \t]*\)'
    t.lexer.afterarray = True
    t.lexer.aftercase = False
    if BRACKET_STACK.pop() != '(':
        print("Syntax error: Mismatched )")
    return t

def t_COMMENT(t):
    r'\.\.+[ \t]*(//.*)?(\n[ \t]*|$)|//.*'
    pass

def t_NUMBER(t):
    r'(\d+(\.\d*)?|\.\d+)([dDeE][+-]?\d+)?'
    t.lexer.afterarray = False
    t.lexer.aftercase = False
    return t

def t_PREVAR(t):
    r'%[a-zA-Z_][a-zA-Z0-9_]*'
    t.lexer.afterarray = False
    t.lexer.aftercase = False
    base = t.value[1:]
    t.type = PREDEFINED_VARIABLES.get(base, 'PREVAR')
    if t.type == 'PREVAR_SUBSTITUTE':
        t.type = 'VAR'
        t.value = 'PREVAR_' + base
    return t

def t_VAR(t):
    r'[a-zA-Z_][a-zA-Z0-9_]*'
    global CASEEXPRESSION
    vartype = SYNTAX_TOKENS.get(t.value)
    if vartype is None:
        vartype = OBJECTS.get(t.value)
    if vartype is None:
        if t.value in FUNCTION_NAMES:
            vartype = 'FUNCTIONNAME'
            functiontype = FUNCTION_NAMES[t.value]
            t.value = (t.value, functiontype)
        else:
            vartype = 'VAR'
    t.lexer.afterarray = vartype == 'VAR'
    t.lexer.aftercase = vartype == 'CASE'
    t.type = vartype
    return t

def t_COMPARISON(t):
    r'<>|[<>~=]=|[<>]'
    t.lexer.afterarray = False
    t.lexer.aftercase = False
    return t

def t_LASTINDEX(t):
    r'\$'
    t.lexer.afterarray = False
    t.lexer.aftercase = False
    return t

def t_EOL(t):
    r'[ \t]*(//.*)?\n([ \t]*(//.*)?\n?)*'
    lastbracket = BRACKET_STACK[-1]
    if lastbracket == ' ':
        t.lexer.afterarray = False
        t.lexer.aftercase = False
        return t
    if lastbracket == '[':
        t.type = 'SPACE'
        return t

def t_DOT(t):
    r'\.'
    t.lexer.afterarray = False
    t.lexer.aftercase = False
    return t

def t_MULTIPLICATION(t):
    r'\*\*|[*/^\\]'
    t.lexer.afterarray = False
    t.lexer.aftercase = False
    return t

def t_ADDITION(t):
    r'[+\-]'
    t.lexer.afterarray = False
    t.lexer.aftercase = False
    return t

def t_OPENSQBRACKET(t):
    r'\[([ \t]*(//.*)?\n?)*'
    t.lexer.afterarray = False
    t.lexer.aftercase = False
    BRACKET_STACK.append('[')
    return t

def t_OPENBRACKET(t):
    r'\(([ \t]*(//.*)?\n?)*'
    t.lexer.afterarray = False
    t.lexer.aftercase = False
    BRACKET_STACK.append('(')
    return t

def t_NOT(t):
    r'~'
    t.lexer.afterarray = False
    t.lexer.aftercase = False
    return t

def t_LOGICAL(t):
    r'[&|]'
    t.lexer.afterarray = False
    t.lexer.aftercase = False
    return t

def t_ASSIGNMENT(t):
    r'='
    t.lexer.afterarray = False
    t.lexer.aftercase = False
    return t

def t_COLON(t):
    r':'
    t.lexer.afterarray = False
    t.lexer.aftercase = False
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
        t.lexer.aftercase = False
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
    t.lexer.aftercase = False
    t.type = 'QSTRING'
    t.value = t.lexer.qstring
    return t

def t_dqstring_end(t):
    r'"'
    t.lexer.pop_state()
    t.lexer.dqstring += t.value
    if t.lexer.aftercase:
        t.lexer.aftercase = False
        t.type = JOBTYPES.get(t.lexer.dqstring, 'DQSTRING')
    else:
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
