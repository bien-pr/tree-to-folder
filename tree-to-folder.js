// Make sure we got a filename on the command line.
if (process.argv.length < 3) {
  console.log('Usage: node ' + process.argv[1] + ' FILENAME PATH');
  process.exit(1);
}

var mkdirp = require('mkdirp');

var fs = require('fs')
  , filename = process.argv[2]
  , pathname = process.argv[3];
fs.readFile(filename, 'utf8', function(err, data) {
  if (err) throw err;
  console.log('OK: Open ' + filename);
  data = data.replace(/\r\n/g,'\n')
  var lines = data.split('\n');
  
  var j = 0;
  var h = 0;
  var path = [];
  if(pathname==null){
    path[0] = 'tree';
  } else {
    path[0] = pathname;
  }

  for (var i = 0; i < lines.length; i++) {
  	//console.log(lines[i]);
  	var folder = lines[i].split('---');
  	if(folder.length>1)
  	{
  		var folderDepth = ((folder[0].length-1) / 4)+1;
  		var folderName = folder[folder.length-1];
  		h = h < folderDepth ? folderDepth : h;

  		//console.log('name: ' + folderName + ', folderDepth: ' + folderDepth);
  		
  		path[folderDepth] = folderName; 
  		var dir = '';
  		for (var p = 0; p < path.length && p < folderDepth + 1  ; p++) {
  			dir += '/' + path[p];
  		}
  		
  		mkdirp(dir, function(err) {});
  		j++;
  	}
  }
  console.log('OK: Create ' + j + ' folders');
  //console.log("Highest depth: " + h);
});