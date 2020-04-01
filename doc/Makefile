

all: index.html progress-1.html

index.html: TechOnline.rst template.raw
	rst2html --initial-header-level=2 --toc-top-backlinks --syntax-highlight=short --template template.raw TechOnline.rst > index.html

progress-1.html: status-1.rst hint* status*js template.raw
	rst2html --initial-header-level=2 --toc-top-backlinks --syntax-highlight=short --template template.raw status-1.rst > progress-1.html
