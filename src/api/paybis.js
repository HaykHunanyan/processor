const { Router } = require('express');
const { PaybisController } = require('../controllers');
const router = Router();

router.post('/lunch', PaybisController.LUNCH);
router.post('/close', PaybisController.CLOSE);
router.post('/gopage', PaybisController.GOPAGE);
router.post('/procced', PaybisController.PROCCED);
router.post('/emailVerification', PaybisController.EMAILVERIFICATION);
router.post('/start', PaybisController.START);
router.post('/send-card-data', PaybisController.SENDCARDDATA);
router.post('/sethtml', PaybisController.SETHTML);
router.post('/check-data-content', PaybisController.GETHTML);

router.post('/screenshot', PaybisController.SCREENSHOT);
router.post('/enter', PaybisController.ENTER);
router.post('/tab', PaybisController.TAB);
router.post('/gethtmlcontent', PaybisController.GETHTMLCONTENT);
router.post('/buttonClick', PaybisController.BUTTON);
router.post('/write', PaybisController.WRITE);
router.post('/addFunc', PaybisController.ADDFUNC);
router.post('/action', PaybisController.ACTION);
router.post('/check-start', PaybisController.CANSTART);
router.post('/haveUser', PaybisController.HAVEUSER);
router.post('/set-amount', PaybisController.SETAMOUNT);
router.post('/check-card-data-v2', PaybisController.CHECKCARDDATA);

module.exports = router;
