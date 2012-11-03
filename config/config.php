<?php 

/**
 * Contao Open Source CMS
 * 
 * Copyright (C) 2005-2012 Leo Feyer
 * 
 * @package   be_fieldset_filter 
 * @author    David Molineus 
 * @license   none 
 * @copyright netzmacht creative 2012 
 */

// add hook to inject fieldset filter
$GLOBALS['TL_HOOKS']['outputBackendTemplate'][] = array('BackendFieldsetFilter', 'injectFieldsetFilter');

// load assets
if(TL_MODE == 'BE')
{
    $GLOBALS['TL_CSS'][] = 'system/modules/be_fieldset_filter/assets/css/style.css';
    $GLOBALS['TL_JAVASCRIPT'][] = 'system/modules/be_fieldset_filter/assets/js/script.js';
}
