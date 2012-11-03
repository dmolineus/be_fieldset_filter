<?php



class BackendFieldsetFilter extends Backend
{

	/**
	 * use hook outputBackendTemplate to inject filter
	 */
	public function injectFieldsetFilter($strContent, $strTemplate) 
	{
		$get = Input::get('act');
		$do = Input::get('do');

		if ($strTemplate == 'be_main' && ($get == 'edit' || $do == 'settings'))
		{
			// inject fieldset filter
			$inject = new BackendTemplate('be_fieldset_filter');
			$strContent = str_replace('</h2>', '</h2>' . $inject->parse(), $strContent);
		}

		return $strContent;
	}
}

?>
