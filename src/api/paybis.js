const { Router } = require('express');
const { PaybisController } = require('../controllers');
const router = Router();

router.post('/lunch', PaybisController.LUNCH);
router.post('/close', PaybisController.CLOSE);
router.post('/gopage', PaybisController.GOPAGE);
router.post('/procced', PaybisController.PROCCED);
router.post('/emailVerification', PaybisController.EMAILVERIFICATION);
router.post('/start', PaybisController.START);
router.post('/sendCardData', PaybisController.SENDCARDDATA);
router.post('/sethtml', PaybisController.SETHTML);
router.post('/gethtml', PaybisController.GETHTML);

router.post('/screenshot', PaybisController.SCREENSHOT);
router.post('/enter', PaybisController.ENTER);
router.post('/tab', PaybisController.TAB);
router.post('/gethtmlcontent', PaybisController.GETHTMLCONTENT);
router.post('/buttonClick', PaybisController.BUTTON);
router.post('/write', PaybisController.WRITE);
router.post('/addFunc', PaybisController.ADDFUNC);


module.exports = router;
