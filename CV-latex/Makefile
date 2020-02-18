FILE = cv

PRINTER = lp

all:	
	latex $(FILE)
	#bibtex 	$(FILE)
	#latex $(FILE)
	dvips -t letter -f $(FILE) -o $(FILE).ps
	ps2pdf 	$(FILE).ps $(FILE).pdf	
ps: 	
	dvips -t a4 -f $(FILE) -o $(FILE).ps	
pdf: 
	# dvipdf -sPAPERSIZE=a4 -f $(FILE) > $(FILE).pdf	
	#dvipdf -f -sPAPERSIZE=letter $(FILE) > $(FILE).pdf
	#dvips -t letter -f $(FILE) -o $(FILE).ps
	ps2pdf 	$(FILE).ps $(FILE).pdf
	#dvipdf  -sPAPERSIZE=a4 -f $(FILE) > $(FILE).pdf
html:
	latex2html -no_math -html_version 3.2,math -split 0 $(FILE).tex 	
clean:
	rm -f *~ $(FILE).log $(FILE).dvi $(FILE).bbl $(FILE).blg $(FILE).aux

