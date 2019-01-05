<?php

require('phpQuery/phpQuery.php');

$myData = '<html>'.$_POST['html'].'</html>';

$doc = phpQuery::newDocument($myData);

$doc['.modal']->remove();
$doc['.es-header-menu']->remove();

$html=$doc->htmlOuter();

header('Content-Description: File Transfer');
header('Content-Type: text/html');
header('Content-Disposition: attachment; filename="template.html"');
header('Expires: 0');
header('Cache-Control: must-revalidate');
header('Pragma: public');
header('Content-Length: ' . strlen($html));
flush(); // Flush system output buffer
echo ($html);
exit;


//$file = 'index.html';
//
//if (file_exists($file)) {
//    header('Content-Description: File Transfer');
//    header('Content-Type: application/octet-stream');
//    header('Content-Disposition: attachment; filename="'.basename($file).'"');
//    header('Expires: 0');
//    header('Cache-Control: must-revalidate');
//    header('Pragma: public');
//    header('Content-Length: ' . filesize($file));
//    readfile($file);
//    exit;
//}

?>