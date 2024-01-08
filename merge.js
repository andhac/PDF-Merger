const PDFMerger = require("pdf-merger-js");
const {merge} = require("nodemon/lib/utils");


const mergePDF = async (files, ...pages) => {
  console.log(pages)
  const merger = new PDFMerger();
  await Promise.all(files.map((file, index) => {
   if(pages[index].length != []) {
     return merger.add(file, pages[index])
   }else{
     return merger.add(file)
   }
  }))
  let d = new Date().getTime();
  await merger.save(`public/${d}.pdf`); //save under given name and reset the internal document
  return d;
};

module.exports = { mergePDF };
