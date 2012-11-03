window.addEvent('domready', function() {

	$$('.beFieldsetFilter .search').addEvent('keyup', function() {
		var el = $$(this);
		var val = new String(el.get('value')).toLowerCase();

		if(val.length < 3) {
			return;
		}

		$$('.tl_formbody_edit > fieldset').each(function(box) {			
			var added = false;

			box.getElements('label, fieldset legend').each( function(label) {
			
				var text = label.get('text');

				if(text.test(val, 'i')) {
					box.removeClass('collapsed');
					added = true;
				}
				else if(added == false) {
					box.addClass('collapsed');
				}

				// fire event for supporting M17StickyFooter
				// if m17 StickyFooter isnt installed nothing should happen
				box.fireEvent('click:relay(legend)');
			});

		});
	});
});
