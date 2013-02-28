/*
	Name: JsTerm.Program.Cat
	Author: Tim Carter
	Description: simulates 'cat' though for now it just outputs the passed-in files
*/

Uize.module ({
	name:'JsTerm.Program.Cat',
	required:'Uize.Comm',
	builder:function (_superclass) {
		var
			_class = _superclass.subclass (),
			_classPrototype = _class.prototype
		;

		_classPrototype.execute = function () {
			var
				_this = this,
				_callback = _this.get ('callback'),
				_option,
				_dateObject,
				_workingDirectoryContents = _this.getInherited('filesystem').get('workingDirectory').get('contents'),
				_filesToTest = [],
				_arguments = _this.get('argv'),
				_argumentsLength = _arguments.length,
				_index = 0,
				_option
			;

			// handle arguments
			Uize.Comm.processArrayAsync(
				_this.get('argv').slice(1),
				function (_option, _processNext) {
					if (_option in _workingDirectoryContents) {
						if (_option.indexOf ('JsTerm.FileSystemObject.Folder')) {
							Uize.require(
								_workingDirectoryContents[_option],
								function (_optionClass) {
									_this.echo(_optionClass.get('contents'));
									_processNext();
								}
							)
						} else {
							_this.echo ('cat: ' + _option + ': Is a directory');
							_processNext();
						}
					} else {
						_this.echo ('cat: ' + _option + ': No such file or directory');
						_processNext();
					}
				},
				function() {
					_callback && typeof _callback == 'function' && _callback ()
				}
			);
		};

		return _class;
	}
});
