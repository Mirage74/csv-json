const {inputFile, fixName, beginURL, endURL} = require ('./config')
const fs = require('fs')
const lineByLine = require('n-readlines')

const fdLog = fs.openSync(fixName, "w")

const fdInputData = fs.openSync(inputFile, "r")


fs.appendFileSync(fdLog, `exports.imagesFix =\n`)
fs.appendFileSync(fdLog, `[`)

const liner = new lineByLine(fdInputData)


let line

function getFileName(str) {
  let temp = ""
  i = str.length
  //while ( (str.charAt(i) !== "-") && (str.charAt(i) !== "/") ){
  while (str.charAt(i) !== "/") {
    temp = str.charAt(i) + temp
    i--
  }
  return temp
}


// function getDirName(str) {
//
//   i = str.length
//   while (str.charAt(i) !== "-") {
//     i--
//   }
//   i--
//   let temp = ""
//   while (str.charAt(i) !== "/") {
//     temp = str.charAt(i) + temp
//     i--
//   }
//   return temp
// }

let curID = 1
while (line = liner.next()) {
  line = line.toString('ascii')
  let firstBeginURL =  line.indexOf(beginURL)
  let lastEndURL = line.lastIndexOf(endURL)
  line = line.substring(firstBeginURL,  lastEndURL + 3)
  line = line.toString('ascii')
  fname = getFileName(line)
  //dirName = getDirName(line)

  fs.appendFileSync(fdLog, `  {\n`)
  fs.appendFileSync(fdLog, `    sourceImageID : ${curID},\n`)
  fs.appendFileSync(fdLog, `    sourceUrl : "${line}",\n`)
//  fs.appendFileSync(fdLog, `    saveLocation : "${dirName}",\n`)
  fs.appendFileSync(fdLog, `    fileName : "${fname}",\n`)
  fs.appendFileSync(fdLog, `    processType : "p",\n`)
  fs.appendFileSync(fdLog, `    result_code : 0\n`)
  fs.appendFileSync(fdLog, `  },\n`)



  // let oneRec = {}
  // oneRec.sourceImageID = curID
  // oneRec.sourceUrl = line,
  // oneRec.saveLocation = dirName,
  // oneRec.fileName = fname,
  // oneRec.processType = "p",
  // oneRec.result_code = 0

  //fs.appendFileSync(fdLog, `${oneRec},\n`)
  curID++
}

fs.appendFileSync(fdLog, `]`)
fs.closeSync(fdLog)
//fs.closeSync(fdInputData)
