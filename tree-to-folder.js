// Make sure we got a filename on the command line.
if (process.argv.length < 3) {
  console.log('Usage: node ' + process.argv[1] + ' FILENAME');
  process.exit(1);
}

function Folder(){
	this.name;
	this.parent;
	this.depth;
}
Folder.prototype.setName = function(name){
	this.name = name;
}
Folder.prototype.setParent = function(parent){
	this.parent = parent;
}
Folder.prototype.setDepth = function(depth){
	this.depth = depth;
}
Folder.prototype.getName = function(){
	return this.name;
}
Folder.prototype.getParent = function(){
	return this.parent;
}
Folder.prototype.getDepth = function(){
	return this.depth;
}

var folders = [];
var mkdirp = require('mkdirp');

var fs = require('fs')
  , filename = process.argv[2];
fs.readFile(filename, 'utf8', function(err, data) {
  if (err) throw err;
  console.log('OK: ' + filename);
  data = data.replace(/\r\n/g,'\n')
  var lines = data.split('\n');
  console.log(lines.length +  ' line');
  var j = 0;
  var h = 0;
  var path = [];
  path[0] = 'gun';
  for (var i = 0; i < lines.length; i++) {
  	var folder = lines[i].split('---');
  	if(folder.length>1)
  	{
  		var depth = lines[i].split('|');
  		
  		folders[j] = new Folder();
  		folders[j].setName(folder[folder.length-1]);
  		folders[j].setParent('');
  		folders[j].setDepth(depth.length);
  		
  		h = h < folders[j].getDepth() ? folders[j].getDepth() : h;

  		//if(folders[j].getDepth()>5 )console.log('name: ' + folders[j].getName() + ', depth: ' + folders[j].getDepth());
  		
  		path[folders[j].getDepth()] = folders[j].getName(); 
  		var dir = '';
  		for (var p = 0; p < path.length && p < folders[j].getDepth() + 1  ; p++) {
  			dir += '/' + path[p];
  		}
  		
  		mkdirp(dir, function(err) {});
  		j++;
  	}
  }

  console.log("Highest depth: " + h);
});