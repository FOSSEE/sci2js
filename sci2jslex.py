#!/usr/bin/python3

import ply.lex as lex
import sys

''' keep track of how many open brackets have been encountered so far '''
brackets = 0

''' keep current string in memory '''
qstring = ''
dqstring = ''

predefinedvariables = {
    't': 'PREVAR_BOOLEAN',
    'f': 'PREVAR_BOOLEAN',
    'i': 'PREVAR_COMPLEX',
    'pi': 'PREVAR_FLOAT',
}

tokens = [
    'EOL',
    'NUMBER',
    'LASTINDEX',
    'VAR',
    'DOT',
    'OPERATOR',
    'COMPARISON',
    'COMMA',
    'OPENSQBRACKET',
    'CLOSESQBRACKET',
    'OPENBRACKET',
    'CLOSEBRACKET',
    'SEMICOLON',
    'NOT',
    'LOGICAL',
    'ASSIGNMENT',
    'COLON',
    'QSTRING',
    'DQSTRING',
    'PREVAR',
] + list(set(predefinedvariables.values()))

def t_COMMENT(t):
    r'\.\.+[ \t]*(//.*)?(\n|$)|//.*'
    pass

def t_EOL(t):
    r'\n'
    global brackets
    if brackets == 0:
        t.state = 'EOL'
        t.value = t.lexer.lexmatch.group()
        return t

t_NUMBER          = r'-?(\d+(\.\d*)?|\.\d+)([eE][+-]?\d+)?'
t_LASTINDEX       = r'\$'
t_VAR             = r'[a-zA-Z_][a-zA-Z0-9_]*'
t_DOT             = r'\.'
t_OPERATOR        = r'[+\-*/^\\]'
t_COMPARISON      = r'<>|[<>]=|==|[<>]'
t_COMMA           = r','

def t_OPENSQBRACKET(t):
    r'\['
    global brackets
    brackets += 1
    t.state = 'OPENSQBRACKET'
    t.value = t.lexer.lexmatch.group()
    return t

def t_CLOSESQBRACKET(t):
    r'\]'
    global brackets
    brackets -= 1
    t.state = 'CLOSESQBRACKET'
    t.value = t.lexer.lexmatch.group()
    return t

def t_OPENBRACKET(t):
    r'\('
    global brackets
    brackets += 1
    t.state = 'OPENBRACKET'
    t.value = t.lexer.lexmatch.group()
    return t

def t_CLOSEBRACKET(t):
    r'\)'
    global brackets
    brackets -= 1
    t.state = 'CLOSEBRACKET'
    t.value = t.lexer.lexmatch.group()
    return t

def t_PREVAR(t):
    r'%[a-zA-Z0-9_]+'
    t.type = predefinedvariables.get(t.value[1:], 'PREVAR')
    return t

t_SEMICOLON       = r';'
t_NOT             = r'~'
t_LOGICAL         = r'[&|]'
t_ASSIGNMENT      = r'='
t_COLON           = r':'

t_ignore = ' \t'

def t_error(t):
    print("Illegal character '%s'" % t.value[0])
    t.lexer.skip(1)

states = (
    ('qstring', 'exclusive'),
    ('dqstring', 'exclusive'),
)

def t_begin_qstring(t):
    r"'"
    global qstring
    t.lexer.begin('qstring')
    qstring = t.lexer.lexmatch.group()

def t_begin_dqstring(t):
    r'"'
    global dqstring
    t.lexer.begin('dqstring')
    dqstring = t.lexer.lexmatch.group()

def t_qstring_COMMENT(t):
    r'\.\.+[ \t]*(//.*)?\n'
    pass

def t_dqstring_COMMENT(t):
    r'\.\.+[ \t]*(//.*)?\n'
    pass

def t_qstring_end(t):
    r"'"
    global qstring
    t.lexer.begin('INITIAL')
    qstring += t.lexer.lexmatch.group()
    t.type = 'QSTRING'
    t.value = qstring
    return t

def t_dqstring_end(t):
    r'"'
    global dqstring
    t.lexer.begin('INITIAL')
    dqstring += t.lexer.lexmatch.group()
    t.type = 'DQSTRING'
    t.value = dqstring
    return t

def t_qstring_char(t):
    r"\\.|\.|[^'\\.]+"
    global qstring
    qstring += t.lexer.lexmatch.group()

def t_dqstring_char(t):
    r'\\.|\.|[^"\\.]+'
    global dqstring
    dqstring += t.lexer.lexmatch.group()

t_qstring_ignore = ''

t_dqstring_ignore = ''

def t_qstring_error(t):
    print("Illegal character '%s' in qstring" % t.value[0])
    t.lexer.skip(1)

def t_dqstring_error(t):
    print("Illegal character '%s' in dqstring" % t.value[0])
    t.lexer.skip(1)

lexer = lex.lex()

if len(sys.argv) <= 1:
    print("Usage: %s filename" % sys.argv[0])
    sys.exit(1)

filename = sys.argv[1]
data = ''
with open(filename, 'r') as infile:
    for line in infile:
        data += line

    lexer.input(data)

    for tok in lexer:
        print(tok)
