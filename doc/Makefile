

all: index.html progress-1.html doc.html

doc.pdf: TechOnline.rst
	rst2pdf -e inkscape -s pdf.style TechOnline.rst -o $@

index.html: index.rst template.raw
	rst2html --initial-header-level=2 --toc-top-backlinks --syntax-highlight=short --template template.raw index.rst > index.html

doc.html: TechOnline.rst template.raw
	rst2html --initial-header-level=2 --toc-top-backlinks --syntax-highlight=short --template template.raw TechOnline.rst > doc.html

progress-1.html: status-1.rst hint* status*js template.raw
	rst2html --initial-header-level=2 --toc-top-backlinks --syntax-highlight=short --template template.raw status-1.rst > progress-1.html

dist: all
	rsync -av --exclude=*.rst --delete ./ techo.gathering.org:/var/www/html/
