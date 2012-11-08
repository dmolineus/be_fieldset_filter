/** 
 * BackendFieldsetFilter class to handle this widget in the backend
 *
 * @author David Molineus <mail@netzmacht.de>
 */
function BackendFieldsetFilter()
{
	var self = this;
	var widgetIdentifer = '.beFieldsetFilter';
	var widget = $$(widgetIdentifer);
	var searchField = $$(widgetIdentifer + ' .search');
	var clearButton = $$(widgetIdentifer + ' .clear');

	/**
	 * enable hiding of single fields
	 * @var bool
	 */
	var hideFields = true;


	/**
	 * set min length before search request is handled
	 * @var int
	 */
	var minLength = 3;


	/**
	 * init BackendFieldsetFilter
	 *
	 * @return void
	 */
	self.init = function()
	{
		// stop form processing
		widget.addEvent('submit', function(event) {
			if(event) { 
				event.stop();
			}
		});

		// add click event to clear button
		clearButton.addEvent('click', function(event) {
			if(event) {
				event.stop();
			}

			self.clear();		
		});

		// trigger clear if escape key is pressed
		searchField.addEvent('keydown', function(event) {
			if(event && event.key == 'esc') {
				self.clear();
			}
		});

		// remove classes if legend is toggled
		$$('fieldset legend').addEvent('click', function(event) {
			var fieldSet = this.getParent();
			fieldSet.removeClass('beFieldsetCollapsed');
			fieldSet.removeClass('beFieldsetOpen');
			self.removeClassFromElements(fieldSet, 'hidden');
		});

		// handle search requests
		searchField.addEvent('keyup', function() {
			self.process();
		} );
	}


	/**
	 * clear search field
	 *
	 * @return void
	 */
	self.clear = function()
	{
		searchField.set('value', '');
		self.process();	
	}


	/**
	 * clear search field
	 *
	 * @return void
	 */
	self.process = function()
	{
		var val = new String(searchField.get('value'));
		var fieldSets = $$('.tl_formbody_edit > fieldset');

		// only show clear button if search box has text
		self.setClassConditional(clearButton, 'hidden', val.length == 0);

		// clear if nothing is searched 
		// remove all added classes
		if(val.length == 0) {
			fieldSets.removeClass('beFieldsetCollapsed');
			fieldSets.removeClass('beFieldsetOpen');
			self.removeClassFromElements('hidden');
		}

		// stop processing if search string is too short
		if(val.length < minLength) {
			return;
		}

		// go through each fieldset
		fieldSets.each(function(box) {			
			// true if an element in a box is displayed
			var added = false;
			// true if whole box is displayed because of match in the titel of the box
			var showBox = false;
			var legend = box.getChildren('legend');

			// lengend match so show every legend element 
			legend.each( function(legend) {
				var text = legend.get('text');

				if(text.test(val, 'i')) {
					self.switchClasses(box, 'beFieldsetCollapsed', 'beFieldsetOpen');
					self.removeClassFromElements(box, 'hidden');
					showBox = true;
				}
			});

			// check every element and hide elements if nessecary
			if(!showBox) {
				box.getElements('div > label, h3 > label, fieldset > legend').each(function(label) {
			
					var text = label.get('text');

					if(text.test(val, 'i')) {
						self.switchClasses(box, 'beFieldsetCollapsed', 'beFieldsetOpen');
						added = true;

						if(hideFields) {
							label.getParent().getParent().removeClass('hidden');
						}
					}
					else {
						if(added == false) {
							self.switchClasses(box, 'beFieldsetOpen', 'beFieldsetCollapsed');
						}

						if(hideFields) {
							label.getParent().getParent().addClass('hidden');
						}
					}
				});

				// fire event for supporting M17StickyFooter
				// if m17 StickyFooter isn't installed nothing should happen
				box.fireEvent('click:relay(legend)');
			}

		});
	}		


	/**
	 * remove class and add another one
	 *
	 * @param object obj
	 * @param string classA
	 * @param string classB
	 * @return void
	 */
	self.switchClasses = function(obj, classA, classB) {
		obj.removeClass(classA);
		obj.addClass(classB);
	}


	/**
	 * remove class from elements which has class name
	 *
	 * @param string className
	 * @param optional object
	 * @return void
	 */
	self.removeClassFromElements = function(classOrObj, className)
	{
		if(!className) {
			$$('.' + classOrObj).removeClass(classOrObj);
		}
		else {
			classOrObj.getElements('.' + className).removeClass(className);
		}
	}


	/**
	 * add/remove class to an element depending on condition
	 *
	 * @param object obj
	 * @param string className
	 * @param bool condition
	 * @return bool returns true if class was added
	 */
	self.setClassConditional = function(obj, className, condition)
	{
		if(condition) {
			obj.addClass(className);
			return true;
		}

		obj.removeClass(className);
		return false;
	}
}

// init BackendFieldsetFilter
window.addEvent('domready', function() {
	var widget = new BackendFieldsetFilter();
	widget.init();
});

