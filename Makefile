SCIFILES := $(wildcard macros/*/*.sci)

JSFILES := $(SCIFILES:macros/%.sci=js/%.js)

JSDIRS := $(sort $(dir $(JSFILES)))

all: combined.js

combined.js: $(JSFILES) Makefile
	@echo -n "Making $@ ... "; \
	count=0 totalcount=0; \
	for f in $(JSFILES); do \
	    totalcount=$$(( totalcount+1 )); \
	    grep -q 'Syntax error' $$f && continue; \
	    cat $$f; \
	    count=$$(( count+1 )); \
	done > $@; \
	echo >> $@; \
	echo "/* made from $$count/$$totalcount files */" >> $@; \
	echo "made $@ from $$count/$$totalcount files"

js/%.js: macros/%.sci sci2jsyacc.py parsetab.py sci2jslex.py
	./sci2jslex.py $< > js/$*.lex
	./sci2jsyacc.py $< > $@ 2> js/$*.yacc

parsetab.py: sci2jsyacc.py sci2jslex.py
	@rm -f $@* parser.out
	./sci2jsyacc.py /dev/null > /dev/null

$(JSFILES): | $(JSDIRS)

$(JSDIRS):
	mkdir -p $@

yacc: macros/Sinks/CSCOPE.sci
	./sci2jslex.py $< 2>&1 && ./sci2jsyacc.py $< 2>&1

.SECONDARY:
