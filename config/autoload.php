<?php

/**
 * Contao Open Source CMS
 * 
 * Copyright (C) 2005-2012 Leo Feyer
 * 
 * @package Be_fieldset_filter
 * @link    http://contao.org
 * @license http://www.gnu.org/licenses/lgpl-3.0.html LGPL
 */


/**
 * Register the classes
 */
ClassLoader::addClasses(array
(
	// Classes
	'BackendFieldsetFilter' => 'system/modules/be_fieldset_filter/classes/BackendFieldsetFilter.php',
));


/**
 * Register the templates
 */
TemplateLoader::addFiles(array
(
	'be_fieldset_filter' => 'system/modules/be_fieldset_filter/templates',
));
