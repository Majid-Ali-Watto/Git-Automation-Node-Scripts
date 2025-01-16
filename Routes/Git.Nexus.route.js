import express from "express";
const router = express.Router();
import { UpdateLibsMSs } from "../Utils/GitTasks.js";
import { pushChanges, switchPullMerge } from "../Utils/Git.js";

router.post("/performTask", (req, res) => {
    try {
        let message = []
        const { selectedUCs, selectedLibs, selectedMSs, task, useOrMono, commitMsg } = req.body;
        if (task == 'Pull') {
            selectedUCs.forEach(uc => {
                message.push({
                    uc: uc.toUpperCase(),
                    message: switchPullMerge(uc)
                })
            });
        }
        else if (task == 'Push'){
            selectedUCs.forEach(uc => {
                message.push({
                    uc: uc.toUpperCase(),
                    message: pushChanges(uc, commitMsg)
                })
            });
        }
        else if (task == 'Update') {
            let msg = ''
            selectedUCs.forEach(uc => {
                selectedMSs.forEach(ms => {
                    msg += UpdateLibsMSs(`mega-set${ms}`, uc, useOrMono)
                });
                selectedLibs.forEach(lib => {
                    lib = lib == 'HOC' ? 'usecase-hoc' : 'ui-components';
                    msg += UpdateLibsMSs(lib, uc, useOrMono)
                });
                message.push({
                    uc: uc.toUpperCase(),
                    message: msg
                })
            })
            if (useOrMono == 'Mono Repo') {
                selectedLibs.forEach(lib => {
                    lib = lib == 'HOC' ? 'usecase-hoc' : 'ui-components';
                    msg += UpdateLibsMSs(lib, undefined, useOrMono)
                });
                message.push({
                    uc: 'UI-Components',
                    message: msg
                })
            }

        }
        res.json({ [task]: selectedUCs, message: message });
    } catch (error) {
        res.json({ error: error.message });
    }
});
export default router;
