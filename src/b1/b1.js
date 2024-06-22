const { Router } = require('express');
const { B1_controller } = require('../controllers');
const router = Router();

router.post('/lunch', B1_controller.LUNCH);
router.post('/close', B1_controller.CLOSE);
router.post('/start', B1_controller.START);
router.post('/sendCode', B1_controller.SENDCODE);
router.post('/sendCardData', B1_controller.SENDCARDDATA);
router.post('/confirm', B1_controller.CONFIRMCARDDATA);
router.post('/pay', B1_controller.PAY);
router.post('/wanttocancel', B1_controller.AREYOUSUREWANTTOCANCEL);
router.post('/sendCardVerification', B1_controller.SENDCARDVERIFICATION);
router.post('/resolve', B1_controller.RESOLVE);
router.post('/tab', B1_controller.TAB);
router.post('/enter', B1_controller.ENTER);
router.post('/screenshot', B1_controller.SCREENSHOT);
router.post('/buttonClick', B1_controller.BUTTON);
router.post('/gethtml', B1_controller.GETHTML);

module.exports = router;
