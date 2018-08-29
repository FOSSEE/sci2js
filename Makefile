SCIFILES := $(wildcard macros/*/*.sci)

JSFILES := $(SCIFILES:macros/%.sci=js/%.js)
LEXFILES := $(SCIFILES:macros/%.sci=js/%.lex)

JSDIRS := $(sort $(dir $(JSFILES)))

all: combined.js

lexfiles: $(LEXFILES)

combined.js: $(JSFILES) Makefile
	@echo -n "Making $@ ... "; \
	count=0 totalcount=0; \
	for f in $(sort $(JSFILES)); do \
	    totalcount=$$(( totalcount+1 )); \
	    grep -q 'Syntax error' $$f && continue; \
	    cat $$f; \
	    count=$$(( count+1 )); \
	done > $@; \
	echo >> $@; \
	echo "/* made from $$count/$$totalcount files */" >> $@; \
	echo "made $@ from $$count/$$totalcount files"

js/%.lex: macros/%.sci sci2jslex.py
	./sci2jslex.py $< > js/$*.lex

js/%.pickle: macros/%.sci sci2jsyacc.py parsetab.py sci2jslex.py
	./sci2jsyacc.py $< $@ 1 > js/$*.js.old 2> /dev/null && $(RM) js/$*.js.old

js/%.js: macros/%.sci js/%.pickle sci2jsyacc.py parsetab.py sci2jslex.py
	./sci2jsyacc.py $< js/$*.pickle 2 > $@ 2> js/$*.yacc

parsetab.py: macros/Misc/DEBUG_SCICOS.sci sci2jsyacc.py sci2jslex.py
	@rm -f $@* parser.out
	./sci2jsyacc.py $< /dev/null 3 > /dev/null

$(JSFILES): | $(JSDIRS)
$(LEXFILES): | $(JSDIRS)

$(JSDIRS):
	mkdir -p $@

yacc: macros/Sinks/CSCOPE.sci
	./sci2jslex.py $< 2>&1 && ./sci2jsyacc.py $< /dev/null 3 2>&1

clean:
	$(RM) -r js
	$(RM) combined.js

.PHONY: lexfiles clean

.SECONDARY:
