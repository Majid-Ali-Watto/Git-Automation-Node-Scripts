import express from "express";
import { openMonoRepo } from "../Utils/GitTasks.js";
import { OpenVsCode } from "../Utils/Git.js";
const router = express.Router();


router.post("/openVsCode", (req, res) => {
    try {
        const { uc } = req.body;
        const flag = OpenVsCode(uc)
        res.json({ message: uc.toUpperCase() + " " + (flag == true ? "Opened in Vs Code." : 'Not Opened in Vs Code.') });
    } catch (error) {
        res.json({ error: error.message });
    }
});
router.post("/openOrRunMonoStory", (req, res) => {
    try {
        let flag = false;
        const { task } = req.body;
        if (task == 'open') flag = openMonoRepo('code .')
        res.json({ message: (flag == true ? "Opened in Vs Code." : 'Not Opened in Vs Code.') });
    } catch (error) {
        res.json({ error: error.message });
    }
});
export default router;
