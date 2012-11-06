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

			$strContent = preg_replace(
				'/<h1(\s*)class="main_headline">(.*)<\/h1>/U',
				"$0" . $inject->parse(),
				$strContent
			);
			//$strContent = str_replace('</h1>', '</h1>' . $inject->parse(), $strContent);
		}

		return $strContent;
	}
}

?>
