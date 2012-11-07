window.addEvent('domready', function() {
	// stop form being processed
	$$('.beFieldsetFilter').addEvent('submit', function(event) {
		if(event) {
			event.stop();
		}
	});

	// add clear method to clear button 
	$$('.beFieldsetFilter .clear').addEvent('click', function(event) {
		// somehow not everytime a event object is there...		
		if(event) {
			event.stop();
		}
		$$('.beFieldsetFilter .search').set('value', '');
		// fire keyup event to display elements
		$$('.beFieldsetFilter .search').fireEvent('keyup');
	});

	// trigger clear if escape key is pressed
	$$('.beFieldsetFilter .search').addEvent('keydown', function(event) {
		// somehow not everytime a event object is there...
		// so keydown:keys(esc) would throw an exception sometimes
		if(event && event.key == 'esc') {
			$$('.beFieldsetFilter .clear').fireEvent('click');
		}
	});

	// remove classes if legend is toggled
	$$('fieldset legend').addEvent('click', function(event) {
		var fieldSet = this.getParent();
		fieldSet.removeClass('beFieldsetCollapsed');
		fieldSet.removeClass('beFieldsetOpen');
		fieldSet.getElements('.hidden').removeClass('hidden');
	});

	// filter after inserting search string
	$$('.beFieldsetFilter .search').addEvent('keyup', function() {
		var el = $$(this);
		var val = new String(el.get('value'));
		var hideFields = true;
		var clearBtn = $$('.beFieldsetFilter .clear');
		var minLength = 3;
		var fieldSets = $$('.tl_formbody_edit > fieldset');


		// only show clear button if search box has text
		if(val.length > 0) {
			clearBtn.removeClass('hidden');
		}
		else {
			clearBtn.addClass('hidden');
		}

		// clear if nothing is searched 
		// remove all added classes
		if(val.length == 0) {
			fieldSets.removeClass('beFieldsetCollapsed');
			fieldSets.removeClass('beFieldsetOpen');
			fieldSets.each( function(fieldSet){
				fieldSet.getElements('.hidden').removeClass('hidden');
			});
			return;	
		}

		// set text length as min 3
		if(val.length < minLength) {
			return;
		}

		// go through each fieldset
		fieldSets.each(function(box) {			
			var added = false;
			var legend = box.getChildren('legend');
			var showBox = false;

			// lengend match so show every legend element 
			if(legend) {
				legend.each( function(legend) {
					var text = legend.get('text');

					if(text.test(val, 'i')) {
						box.removeClass('beFieldsetCollapsed');
						box.addClass('beFieldsetOpen');
						showBox = true;

						box.getElements('.hidden').removeClass('hidden');
					}
				});
			}

			// check every element and hide elements if nessecary
			if(!showBox) {
				box.getElements('label, fieldset legend').each( function(label) {
			
					var text = label.get('text');

					if(text.test(val, 'i')) {
						box.removeClass('beFieldsetCollapsed');
						box.addClass('beFieldsetOpen');
						added = true;
						if( hideFields) {
							label.getParent().getParent().removeClass('hidden');
						}
					}
					else {
						if(added == false) {
							box.addClass('beFieldsetCollapsed');
							box.removeClass('beFieldsetOpen');
						}

						if(hideFields) {
							label.getParent().getParent().addClass('hidden');
						}
					}

					// fire event for supporting M17StickyFooter
					// if m17 StickyFooter isn't installed nothing should happen
					box.fireEvent('click:relay(legend)');
				});
			}

		});
	});
});
