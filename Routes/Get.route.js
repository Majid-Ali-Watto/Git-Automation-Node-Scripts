import express from "express";
import { GetMegaSets, getDirectories } from "../Utils/GitTasks.js";
import { getUcNumber } from "../Utils/utils.js";
const router = express.Router();
import UC from "../Schemas/UC_Schema.js";
import MS from "../Schemas/MS_Schema.js";
router.post("/getUcMSs", (req, res) => {
    try {
        const { uc } = req.body;
        const MSs = GetMegaSets(uc);
        res.json({ MSs });
    } catch (error) {
        res.json({ error: error.message });
    }
});

router.get("/", (_req, res) => {
    process.chdir(`${process.env.BASE_URL}/CRM_UseCases/`)
    const path = process.cwd()
    let UC_DB = [];
    // UC.find({}).then((docs) => docs.map((uc) => uc.title)).catch((error) => { console.log(error) });
    // if (UC_DB.length > 0) { res.json({ UCs }); return; }
    getDirectories(path).then(async (UCs) => {
        console.log('i am using', UC_DB);
        let MSs = []
        UCs.splice(UCs.findIndex((path) => path == 'UC_Git'), 1)
        UCs = UCs.filter((uc) => uc != 'gp_uc6d_ct_nf_bl' && uc != 'gp_uc6_ct_nf_bl').sort((a, b) => getUcNumber(a) - getUcNumber(b))
        UCs.forEach((repo) => {
            MSs = [...new Set([...MSs, ...GetMegaSets(repo)])]?.sort((a, b) => a - b);
        })
        process.chdir('../../')
        const ucNames = UCs.map((uc) => { return { title: uc } })
        const mss = MSs.map((ms) => { return { msNumber: ms } })
        MS.insertMany(mss).then(() => {
            UC.insertMany(ucNames).then(() => {
                res.json({ UCs, MSs });
            }).catch((err) => {
                res.json({ UCs, MSs });
            });
        }).catch((err) => {
            UC.insertMany(ucNames).then(() => {
                res.json({ UCs, MSs });
            }).catch((err) => {
                res.json({ UCs, MSs });
            });
        })

    }).catch((error => {
        res.json({ error: error.message });
    }))
});

export default router;
