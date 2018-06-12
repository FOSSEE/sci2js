SCIFILES := $(wildcard macros/*/*.sci)

JSFILES := $(SCIFILES:macros/%.sci=js/%.js)

JSDIRS := $(sort $(dir $(JSFILES)))

all: $(JSFILES)

js/%.js: macros/%.sci sci2jslex.py
	./sci2jslex.py $< > $@

$(JSFILES): | $(JSDIRS)

$(JSDIRS):
	mkdir -p $@

yacc: macros/Sinks/CSCOPE.sci
	./sci2jslex.py $< 2>&1 && ./sci2jsyacc.py $< 2>&1
