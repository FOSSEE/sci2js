SCIFILES := $(wildcard macros/*/*.sci)

JSFILES := $(SCIFILES:macros/%.sci=js/%.js)

JSDIRS := $(sort $(dir $(JSFILES)))

all: $(JSFILES)

js/%.js: macros/%.sci sci2jsyacc.py parsetab.py sci2jslex.py Makefile
	./sci2jslex.py $< > $@
	#./sci2jslex.py $< > $@ 2>&1 && ./sci2jsyacc.py $< >> $@ 2>&1

parsetab.py: sci2jsyacc.py sci2jslex.py
	@rm -f $@* parser.out
	./sci2jsyacc.py /dev/null > /dev/null

$(JSFILES): | $(JSDIRS)

$(JSDIRS):
	mkdir -p $@

yacc: macros/Sinks/CSCOPE.sci
	./sci2jslex.py $< 2>&1 && ./sci2jsyacc.py $< 2>&1

.SECONDARY:
