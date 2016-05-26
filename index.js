module.exports = function GruntRunCMD(grunt){
  grunt.registerTask('run-cmd', function(directory, cmd, csvArgs){
    var next = this.async();
    var deployTask = grunt.util.spawn({
      cmd: cmd,
      args: csvArgs?csvArgs.split(','):[],
      opts: {
        cwd: directory
      }
    }, function (err, result, code) {
      if (err) {
        grunt.fail.fatal(err, code);
        next(code);
      } else {
        grunt.log.ok();
        next();
      }
    });
    if (typeof deployTask === 'undefined') {
      grunt.fail.fatal(cmd + ' task failed. Is \''+cmd+'\' on PATH?');
    }
    deployTask.stdout.on('data', function (buf) {
      grunt.log.write(String(buf));
    });
    deployTask.stderr.on('data', function (buf) {
      grunt.log.error(String(buf));
    });
  });
};