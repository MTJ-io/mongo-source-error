#Mongo Source Error

This repository will not work!

Please check gatsby-config.js to see how gatsby-source-mongodb has been configured.

'submissions' is a collection
'students' and 'projects' are both mongodb views that source data from submissions

If 'submissions' is removed from array of collections 'students' and 'projects' work correctly.

With 'submissions' included then there are intermittent errors when sourcing student nodes and some projects fields disappear completely.
