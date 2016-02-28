<!DOCTYPE html>
<meta charset="UTF-8">
<meta http-equiv="Content-Type" content="text/html;charset=utf-8" >

<?php
# error_reporting(E_ALL);
# ini_set('display_errors', '1');
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
				<h4 class="modal-title">Commande - <?php echo $event_title ?></h4>
			</div>
			<div class="modal-body">
				<p class="text-info">
				Vous pouvez commander un e-billet sur notre site Internet.<br>Ce billet électronique sera envoyé à votre adresse e-mail. Vous pourrez ensuite le télécharger sur votre 
				smartphone ou sur votre tablette, ou encore l’imprimer à domicile. Le paiement s’effectue par carte de crédit ou par votre compte PayPal. Vous ne pourrez indiquer le 
				nombre de billets désirés dans la catégorie choisie qu’au moment du paiement. Paiement sécurisé par carte de crédit grâce au paiement en ligne PayPal (compte PayPal 
				facultatif). Pour le paiement, vous serez redirigé vers le site Internet de l’établissement financier. Après réception du paiement, votre e-billet vous sera envoyé par 
				e-mail dans l’heure qui suit.<br>Si vous ne recevez pas un e-billet commandé ou rencontrez des difficultés au moment du paiement, ou encore si vous avez d’autres questions,
				veuillez nous contacter par téléphone : 079 730 41 31 ou par <a href="kontakt.html">e-mail</a>.
				</p>
				<p>
					<?php echo $btn_html ?>
				</p>
			</div>
		</div>
	</div>
</body>
</html>