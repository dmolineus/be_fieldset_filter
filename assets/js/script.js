window.addEvent('domready', function() {
	// add clear method to clear button 
	$$('.beFieldsetFilter .clear').addEvent('click', function(event) {
		event.stop();
		$$('.beFieldsetFilter .search').set('value', '');
		// fire keyup event to display elements
		$$('.beFieldsetFilter .search').fireEvent('keyup');
	});

	$$('.beFieldsetFilter .search').addEvent('keyup', function() {
		var el = $$(this);
		var val = new String(el.get('value'));
		var hideFields = true;
		var clearBtn = $$('.beFieldsetFilter .clear');

		// only show clear button if search box has text
		if(val.length > 0) {
			clearBtn.removeClass('hidden');
		}
		else {
			clearBtn.addClass('hidden');
		}

		// set text length as min 3
		if(val.length > 0 && val.length < 3) {
			return;
		}

		// go through each fieldset
		$$('.tl_formbody_edit > fieldset').each(function(box) {			
			var added = false;
			var legend = box.getChildren('legend');
			var showBox = false;

			// lengend match so show every legend element 
			if(legend) {
				legend.each( function(legend) {
					var text = legend.get('text');

					if(text.test(val, 'i')) {
						box.removeClass('collapsed');
						box.getElements('.hidden').removeClass('hidden');
						showBox = true;
					}
				});
			}

			// check every element and hide elements if nessecary
			if(!showBox) {
				box.getElements('label, fieldset legend').each( function(label) {
			
					var text = label.get('text');

					if(text.test(val, 'i')) {
						box.removeClass('collapsed');
						added = true;
						if( hideFields) {
							label.getParent().getParent().removeClass('hidden');
						}
					}
					else {
						if(added == false) {
							box.addClass('collapsed');
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
