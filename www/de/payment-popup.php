<!DOCTYPE html>
<meta charset="UTF-8">
<meta http-equiv="Content-Type" content="text/html;charset=utf-8" >

<?php
error_reporting(E_ALL);
ini_set('display_errors', '1');
require '../ppbuttons.php';
	$res = getPpButtonDetailsFromRequest();
	$event_id = $res['event_id'];
	$event_title = $res['event_title'];
	$btn_html = $res['btn_html'];
?>
<html>
<body>
	<div id="<?php echo $event_id ?>" class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
				<h4 class="modal-title">Bestellung - <?php echo $event_title ?></h4>
			</div>
			<div class="modal-body">
				<p class="text-info">
				Auf unserer Website können Sie ein E-Ticket bestellen. Das E-Ticket wird an Ihre E-Mail-Adresse gesendet und Sie können das E-Ticket auf Ihr Smartphone oder Tablett laden oder auf Papier ausdrucken.
Die Bezahlung erfolgt per Kreditkarte oder mit Ihrem PayPal-Konto. Die Anzahl der gewünschten Karten in der ausgewählten Kategorie können Sie erst bei der Zahlung angeben.
Sichere Zahlung per Kreditkarte über Zahlungssystem PayPal (PayPal-Konto optional).
Für die Zahlung werden Sie auf die Website des Finanzinstituts umgeleitet. Nach Eingang der Zahlung wird Ihnen Ihr E-Ticket innerhalb einer Stunde per E-Mail zugestellt.
Wenn Sie ein E-Ticket nicht erhalten oder Sie Schwierigkeiten bei der Bezahlung oder andere Fragen haben, kontaktieren Sie uns bitte per Telefon, email oder Kontaktformular.				
				</p>
				<p>
					<?php echo $btn_html ?>
				</p>
			</div>
		</div>
	</div>
</body>
</html>