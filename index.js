#!/usr/bin/env node
var program = require('commander');
var exec = require('child_process').exec;
var cmd = null;

program
.version('1.0.0')
.option('-g, --get', 'Get current governor')
.option('-s, --set', 'Set governor immediatly')
.option('-l, --list', 'Get available governors')
.parse(process.argv);

if (program.get){
  cmd = "cat /sys/devices/system/cpu/cpu0/cpufreq/scaling_governor";
}
if (program.set){
  var governorToSet = "ondemand";

  if(program.args.length > 0){
    governorToSet = program.args[0];
  }

  cmd = "echo "+ governorToSet +"  > /sys/devices/system/cpu/cpu0/cpufreq/scaling_governor"
}
if (program.list){
  cmd = "cat /sys/devices/system/cpu/cpu0/cpufreq/scaling_available_governors";
}

if(cmd !== null){
  exec(cmd, function(error, stdout, stderr) {

    if(stderr){
      console.log(stderr);
    }else {
      console.log(stdout);
    }
  });
}
