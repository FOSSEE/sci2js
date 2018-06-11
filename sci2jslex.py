#!/usr/bin/python3

import ply.lex as lex
import sys

''' keep track of how many open brackets have been encountered so far '''
brackets = 0

''' keep current string in memory '''
qstring = ''
dqstring = ''
afterarray = False

syntaxtokens = {
    'break': 'BREAK',
    'case': 'CASE',
    'clear': 'CLEAR',
    'do': 'DO',
    'else': 'ELSE',
    'elseif': 'ELSEIF',
    'end': 'END',
    'endfunction': 'ENDFUNCTION',
    'for': 'FOR',
    'function': 'FUNCTION',
    'if': 'IF',
    'resume': 'RESUME',
    'return': 'RETURN',
    'scicos': 'SCICOS',
    'scicos_block': 'SCICOS_BLOCK',
    'scicos_context': 'SCICOS_CONTEXT',
    'scicos_debug': 'SCICOS_DEBUG',
    'scicos_diagram': 'SCICOS_DIAGRAM',
    'scicos_getvalue': 'SCICOS_GETVALUE',
    'scicos_graphics': 'SCICOS_GRAPHICS',
    'scicos_link': 'SCICOS_LINK',
    'scicos_model': 'SCICOS_MODEL',
    'scicos_params': 'SCICOS_PARAMS',
    'select': 'SELECT',
    'then': 'THEN',
    'where': 'WHERE',
    'while': 'WHILE',
}

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
    'TRANSPOSE',
] + list(syntaxtokens.values()) + list(set(predefinedvariables.values()))

states = (
    ('qstring', 'exclusive'),
    ('dqstring', 'exclusive'),
)

t_ignore = ' \t'
t_qstring_ignore = ''
t_dqstring_ignore = ''

def t_COMMENT(t):
    r'\.\.+[ \t]*(//.*)?(\n|$)|//.*'
    pass

def t_NUMBER(t):
    r'-?(\d+(\.\d*)?|\.\d+)([eE][+-]?\d+)?'
    global afterarray
    afterarray = False
    t.state = 'NUMBER'
    return t

def t_PREVAR(t):
    r'%[a-zA-Z_][a-zA-Z0-9_]*'
    global afterarray
    afterarray = False
    t.type = predefinedvariables.get(t.value[1:], 'PREVAR')
    return t

def t_VAR(t):
    r'[a-zA-Z_][a-zA-Z0-9_]*'
    global afterarray
    afterarray = True
    t.type = syntaxtokens.get(t.value, 'VAR')
    return t

def t_COMPARISON(t):
    r'<>|[<>~=]=|[<>]'
    global afterarray
    afterarray = False
    t.state = 'COMPARISON'
    return t

def t_LASTINDEX(t):
    r'\$'
    global afterarray
    afterarray = False
    t.state = 'LASTINDEX'
    return t

def t_EOL(t):
    r'\n'
    global afterarray, brackets
    if brackets == 0:
        afterarray = False
        t.state = 'EOL'
        return t

def t_DOT(t):
    r'\.'
    global afterarray
    afterarray = False
    t.state = 'DOT'
    return t

def t_OPERATOR(t):
    r'[+\-*/^\\]'
    global afterarray
    afterarray = False
    t.state = 'OPERATOR'
    return t

def t_COMMA(t):
    r','
    global afterarray
    afterarray = False
    t.state = 'COMMA'
    return t

def t_OPENSQBRACKET(t):
    r'\['
    global afterarray, brackets
    afterarray = False
    brackets += 1
    t.state = 'OPENSQBRACKET'
    return t

def t_CLOSESQBRACKET(t):
    r'\]'
    global afterarray, brackets
    afterarray = True
    brackets -= 1
    t.state = 'CLOSESQBRACKET'
    return t

def t_OPENBRACKET(t):
    r'\('
    global afterarray, brackets
    afterarray = False
    brackets += 1
    t.state = 'OPENBRACKET'
    return t

def t_CLOSEBRACKET(t):
    r'\)'
    global afterarray, brackets
    afterarray = True
    brackets -= 1
    t.state = 'CLOSEBRACKET'
    return t

def t_SEMICOLON(t):
    r';'
    global afterarray
    afterarray = False
    t.state = 'SEMICOLON'
    return t

def t_NOT(t):
    r'~'
    global afterarray
    afterarray = False
    t.state = 'NOT'
    return t

def t_LOGICAL(t):
    r'[&|]'
    global afterarray
    afterarray = False
    t.state = 'LOGICAL'
    return t

def t_ASSIGNMENT(t):
    r'='
    global afterarray
    afterarray = False
    t.state = 'ASSIGNMENT'
    return t

def t_COLON(t):
    r':'
    global afterarray
    afterarray = False
    t.state = 'COLON'
    return t

def t_error(t):
    print("Illegal character '%s'" % t.value[0])
    t.lexer.skip(1)

def t_TRANSPOSE(t):
    r"'"
    global afterarray, qstring
    if afterarray:
        afterarray = False
        t.state = 'TRANSPOSE'
        return t
    t.lexer.begin('qstring')
    qstring = t.value

def t_begin_dqstring(t):
    r'"'
    global afterarray, dqstring
    afterarray = False
    t.lexer.begin('dqstring')
    dqstring = t.value

def t_qstring_COMMENT(t):
    r'\.\.+[ \t]*(//.*)?\n'
    pass

def t_dqstring_COMMENT(t):
    r'\.\.+[ \t]*(//.*)?\n'
    pass

def t_qstring_char(t):
    r'\.|[^\'".]+'
    global qstring
    qstring += t.value

def t_dqstring_char(t):
    r'\.|[^\'".]+'
    global dqstring
    dqstring += t.value

def t_qstring_quote(t):
    r'\'\'|""'
    global qstring
    qstring += '\\' + t.value[0]

def t_dqstring_quote(t):
    r'\'\'|""'
    global dqstring
    dqstring += '\\' + t.value[0]

def t_qstring_end(t):
    r"'"
    global qstring
    t.lexer.begin('INITIAL')
    qstring += t.value
    t.type = 'QSTRING'
    t.value = qstring
    return t

def t_dqstring_end(t):
    r'"'
    global dqstring
    t.lexer.begin('INITIAL')
    dqstring += t.value
    t.type = 'DQSTRING'
    t.value = dqstring
    return t

def t_qstring_error(t):
    print("Illegal character '%s' in qstring" % t.value[0])
    t.lexer.skip(1)

def t_dqstring_error(t):
    print("Illegal character '%s' in dqstring" % t.value[0])
    t.lexer.skip(1)

lexer = lex.lex()

if __name__ == '__main__':
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
