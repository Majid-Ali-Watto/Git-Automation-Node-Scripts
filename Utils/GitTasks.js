import { readdirSync, statSync, readFileSync } from "fs";
import { execSync } from "child_process";

export async function getDirectories(path) {
    return readdirSync(path).filter(function (file) {
        return statSync(path + '/' + file).isDirectory();
    });
}

export function UpdateLibsMSs(pkg, repo, useOrMono) {
    try {
        useOrMono == 'Mono Repo' ? process.chdir(`${process.env.BASE_URL}/megaset-monorepo/`) : process.chdir(`${process.env.BASE_URL}/CRM_UseCases/${repo}/fe`);
        const message = execSync(`npm i @teresol-v2/${pkg}`, { encoding: "utf8" })
        return message;
    } catch (error) {
        return error.message;
    }

}
export function GetMegaSets(repo) {
    process.chdir(`${process.env.BASE_URL}/CRM_UseCases/${repo}/fe/src/UseCase/${repo.toUpperCase()}`);
    const data = readFileSync(`./${repo.toUpperCase()}.js`, { encoding: 'utf8', flag: 'r' });
    let MSs = data?.split('mega-set')?.map((m) => m?.split('"')[0])
    MSs?.shift();
    let prevMSs = data?.split('getDefaultState')[1]?.split('MS')
    for (let index = 0; index < prevMSs?.length; index++) {
        const s = prevMSs[index];
        let state = 0;
        let nextMSs = ''
        for (let index = 0; index < s?.length; index++) {
            const char = s[index];
            if (Number(char)) {
                state = 1;
                nextMSs += char;
            }
            else if (state == 1 && !Number(char)) break;
            else state = 0
        }
        if (nextMSs && nextMSs.length > 0)
            MSs = [...MSs, nextMSs];
    }
    return MSs;
}
export function openMonoRepo(command) {
    try {
        process.chdir(`${process.env.BASE_URL}/megaset-monorepo/`);
        execSync(command);
        return true;
    } catch (error) {
        return false
    }
}